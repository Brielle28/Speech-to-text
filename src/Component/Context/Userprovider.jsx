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
  const [isSupported, setIsSupported] = useState(true); // Browser support check
  const [error, setError] = useState(null); // Error state
  const [recordingStartTime, setRecordingStartTime] = useState(null); // Recording duration
  const [transcriptHistory, setTranscriptHistory] = useState([]); // Meeting history

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

    // Load transcript history
    const history = localStorage.getItem("transcriptHistory");
    const historyArray = history ? JSON.parse(history) : [];
    setTranscriptHistory(historyArray);

    // Check for Web Speech API support
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false);
      setError("Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.");
      toast.error("Browser not supported for speech recognition");
      return;
    }

    // Initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.lang = currentLanguage;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setRecordingStartTime(Date.now());
      setError(null);
      toast.success("Recording started");
    };

    recognition.onresult = (event) => {
      let liveText = "";
      for (let i = 0; i < event.results.length; i++) {
        liveText += event.results[i][0].transcript;
      }
      setTranscript(liveText); // Update live transcript
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setError(event.error);
      
      switch (event.error) {
        case 'no-speech':
          toast.warning("No speech detected. Please try speaking louder.");
          break;
        case 'audio-capture':
          toast.error("Microphone not found. Please check your microphone permissions.");
          break;
        case 'not-allowed':
          toast.error("Microphone access denied. Please allow microphone access and refresh the page.");
          break;
        case 'network':
          toast.error("Network error. Please check your internet connection.");
          break;
        default:
          toast.error(`Speech recognition error: ${event.error}`);
      }
      
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setRecordingStartTime(null);
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
    if (!isSupported) {
      toast.error("Speech recognition is not supported in your browser");
      return;
    }

    if (recognitionRef.current && !isRecording) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        setError(null);
      } catch (err) {
        console.error("Failed to start recording:", err);
        toast.error("Failed to start recording. Please try again.");
      }
    }
  };

  // Stop speech recording
  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      try {
        recognitionRef.current.stop();
        setIsRecording(false);

        if (transcript.trim()) {
          const meetingEntry = {
            id: Date.now(),
            transcript: transcript,
            timestamp: new Date().toISOString(),
            duration: recordingStartTime ? Date.now() - recordingStartTime : 0,
            language: currentLanguage
          };

          setSavedTranscripts((prev) => {
            const updated = [...prev, transcript];
            localStorage.setItem("transcripts", JSON.stringify(updated));
            return updated;
          });

          setTranscriptHistory((prev) => {
            const updated = [...prev, meetingEntry];
            localStorage.setItem("transcriptHistory", JSON.stringify(updated));
            return updated;
          });

          toast.success("Speech transcript saved successfully");
        }

        setTranscript(""); // Clear live transcript
        setRecordingStartTime(null);
      } catch (err) {
        console.error("Failed to stop recording:", err);
        toast.error("Failed to stop recording properly");
      }
    }
  };

  // Toggle recording state
  const toggleState = () => {
    setIconColor((prev) => !prev);
    isRecording ? stopRecording() : startRecording();
  };

  // Get recording duration
  const getRecordingDuration = () => {
    if (!recordingStartTime) return 0;
    return Math.floor((Date.now() - recordingStartTime) / 1000);
  };

  // Format duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Clear all transcripts
  const clearAllTranscripts = () => {
    setSavedTranscripts([]);
    setTranscriptHistory([]);
    setTranscript("");
    localStorage.removeItem("transcripts");
    localStorage.removeItem("transcriptHistory");
    toast.success("All transcripts cleared");
  };

  // Context value
  const value = {
    iconColor,
    isRecording,
    toggleState,
    transcript,
    savedTranscripts,
    transcriptHistory,
    copyToClipboard,
    stopRecording,
    currentLanguage,
    setLanguage,
    resetLanguage,
    isSupported,
    error,
    recordingStartTime,
    getRecordingDuration,
    formatDuration,
    clearAllTranscripts,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;