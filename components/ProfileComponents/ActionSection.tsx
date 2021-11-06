import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "../../constants/Constants";
import ActionButton from "../ActionButton";
import Documents from "./Documents";

const ActionSection = () => {
  return (
    <View style={styles.ActionSection}>
      <View style={styles.InfoSection}>
        <View style={styles.NameStyle}>
          <Text style={styles.PrimaryText}>Badal Mishra</Text>
        </View>
        <View style={styles.InfoBox}>
          <View style={styles.CallMessage}>
            <Text style={styles.MessageText}>About</Text>
          </View>
          <View style={styles.MessageBody}>
            <Text style={styles.MessageBodyText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              id, vitae rerum qui autem repellendus totam ipsam. Nulla unde
              quasi provident, pariatur eum minima dolorem ab vero. Mollitia,
              voluptas itaque!
            </Text>
          </View>
        </View>
        <View style={styles.InfoBox}>
          <View style={styles.CallMessage}>
            <Text style={styles.MessageText}>Ratings</Text>
          </View>
          <View style={styles.MessageBody}>
            <View style={styles.MessageBodyReview}>
            <FontAwesome
          name={'star'}
          size={24}
          color={'orange'}
          style={{marginRight:7}}
        />
        <FontAwesome
          name={'star'}
          size={24}
          color={'orange'}
          style={{marginRight:7}}
        />
        <FontAwesome
          name={'star'}
          size={24}
          color={'orange'}
          style={{marginRight:7}}
        />
        <FontAwesome
          name={'star'}
          size={24}
          color={'orange'}
          style={{marginRight:7}}
        />
        <FontAwesome
          name={'star'}
          size={24}
          color={'orange'}
          style={{marginRight:7}}
        />
            </View>
            <View style={styles.MessageBodyComment}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Text></View>
          </View>
        </View>
        <View style={styles.InfoBox}>
          <View style={styles.CallMessage}>
            <Text style={styles.MessageText}>Address</Text>
          </View>
          <View style={styles.MessageBody}>
            <Text style={styles.MessageBodyText}>
              ABC. 123 streat, city, country
            </Text>
            <View style={styles.distance}>
              <Text style={styles.miles}>
                <FontAwesome name="dot-circle-o"/> 2.4 miles aways
                </Text>
              <Text style={styles.time}>
                <FontAwesome name="cab"/> 
                5 mins by car</Text>
            </View>
          </View>
        </View>

        <Documents/>


      </View>
     
    </View>
  );
};

export default ActionSection;

const styles = StyleSheet.create({
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
