import { createContext, useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Create User Context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // State management
  const [iconColor, setIconColor] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(""); // Live transcript
  const [savedTranscripts, setSavedTranscripts] = useState([]); // Finalized transcripts
  const [currentLanguage, setCurrentLanguage] = useState("en-US"); // Default language

  const recognitionRef = useRef(null); // Reference for SpeechRecognition instance

  // Mapping of short language codes to full BCP 47 language tags
  const languageMap = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE", 
    zh: "zh-CN",
    hi: "hi-IN"
  };

  useEffect(() => {
    // Load transcripts from local storage
    const saved = localStorage.getItem("transcripts");
    const savedArray = saved ? JSON.parse(saved) : [];
    setSavedTranscripts(savedArray);

    // Check for Web Speech API support
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Web Speech API is not supported in your browser.");
      return;
    }

    // Initialize SpeechRecognition
    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.lang = currentLanguage;

    recognition.onresult = (event) => {
      let liveText = "";
      for (let i = 0; i < event.results.length; i++) {
        liveText += event.results[i][0].transcript;
      }
      setTranscript(liveText); // Update live transcript
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.warn("Recognition was not active:", err);
        }
      }
    };
  }, [currentLanguage]);

  // Set a new language for SpeechRecognition
  const setLanguage = (langCode) => {
    const fullLanguageCode = languageMap[langCode];
    if (!fullLanguageCode) {
      console.error(`Unsupported language: ${langCode}`);
      return;
    }
    
    setCurrentLanguage(fullLanguageCode);
    
    // Stop current recognition and restart with new language
    if (recognitionRef.current) {
      if (isRecording) {
        recognitionRef.current.stop();
      }
      recognitionRef.current.lang = fullLanguageCode;
      if (isRecording) {
        recognitionRef.current.start();
      }
    }
  };

  // Reset language to default (English - US)
  const resetLanguage = () => {
    setLanguage('en');
  };

  // Copy transcript to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(transcript)
      .then(() => {
        toast("copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy text. Please try again.");
      });
  };

  // Start speech recording
  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  // Stop speech recording
  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);

      if (transcript.trim()) {
        setSavedTranscripts((prev) => {
          const updated = [...prev, transcript];
          localStorage.setItem("transcripts", JSON.stringify(updated));
          return updated;
        });
      }

      setTranscript(""); // Clear live transcript
    }
  };

  // Toggle recording state
  const toggleState = () => {
    setIconColor((prev) => !prev);
    isRecording ? stopRecording() : startRecording();
  };

  // Context value
  const value = {
    iconColor,
    isRecording,
    toggleState,
    transcript,
    savedTranscripts,
    copyToClipboard,
    stopRecording,
    currentLanguage,
    setLanguage,
    resetLanguage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;