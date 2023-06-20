import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  token:' ',
  ISLoggedIn:false,
  login: (token) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const userLoggedIn= !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
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
