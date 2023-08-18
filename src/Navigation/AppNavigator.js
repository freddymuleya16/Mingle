import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {  useDispatch, useSelector } from 'react-redux';
import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeNavigator from './HomeNavigator'; // Navigation stack for authenticated users
import ProfileScreen from '../screens/ProfileScreen'; 
import { View } from 'react-native';
import { Text } from 'react-native';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyEmailScreen from '../screens/VerifyEmailScreen';
import { FIREBASE_AUTH } from '../../firebase.config';
import { setUserData } from '../redux/actions/userActions';

const Stack = createStackNavigator();

const AppNavigator = () => {
   const dispatch = useDispatch()
  

   const user = useSelector((state) => state.user.userData);
  
  useEffect(() => {
    if (!FIREBASE_AUTH.currentUser && user) {
      console.log('ALIGNED')
      dispatch(setUserData(null))
    }
  }, [])

  const isEmailVerified = user && user.emailVerified; // Replace with your user data structure
  const isProfileCompleted = user && user.profileCompleted; // Replace with your user data structure
 console.log(user)
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            {isEmailVerified && isProfileCompleted ? (
              <Stack.Screen name="Home" component={HomeNavigator} />
            ) : isEmailVerified?(
              <Stack.Screen name="Profile" component={ProfileScreen} />
            ):
            <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
          }
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>  
    </NavigationContainer>
  );
};

export default AppNavigator;
