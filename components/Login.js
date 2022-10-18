import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Box, Button, ScrollView, Stack, Divider, Text, FormControl, Input, Image, Center, NativeBaseProvider,
  Heading, } from "native-base";
import axios from "axios";

const Login = ({ navigation }) => {
  const imageURI = require("../assets/favicon.png");
  const imageBG = require("../assets/Bg_login.jpg");
  const imageLogo = require("../assets/LogoCOntroller.png");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    action: 'login'
  });
  const [errors, setErrors] = useState({});
  var pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
  );
  const validate = () => {
    //EMAIL validation------------------------------------------------
    if (formData.email === undefined) {
      setErrors({ ...errors, email: "Email is required" });
      return false;
    } else if (formData.email.length < 6) {
      setErrors({ ...errors, email: "Email is too short" });
      return false;
    }
    if (formData.password === undefined) {
      setErrors({ ...errors, password: "Password is required" });
      return false;
    } else if (formData.password.length < 8) {
      setErrors({ ...errors, password: "Password is too short" });
      return false;
    } else if (!pattern.test(formData.password)) {
      //formData.pass.search('[A-Z]')
      console.log("password", formData.password);
      setErrors({ ...errors, password: "Is not valid" });
      return false;
    }
    //Cuando no hay error, se tiene que setear en blanco
    setErrors({});
    return true;
  };

  const onRegister = () => {
    navigation.navigate("Sign up");
  };
  const onSumit = async () => {
    validate()
      ? console.log("Submitted", formData)
      : console.log("Validation Failed", errors);
    console.log("errors", errors);
    console.log("formData", formData);
    console.log("Email", formData.email);
    console.log("Password", formData.password);
    setFormData({ ...formData, action: "login" });
    console.log("formData", formData);
    console.log("formData", formData.action);
    const formDataforRequest = new FormData();
    console.log("Type", typeof formDataforRequest);
    formDataforRequest.append("email", formData.email);
    formDataforRequest.append("password", formData.password);
    formDataforRequest.append("action", formData.action);

    //npm install axios
    const response = await axios.post(
      "http://localhost/Proyecto/index.php",
      formDataforRequest,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        transformRequest: (formData) => formDataforRequest,
      }
    ); //.then((response) =>{
    //console.log('response.data', response.data)
    console.log("typeof", typeof response.data);
    console.log("Object.keys", Object.keys(response.data).length);
    console.log("Object", response.data);

    if (Object.keys(response.data).length >= 1) {
      console.log("email", response.data[0].email);
      navigation.navigate("Home", { email: response.data[0].email });
      console.log("navigation", "ok");
    } else {
      console.log("retry");
    }
  };
  return (
    <ImageBackground source={imageBG} resizeMode="cover" style={styles.image}>
      <NativeBaseProvider>
        <ScrollView w="100%">
          <Stack
            alignSelf="center"
            px="4"
            safeArea
            mt="10"
            marginTop="10"
            marginBottom="5"
            w={{ base: "100%", md: "50%" }}
          >
            <Box>
              <Image
                source={imageLogo}
                alt="COntroller"
                alignSelf="center"
                size={"2xl"}
              />
              <Heading size={"3xl"} textAlign="center" color={"white"}>
                Welcome!
              </Heading>
              <FormControl isRequired isInvalid={"email" in errors}>
                <FormControl.Label> Email </FormControl.Label>
                <Input
                  p={2}
                  placeholder="Email"
                  color={"white"}
                  onChangeText={(value) =>
                    setFormData({ ...formData, email: value })
                  }
                />

                {"email" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.email}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    Name should contain at least 3 character.
                  </FormControl.HelperText>
                )}
              </FormControl>
              <Divider />
            </Box>
            <Box>
              <FormControl isRequired isInvalid={"password" in errors}>
                <FormControl.Label> Password </FormControl.Label>
                <Input
                  type="password"
                  p={2}
                  color={"white"}
                  placeholder="Password"
                  onChangeText={(value) =>
                    setFormData({ ...formData, password: value })
                  }
                />

                {"password" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.password}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    We'll keep this between us
                  </FormControl.HelperText>
                )}
              </FormControl>
              <Divider />
            </Box>
            <Box>
              <Button
                backgroundColor="#16dda8"
                marginTop="5"
                borderRadius={"md"}
                borderWidth={"2"}
                borderColor="#50e8cc"
                alignSelf="center"
                size={"lg"}
                width="80%"
                onPress={() => onSumit()}
              >
                <Text>Login </Text>
              </Button>
            </Box>
            <Box>
              <Button
                backgroundColor="#05a27b"
                marginTop="5"
                borderRadius={"md"}
                borderColor="#50e8cc"
                alignSelf="center"
                width="80%"
                onPress={onRegister}
              >
                <Text color={"white"}>Sign up</Text>
              </Button>
            </Box>
          </Stack>
        </ScrollView>
      </NativeBaseProvider>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Login;
