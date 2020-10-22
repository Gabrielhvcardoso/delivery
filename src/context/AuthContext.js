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
  const [user, setStateUser] = useState({});

  const setUser = async (newUser) => {
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setStateUser(newUser);
  }

  useEffect(() => {
    const getuser = async () => {
      const userData = await AsyncStorage.getItem('user');

      if (userData) {
        setIsUserLogged(true);
        setStateUser(JSON.parse(userData));
      }
    }

    getuser();
  }, []);

  const setUserStatus = async (status, data) => {
    if (!status) {
      await AsyncStorage.removeItem("user");
      setIsUserLogged(false);
      setStateUser({});
    } else {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setIsUserLogged(true);
      setStateUser(data);
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
