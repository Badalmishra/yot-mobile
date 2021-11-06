import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { OpaqueColorValue, StyleSheet, Text, View,TouchableOpacity, Animated, Linking } from "react-native";


const ActionButton = ({
  color,
  icon,
  rotate = false,
  text="",
  delay=500
}: {
  color: string | OpaqueColorValue;
  icon: any;
  rotate: Boolean;
  delay:number | undefined;
  text:string
}) => {
    const ytrans = React.useRef(new Animated.Value(3000)).current;

  Animated.spring(ytrans, {
    toValue: 0,
    delay: delay,
    useNativeDriver: true,
  }).start();
  const __style__ = text !== ""?styles.ActionButtonText:styles.ActionButton
  const __inner__ = text !==""?styles.ActionButtonInner:styles.ActionButtonTextInner
  return (

    <TouchableOpacity onPress={()=>Linking.openURL("geo:37.484847,-122.148386")}>

    <Animated.View  style={[__style__, { backgroundColor: "black",transform:[{translateY:ytrans}] }]}>
      <View style={[__inner__]}>
        <FontAwesome
          name={icon}
          size={24}
          color={"black"}
          style={{ transform: [{ rotateZ: rotate ? "135 deg" : "0 deg" }] }}
        />
        {
          text!=="" && <Text style={styles.text}>{text}</Text>
        }
      </View>
    </Animated.View>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  text:{
    color:'black',
    marginLeft:10,
    fontWeight:"bold"
  },
  ActionButtonText: {
    marginRight:10,
    height: 50,
    minWidth: 50,
    padding:10,
    borderRadius: 50,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ActionButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
    elevation: 10,
    
    justifyContent: "center",
    alignItems: "center",
  },
  ActionButtonInner: {
    elevation: 10,
    height: 35,
    minWidth:35,
    backgroundColor: "white",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row",
    padding:10,
  },
  ActionButtonTextInner: {
    elevation: 10,
    height: 35,
    minWidth:35,
    backgroundColor: "white",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row",
   
  },
});
