import React, {useState} from "react";
import { NativeBaseProvider, Center} from 'native-base'
import Login from './components/Login.js';
import Home from "./components/Home.js";
import Register from "./components/Register.js";
import History from './components/History.js';
import Alerts from './components/Alerts.js';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const StackNav = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Alerts" component={Alerts} />
    </Tab.Navigator>
  );
}

export default function App(){
  return(
    <NativeBaseProvider>
      <NavigationContainer>
        <StackNav.Navigator>
          <StackNav.Screen options={{headerShown: false}} name="Login" component={Login}/>
          <StackNav.Screen name="Sign up" options={{headerShown: false}} component={Register}/>
          <StackNav.Screen options={{headerShown: false}} name="Home" component={HomeTabs}/>
        </StackNav.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
};