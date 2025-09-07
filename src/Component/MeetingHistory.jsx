import { useContext, useState } from "react";
import { UserContext } from "./Context/Userprovider";
import { FaDownload, FaTrash, FaEye, FaCalendarAlt, FaClock, FaGlobe } from "react-icons/fa";
import { toast } from 'react-toastify';

const MeetingHistory = () => {
  const { transcriptHistory, clearAllTranscripts } = useContext(UserContext);
  const [selectedTranscript, setSelectedTranscript] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const exportTranscript = (transcript) => {
    const blob = new Blob([transcript.transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-${new Date(transcript.timestamp).toISOString().split('T')[0]}.txt`;
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

  if (!showHistory) {
    return (
      <button
        onClick={() => setShowHistory(true)}
        className="btn-secondary flex items-center gap-2 px-4 py-2"
      >
        <FaCalendarAlt className="text-sm" />
        <span>Meeting History</span>
        {transcriptHistory.length > 0 && (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {transcriptHistory.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="meeting-container w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Meeting History</h2>
          <div className="flex items-center gap-2">
            {transcriptHistory.length > 0 && (
              <button
                onClick={clearAllTranscripts}
                className="btn-secondary text-red-400 hover:bg-red-500/20"
              >
                <FaTrash className="text-sm" />
                Clear All
              </button>
            )}
            <button
              onClick={() => setShowHistory(false)}
              className="btn-secondary"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {transcriptHistory.length === 0 ? (
            <div className="text-center py-12">
              <FaCalendarAlt className="text-4xl text-white/30 mx-auto mb-4" />
              <p className="text-white/60">No meeting transcripts yet</p>
              <p className="text-white/40 text-sm mt-2">Start recording to create your first transcript</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transcriptHistory.map((transcript) => (
                <div
                  key={transcript.id}
                  className="glass rounded-lg p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="timestamp">
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
                      <p className="text-white/80 text-sm line-clamp-2">
                        {transcript.transcript.substring(0, 150)}
                        {transcript.transcript.length > 150 && '...'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setSelectedTranscript(transcript)}
                        className="btn-secondary p-2"
                        title="View full transcript"
                      >
                        <FaEye className="text-sm" />
                      </button>
                      <button
                        onClick={() => exportTranscript(transcript)}
                        className="btn-secondary p-2"
                        title="Export transcript"
                      >
                        <FaDownload className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Transcript Viewer Modal */}
      {selectedTranscript && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="meeting-container w-full max-w-3xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="text-lg font-semibold text-white">Meeting Transcript</h3>
                <p className="text-white/60 text-sm">
                  {formatDate(selectedTranscript.timestamp)} • {formatDuration(selectedTranscript.duration)} • {getLanguageName(selectedTranscript.language)}
                </p>
              </div>
              <button
                onClick={() => setSelectedTranscript(null)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="transcript-text whitespace-pre-wrap">
                {selectedTranscript.transcript}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-6 border-t border-white/10">
              <button
                onClick={() => exportTranscript(selectedTranscript)}
                className="btn-primary flex items-center gap-2"
              >
                <FaDownload className="text-sm" />
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingHistory;
