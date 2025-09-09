// import { BiReset } from "react-icons/bi";
// import { FaGlobe, FaCog, FaBars, FaTimes } from "react-icons/fa";
// import { useContext, useState, useRef, useEffect } from "react";
// import { UserContext } from "./Context/Userprovider";
// import SpeechHistory from "./MeetingHistory";

// const Navbar = () => {
//   const { setLanguage, resetLanguage, currentLanguage } = useContext(UserContext);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const languages = [
//     { code: "en", label: "English", flag: "🇺🇸" },
//     { code: "es", label: "Español", flag: "🇪🇸" },
//     { code: "fr", label: "Français", flag: "🇫🇷" },
//     { code: "de", label: "Deutsch", flag: "🇩🇪" },
//     { code: "zh", label: "中文", flag: "🇨🇳" },
//     { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
//   ];

//   const currentLang = languages.find(lang => lang.code === currentLanguage.split('-')[0]) || languages[0];

//   const toggleDropdown = () => {
//     setShowDropdown((prev) => !prev);
//     setShowSettings(false);
//   };

//   const toggleSettings = () => {
//     setShowSettings((prev) => !prev);
//     setShowDropdown(false);
//   };

//   const selectLanguage = (lang) => {
//     setLanguage(lang);
//     setShowDropdown(false);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//         setShowSettings(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="btn-secondary p-2"
//             >
//               {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
//             </button>
//           </div>

//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <h1 className="text-xl font-bold text-gradient">
//               SpeechFlow
//             </h1>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-4" ref={dropdownRef}>
//             {/* Reset Button */}
//             <button
//               onClick={resetLanguage}
//               className="btn-secondary flex items-center gap-2 px-3 py-2"
//               title="Reset to English"
//             >
//               <BiReset className="text-sm" />
//               <span className="text-sm">Reset</span>
//             </button>

//             {/* Speech History */}
//             <SpeechHistory />

//             {/* Language Selector */}
//             <div className="relative">
//               <button
//                 onClick={toggleDropdown}
//                 className="btn-secondary flex items-center gap-2 px-3 py-2"
//                 title="Select Language"
//               >
//                 <span className="text-sm">{currentLang.flag}</span>
//                 <span className="text-sm">{currentLang.label}</span>
//                 <FaGlobe className="text-xs" />
//               </button>

//               {showDropdown && (
//                 <div className="absolute right-0 z-20 w-48 mt-2 glass rounded-lg shadow-xl overflow-hidden">
//                   <div className="p-2">
//                     <div className="text-xs font-semibold text-white/60 px-3 py-2 uppercase tracking-wide">
//                       Select Language
//                     </div>
//                     {languages.map((language) => (
//                       <button
//                         key={language.code}
//                         onClick={() => selectLanguage(language.code)}
//                         className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
//                           currentLanguage.startsWith(language.code)
//                             ? 'bg-white/20 text-white'
//                             : 'hover:bg-white/10 text-white/80 hover:text-white'
//                         }`}
//                       >
//                         <span className="text-lg">{language.flag}</span>
//                         <span className="font-medium">{language.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Settings Button */}
//             <button
//               onClick={toggleSettings}
//               className="btn-secondary p-2"
//               title="Settings"
//             >
//               <FaCog className="text-sm" />
//             </button>

//             {showSettings && (
//               <div className="absolute right-6 top-16 z-20 w-64 glass rounded-lg shadow-xl p-4">
//                 <div className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide">
//                   Settings
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-white/80">Auto-save transcripts</span>
//                     <input type="checkbox" defaultChecked className="rounded" />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-white/80">Show timestamps</span>
//                     <input type="checkbox" defaultChecked className="rounded" />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-white/80">Sound notifications</span>
//                     <input type="checkbox" className="rounded" />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 glass rounded-lg mt-2">
//               <button
//                 onClick={() => {
//                   resetLanguage();
//                   setIsMobileMenuOpen(false);
//                 }}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-md hover:bg-white/10 text-white/80 hover:text-white"
//               >
//                 <BiReset className="text-sm" />
//                 <span>Reset to English</span>
//               </button>

//               <div className="px-3 py-2">
//                 <div className="text-xs font-semibold text-white/60 mb-2 uppercase tracking-wide">
//                   Language
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   {languages.map((language) => (
//                     <button
//                       key={language.code}
//                       onClick={() => {
//                         selectLanguage(language.code);
//                         setIsMobileMenuOpen(false);
//                       }}
//                       className={`flex items-center gap-2 px-3 py-2 text-left rounded-md transition-colors ${
//                         currentLanguage.startsWith(language.code)
//                           ? 'bg-white/20 text-white'
//                           : 'hover:bg-white/10 text-white/80 hover:text-white'
//                       }`}
//                     >
//                       <span className="text-sm">{language.flag}</span>
//                       <span className="text-sm">{language.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="px-3 py-2">
//                 <SpeechHistory />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { BiReset } from "react-icons/bi";
import { FaGlobe, FaCog, FaBars, FaTimes } from "react-icons/fa";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "./Context/Userprovider";
import SpeechHistory from "./MeetingHistory";

const Navbar = () => {
  const { setLanguage, resetLanguage, currentLanguage } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-secondary p-2"
            >
              {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gradient">
              SpeechFlow
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4" ref={dropdownRef}>
            {/* Reset Button */}
            <button
              onClick={resetLanguage}
              className="btn-secondary flex items-center gap-2 px-3 py-2"
              title="Reset to English"
            >
              <BiReset className="text-sm" />
              <span className="text-sm">Reset</span>
            </button>

            {/* Speech History */}
            <SpeechHistory />

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="btn-secondary flex items-center gap-2 px-3 py-2"
                title="Select Language"
              >
                <span className="text-sm">{currentLang.flag}</span>
                <span className="text-sm">{currentLang.label}</span>
                <FaGlobe className="text-xs" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 z-50 w-48 mt-2 glass rounded-lg shadow-xl overflow-hidden">
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
              <FaCog className="text-sm" />
            </button>

            {showSettings && (
              <div className="absolute right-6 top-16 z-50 w-64 glass rounded-lg shadow-xl p-4">
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass rounded-lg mt-2">
              <button
                onClick={() => {
                  resetLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-md hover:bg-white/10 text-white/80 hover:text-white"
              >
                <BiReset className="text-sm" />
                <span>Reset to English</span>
              </button>

              <div className="px-3 py-2">
                <div className="text-xs font-semibold text-white/60 mb-2 uppercase tracking-wide">
                  Language
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        selectLanguage(language.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 text-left rounded-md transition-colors ${
                        currentLanguage.startsWith(language.code)
                          ? 'bg-white/20 text-white'
                          : 'hover:bg-white/10 text-white/80 hover:text-white'
                      }`}
                    >
                      <span className="text-sm">{language.flag}</span>
                      <span className="text-sm">{language.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-3 py-2">
                <SpeechHistory />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;