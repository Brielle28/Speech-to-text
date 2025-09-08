import { useContext } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaStop, FaDownload } from "react-icons/fa";
import { UserContext } from "./Context/Userprovider";
import { FaRegCopy } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";

const Footer = () => {
  const {
    iconColor,
    isRecording,
    toggleState,
    copyToClipboard,
    stopRecording,
    transcript,
  } = useContext(UserContext);

  const exportTranscript = () => {
    if (!transcript) return;
    
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-transcript-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 pt-6 pb-6 text-center">
      {/* Main Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
        {/* Secondary Actions */}
        <div className="flex items-center gap-3 sm:gap-4 order-2 sm:order-1">
          {/* Copy Button */}
          <button
            onClick={transcript ? copyToClipboard : null}
            disabled={!transcript}
            className={`btn-secondary p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
              transcript 
                ? 'hover:bg-white/20 cursor-pointer' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            title="Copy transcript"
          >
            <FaRegCopy className="text-lg sm:text-xl" />
          </button>

          {/* Export Button */}
          <button
            onClick={transcript ? exportTranscript : null}
            disabled={!transcript}
            className={`btn-secondary p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
              transcript 
                ? 'hover:bg-white/20 cursor-pointer' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            title="Export transcript"
          >
            <FaDownload className="text-lg sm:text-xl" />
          </button>
        </div>

        {/* Main Recording Button */}
        <div className="flex flex-col items-center order-1 sm:order-2">
          <button
            onClick={toggleState}
            className={`relative p-4 sm:p-6 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isRecording 
                ? 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-lg shadow-pink-500/30' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/30'
            }`}
          >
            {isRecording ? (
              <FaStop className="text-2xl sm:text-3xl text-white" />
            ) : (
              <CiMicrophoneOn className="text-2xl sm:text-3xl text-white" />
            )}
            
            {/* Pulse effect when recording */}
            {isRecording && (
              <div className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-20"></div>
            )}
          </button>
          
          {/* Recording indicator */}
          {isRecording && (
            <div className="flex items-center gap-2 mt-3 text-pink-300">
              <HiSpeakerWave className="text-sm sm:text-lg animate-pulse" />
              <span className="text-xs sm:text-sm font-medium">Recording</span>
            </div>
          )}
        </div>

        {/* Clear Button */}
        <button
          onClick={transcript ? stopRecording : null}
          disabled={!transcript}
          className={`btn-secondary p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
            transcript 
              ? 'hover:bg-red-500/20 hover:text-red-300 cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          title="Clear transcript"
        >
          <RiDeleteBin6Line className="text-lg sm:text-xl" />
        </button>
      </div>

      {/* Status Text */}
      <div className="text-center">
        <p className="text-white/80 text-sm sm:text-base mb-2">
          {isRecording 
            ? "Recording in progress - Click stop to end" 
            : "Click the microphone to start recording your speech"
          }
        </p>
        {transcript && (
          <p className="text-white/60 text-xs sm:text-sm">
            {transcript.length} characters transcribed
          </p>
        )}
      </div>
    </div>
  );
};

export default Footer;
