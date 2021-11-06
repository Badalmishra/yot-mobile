import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';
import Routes from '../constants/Routes';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import VerifyMailScreen from '../screens/VerifyMailScreen';
import { user } from '../types/index';


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const PreLoginStack = createStackNavigator<any>();

export default function PreLoginScreens() {
  const user = useSelector((state:{user:user}) => state.user)
  const {mail_verified,loggedIn} = user
  return (
    <PreLoginStack.Navigator screenOptions={{headerShown:false}}>
      {
        mail_verified !== false 
        ?
        <>
          <PreLoginStack.Screen
            name={Routes.LoginScreen}
            component={LoginScreen}
            options={{ headerTitle: 'Login' }}
          />
          <PreLoginStack.Screen
            name={Routes.SignUpScreen}
            component={SignupScreen}
            options={{ headerTitle: 'Sign up' }}
          />
        </>
        :
        <PreLoginStack.Screen
          name={Routes.VerifyMail}
          component={VerifyMailScreen}
          options={{ headerTitle: 'Verify Mail' }}
        />
      }
    </PreLoginStack.Navigator>
  );
}
