import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext({
  isUserLogged: false,
  setUserStatus: () => {},
  user: {}
});

export const AuthContextProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getuser = async () => {
      const userData = await AsyncStorage.getItem('user');

      if (userData) {
        setUser(JSON.parse(userData));
        setIsUserLogged(true);
      }
    }

    getuser();
  }, []);

  const setUserStatus = async (status, data) => {
    if (!status) {
      await AsyncStorage.removeItem("user");
      setUser({});
      setIsUserLogged(false);
    } else {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setIsUserLogged(true);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isUserLogged,
        setUserStatus,
        user
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;
