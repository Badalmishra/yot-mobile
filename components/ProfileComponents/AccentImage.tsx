import React from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View,TouchableOpacity } from "react-native";

import Constants from "../../constants/Constants";
import AccentText from "./AccentText";
// ...
// You can pass an optional configuration object, if you don't this is what it will default to

const ImageView = () => {
    const scale = React.useRef(new Animated.Value(0)).current;

  Animated.spring(scale, {
    toValue: 1,
    delay: 0,
    useNativeDriver: true,
  }).start();
  return (
    <Animated.View style={[styles.ImageView,{transform:[{scale:scale}]}]}>
      <View style={[styles.imageWrapper]}>
        <Image
          source={require("../../assets/download.jpeg")}
          style={styles.image}
        />
      </View>
    </Animated.View>
  );
};
const AccentImage = () => {
  return (
    <TouchableOpacity  style={styles.AccentImage}>
      <ImageView />
      <View style={styles.expertise}>
        <AccentText text={"Astronomy"} />
        <AccentText text={"Sanskrit"} />
        <AccentText text={"Economics"} />
      </View>
    </TouchableOpacity>
  );
};
export default AccentImage;

const styles = StyleSheet.create({
  expertise:{
    flexDirection:'row',
    flexWrap:'wrap',
    flexGrow:1,
    width:"65%",
    padding:15
  },
  image: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    borderRadius: 500,
  },
  AccentImage: {
    width: "100%",
    padding:10,
    flexDirection:'row',
    height: Dimensions.get("screen").height / 4,

    backgroundColor: "white",
  },
  ImageView: {
    height: 150,
    width: 150,
    borderRadius: 500,
    overflow: "hidden",
    backgroundColor: Constants.colors.primary,
    padding: 15,
    shadowColor: "red",
    shadowOffset: { width: 300, height: 300 },
    shadowRadius: 500,
    elevation: 30,
    marginTop: "7%",
  },
  imageWrapper: {
    elevation: 20,
    height: "100%",
    width: "100%",
    borderRadius: 500,
  },
});
