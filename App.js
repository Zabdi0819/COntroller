import React, {useState} from "react";
import { NativeBaseProvider, Center} from 'native-base'
import Login from './components/Login.js';
import Home from "./components/Home.js";
import Register from "./components/Register.js";
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//const Tab = createBottomTabNavigator();

const StackNav = createNativeStackNavigator();

/**function Tab(){
  return (  
    <Tab.Navigator initialRouteName = "LoginForm">
      <Tab.Screen name = "Login" component = { LoginForm}/>
      <Tab.Screen name = "Cafe" componente = { Cafe}/>
    </Tab.Navigator>
  )
}**/

export default function App(){
  return(
    <NativeBaseProvider>
      <NavigationContainer>
        <StackNav.Navigator>
          
          <StackNav.Screen options={{headerShown: false}} name="Login" component={Login}/>
          <StackNav.Screen name="Home" component={Home}/>
          <StackNav.Screen name="Sign up" component={Register}/>
        </StackNav.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
};