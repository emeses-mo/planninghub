import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();//data layer prepare

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );

  export const useStateValue = () => useContext(StateContext);// pull info