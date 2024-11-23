import React, { createContext, useState } from 'react'

export const UserContext = createContext()
const Userprovider = ({ children }) => {
  const [iconColor, setIconColor] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const toggleState = () => {
    setIconColor(!iconColor);
    setIsRecording(!isRecording);
  };

  const value = {
    iconColor, setIconColor, isRecording, setIsRecording, toggleState,
  }
return (
  <><UserContext.Provider value={value}>{children}</UserContext.Provider></>
)
}

export default Userprovider