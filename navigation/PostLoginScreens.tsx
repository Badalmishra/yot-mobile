import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {Notifications as CN} from "expo"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import * as Permissions from 'expo-permissions';
import Routes from '../constants/Routes';
import Dashboard from '../screens/Dashboard';

import SignupScreen from '../screens/SignupScreen';
import { Image, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../Redux/Actions/UserActions';
import ProfileComponent from '../screens/ProfileComponent';
import Enquiries from '../screens/EnquiriesScreen';
import { service } from '../Services/Services';
import DetailsComponent from '../screens/DetailsComponent';


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const PostLoginStack = createDrawerNavigator<any>();
function CustomDrawerContent(props:any) {
  
  return (
    <DrawerContentScrollView {...props}>
      <Image style={{resizeMode:'contain',width:"100%",height:300}} source={require('../assets/images/login-background.jpg')}/>
      <DrawerItemList {...props} />
      <LogoutButton/>
    </DrawerContentScrollView>
  );
}
function LogoutButton() {
  const dispatch = useDispatch();
  return (
    <DrawerItem label={"Logout"} onPress={()=>dispatch(logoutUser())}/>
  )
}
export default function PostLoginScreens() {
  const [permission, askForPermission] = Permissions.usePermissions(Permissions.USER_FACING_NOTIFICATIONS, { ask: true });
  async function registerForPushNotificationsAsync() {
    Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
    
    let token;
    
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
  
  
    if (Platform.OS === 'android') {
      CN.createChannelAndroidAsync("notification-sound-channel", {
        name: "Notification Sound Channel",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
     
    }
  console.log("firebase token",token)
  service.saveExpoToken({expo_token:token})
    return token;
  }
  React.useEffect(() => {
    registerForPushNotificationsAsync()
  }, [])
  return (
    <PostLoginStack.Navigator drawerContent={CustomDrawerContent} initialRouteName={Routes.Dashboard} screenOptions={{headerShown:true}}>
      <PostLoginStack.Screen
        name={Routes.Dashboard}
        component={Dashboard}
        options={{ headerTitle: 'Dashboard' }}
      /> 
      <PostLoginStack.Screen
        name={Routes.Enquiry}
        component={Enquiries}
        options={{ headerTitle: 'Enquiries' }}
      />  
       <PostLoginStack.Screen
        name={Routes.Profile}
        component={ProfileComponent}
        options={{ headerTitle: Routes.Profile }}
      />   
                
    </PostLoginStack.Navigator>
  );
}
