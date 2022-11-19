import React, { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import { ImageBackground, StyleSheet } from "react-native";
import {
  Box, Button, ScrollView, Stack, Divider, Text, FormControl, Input, Image, Center,
  NativeBaseProvider, Fab, Icon, Heading,
} from "native-base";
import axios from "axios";

const Profile = ({ navigation }) => {
  //Hook to get email
  const email = useUsers();
  const imageBG = require("../assets/Bg_login.jpg");
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  var pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
  );

  const getUser = async () => {
    const formDataforRequest = new FormData()
    formDataforRequest.append('email', email)
    const response = await axios.get("http://192.168.0.20/Proyecto/index.php?email=" + email)
    console.log(response.data)
    setFormData({
      name: response.data[0]["name"],
      lastname: response.data[0]["last_name"],
      phone: response.data[0]["phone"],
      email: response.data[0]["email"],
      password: response.data[0]["password"],

    })
    console.log(formData);
  };

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
  const onUpdate = async () => {
    getUser();
    if (validate()) {
      console.log(formData);
      const formDataforRequest = new FormData();
      console.log("Type", typeof formDataforRequest);
      formDataforRequest.append("name", formData.name);
      formDataforRequest.append("last_name", formData.lastname);
      formDataforRequest.append("phone", formData.phone);
      formDataforRequest.append("email", formData.email);
      formDataforRequest.append("password", formData.password);
      formDataforRequest.append("emailU", email);
      console.log(formDataforRequest);

      //npm install axios
      const response = await axios.post(
        "http://192.168.0.20/Proyecto/profile.php",
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

  const logOut = () => {
    navigation.navigate("Login");
  }

  const deleteAccount = async () => {
    const formDataforRequest = new FormData();
    formDataforRequest.append("emailU", email);
    formDataforRequest.append("action", "delete");
    console.log(formDataforRequest);

    //npm install axios
    const response = await axios.post(
      "http://192.168.0.20/Proyecto/profile.php",
      formDataforRequest,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        }
      }
    );
    navigation.navigate("Login");
  }

  useEffect(() => {
    getUser();
  }, [])

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
              <FormControl isRequired isInvalid={"name" in errors}>
                <FormControl.Label>
                  <Text color={"white"} fontWeight={"bold"} fontSize={16}>
                    Name
                  </Text>
                </FormControl.Label>
                <Input
                  color={"white"}
                  p={2}
                  borderColor={"#10CF92"}
                  fontSize={12}
                  placeholderTextColor={"#D6D6D6"}
                  placeholder="Name"
                  defaultValue={formData.name}
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
                    <Text color={"#D6D6D6"} fontSize={10}>
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
                  <Text color={"white"} fontWeight={"bold"} fontSize={16}>
                    Lastname
                  </Text>
                </FormControl.Label>
                <Input
                  color={"white"}
                  p={2}
                  borderColor={"#10CF92"}
                  borderWidth={"1.5"}
                  fontSize={12}
                  placeholderTextColor={"#D6D6D6"}
                  placeholder="Lastname"
                  defaultValue={formData.lastname}
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
                    <Text color={"#D6D6D6"} fontSize={10}>
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
                  <Text color={"white"} fontWeight={"bold"} fontSize={16}>
                    Phone
                  </Text>
                </FormControl.Label>
                <Input
                  color={"white"}
                  p={2}
                  borderColor={"#10CF92"}
                  borderWidth={"1.5"}
                  fontSize={12}
                  placeholderTextColor={"#D6D6D6"}
                  placeholder="Phone"
                  defaultValue={formData.phone}
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
                    <Text color={"#D6D6D6"} fontSize={10}>
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
                  <Text color={"white"} fontWeight={"bold"} fontSize={16}>
                    Email
                  </Text>
                </FormControl.Label>
                <Input
                  color={"white"}
                  p={2}
                  borderColor={"#10CF92"}
                  borderWidth={"1.5"}
                  fontSize={12}
                  placeholderTextColor={"#D6D6D6"}
                  placeholder="Email"
                  defaultValue={formData.email}
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
                    <Text color={"#D6D6D6"} fontSize={10}>
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
                  <Text color={"white"} fontWeight={"bold"} fontSize={16}>
                    Password
                  </Text>
                </FormControl.Label>
                <Input
                  color={"white"}
                  type="password"
                  p={2}
                  borderColor={"#10CF92"}
                  borderWidth={"1.5"}
                  fontSize={10}
                  placeholderTextColor={"#D6D6D6"}
                  placeholder="Password"
                  defaultValue={formData.password}
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
                    <Text color={"#D6D6D6"} fontSize={10}>
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
                borderColor="#50e8cc"
                alignSelf="center"
                width= "200"
                height= "50"
                onPress={onUpdate}
              >
                <Text style={styles.text}>Update data</Text>
              </Button>
            </Box>
            <Box>
              <Button
                style={{ shadowColor: "black", shadowRadius: 10 }}
                backgroundColor="#0AE09E"
                marginTop="5"
                borderRadius={"md"}
                borderColor="#50e8cc"
                alignSelf="center"
                width= "200"
                height= "50"
                onPress={logOut}
              >
                <Text style={styles.text}>Log out</Text>
              </Button>
            </Box>
            <Box>
              <Button
                style={{ shadowColor: "black", shadowRadius: 10 }}
                backgroundColor="#0AE09E"
                marginTop="5"
                borderRadius={"md"}
                borderWidth={"4"}
                borderColor={"#4F0C0C"}
                alignSelf="center"
                width= "200"
                height= "50"
                onPress={deleteAccount}
              >
                <Text style={styles.text}>Delete account</Text>
              </Button>
            </Box>
          </Stack>
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
  text: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  logo: {
    height: "120px",
    width: "120px",
  }
});

export default Profile;