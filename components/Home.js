import React, { useState } from "react";
import useUsers from "../hooks/useUsers";
import { Text, View, Switch, NativeBaseProvider, ScrollView, Heading, Box } from 'native-base';
import { ImageBackground, StyleSheet } from "react-native";
import { MdSensors } from "react-icons/md";
import { GiGasStove } from "react-icons/gi";
import axios from "axios";

const Home = () => {
  const email = useUsers();
  const imageBG = require("../assets/Bg_login.jpg");
  const [isEnabledM, setIsEnabledM] = useState(false);
  const [isEnabledCO, setIsEnabledCO] = useState(false);
  const [textM, setTextM] = useState('OFF')
  const [textCO, setTextCO] = useState('OFF')


  //Insert values on Motion Sensor Table
  const toggleSwitch1 = async () => {
    const formDataforRequest = new FormData()
    console.log('Type', typeof (formDataforRequest))
    formDataforRequest.append('email', email)
    if(!isEnabledM){
      setTextM('ON');
      formDataforRequest.append('state', 'ON')
      const response = await axios.post('http://localhost/Proyecto/motionSensor.php',
        formDataforRequest,
        {
          headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' }
        }
      )
      console.log('Object', response.data)

    }else{
      setTextM('OFF');
      formDataforRequest.append('state', 'OFF')
      const response = await axios.post('http://localhost/Proyecto/motionSensor.php',
        formDataforRequest,
        {
          headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' }
        }
      )
      console.log('Object', response.data)
    }
    setIsEnabledM(previousState => !previousState);
  }

  //Insert values on Gas Sensor Table
  const toggleSwitch2 = async() => {
    const formDataforRequest = new FormData()
    console.log('Type', typeof (formDataforRequest))
    formDataforRequest.append('email', email)
    if(!isEnabledCO){
      setTextCO('ON');
      formDataforRequest.append('state', 'ON')
      const response = await axios.post('http://localhost/Proyecto/gasSensor.php',
        formDataforRequest,
        {
          headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' }
        }
      )
      console.log('Object', response.data)

    }else{
      setTextCO('OFF');
      formDataforRequest.append('state', 'OFF')
      const response = await axios.post('http://localhost/Proyecto/gasSensor.php',
        formDataforRequest,
        {
          headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' }
        }
      )
      console.log('Object', response.data)
    }
    setIsEnabledCO(previousState => !previousState);
  }

  return (
    <ImageBackground source={imageBG} resizeMode="cover" style={styles.image}>
      <NativeBaseProvider>
        <ScrollView w="100%">
          <Heading size={"3xl"} textAlign="center" color={"white"}>
            Hi, let's start!
          </Heading>

          <Box style={styles.box}>
          <Text style={styles.textStatus}> Motion sensor: {textM}</Text>
            <View style={styles.OnOff} alignSelf="center">
              <MdSensors color={"black"} fontSize={"80px"}/>
              <Switch
                alignSelf="auto"
                trackColor={{ false: "#5F4E48", true: "#00571E" }}
                thumbColor={isEnabledM ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch1}
                value={isEnabledM}
              />
            </View>
          </Box>

          <Box style={styles.box}>
            <Text style={styles.textStatus}>Gas sensor: {textCO}</Text>
            <View style={styles.OnOff} alignSelf="center">
              <GiGasStove color={"black"} fontSize={"80px"} />
              <Switch
                trackColor={{ false: "#5F4E48", true: "#00571E" }}
                thumbColor={isEnabledCO ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2}
                value={isEnabledCO}
              />
            </View>
          </Box>
        </ScrollView>
      </NativeBaseProvider>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#0AE09E", 
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    borderColor: "red"
  },
  textStatus: {
    color: "black",
    textAlign: "center",
    fontSize: "18pt"
  },
  OnOff: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    padding: 10,
    alignItems: "center",
    alignContent: "center"
  }
});

export default Home;