import { useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { UserContext } from "./Context/Userprovider";
import { FaDownload, FaTrash, FaEye, FaCalendarAlt, FaClock, FaGlobe } from "react-icons/fa";
import { toast } from 'react-toastify';

const SpeechHistory = () => {
  const { transcriptHistory, clearAllTranscripts } = useContext(UserContext);
  const [selectedTranscript, setSelectedTranscript] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (selectedTranscript) {
          setSelectedTranscript(null);
        } else {
          setShowHistory(false);
        }
      }
    };

    if (showHistory || selectedTranscript) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showHistory, selectedTranscript]);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        if (selectedTranscript) {
          setSelectedTranscript(null);
        } else {
          setShowHistory(false);
        }
      }
    };

    if (showHistory || selectedTranscript) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showHistory, selectedTranscript]);

  const exportTranscript = (transcript) => {
    const blob = new Blob([transcript.transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `speech-${new Date(transcript.timestamp).toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Transcript exported successfully");
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getLanguageName = (langCode) => {
    const languages = {
      'en-US': 'English',
      'es-ES': 'Spanish',
      'fr-FR': 'French',
      'de-DE': 'German',
      'zh-CN': 'Chinese',
      'hi-IN': 'Hindi'
    };
    return languages[langCode] || langCode;
  };

  const handleViewTranscript = (transcript) => {
    setSelectedTranscript(transcript);
  };

  const handleCloseTranscriptViewer = () => {
    setSelectedTranscript(null);
  };

  const handleCloseHistory = () => {
    setSelectedTranscript(null);
    setShowHistory(false);
  };

  // Modal component to render via portal
  const Modal = ({ children, isOpen, onClose, zIndex = 999999 }) => {
    if (!isOpen) return null;

    return createPortal(
      <div 
        className="fixed inset-0 flex items-center justify-center p-2 sm:p-4"
        style={{ 
          zIndex,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={onClose}
        />
        <div className="relative z-10 w-full flex items-center justify-center">
          {children}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <button
        onClick={() => setShowHistory(true)}
        className="btn-secondary flex items-center gap-2 px-3 py-2"
      >
        <FaCalendarAlt className="text-sm" />
        <span className="hidden sm:inline">History</span>
        {transcriptHistory.length > 0 && (
          <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
            {transcriptHistory.length}
          </span>
        )}
      </button>

      {/* Main History Modal */}
      <Modal isOpen={showHistory} onClose={() => setShowHistory(false)} zIndex={999999}>
        <div 
          ref={modalRef}
          className="speech-container w-full max-w-2xl sm:max-w-4xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden mx-auto animate-in zoom-in-95 duration-300"
        >
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Speech History</h2>
            <div className="flex items-center gap-2">
              {transcriptHistory.length > 0 && (
                <button
                  onClick={clearAllTranscripts}
                  className="btn-secondary text-red-400 hover:bg-red-500/20 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                >
                  <FaTrash className="text-xs sm:text-sm" />
                  <span className="hidden sm:inline ml-1">Clear All</span>
                </button>
              )}
              <button
                onClick={handleCloseHistory}
                className="btn-secondary text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              >
                Close
              </button>
            </div>
          </div>

          <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(90vh-80px)] sm:max-h-[60vh]">
            {transcriptHistory.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <FaCalendarAlt className="text-3xl sm:text-4xl text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-sm sm:text-base">No speech transcripts yet</p>
                <p className="text-white/40 text-xs sm:text-sm mt-2">Start recording to create your first transcript</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {transcriptHistory.map((transcript) => (
                  <div
                    key={transcript.id}
                    className="glass rounded-lg p-3 sm:p-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
                          <span className="timestamp text-xs sm:text-sm">
                            {formatDate(transcript.timestamp)}
                          </span>
                          <div className="flex items-center gap-1 text-white/60">
                            <FaClock className="text-xs" />
                            <span className="text-xs">
                              {formatDuration(transcript.duration)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-white/60">
                            <FaGlobe className="text-xs" />
                            <span className="text-xs">
                              {getLanguageName(transcript.language)}
                            </span>
                          </div>
                        </div>
                        <p className="text-white/80 text-xs sm:text-sm line-clamp-2 break-words">
                          {transcript.transcript.substring(0, 120)}
                          {transcript.transcript.length > 120 && '...'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 sm:ml-4">
                        <button
                          onClick={() => handleViewTranscript(transcript)}
                          className="btn-secondary p-2 text-xs sm:text-sm"
                          title="View full transcript"
                        >
                          <FaEye className="text-xs sm:text-sm" />
                        </button>
                        <button
                          onClick={() => exportTranscript(transcript)}
                          className="btn-secondary p-2 text-xs sm:text-sm"
                          title="Export transcript"
                        >
                          <FaDownload className="text-xs sm:text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Transcript Viewer Modal */}
      <Modal 
        isOpen={!!selectedTranscript} 
        onClose={() => setSelectedTranscript(null)} 
        zIndex={9999999}
      >
        <div className="speech-container w-full max-w-2xl sm:max-w-3xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden mx-auto animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-white">Speech Transcript</h3>
              {selectedTranscript && (
                <p className="text-white/60 text-xs sm:text-sm truncate">
                  {formatDate(selectedTranscript.timestamp)} • {formatDuration(selectedTranscript.duration)} • {getLanguageName(selectedTranscript.language)}
                </p>
              )}
            </div>
            <button
              onClick={handleCloseTranscriptViewer}
              className="btn-secondary text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 ml-2"
            >
              Close
            </button>
          </div>
          <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)] sm:max-h-[60vh]">
            <div className="transcript-text whitespace-pre-wrap text-sm sm:text-base break-words">
              {selectedTranscript?.transcript}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 p-3 sm:p-6 border-t border-white/10">
            <button
              onClick={() => selectedTranscript && exportTranscript(selectedTranscript)}
              className="btn-primary flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3"
            >
              <FaDownload className="text-xs sm:text-sm" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SpeechHistory;