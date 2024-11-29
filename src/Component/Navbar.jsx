// // import { BiReset } from "react-icons/bi";
// // import { FaList } from "react-icons/fa";
// // const Navbar = () => {
// //     return (
// //         <>
// //             <div 
// //             className="flex items-center justify-between w-full px-6 pt-8 bg-transparent md:pt-10 md:pb-3 md:px-24">
// //                 <BiReset //this should reset back to english
// //                 className="md:text-[33px] text-[30px]" /> 
// //                 <FaList //this should be a dropdown of the languages to select
// //                 className="md:text-[33px] text-[30px]" />
// //             </div>
// //         </>
// //     )
// // }

// // export default Navbar
// import { BiReset } from "react-icons/bi";
// import { FaList } from "react-icons/fa";
// import { useContext, useState } from "react";
// import { UserContext } from "./Context/Userprovider";

// const Navbar = () => {
//   const { setLanguage, resetLanguage } = useContext(UserContext); // Context functions
//   const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

//   const languages = [
//     { code: "en", label: "English" },
//     { code: "es", label: "Spanish" },
//     { code: "fr", label: "French" },
//     { code: "de", label: "German" },
//     { code: "zh", label: "Chinese" },
//     { code: "hi", label: "Hindi" },
//   ];

//   const toggleDropdown = () => {
//     setShowDropdown((prev) => !prev); // Toggle dropdown visibility
//   };

//   const selectLanguage = (lang) => {
//     setLanguage(lang); // Update language in context
//     setShowDropdown(false); // Close dropdown after selection
//   };

//   return (
//     <div className="relative flex items-center justify-between w-full px-6 pt-8 bg-transparent md:pt-10 md:pb-3 md:px-24">
//       {/* Reset Button */}
//       <BiReset
//         onClick={resetLanguage} // Resets language to English
//         className="cursor-pointer md:text-[33px] text-[30px] hover:text-gray-700"
//         title="Reset to English"
//       />

//       {/* Dropdown Menu */}
//       <div className="relative">
//         <FaList
//           onClick={toggleDropdown} // Toggle dropdown visibility
//           className="cursor-pointer md:text-[33px] text-[30px] hover:text-gray-700"
//           title="Select Language"
//         />

//         {showDropdown && (
//           <div className="absolute right-0 z-10 w-40 mt-2 bg-transparent border rounded-md shadow-md">
//             <ul className="py-2 text-left">
//               {languages.map((language) => (
//                 <li
//                   key={language.code}
//                   onClick={() => selectLanguage(language.code)}
//                   className="px-4 py-2 cursor-pointer hover:text-purple-600 hover:bg-white"
//                 >
//                   {language.label}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
