import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext({
  isUserLogged: false,
  setUserStatus: () => {},
  user: {},
  setUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getuser = async () => {
      const userData = await AsyncStorage.getItem('user');

      if (userData) {
        setIsUserLogged(true);
        setUser(JSON.parse(userData));
      }
    }

    getuser();
  }, []);

  const setUserStatus = async (status, data) => {
    if (!status) {
      await AsyncStorage.removeItem("user");
      setIsUserLogged(false);
      setUser({});
    } else {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setIsUserLogged(true);
      setUser(data);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isUserLogged,
        setUserStatus,
        user,
        setUser,
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;
