"use client";
import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GContext = ({ children }) => {
  const [globalState, setGlobalState] = useState({ avatar_url: "" });
  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GContext;
