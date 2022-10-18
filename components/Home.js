import React, {useState} from "react";
import {  Text} from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const TabBottom = createBottomTabNavigator();

  const Home = (navigation) =>{
    return(
      <Text>
        This is home
      </Text>
    )
  }

  export default Home;