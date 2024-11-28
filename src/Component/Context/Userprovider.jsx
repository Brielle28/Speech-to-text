import { createContext, useEffect, useRef, useState } from "react";

export const UserContext = createContext();

const Userprovider = ({ children }) => {
  const [iconColor, setIconColor] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(""); // For live recording
  const [savedTranscripts, setSavedTranscripts] = useState([]); // For finalized recordings

  const recognitionRef = useRef(null); // Reference for Speech Recognition instance

  useEffect(() => {
    // Retrieve saved transcripts from local storage on component mount
    const saved = localStorage.getItem("transcripts");
    const savedArray = saved ? JSON.parse(saved) : []; // Default to an empty array if no saved transcripts
    setSavedTranscripts(savedArray);

    // Initialize Speech Recognition if supported
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Web Speech API is not supported in your browser.");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let liveText = "";
      for (let i = 0; i < event.results.length; i++) {
        liveText += event.results[i][0].transcript;
      }
      setTranscript(liveText); // Update the live transcript
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    return () => {
      recognition.stop(); // Clean up on unmount
    };
  }, []); // Empty dependency array ensures it runs only on mount

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);

      // Save to finalized transcripts
      setSavedTranscripts((prev) => {
        const updated = [...prev, transcript]; // Ensure you're adding to the array properly
        localStorage.setItem("transcripts", JSON.stringify(updated)); // Save to local storage
        return updated;
      });

      // Clear the live transcript
      setTranscript("");
    }
  };

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const toggleState = () => {
    setIconColor(!iconColor);
    isRecording ? stopRecording() : startRecording();
  };

  console.log(savedTranscripts);

  const downloadTranscripts = () => {
    // Convert saved transcripts to a JSON string
    const jsonData = JSON.stringify(savedTranscripts, null, 2);
  
    // Create a Blob object with the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });
  
    // Create a link element to trigger the download
    const link = document.createElement("a");
  
    // Set the download attribute with a filename for the downloaded file
    link.download = "saved_transcripts.json";
  
    // Create an object URL for the Blob and set it as the href
    link.href = URL.createObjectURL(blob);
  
    // Append the link to the document body (it must be in the DOM to work)
    document.body.appendChild(link);
  
    // Programmatically click the link to trigger the download
    link.click();
  
    // Remove the link from the DOM after the download
    document.body.removeChild(link);
  };
  
  const value = {
    iconColor,
    isRecording,
    toggleState,
    transcript,
    savedTranscripts, // Access saved transcripts
    downloadTranscripts
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default Userprovider;
