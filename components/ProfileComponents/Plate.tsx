import React, { useState } from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "../../constants/Constants";
import AccentImage from "./AccentImage";
import ActionButton from "../ActionButton";
import ActionSection from "./ActionSection";
import { ScrollView } from "react-native-gesture-handler";

const Plate = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView >
        
          <AccentImage  />
          <ActionSection />
      
      </ScrollView>
     
      <StatusBar backgroundColor={Constants.colors.primary} />
    </SafeAreaView>
  );
};

export default Plate;

const styles = StyleSheet.create({
 
  ButtonContainer: {
   
    flexDirection: "row",
    padding: 40,
    alignItems: "center",
    justifyContent: "space-around",
    position:"absolute",
    bottom:0,
    right:0
  },
});
