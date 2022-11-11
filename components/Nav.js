import React, { useState } from "react";
import Home from "./Home.js";
import History from "./History.js";
import Profile from "./Profile.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserContext from "../context/UserContext.js";

const Tab = createBottomTabNavigator();

function Nav({ route }) {
  const { email } = route.params;

  return (
    <UserContext.Provider value={email}>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#110542", shadowColor: "#0AE09E", shadowRadius: 5 },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold", fontSize: "20pt" },
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#FFF",
          tabBarActiveBackgroundColor: "#0AE09E",
          tabBarInactiveBackgroundColor: "#110542",
          tabBarItemStyle: { borderColor: "white" },
          tabBarLabelStyle: { fontSize: "12pt" },
          tabBarStyle: [
            {
              borderTopWidth: 1,
              borderTopColor: "white",
              shadowColor: "#0AE09E",
              shadowRadius: 5,
              display: "flex"
            },
            null]
        }}>
        <Tab.Screen name="Home" component={Home}
          options={{
            tabBarItemStyle: { borderRightWidth: 2, borderRightColor: "white" }
          }} />
        <Tab.Screen name="History" component={History}
          options={{
            tabBarItemStyle: { borderRightWidth: 2, borderRightColor: "white" }
          }} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </UserContext.Provider>
  );
}

export default Nav;