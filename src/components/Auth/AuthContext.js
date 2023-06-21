import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  token:' ',
  isLoggedIn:false,
  login: (token) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
    const initialToken=localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const userLoggedIn= !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token',token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn:userLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
