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
import { ScrollView } from "react-native-gesture-handler";
import Constants from "../../constants/Constants";
import ActionButton from "../ActionButton";
import AnalyticsSegment from "./AnalyticsSegment";
import GraphCard from "./GraphCard";
import GraphCardBar from "./GraphCardBar";


const Plate = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.Plate}>
        <AnalyticsSegment/>
       <GraphCard color="green" title="Growth"/>
       <GraphCardBar color="green" title="Conversions"/>
       <GraphCard color="green" title="Leads"/>
      </ScrollView>
      <View style={styles.ButtonContainer}>
        {/* <ActionButton delay={500} text={"Drop message"} rotate={false} color="green" icon="comment" /> */}
        <ActionButton text={""} delay={700} rotate={false} color="steelblue" icon="comment" />
      </View>
      <StatusBar backgroundColor={Constants.colors.primary} />
    </SafeAreaView>
  );
};

export default Plate;

const styles = StyleSheet.create({
  Plate: {
    flexGrow: 1,
    height: "100%",
    backgroundColor:"white"
    // backgroundColor:"green"
    // justifyContent: "center",
  },
  ButtonContainer: {
   
    flexDirection: "row",
    padding: 40,
    alignItems: "center",
    justifyContent: "space-around",
    position:"absolute",
    bottom:80,
    right:0
  },
});
