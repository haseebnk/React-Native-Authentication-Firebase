import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import auth from '@react-native-firebase/auth'


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = async(name, email, password) => {
   
    try {
      await auth().signInWithEmailAndPassword(name , email, password)
    }
    catch(e){
      console.log(e)
    }
    
  };

  const login = async(email, password) => {
   

    try {
      await auth().signInWithEmailAndPassword(email, password)
    }
    catch(e){
      console.log(e)
    }
  };

  const logout = async() => {
    setIsLoading(true);

    try {
      await auth().signOut()
    }
    catch(e){
      console.log(e)
    }
  };

  const isLoggedIn = async () => {
    try {
      // setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
