import React, { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Text, View, Switch, NativeBaseProvider, ScrollView, Box } from 'native-base';

const History = () => {
  const imageBG = require("../assets/Bg_login.jpg");
  return (
    <ImageBackground source={imageBG} resizeMode="cover" style={styles.image}>
      <NativeBaseProvider>
        <ScrollView w="100%">
          <Box style={styles.box}>
            <Text color="black" textAlign={"center"}>
              This will be motion sensor history
            </Text>
          </Box>

          <Box style={styles.box}>
            <Text color="black" textAlign={"center"}>
              This will be gas sensor history
            </Text>
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
    height: 100,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 5,
    borderColor: "red"
  }
});

export default History;