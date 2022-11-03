import React, { useState } from "react";
import { Text, View, Switch, NativeBaseProvider, ScrollView, Heading, Box } from 'native-base';
import { ImageBackground, StyleSheet } from "react-native";
import { MdSensors } from "react-icons/md";
import { GiGasStove } from "react-icons/gi";

const Home = (navigation) => {
  const imageBG = require("../assets/Bg_login.jpg");
  const [isEnabledM, setIsEnabledM] = useState(false);
  const [isEnabledCO, setIsEnabledCO] = useState(false);
  const toggleSwitch1 = () => setIsEnabledM(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabledCO(previousState => !previousState);

  return (
    <ImageBackground source={imageBG} resizeMode="cover" style={styles.image}>
      <NativeBaseProvider>
        <ScrollView w="100%">
          <Heading size={"3xl"} textAlign="center" color={"white"}>
            Hi, let's start!
          </Heading>

          <Box style={styles.box}>
          <Text style={styles.textStatus}> Motion sensor: </Text>
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
            <Text style={styles.textStatus}>Gas sensor: </Text>
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