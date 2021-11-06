import { FontAwesome5 } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

export const Label = ({
  icon,
  text,
  errored = false,
}: {
  icon: string;
  text: string;
  errored: Boolean;
}) => {
  return (
    <View style={[styles.LabelView]}>
      <FontAwesome5
        name={icon}
        style={[styles.LabelText, errored && styles.erroredText]}
      />
      <Text style={[styles.LabelText, errored && styles.erroredText]}>
        {text}
      </Text>
    </View>
  );
};
export const FormTextInput = ({
  isPasswordField,
  placeholder,
  errored = false,
  onChangeText,
  value,
  keyboardType
}: {
  placeholder: string;
  errored: Boolean;
  onChangeText: Function;
  value: string;
  isPasswordField: Boolean;
  keyboardType?:String
}) => {
  return isPasswordField ? (
    <TextInput
      secureTextEntry={true}
      style={[styles.TextInput, errored && styles.erroredTextInput]}
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => onChangeText(text)}
    />
  ) : (
    <TextInput
      secureTextEntry={false}
      style={[styles.TextInput, errored && styles.erroredTextInput]}
      placeholder={placeholder}
      value={value}
      keyboardType={keyboardType || "default"}
      onChangeText={(text) => onChangeText(text)}
    />
  );
};
export const ErrorText = ({
  text,
  errored = false,
}: {
  text: string | undefined;
  errored: Boolean;
}) => {
  return (
    errored && (
      <View style={[styles.ErrorView]}>
        <Text style={[styles.erroredText]}>{text}</Text>
      </View>
    )
  );
};

export const Group = (props: any) => {
  const xtrans = useRef(new Animated.Value(-3000)).current;

  Animated.spring(xtrans, {
    toValue: 0,
    delay: 100 * props.tabIndex,
    useNativeDriver: true,
  }).start();
  return (
    <Animated.View
      style={[styles.Group, { transform: [{ translateX: xtrans }] }]}
    >
      {props.children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  LabelView: {
    padding: Layout.padding,
    //   paddingVertical:0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  ErrorView: {
    padding: Layout.padding,
  },
  LabelText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 5,
  },
  erroredText: {
    color: "red",
  },
  Group: {
    padding: Layout.padding / 2,
    paddingHorizontal: Layout.padding * 2,
    width: Layout.window.width,
    marginTop: 10,
  },
  TextInput: {
    borderWidth: 0.8,
    borderColor: "black",
    elevation: 5,
    borderRadius: Layout.radius,
    paddingVertical: Layout.padding,
    paddingHorizontal: Layout.padding * 2,
    marginTop: 5,
    color: "steelblue",
    fontSize: 20,
    backgroundColor: "white",
  },
  erroredTextInput: {
    borderColor: Colors.light.danger,
  },
});
