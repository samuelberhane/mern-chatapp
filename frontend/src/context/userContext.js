import React, { useReducer, useContext, useEffect } from "react";
const UserContext = React.createContext();
const chatAppUser = JSON.parse(localStorage.getItem("chatAppUser"));

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: { userData: payload.userData, token: payload.token },
      };
    case "REGISTER":
      return { ...state, accountCreated: payload };
    case "CREATED":
      return { ...state, accountCreated: null };
    default:
      return state;
  }
};

const initialState = {
  user: chatAppUser || null,
  accountCreated: null,
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // change local storage when user changes
  useEffect(() => {
    localStorage.setItem("chatAppUser", JSON.stringify(state.user));
  }, [state.user]);

  console.log(state);
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useGlobalUserContext = () => {
  return useContext(UserContext);
};

export { UserContextProvider, useGlobalUserContext };
