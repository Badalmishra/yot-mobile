import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
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
import { service } from "../../Services/Services";

const Plate = ({_id}:{_id:string}) => {
  const [data,setData] = useState({})
  const [loading,setLoading] = useState(false)
  const getEnquiryById = (_id:string) => {
    console.log("getEnquiryById _id",_id)
    setLoading(true)
    service.getEnquiryById(_id).then(server_data=>{
      setData(server_data)
      setLoading(false)
    })
  }
  console.log("_id params",_id)
  useEffect(() => {
    getEnquiryById(_id)
  }, [_id])
  useEffect(()=>{
    console.log("server_data::::",data)
  },[data])
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView >
          {
            loading
            ?
            <View style={{flex:1,justifyContent:"center",alignItems:"center",flexGrow:1,height:100}}>
              <ActivityIndicator size={34} color={"blue"}/>
            </View>
            :
            <ActionSection setLoading={setLoading} getEnquiryById={getEnquiryById} data={data} />
          }
      
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
