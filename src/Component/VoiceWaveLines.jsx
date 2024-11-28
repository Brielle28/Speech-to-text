import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "./Context/Userprovider";

const VoiceWaveLines = ({ isRecording = false }) => {
  const { transcript } = useContext(UserContext);
  const [rotation, setRotation] = useState(0);
  const transcriptRef = useRef(null); // Reference for transcript container

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

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
      <div className="flex flex-col items-center justify-center w-full ">
        <div className={`flex items-center justify-center ${isRecording ? "mt-0" : "mt-10"} bg-transparent w-[60%] h-[60%] md:h-full md:w-full`}>
          <svg viewBox="-100 -100 200 200" className="w-64 h-64">
            {renderWaveforms()}
          </svg>

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

        <div
          ref={transcriptRef} // Attach reference to container
          className={`w-[70%] md:w-[60%] overflow-scroll h-[80px] md:h-[125px] text-center ${isRecording ? "flex" : "hidden"}`}
        >
          {transcript ? (
            <p>{transcript}</p>
          ) : (
            <p className="text-gray-400">Listening...</p> // Fallback text
          )}
        </div>
      </div>
    </>
  );
};

export default VoiceWaveLines;
