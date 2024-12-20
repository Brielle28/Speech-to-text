import { useContext } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaStop } from "react-icons/fa";
import { UserContext } from "./Context/Userprovider";
import { FaRegCopy } from "react-icons/fa";

const Footer = () => {
  const {
    iconColor,
    isRecording,
    toggleState,
    copyToClipboard,
    stopRecording,
  } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 pt-0 pb-3 text-center md:px-16 lg:px-24">
      <div className="flex flex-wrap items-center justify-between w-full gap-4 md:gap-8 lg:gap-16">
        {/* Copy Icon */}
        <FaRegCopy
          onClick={isRecording ? copyToClipboard : null} // Only works if recording
          className={`text-[30px] sm:text-[30px] md:text-[35px] lg:text-[45px] ${
            isRecording ? (iconColor ? "text-white" : "text-[#6D4885] cursor-pointer") : "text-gray-400 cursor-not-allowed"
          }`}
        />

        {/* Recording Button */}
        <div className="flex flex-col items-center justify-center">
          <div
            className="p-4 border-4 border-white rounded-full cursor-pointer md:p-3"
            onClick={toggleState}
          >
            {isRecording ? (
              <FaStop className="text-[50px] sm:text-[60px] md:text-[70px]" />
            ) : (
              <CiMicrophoneOn className="text-[50px] sm:text-[60px] md:text-[70px]" />
            )}
          </div>
        </div>

        {/* Delete Icon */}
        <RiDeleteBin6Line
          onClick={isRecording ? stopRecording : null} // Only works if recording
          className={`text-[30px] sm:text-[30px] md:text-[35px] lg:text-[45px] ${
            isRecording ? (iconColor ? "text-white" : "text-[#6D4885] cursor-pointer") : "text-gray-400 cursor-not-allowed"
          }`}
        />
      </div>

      {/* Recording Status Text */}
      <h1
        className={`mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 ${
          isRecording ? "text-start" : "text-center"
        }`}
      >
        {isRecording ? "Click to stop recording" : "Tap to start recording"}
      </h1>
    </div>
  );
};

export default Footer;
