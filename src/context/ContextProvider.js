import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#FFD700	');
  const [activeMenu, setActiveMenu] = useState(true);
  const [authToken, setauthToken] = useState(null);
  const [userData, setuserData] = useState(null);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{setuserData,userData, authToken, setauthToken, currentColor, activeMenu, screenSize, setScreenSize, setActiveMenu, setCurrentColor }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);