import { FontAwesome } from "@expo/vector-icons";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Animated,
  AsyncStorage,
  Button,
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

import { loginUser } from "../Redux/Actions/UserActions";
import { Toast } from "native-base";
import { user } from "../types/index";
import { SafeAreaView } from "react-native-safe-area-context";

interface Values {
  username: string;
  password: string;
}

export default function SignupScreen({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
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
      .signup(formData)
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
        console.log("error in login1", error);
        setSubmitting(false);
        Toast.show({ text: "Sign up Failed", style: { backgroundColor: "red" } });
        // dispatch(loginUser(error))
      });
  };

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
          username: "",
          name: "",
          confirm_password: "",
          password: "",
        }}
        validationSchema={yup.object().shape({
          username: yup
            .string()
            .email("email is invalid")
            .required("email is required"),
          password: yup.string().required("Password is required"),
          confirm_password: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match"),
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
          <ScrollView style={{flex:1,flexGrow:1,marginTop:180}} >
            <Animated.View
              style={[
                styles.formBackground,
                { transform: [{ translateY: ytrans }] },
              ]}
            >
              <KeyboardAvoidingView behavior={"padding"}>
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
              <Group tabIndex={15}>
                <Label
                  icon={"user"}
                  text={"Name"}
                  errored={touched.name && errors.name ? true : false}
                />
                <FormTextInput
                  value={values.name}
                  errored={touched.name && errors.name ? true : false}
                  placeholder="Enter name"
                  onChangeText={(text: string) =>
                    setFieldValue("name", text)
                  }
                  isPasswordField={false}
                />

                <ErrorText
                  text={errors.name}
                  errored={touched.name && errors.name ? true : false}
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
              <Group tabIndex={20}>
                <Label
                  icon={"lock"}
                  text={"Confirm Password"}
                  errored={touched.confirm_password && errors.confirm_password ? true : false}
                />
                <FormTextInput
                  value={values.confirm_password}
                  errored={touched.confirm_password && errors.confirm_password ? true : false}
                  placeholder="******"
                  isPasswordField={true}
                  onChangeText={(text: string) =>
                    setFieldValue("confirm_password", text)
                  }
                />
                <ErrorText
                  text={errors.confirm_password}
                  errored={touched.confirm_password && errors.confirm_password ? true : false}
                />
              </Group>
              <Group tabIndex={25}>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={styles.submitButton}
                >
                  <FontAwesome name="lock" size={24} color="white" />
                  <Text style={styles.submitText}>Sign Up</Text>
                  {isSubmitting && <ActivityIndicator color="white" />}
                </TouchableOpacity>
              </Group>
              </KeyboardAvoidingView>
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
    // backgroundColor:'rgba(255,255,255,0.5)'
  },
  submitButton: {
    padding: Layout.padding * 1.5,
    backgroundColor: "pink",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Layout.radius,
    overflow: "hidden",
    marginTop: 10,
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
