import { FontAwesome } from "@expo/vector-icons";
import { Form, Formik, FormikHelpers } from "formik";
import * as React from "react";
import { ActivityIndicator, Animated, Button, Image, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as yup from 'yup';
import Plate from "../components/DashboardComponents/Plate";
import { ErrorText, FormTextInput, Group, Label } from "../components/FormHelpers";
import Colors from "../constants/Colors";

import Layout from "../constants/Layout";
import Routes from "../constants/Routes";
import {service} from "../Services/Services";

export default function Dashboard({navigation}:{navigation:any}) {
 
  const ytrans = React.useRef(new Animated.Value(3000)).current;

  Animated.spring(ytrans, {
    toValue: 0,
    delay: 500,
    useNativeDriver: true,
  }).start();
  return (
    <Plate/>
  );
}

const styles = StyleSheet.create({
  formContainer:{
    justifyContent:'flex-end',
    flex:1,
  },
  formBackground:{
    backgroundColor:'#ffffff',
    padding:Layout.padding, 
    paddingTop: Layout.padding*2,
    elevation:5, 
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    // backgroundColor:'rgba(255,255,255,0.5)'
  },
  submitButton:{
    padding:Layout.padding*1.5,
    backgroundColor:Colors.dark.background,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:Layout.radius,
    overflow:'hidden',
    marginTop:10
  },
  submitText:{
    color:'white',
    fontSize:18,
    marginHorizontal:10
  },
  backgroundImage:{
    width:'100%',
    top:-50,
    position:'absolute'
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width:Layout.window.width,
    backgroundColor:Colors.light.background
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
