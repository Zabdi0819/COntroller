import React, {useState} from "react";
import {  Text, View, Switch, NativeBaseProvider, ScrollView} from 'native-base';
import { ImageBackground, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MdSensors} from "react-icons/md";
import {GiGasStove} from "react-icons/gi";

  const Home = (navigation) => {
    const imageBG = require("../assets/Bg_login.jpg");
    const [isEnabledM, setIsEnabledM] = useState(false);
    const [isEnabledCO, setIsEnabledCO] = useState(false);
    const toggleSwitch1 = () => setIsEnabledM(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabledCO(previousState => !previousState);

    return(
      <ImageBackground source={imageBG} resizeMode="cover" style={styles.image}>
        <NativeBaseProvider>
         <ScrollView w="100%">
          <Text color="white">
            This is home
          </Text>
          <MdSensors size={"2xl"}/>

          <View style={styles.container}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabledM ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch1}
              value={isEnabledM}
            />
          </View>

          <GiGasStove size={"2xl"}/>
     
          <View style={styles.container}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabledCO ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch2}
              value={isEnabledCO}
            />
          </View>
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
  });

  export default Home;