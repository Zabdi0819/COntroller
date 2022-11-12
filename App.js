import React, {useState} from "react";
import { NativeBaseProvider, Center} from 'native-base'
import Login from './components/Login.js';
import Home from "./components/Home.js";
import Register from "./components/Register.js";
import History from './components/History.js';
import Alerts from './components/Alerts.js';
import Profile from './components/Profile.js';
import Nav from './components/Nav.js';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const StackNav = createNativeStackNavigator();

export default function App(){
  return(
    <NativeBaseProvider>
      <NavigationContainer>
        <StackNav.Navigator>
          <StackNav.Screen options={{headerShown: false}} name="Login" component={Login}/>
          <StackNav.Screen name="Sign up" options={{headerShown: false}} component={Register}/>
          <StackNav.Screen options={{headerShown: false}} name="Nav" component={Nav}/>
        </StackNav.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
};