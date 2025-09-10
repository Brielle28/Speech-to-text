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
    <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 border-t border-white/10">
      <div className="flex flex-col items-center justify-center w-full px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        
        {/* Main Controls - Always Horizontal */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full max-w-6xl mb-4">
          
          {/* Copy Button */}
          <button
            onClick={transcript ? copyToClipboard : null}
            disabled={!transcript}
            className={`btn-secondary p-3 sm:p-4 md:p-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
              transcript 
                ? 'hover:bg-white/20 cursor-pointer' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            title="Copy transcript"
          >
            <FaRegCopy className="text-base sm:text-lg md:text-xl" />
          </button>

          {/* Export Button */}
          <button
            onClick={transcript ? exportTranscript : null}
            disabled={!transcript}
            className={`btn-secondary p-3 sm:p-4 md:p-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
              transcript 
                ? 'hover:bg-white/20 cursor-pointer' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            title="Export transcript"
          >
            <FaDownload className="text-base sm:text-lg md:text-xl" />
          </button>

          {/* Main Recording Button - Same size as others */}
          <button
            onClick={toggleState}
            className={`relative p-3 sm:p-4 md:p-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isRecording 
                ? 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-lg shadow-pink-500/30' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/30'
            }`}
          >
            {isRecording ? (
              <FaStop className="text-base sm:text-lg md:text-xl text-white" />
            ) : (
              <CiMicrophoneOn className="text-base sm:text-lg md:text-xl text-white" />
            )}
            
            {/* Radiating pulse effect when recording */}
            {isRecording && (
              <>
                <div className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-30"></div>
                <div className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-20" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-0 rounded-full bg-pink-300 animate-ping opacity-10" style={{ animationDelay: '1s' }}></div>
              </>
            )}
          </button>

          {/* Clear Button */}
          <button
            onClick={transcript ? stopRecording : null}
            disabled={!transcript}
            className={`btn-secondary p-3 sm:p-4 md:p-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
              transcript 
                ? 'hover:bg-red-500/20 hover:text-red-300 cursor-pointer' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            title="Clear transcript"
          >
            <RiDeleteBin6Line className="text-base sm:text-lg md:text-xl" />
          </button>
        </div>

        {/* Status Text - Below controls with proper spacing */}
        <div className="text-center">
          {isRecording && (
            <div className="flex items-center justify-center gap-2 mb-2 text-pink-300">
              <HiSpeakerWave className="text-sm sm:text-base animate-pulse" />
              <span className="text-sm sm:text-base font-medium">Recording</span>
            </div>
          )}
          <p className="text-white/70 text-sm sm:text-base">
            {isRecording 
              ? "Recording in progress - Click stop to end" 
              : "Click the microphone to start recording your speech"
            }
          </p>
          {transcript && (
            <p className="text-white/50 text-xs sm:text-sm mt-1">
              {transcript.length} characters transcribed
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
