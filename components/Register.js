import React, { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import {
  Box, Button, ScrollView, Stack, Divider, Text, FormControl, Input, Image, Center,
  NativeBaseProvider, Fab, Icon, Heading,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Register = ({ navigation }) => {
  const imageBG = require("../assets/Bg_login.jpg");
  const imageLogo = require("../assets/LogoCOntroller.png");
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    action: 'insert'
  });
  const [errors, setErrors] = useState({});
  var pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
  );

  const validate = () => {
    //NAME validation------------------------------------------------
    if (formData.name === "") {
      setErrors({ name: "Name is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      return false;
    }
    //LASTNAME validation------------------------------------------------
    if (formData.lastname === "") {
      setErrors({ ...errors, lastname: "Last name is required" });
      return false;
    } else if (formData.lastname.length < 3) {
      setErrors({ ...errors, lastname: "Last name is too short" });
      return false;
    }
    //PHONE validation------------------------------------------------
    if (formData.phone === "") {
      setErrors({ ...errors, phone: "Phone is required" });
      return false;
    } else if (formData.phone.length < 10) {
      setErrors({
        ...errors,
        phone: "Phone must contain at least 10 characters",
      });
      return false;
    }
    //EMAIL validation------------------------------------------------
    if (formData.email === "") {
      setErrors({ ...errors, email: "Email is required" });
      return false;
    } else if (formData.email.length < 6) {
      setErrors({ ...errors, phone: "Email is too short" });
      return false;
    }
    //PASSWORD validation------------------------------------------------
    if (formData.password === "") {
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
    //UseEffect
    setErrors({});
    return true;
  };
  const onSumit = async () => {
    if (validate()) {
      setFormData({ ...formData, action: "insert" });
      console.log(formData);
      const formDataforRequest = new FormData();
      console.log("Type", typeof formDataforRequest);
      formDataforRequest.append("nickname", formData.name);
      formDataforRequest.append("lastname", formData.lastname);
      formDataforRequest.append("phone", formData.phone);
      formDataforRequest.append("email", formData.email);
      formDataforRequest.append("password", formData.password);
      formDataforRequest.append("action", formData.action);
      console.log(formDataforRequest);

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
      console.log("response.data", response.data);
      console.log("typeof", typeof response.data);
      console.log("Object.keys", Object.keys(response.data).length);
      console.log("Object", response.data);

      if (Object.keys(response.data).length >= 1) {
        console.log("email", response.data[0].email);
        navigation.navigate("Login");
        console.log("navigation", "ok");
      } else {
        console.log("retry");
      }
    } else {
      console.log("Validation Failed", errors);
    }
    /**if(response.data == 'ok'){
          navigation.navigate('Login')
          console.log('navigation', 'ok')
        }else{
          console.log('Retry')
        }**/
  };
  return (
    /*--------------------NAME-------------------*/
    <ImageBackground source={imageBG} resizeMode="cover" style={styles.image}>
      <NativeBaseProvider>
        <ScrollView w="100%">
          <Stack
            space={3}
            alignSelf="center"
            px="4"
            safeArea
            mt="10"
            marginTop="10"
            marginBottom="5"
            w={{ base: "100%", md: "50%" }}
          >
            {/*--------------------NAME-------------------*/}
            <Box>
              <Image
                size={"2xl"}
                source={imageLogo}
                alt="COntroller"
                alignSelf="center"
              />
              <Heading size={"3xl"} textAlign="center" color={"white"} fontFamily={"Segoe UI Symbol"} paddingBottom={"1"}>
                Sign up
              </Heading>
              <Text fontSize="xl" italic color={"white"} fontFamily={"Segoe UI Symbol"}>
                Enter your data
              </Text>
              <FormControl isRequired isInvalid={"name" in errors}>
                <FormControl.Label>
                  <Text color={"white"} fontWeight={"bold"} fontSize={"16pt"} fontFamily={"Segoe UI Symbol"}>
                    Name
                  </Text>
                </FormControl.Label>
                <Input
                  color={"white"}
                  p={2}
                  borderColor={"#10CF92"}
                  fontSize={"12pt"}
                  placeholderTextColor={"#D6D6D6"}
                  placeholder="Name"
                  onChangeText={(value) =>
                    setFormData({ ...formData, name: value })
                  }
                />
                {"name" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.name}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    <Text color={"#D6D6D6"} fontSize={"10pt"} fontFamily={"Segoe UI Symbol"}>
                      Name should contain at least 3 character.
                    </Text>
                  </FormControl.HelperText>
                )}
              </FormControl>
              <Divider />
            </Box>
            {/*--------------------LASTNAME-------------------*/}
            <Box>
              <FormControl isRequired isInvalid={"lastname" in errors}>
                <FormControl.Label>
                  <Text color={"white"} fontWeight={"bold"} fontSize={"16pt"} fontFamily={"Segoe UI Symbol"}>
                    Lastname
                  </Text>
                </FormControl.Label>
                <Input
                  color={"white"}
                  p={2}
                  borderColor={"#10CF92"}
                  borderWidth={"1.5"}
                  fontSize={"12pt"}
                  placeholderTextColor={"#D6D6D6"}
                  placeholder="Lastname"
                  onChangeText={(value) =>
                    setFormData({ ...formData, lastname: value })
                  }
                />
                {"lastname" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.lastname}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    <Text color={"#D6D6D6"} fontSize={"10pt"} fontFamily={"Segoe UI Symbol"}>
                      Name should contain at least 3 character.
                    </Text>
                  </FormControl.HelperText>
                )}
              </FormControl>
              <Divider />
            </Box>
            {/*--------------------PHONE-------------------*/}
            <Box>
              <FormControl isRequired isInvalid={"phone" in errors}>
                <FormControl.Label>
                  <Text color={"white"} fontWeight={"bold"} fontSize={"16pt"} fontFamily={"Segoe UI Symbol"}>
                    Phone
                  </Text>
                </FormControl.Label>
                <Input
                  color={"white"}
                  p={2}
                  borderColor={"#10CF92"}
                  borderWidth={"1.5"}
                  fontSize={"12pt"}
                  placeholderTextColor={"#D6D6D6"}
                  placeholder="Phone"
                  onChangeText={(value) =>
                    setFormData({ ...formData, phone: value })
                  }
                />
                {"phone" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.phone}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    <Text color={"#D6D6D6"} fontSize={"10pt"} fontFamily={"Segoe UI Symbol"}>
                      Phone should contain at least 10 digits
                    </Text>
                  </FormControl.HelperText>
                )}
              </FormControl>
              <Divider />
            </Box>
            {/*--------------------EMAIL-------------------*/}
            <Box>
              <FormControl isRequired isInvalid={"email" in errors}>
                <FormControl.Label>
                  <Text color={"white"} fontWeight={"bold"} fontSize={"16pt"} fontFamily={"Segoe UI Symbol"}>
                    Email
                  </Text>
                </FormControl.Label>
                <Input
                  color={"white"}
                  p={2}
                  borderColor={"#10CF92"}
                  borderWidth={"1.5"}
                  fontSize={"12pt"}
                  placeholderTextColor={"#D6D6D6"}
                  placeholder="Email"
                  onChangeText={(value) =>
                    setFormData({ ...formData, email: value })
                  }
                />
                {"email" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.password}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    <Text color={"#D6D6D6"} fontSize={"10pt"} fontFamily={"Segoe UI Symbol"}>
                      The email must contain an @
                    </Text>
                  </FormControl.HelperText>
                )}
              </FormControl>
              <Divider />
            </Box>
            {/*--------------------PASSWORD-------------------*/}
            <Box>
              <FormControl isRequired isInvalid={"password" in errors}>
                <FormControl.Label>
                  <Text color={"white"} fontWeight={"bold"} fontSize={"16pt"} fontFamily={"Segoe UI Symbol"}>
                    Password
                  </Text>
                </FormControl.Label>
                <Input
                  color={"white"}
                  type="password"
                  p={2}
                  borderColor={"#10CF92"}
                  borderWidth={"1.5"}
                  fontSize={"12pt"}
                  placeholderTextColor={"#D6D6D6"}
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
                    <Text color={"#D6D6D6"} fontSize={"10pt"} fontFamily={"Segoe UI Symbol"}>
                      We'll keep this between us
                    </Text>
                  </FormControl.HelperText>
                )}
              </FormControl>
              <Divider />
            </Box>
            <Box>
              <Button
                style={{ shadowColor: "black", shadowRadius: 10 }}
                backgroundColor="#0AE09E"
                marginTop="5"
                borderRadius={"md"}
                borderWidth={"2"}
                borderColor="#50e8cc"
                alignSelf="center"
                width="60%"
                height="60%"
                onPress={onSumit}
              >
                <Text style={styles.textBtn}>Register </Text>
              </Button>
            </Box>
          </Stack>
          <Fab
            backgroundColor={"#05a27b"}
            mt={"20px"}
            onPress={() => navigation.goBack()}
            renderInPortal={false}
            shadow={2}
            size="4"
            placement="top-left"
            icon={
              <Icon
                color="white"
                as={Ionicons}
                name="chevron-back"
                size="4"
                margin={"-2"}
              />
            }
          />
        </ScrollView>
      </NativeBaseProvider>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  textBtn: {
    fontSize: 22,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Segoe UI Symbol"
  },
  logo: {
    height: "120px",
    width: "120px",
  }
});

export default Register;
