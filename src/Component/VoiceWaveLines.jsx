import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "./Context/Userprovider";

const VoiceWaveLines = ({ isRecording = false }) => {
  const { transcript, getRecordingDuration, formatDuration } = useContext(UserContext);
  const [rotation, setRotation] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const transcriptRef = useRef(null); // Reference for transcript container

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

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
  }, [transcript]); // Runs when transcript changes

  const generatePoints = (count, radius, variation, speedFactor, direction) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const variationAmount = isRecording
        ? Math.sin((rotation * 0.05 + i * 0.5) * speedFactor) * variation
        : 0;
      const currentRadius = radius + variationAmount;
      const x =
        Math.cos(angle * direction) * currentRadius; // Varying direction
      const y = Math.sin(angle * direction) * currentRadius;
      points.push([x, y]);
    }
    return points;
  };

  const renderWaveforms = () => {
    const waveforms = [];
    const radii = Array.from({ length: 10 }, (_, i) => 80 - i * 7); // Smaller radii for inner layers
    const variations = Array.from({ length: 10 }, (_, i) => 20 - i * 2); // Smaller variations for inner layers
    const speedFactors = Array.from({ length: 10 }, (_, i) => 1 + i * 0.1); // Different speeds for each line
    const directions = Array.from({ length: 10 }, (_, i) => (i % 2 === 0 ? 1 : -1)); // Alternate directions

    for (let i = 0; i < radii.length; i++) {
      const points = generatePoints(50, radii[i], variations[i], speedFactors[i], directions[i]);
      const pathData = points.reduce((path, point, index) => {
        const command = index === 0 ? "M" : "L";
        return `${path} ${command} ${point[0]},${point[1]}`;
      }, "");
      const closedPath = `${pathData} Z`;

      waveforms.push(
        <path
          key={i}
          d={closedPath}
          fill="none"
          stroke="#ffffff" // White color for all wave lines
          strokeWidth={1.5 - i * 0.1} // Slightly thinner strokes for inner layers
          style={{
            filter: `blur(${0.5 + i * 0.1}px)`,
            opacity: 0.8 - i * 0.05,
            animation: `wave-${i} ${2 + i * 0.5}s infinite ease-in-out`,
          }}
        />
      );
    }
    return waveforms;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full px-6">
        {/* Main Visual Area */}
        <div className={`flex flex-col items-center justify-center ${isRecording ? "mt-4" : "mt-8"} meeting-container w-full max-w-4xl p-8`}>
          
          {/* Status Indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 pulse-glow' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium text-white/80">
                {isRecording ? 'Recording in progress...' : 'Ready to record'}
              </span>
            </div>
            {isRecording && (
              <div className="text-sm font-mono text-white/60 bg-white/10 px-3 py-1 rounded-full">
                {formatDuration(currentDuration)}
              </div>
            )}
          </div>

          {/* Wave Visualization */}
          <div className="flex items-center justify-center mb-8">
            <svg viewBox="-100 -100 200 200" className="w-48 h-48 md:w-64 md:h-64">
              {renderWaveforms()}
            </svg>
          </div>

          {/* Instructions */}
          {!isRecording && (
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Start Your Meeting Transcription</h2>
              <p className="text-white/70 text-sm max-w-md">
                Click the microphone button below to begin recording. Your speech will be transcribed in real-time.
              </p>
            </div>
          )}

          <style>
            {`
          ${Array.from({ length: 10 })
                .map(
                  (_, i) => `
                @keyframes wave-${i} {
                  0% { transform: rotate(0deg); }
                  50% { transform: rotate(${i % 2 === 0 ? "-" : ""}${10 + i * 2}deg); }
                  100% { transform: rotate(0deg); }
                }
              `
                )
                .join("")}
        `}
          </style>
        </div>

        {/* Transcript Display */}
        <div
          ref={transcriptRef}
          className={`w-full max-w-4xl meeting-container p-6 mt-6 ${isRecording ? "block" : "hidden"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Live Transcript</h3>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
          
          <div className="transcript-text min-h-[120px] max-h-[300px] overflow-y-auto">
            {transcript ? (
              <p className="whitespace-pre-wrap">{transcript}</p>
            ) : (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-white/60">Listening for speech...</p>
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
