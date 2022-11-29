import React, { useState } from "react";
import { NativeBaseProvider, extendTheme } from 'native-base'
import Login from './components/Login.js';
import Register from "./components/Register.js";
import Nav from './components/Nav.js';
import Config from "./components/Config.js";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GasLevels from "./components/GasLevels.js";


const Tab = createBottomTabNavigator();

const StackNav = createNativeStackNavigator();

export default function App() {
  const theme = extendTheme({
    colors: {
      primary: {
        50: '#e4fbe0',
        100: '#c3ebcd',
        200: '#a0ddb0',
        300: '#7ccf90',
        400: '#58c172',
        500: '#3ea759',
        600: '#2e8244',
        700: '#205d30',
        800: '#0f391c',
        900: '#001503'
      }
    }
  })
  return (

    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <StackNav.Navigator>
          <StackNav.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <StackNav.Screen name="Sign up" options={{ headerShown: false }} component={Register} />
          <StackNav.Screen options={{ headerShown: false }} name="Nav" component={Nav} />
          <StackNav.Screen options={{ headerShown: false }} name="GasLevels" component={GasLevels} />
          <StackNav.Screen options={{ headerShown: false }} name="Config" component={Config} />
        </StackNav.Navigator>
      </NavigationContainer>
    </NativeBaseProvider >

  )
};