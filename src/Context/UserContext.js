import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children, userData, navigate }) => {
  
  const [currentUser, setCurrentUser] = useState(userData);
  const [loggedin, setLoggedIn] = useState(userData ? true : false);

  const logout = (cb) => {
    setLoggedIn(false);
    setCurrentUser(null);
    sessionStorage.removeItem('user');
    cb();
  }

  return (
    <UserContext.Provider value={{loggedin, setLoggedIn, logout}}>
      {children}
    </UserContext.Provider>
  );
};
