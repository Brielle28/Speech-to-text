import { BiReset } from "react-icons/bi";
import { FaGlobe, FaCog } from "react-icons/fa";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "./Context/Userprovider";
import MeetingHistory from "./MeetingHistory";

const Navbar = () => {
  const { setLanguage, resetLanguage, currentLanguage } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
    { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage.split('-')[0]) || languages[0];

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
    setShowSettings(false);
  };

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
    setShowDropdown(false);
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between w-full px-6 pt-6 bg-transparent md:pt-8 md:pb-4 md:px-24">
      {/* Reset Button */}
      <button
        onClick={resetLanguage}
        className="btn-secondary flex items-center gap-2 px-4 py-2"
        title="Reset to English"
      >
        <BiReset className="text-lg" />
        <span className="hidden sm:inline">Reset</span>
      </button>

      {/* Center Title */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gradient">
          Meeting Transcriber
        </h1>
        <p className="text-sm text-white/70 mt-1">
          Professional Speech-to-Text
        </p>
      </div>

      {/* Language & Settings */}
      <div className="flex items-center gap-3" ref={dropdownRef}>
        {/* Meeting History */}
        <MeetingHistory />
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="btn-secondary flex items-center gap-2 px-4 py-2"
            title="Select Language"
          >
            <span className="text-lg">{currentLang.flag}</span>
            <span className="hidden sm:inline">{currentLang.label}</span>
            <FaGlobe className="text-sm" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 z-20 w-48 mt-2 glass rounded-lg shadow-xl overflow-hidden">
              <div className="p-2">
                <div className="text-xs font-semibold text-white/60 px-3 py-2 uppercase tracking-wide">
                  Select Language
                </div>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => selectLanguage(language.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
                      currentLanguage.startsWith(language.code)
                        ? 'bg-white/20 text-white'
                        : 'hover:bg-white/10 text-white/80 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span className="font-medium">{language.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings Button */}
        <button
          onClick={toggleSettings}
          className="btn-secondary p-2"
          title="Settings"
        >
          <FaCog className="text-lg" />
        </button>

        {showSettings && (
          <div className="absolute right-6 top-20 z-20 w-64 glass rounded-lg shadow-xl p-4">
            <div className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide">
              Settings
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Auto-save transcripts</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Show timestamps</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Sound notifications</span>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
