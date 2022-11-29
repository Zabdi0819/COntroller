import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Text, View, NativeBaseProvider, ScrollView, Box, FlatList, Button, Stack, Fab, Icon } from 'native-base';
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const Config = ({ navigation }) => {
  const imageBG = require("../assets/Bg_login.jpg");
  const [config, setConfig] = useState({})

  //Get data
  //GAS SENSOR -------------------------------------------------------------------------------------
  const getConfig = async () => {
    const response = await axios.get('http://192.168.43.177/Proyecto/settings.php')
    setConfig({mode: response.data[0]["mode"]})
    console.log(response.data)
    console.log('typeof', typeof (response.data))
  };

  const configNormal = async () => {
    const formDataforRequest = new FormData();
    formDataforRequest.append("mode", "normal");
    const response = await axios.post(
        "http://192.168.43.177/Proyecto/settings.php",
        formDataforRequest,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          }
        }
      );
    getConfig();
  };

  const configDelicate = async () => {
    const formDataforRequest = new FormData();
    formDataforRequest.append("mode", "delicate");
    const response = await axios.post(
        "http://192.168.43.177/Proyecto/settings.php",
        formDataforRequest,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          }
        }
      );
    getConfig();
  };

  useEffect(() => {
    getConfig();
  }, [])

  return (
    <ImageBackground source={imageBG} resizeMode="cover" style={styles.image}>
      <NativeBaseProvider>
        <Stack
        alignSelf="center"
        px="4"
        safeArea
        mt="10"
        marginTop="10"
        marginBottom="5"
        w={{ base: "100%", md: "50%" }}>
        <Button
            style={{ shadowColor: "black", shadowRadius: 10 }}
            backgroundColor="#0AE09E"
            marginTop="15"
            marginBottom="10"
            borderRadius={"md"}
            borderColor="#50e8cc"
            alignSelf="center"
            width={"80"}
            height={"10"}
            onPress={configNormal}
          >
            <Text style={styles.text}>Normal Mode</Text>
          </Button>

          <Button
            style={{ shadowColor: "black", shadowRadius: 10 }}
            backgroundColor="#0AE09F"
            marginTop="15"
            marginBottom="10"
            borderRadius={"md"}
            borderColor="#50e8cc"
            alignSelf="center"
            width={"80"}
            height={"10"}
            onPress={configDelicate}
          >
            <Text style={styles.text}>Delicate Mode</Text>
          </Button>
        </Stack>
        
        <Box style={styles.box}>
            <Text style={styles.textBoxes}> Configuration Mode: {config.mode}</Text>
        </Box> 

        <ScrollView padding={3} marginBottom={4}>
            
            <Text style={styles.textInfo}> 
            {`Carbon monoxide, or CO, is a colorless, non-irritating gas with no odor or taste and is highly toxic. 
It is found both in indoor and outdoor air.\n
On average the level of CO that a person can be exposed to is less than 1000ppm, when this level is higher (1000ppm - 1200ppm) it can be harmful to health. 
can be harmful to health, causing intoxication levels that can become life threatening. `}
            </Text>
            <Text style={styles.textTitle}>Normal Mode: </Text>
            <Text style={styles.textInfo}> 
            {`This mode includes higher than average levels which is 76% exposure to this gas. 
This is in order to manage the concentrated levels in a house.\n
NORMAL: 0 - 41%
SLIGHTLY HIGH: 42 - 75%
DANGEROUS: GREATER THAN OR EQUAL TO 76%.`}
            </Text>
            <Text style={styles.textTitle}>Delicate Mode: </Text>
            <Text style={styles.textInfo}> 
            {`The effects of CO exposure can vary considerably from person to person depending on age, general health, and the concentration 
and duration of exposure. Therefore, this mode analyzes high levels at 68%, since the symptoms of intoxication may be of greater impact.\n
NORMAL: 0 - 38
SLIGHTLY HIGH: 39 - 68 %.
DANGEROUS: GREATER THAN OR EQUAL TO 69%.`}
            </Text>
        </ScrollView>

        <Fab
          backgroundColor={"#05a27b"}
          mt={"20px"}
          onPress={() => navigation.goBack()}
          renderInPortal={false}
          shadow={2}
          size="4"
          placement="top-left"
          icon={
            <Icon
              color="white"
              as={Ionicons}
              name="chevron-back"
              size="4"
              margin={"-2"}
            />
          }
        />
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
    backgroundColor: "white",
    width: "90%",
    height: 50,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    shadowColor: "black",
    shadowRadius: 5,
    marginBottom: 30
  },
  textBoxes: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 22,
    paddingHorizontal: 15, 
    paddingVertical: 10
  },
  textInfo: {
    color: "white",
    fontWeight: "bold",
    textAlign: "justify",
    fontSize: 22,
    paddingHorizontal: 15, 
    paddingVertical: 10,
    marginBottom: 9
  },
  textTitle: {
    color: "white",
    textDecorationLine: "underline",
    fontWeight: "bold",
    textAlign: "justify",
    fontSize: 26,
    paddingHorizontal: 15, 
    paddingVertical: 10
  },
  flatList: {
    marginTop: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#07A875"
  },
  cardView: {
    backgroundColor: "#061430",
    borderRadius: 20,
    marginVertical: 5,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  text: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  textBtn: {
    fontSize: 22,
    color: "black",
    textAlign: "center",
    fontWeight: "bold"
  }
});

export default Config;