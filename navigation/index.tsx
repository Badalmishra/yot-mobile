import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import PreLoginScreens from './PreLoginScreens';
import PostLoginScreens from './PostLoginScreens';
import LinkingConfiguration from './LinkingConfiguration';
import { useSelector } from 'react-redux';
import { user } from '../types/index';
import Routes from '../constants/Routes';
import DetailsComponent from '../screens/DetailsComponent';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const user = useSelector((state:{user:user}) => state.user)
  const {loggedIn,mail_verified}:{loggedIn?:Boolean,mail_verified?:Boolean} = user
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        loggedIn &&mail_verified 
        ?
        <Stack.Screen name="Root" component={PostLoginScreens} />
        :
        <Stack.Screen name="Root" component={PreLoginScreens} />
      }
      <Stack.Screen options={{ title: 'Details',headerShown:true }} name={Routes.Details} component={DetailsComponent}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
