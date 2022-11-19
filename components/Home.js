import React, { useState } from "react";
import useUsers from "../hooks/useUsers";
import { Text, Switch, NativeBaseProvider, ScrollView, Heading, Box, Button } from 'native-base';
import { ImageBackground, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { MdSensors } from "react-icons/md";
import { GiGasStove } from "react-icons/gi";
import axios from "axios";
import {useNavigation} from "@react-navigation/native"

const Home = () => {
  const navigation = useNavigation();
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
    if (!isEnabledM) {
      setTextM('ON');
      formDataforRequest.append('state', 'ON')
      const response = await axios.post('http://192.168.0.20/Proyecto/motionSensor.php',
        formDataforRequest,
        {
          headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' }
        }
      )
      console.log('Object', response.data)

    } else {
      setTextM('OFF');
      formDataforRequest.append('state', 'OFF')
      const response = await axios.post('http://192.168.0.20/Proyecto/motionSensor.php',
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
  const toggleSwitch2 = async () => {
    const formDataforRequest = new FormData()
    console.log('Type', typeof (formDataforRequest))
    formDataforRequest.append('email', email)
    if (!isEnabledCO) {
      setTextCO('ON');
      formDataforRequest.append('state', 'ON')
      const response = await axios.post('http://192.168.0.20/Proyecto/gasSensor.php',
        formDataforRequest,
        {
          headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' }
        }
      )

    } else {
      setTextCO('OFF');
      formDataforRequest.append('state', 'OFF')
      const response = await axios.post('http://192.168.0.20/Proyecto/gasSensor.php',
        formDataforRequest,
        {
          headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' }
        }
      )
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
              <MaterialCommunityIcons name="motion-sensor" color={"black"} size={80} />
              <Switch
                size={"lg"}
                trackColor={{ false:"white", true: "#1F1E38" }}
                thumbColor={isEnabledM ? "white": "black"}
                onValueChange={toggleSwitch1}
                value={isEnabledM}
              />
            </View>
          </Box>

          <Box style={styles.box}>
            <Text style={styles.textStatus}>Gas sensor: {textCO}</Text>
            <View style={styles.OnOff} alignSelf="center">
              <MaterialCommunityIcons name="gas-cylinder" color={"black"} size={80} />
              <Switch
                size={"lg"}
                trackColor={{ false: "white", true: "#1F1E38" }}
                thumbColor={isEnabledCO ? "white": "black"}
                onValueChange={toggleSwitch2}
                value={isEnabledCO}
              />
            </View>
            <Button
              style={{ shadowColor: "black", shadowRadius: 10 }}
              backgroundColor="#061430"
              marginY={"5"}
              borderRadius={"md"}
              borderColor="#50e8cc"
              alignSelf="center"
              width={"40"}
              height={"10"}
              onPress={()=> navigation.navigate("GasLevels")}
            >
              <Text style={styles.text}>Gas levels</Text>
            </Button>
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
    backgroundColor: "#07A875",
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    shadowColor: "black",
    shadowRadius: 5
  },
  textStatus: {
    color: "black",
    textAlign: "center",
    fontSize: 18
  },
  text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
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