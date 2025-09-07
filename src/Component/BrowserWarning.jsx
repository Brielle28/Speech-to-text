import { useContext } from "react";
import { UserContext } from "./Context/Userprovider";
import { FaExclamationTriangle, FaChrome, FaEdge, FaSafari } from "react-icons/fa";

const BrowserWarning = () => {
  const { isSupported, error } = useContext(UserContext);

  if (isSupported) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="meeting-container w-full max-w-2xl p-8 text-center">
        <div className="mb-6">
          <FaExclamationTriangle className="text-6xl text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Browser Not Supported</h2>
          <p className="text-white/70 mb-6">
            Speech recognition is not supported in your current browser. 
            Please use one of the recommended browsers below for the best experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-lg p-4">
            <FaChrome className="text-3xl text-blue-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Google Chrome</h3>
            <p className="text-white/60 text-sm">Recommended for best performance</p>
          </div>
          <div className="glass rounded-lg p-4">
            <FaEdge className="text-3xl text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Microsoft Edge</h3>
            <p className="text-white/60 text-sm">Great alternative option</p>
          </div>
          <div className="glass rounded-lg p-4">
            <FaSafari className="text-3xl text-blue-300 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Safari</h3>
            <p className="text-white/60 text-sm">For Mac users</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <div className="text-white/50 text-sm">
          <p>Speech recognition requires a modern browser with Web Speech API support.</p>
          <p className="mt-2">Make sure your browser is up to date and microphone permissions are enabled.</p>
        </div>
      </div>
    </div>
  );
};

export default BrowserWarning;
