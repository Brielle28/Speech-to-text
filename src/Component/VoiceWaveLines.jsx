import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "./Context/Userprovider";

const VoiceWaveLines = ({ isRecording = false }) => {
  const { transcript, getRecordingDuration, formatDuration } = useContext(UserContext);
  const [currentDuration, setCurrentDuration] = useState(0);
  const transcriptRef = useRef(null);

  // Update duration every second when recording
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setCurrentDuration(getRecordingDuration());
      }, 1000);
    } else {
      setCurrentDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording, getRecordingDuration]);

  useEffect(() => {
    // Scroll to the bottom when the transcript updates
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const renderAudioLines = () => {
    const lines = [];
    const lineCount = 20;
    const maxHeight = 60;
    
    for (let i = 0; i < lineCount; i++) {
      const height = isRecording 
        ? Math.random() * maxHeight + 10 
        : Math.random() * 20 + 5;
      
      lines.push(
        <div
          key={i}
          className="bg-gradient-to-t from-pink-400 to-orange-300 rounded-full transition-all duration-150 ease-out"
          style={{
            width: '3px',
            height: `${height}px`,
            animationDelay: `${i * 50}ms`,
            animation: isRecording ? 'audioPulse 0.5s ease-in-out infinite alternate' : 'none'
          }}
        />
      );
    }
    return lines;
  };

  return (
    <>
      <style>
        {`
          @keyframes audioPulse {
            0% { transform: scaleY(0.3); opacity: 0.7; }
            100% { transform: scaleY(1); opacity: 1; }
          }
        `}
      </style>
      
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6">
        {/* Main Visual Area */}
        <div className={`flex flex-col items-center justify-center ${isRecording ? "mt-4" : "mt-8"} speech-container w-full max-w-4xl p-6 sm:p-8 bounce-in`}>
          
          {/* Status Indicator */}
          <div className="flex items-center justify-between w-full mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-pink-400 pulse-glow' : 'bg-white/40'}`}></div>
              <span className="text-sm font-medium text-white/90">
                {isRecording ? 'Recording in progress...' : 'Ready to record'}
              </span>
            </div>
            {isRecording && (
              <div className="text-sm font-mono text-white/70 bg-white/20 px-3 py-1 rounded-full">
                {formatDuration(currentDuration)}
              </div>
            )}
          </div>

          {/* Minimal Audio Visualization */}
          <div className="flex items-center justify-center gap-1 mb-8">
            {renderAudioLines()}
          </div>

          {/* Instructions */}
          {!isRecording && (
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 float">Start Your Speech Transcription</h2>
              <p className="text-white/80 text-sm sm:text-base max-w-md">
                Click the microphone button below to begin recording. Your speech will be transcribed in real-time.
              </p>
            </div>
          )}
        </div>

        {/* Transcript Display */}
        <div
          ref={transcriptRef}
          className={`w-full max-w-4xl speech-container p-4 sm:p-6 mt-6 ${isRecording ? "block bounce-in" : "hidden"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Live Transcript</h3>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
          
          <div className="transcript-text min-h-[120px] max-h-[300px] overflow-y-auto">
            {transcript ? (
              <p className="whitespace-pre-wrap">{transcript}</p>
            ) : (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-pink-400 rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-white/70">Listening for speech...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceWaveLines;
