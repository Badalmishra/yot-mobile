import { FontAwesome } from "@expo/vector-icons";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  AsyncStorage,
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
  ErrorText,
  FormTextInput,
  Group,
  Label,
} from "../components/FormHelpers";
import Colors from "../constants/Colors";

import Layout from "../constants/Layout";
import Routes from "../constants/Routes";
import { service } from "../Services/Services";

import { loginUser, logoutUser } from "../Redux/Actions/UserActions";
import { Toast } from "native-base";
import { user } from "../types/index";
import { SafeAreaView } from "react-native-safe-area-context";

interface Values {
  otp: string;
}

export default function VerifyMailScreen({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const [resending, setresending] = useState(false)
  useEffect(() => {
    try {
      const reHydrateUser = async () => {
        const user = await AsyncStorage.getItem("user");
        console.log("user in login screen", user);
        if (user) {
          dispatch(loginUser(JSON.parse(user)));
        }
      };
      reHydrateUser();
    } catch (error) {
      console.error("error in persisting login", error);
      AsyncStorage.clear();
    }
  }, []);
  const onSubmit = (
    formData: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    console.log("on submit", formData);
    service
      .verifyMailOtp(formData)
      .then((user: any) => {
        setSubmitting(false);
        console.log("response of sign up",user)
        if (user.Data && user.Data.error) {
          Toast.show({ text: user.Data.error, style: { backgroundColor: "red" } });
        } else {

          dispatch(loginUser(user.Data));
        }
      })
      .catch((error) => {
        console.log("error in verify otp", error);
        setSubmitting(false);
        Toast.show({ text: "Verification Failed", style: { backgroundColor: "red" } });
        // dispatch(loginUser(error))
      });
  };
  const resend = ()=>{
    console.log("resend called")
    setresending(true)
    service.resendMailOtp().finally(()=>{
      setresending(false)
      Toast.show({ text: "OTP SENT AGAIN" ,type:"success" , duration:5000});
    })

  }

  const logout = ()=>dispatch(logoutUser())
  const ytrans = React.useRef(new Animated.Value(3000)).current;

  Animated.spring(ytrans, {
    toValue: 0,
    delay: 500,
    useNativeDriver: true,
  }).start();
  return (
    <ScrollView style={{flex:1}} contentContainerStyle={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require("../assets/images/login-background.jpg")}
      />
      <Formik
        initialValues={{
          otp: "",
      
        }}
        validationSchema={yup.object().shape({
          otp: yup
            .number()
            .min(6,"OTP MUST BE 6 DIGITS")
            .required("OTP is required"),
     
        })}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isSubmitting,
          touched,
        }) => (
          <ScrollView style={{flex:1,flexGrow:1}}
          contentContainerStyle={{flex:1,flexGrow:1,justifyContent:"flex-end"}} 
           >
            <Animated.View
              style={[
                styles.formBackground,
                { transform: [{ translateY: ytrans }] },
              ]}
            >
             
              <Group tabIndex={15}>
                <Label
                  icon={"lock"}
                  text={"OTP"}
                  errored={touched.otp && errors.otp ? true : false}
                />
                <FormTextInput
                  value={values.otp}
                  errored={touched.otp && errors.otp ? true : false}
                  placeholder="Enter otp"
                  onChangeText={(text: string) =>
                    setFieldValue("otp", text)
                  }
                  keyboardType={"number-pad"}
                  isPasswordField={false}
                />

                <ErrorText
                  text={errors.otp}
                  errored={touched.otp && errors.otp ? true : false}
                />
              </Group>
              <Group tabIndex={25}>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={styles.submitButton}
                >
                  <FontAwesome name="lock" size={24} color="white" />
                  <Text style={styles.submitText}>Verify OTP</Text>
                  {isSubmitting && <ActivityIndicator color="white" />}
                </TouchableOpacity>
              </Group>
              <View style={{flexDirection:"row",justifyContent:"space-between",height:100,width:Dimensions.get("window").width-50,marginLeft:25}}>
                  <TouchableOpacity
                    onPress={() => logout()}
                    style={[styles.logoutButton,{padding:10}]}
                    containerStyle={{width:"60%"}}
                  >
                    <FontAwesome name={"sign-out"} size={24} color="white" />
                    <Text style={styles.submitText}>Log Out</Text>
                   
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      if (!resending) {    
                        resend()
                      }
                    }}
                    style={[styles.logoutButton,{backgroundColor:"black",padding:10}]}
                    containerStyle={{width:"35%"}}
                  >
                    {
                      resending
                      ?
                      <ActivityIndicator size={24} color={"white"}/>
                      :
                      <FontAwesome name={"repeat"} size={24} color="white" />
                    }
                    <Text style={styles.submitText}>Resend</Text>
                   
                  </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  formBackground: {
    backgroundColor: "#ffffff",
    padding: Layout.padding/5,
    paddingTop: Layout.padding * 2,
    elevation: 5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignSelf:"flex-end"
    // backgroundColor:'rgba(255,255,255,0.5)'
  },
  submitButton: {
    padding: Layout.padding * 1.5,
    backgroundColor: "teal",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Layout.radius,
    overflow: "hidden",
    marginTop: 10,
    elevation:10
  },
  logoutButton:{
    padding: Layout.padding * 1,
    backgroundColor: "steelblue",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Layout.radius,
    // overflow: "hidden",
    marginTop: 10,
    height:40,
    elevation:10
  },
  submitText: {
    color: "white",
    fontSize: 18,
    marginHorizontal: 10,
  },
  backgroundImage: {
    width: "100%",
    top: -50,
    position: "absolute",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Layout.window.width,
    backgroundColor: Colors.light.background,
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
