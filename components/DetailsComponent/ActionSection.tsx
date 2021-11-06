import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import Constants from "../../constants/Constants";
import { service } from "../../Services/Services";
import { user } from "../../types/index";


const ActionSection = ({data,getEnquiryById}:{data:any,getEnquiryById:Function}) => {
  const [loading, setLoading] = useState(false)
  const user = useSelector((state:{user:user}) => state.user)

  const applyToEnquiry = () => {
    console.log("data in Asction section",data._id)
    setLoading(true)
    // setTimeout(()=>{
    //   setLoading(false)
    //   console.log("data on application")
    //   getEnquiryById(data._id)
    // },500)
    service.applyToEnquiry({_id:data._id}).then(server_data=>{
      setLoading(false)
      console.log("data on application",server_data)
      getEnquiryById(data._id)
    })
  }
  return (
    <View style={styles.ActionSection}>
      <View style={styles.InfoSection}>
        <View style={styles.NameStyle}>
          <Text style={styles.PrimaryText}>{data.subject}</Text>
        </View>
        <View style={styles.InfoBox}>
          <View style={styles.CallMessage}>
            <Text style={styles.MessageText}>Expected Experience</Text>
          </View>
          <View style={styles.MessageBody}>
            <Text style={styles.MessageBodyText}>
            {data.expected_experience}
            </Text>
          </View>
        </View>
        <View style={styles.InfoBox}>
          <View style={styles.CallMessage}>
            <Text style={styles.MessageText}>Details</Text>
          </View>
          <View style={styles.MessageBody}>
            <View style={styles.MessageBodyComment}>
            <Text>
             Looking for a {data.preffered_gender} teacher for a class {data._class} student with an experience of {data.expected_experience} years
              </Text></View>
          </View>
        </View>
        {
          (data.applications && ((data.allowed_applications*1) === data.applications.length))
          &&
          <TouchableOpacity style={styles.button} onPress={()=>{alert("Applications closed")}}>
            <Text style={{color:"white",fontSize:24}}>Can't Apply</Text>
          </TouchableOpacity>
        }
        {
          (data.isApplied)
          &&
          <TouchableOpacity style={styles.button} onPress={()=>{alert("Already Applied")}}>
           <Text style={{color:"white",fontSize:24}}> Already Applied</Text>
          </TouchableOpacity>
        }
        {
          ((!data.applications)||(!data.isApplied && (data.applications && (data.allowed_applications*1) !== data.applications.length)))
          &&
          <TouchableOpacity style={styles.button} onPress={()=>{applyToEnquiry()}}>
           <Text style={{color:"white",fontSize:24}}>Apply <FontAwesome size={24} color={"white"} name="thumbs-up" /> </Text> 
           {
             loading && <ActivityIndicator size={34} color={"white"} />
           }
          </TouchableOpacity>
        }
     
      </View>
     
    </View>
  );
};

export default ActionSection;

const styles = StyleSheet.create({
  button:{
    height:40,
    width:"94%",
    margin:"3%",
    elevation:10,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"steelblue",
    flexDirection:"row",
    borderRadius:10,
  },
  distance:{
    flexDirection:'row',
    marginTop:5
  },
  miles:{
    color:"#333"
  },
  time:{
    color:"#555",
    marginLeft:15
  },
  ActionSection: {
    // flexGrow: 1,
    backgroundColor:'white'
  },
  MessageBodyReview:{
    flexDirection:'row'
  },
  MessageBodyComment:{
    flexDirection:'row',
    paddingVertical:10,
  },
  InfoSection: {
    // flexGrow: 1,
    // alignItems: "center",
  },

  PrimaryText: {
    color: Constants.colors.primary,
    fontSize: 32,
    fontWeight:'bold'
  },
  NameStyle: {
    // borderRadius: 30,
    // paddingHorizontal: 30,
    // paddingVertical: 5,
    padding:15,

    borderColor: Constants.colors.primary,
    // borderWidth: 1,
    //   elevation:5,
    // marginTop: -18,
    // backgroundColor: "white",
  },
  MessageText: {
    color: "black",
    fontSize: 16,
  },
  CallMessage: {
    //   borderRadius:30,
    padding:10,

   
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
  InfoBox: {
   
  },
  MessageBody: {
    overflow: "hidden",
    padding: 10,
  },
  MessageBodyText: {
    color: "black",
    flexWrap: "wrap",
  },
});
