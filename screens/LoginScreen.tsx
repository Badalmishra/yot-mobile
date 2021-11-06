import { FontAwesome } from "@expo/vector-icons";
import { Form, Formik, FormikHelpers } from "formik";
import React, {useEffect} from "react";
import {
  ActivityIndicator,
  Animated,
  AsyncStorage,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
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

import { loginUser } from "../Redux/Actions/UserActions"
import { Toast } from "native-base";
import { user } from "../types/index";

interface Values {
  username: string;
  password: string;
}

export default function LoginScreen({ navigation }: { navigation: any }) {

  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const reHydrateUser = async () => {

        const user = await  AsyncStorage.getItem("user");
        console.log("user in login screen",user)
        if (user) {
          dispatch(loginUser(JSON.parse(user)))
        }
      }
      reHydrateUser()
      
    } catch (error) {
      console.error("error in persisting login",error)
      AsyncStorage.clear()
    }
  }, [])
  const onSubmit = (
    formData: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    console.log("on submit", formData);
    service.login(formData).then((user:any)=>{
      setSubmitting(false);
      dispatch(loginUser(user.Data))
    }).catch((error)=>{
      console.log('error in login1',error)
      setSubmitting(false);
      Toast.show({text:"Login Failed",style:{backgroundColor:"red"}})
      // dispatch(loginUser(error))
    })
  };

  const ytrans = React.useRef(new Animated.Value(3000)).current;

  Animated.spring(ytrans, {
    toValue: 0,
    delay: 500,
    useNativeDriver: true,
  }).start();
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require("../assets/images/login-background.jpg")}
      />
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={yup.object().shape({
          username: yup.string().required("Username is required"),
          password: yup.string().required("Password is required"),
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
          <View style={styles.formContainer}>
            <Animated.View
              style={[
                styles.formBackground,
                { transform: [{ translateY: ytrans }] },
              ]}
            >
              <Group tabIndex={15}>
                <Label
                  icon={"envelope"}
                  text={"Email"}
                  errored={touched.username && errors.username ? true : false}
                />
                <FormTextInput
                  value={values.username}
                  errored={touched.username && errors.username ? true : false}
                  placeholder="Enter Username"
                  onChangeText={(text: string) =>
                    setFieldValue("username", text)
                  }
                  isPasswordField={false}
                />

                <ErrorText
                  text={errors.username}
                  errored={touched.username && errors.username ? true : false}
                />
              </Group>
              <Group tabIndex={20}>
                <Label
                  icon={"lock"}
                  text={"Password"}
                  errored={touched.password && errors.password ? true : false}
                />
                <FormTextInput
                  value={values.password}
                  errored={touched.password && errors.password ? true : false}
                  placeholder="******"
                  isPasswordField={true}
                  onChangeText={(text: string) =>
                    setFieldValue("password", text)
                  }
                />
                <ErrorText
                  text={errors.password}
                  errored={touched.password && errors.password ? true : false}
                />
              </Group>
              <Group tabIndex={25}>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={styles.submitButton}
                >
                  <FontAwesome name="lock" size={24} color="white" />
                  <Text style={styles.submitText}>Login</Text>
                  {isSubmitting && <ActivityIndicator color="white" />}
                </TouchableOpacity>
              </Group>
              <Group tabIndex={25}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignUpScreen")}
                  style={styles.signUpButton}
                >
                  <FontAwesome name="lock" size={24} color="white" />
                  <Text style={styles.submitText}>Sign Up Instead</Text>
                  {isSubmitting && <ActivityIndicator color="white" />}
                </TouchableOpacity>
              </Group>
            </Animated.View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  formBackground: {
    backgroundColor: "#ffffff",
    padding: Layout.padding,
    paddingTop: Layout.padding * 2,
    elevation: 5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    // backgroundColor:'rgba(255,255,255,0.5)'
  },
  submitButton: {
    padding: Layout.padding * 1.5,
    backgroundColor: Colors.dark.background,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Layout.radius,
    overflow: "hidden",
    marginTop: 10,
  },
  signUpButton: {
    padding: Layout.padding,
    backgroundColor: "pink",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Layout.radius,
    overflow: "hidden",
    marginTop: 0,
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
