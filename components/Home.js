import React, {useState} from "react";
import {  Text, View, SwitchButton, Switch} from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageBackground } from "react-native-web";
import {MdSensors, GiMovementSensor} from "react-icons/md";



const TabBottom = createBottomTabNavigator();

  const Home = (navigation) => {
    return(
      <ImageBackground source={imageBG} resizeMode="cover" style={styles.image}>
        <NativeBaseProvider>
         <ScrollView w="100%">
      <Text>
        This is home
      </Text>
     
      <View style={styles.container}>
      <MdSensors/>
      <Switch
            trackColor={{ false: "#8492A6", true: "#50E8CC" }}
            thumbColor={isEnabled ? "#706e8d" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}/>
            
      </View>
      <View>
      <GiMovementSensor/>
      <Switch
      trackColor={{ false: "#8492A6", true: "#50E8CC" }}
            thumbColor={isEnabled ? "#706e8d" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}/>
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
    }
  });

  export default Home;