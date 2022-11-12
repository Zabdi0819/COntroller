import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Text, View, NativeBaseProvider, ScrollView, Box, FlatList, Button, Stack, Fab, Icon } from 'native-base';
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

//MOTION SENSOR ITEMS -------------------------------------------------------------------
const ItemMS = (props) => (
  <NativeBaseProvider>
    <View style={styles.cardView}>
      <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'white' }}>
        {props.pir_id}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <b>State: </b>{" " + props.state}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <b>Date Time: </b>{" " + props.date_time}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <b>User: </b>{" " + props.name + " " + props.last_name}
      </Text>

    </View>
  </NativeBaseProvider>

);

//GAS SENSOR ITEMS --------------------------------------------------------------------------
const ItemGS = (props) => (
  <NativeBaseProvider>
    <View style={styles.cardView}>
      <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'white' }}>
        {props.mq_id}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <b>State: </b>{" " + props.state}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <b>Date Time: </b>{" " + props.date_time}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <b>User: </b>{" " + props.name + " " + props.last_name}
      </Text>

    </View>
  </NativeBaseProvider>

);


const GasLevels = ({ navigation }) => {
  const imageBG = require("../assets/Bg_login.jpg");
  const [msList, setMSList] = useState({})
  const [gasList, setGasList] = useState({})

  //Get data
  //MOTION SENSOR -----------------------------------------------------------------------------------
  const getMSHistory = async () => {
    const response = await axios.get('http://localhost/Proyecto/motionSensor.php')
    setMSList(response.data)
    console.log(response.data)
    console.log('typeof', typeof (response.data))
  };

  const renderItemMS = ({ item }) => (
    <ItemMS
      pir_id={item.pir_id}
      state={item.state}
      date_time={item.date_time}
      name={item.name}
      last_name={item.last_name}
    />
  )

  //GAS SENSOR -------------------------------------------------------------------------------------
  const getGSHistory = async () => {
    const response = await axios.get('http://localhost/Proyecto/gasSensor.php')
    setGasList(response.data)
    console.log(response.data)
    console.log('typeof', typeof (response.data))
  };

  const renderItemGS = ({ item }) => (
    <ItemGS
      mq_id={item.mq_id}
      state={item.state}
      date_time={item.date_time}
      name={item.name}
      last_name={item.last_name}
    />
  )

  const refresh = () => {
    getMSHistory();
    getGSHistory();
  };

  useEffect(() => {
    getMSHistory();
    getGSHistory();
  }, [])

  return (
    <ImageBackground source={imageBG} resizeMode="cover" style={styles.image}>
      <NativeBaseProvider>
        <ScrollView w="100%">
          <Stack>
          <Box>
            <Button
              style={{ shadowColor: "black", shadowRadius: 10 }}
              backgroundColor="#0AE09E"
              marginTop="5"
              borderRadius={"md"}
              borderColor="#50e8cc"
              alignSelf="center"
              width={"40"}
              height={"10"}
              onPress={refresh}
            >
              <Text style={styles.text}>Refresh</Text>
            </Button>
          </Box>

          <Box style={styles.box}>
            <Text style={styles.textBoxes}>
              Motion sensor:
            </Text>
            <FlatList
              style={styles.flatList}
              data={msList}
              renderItem={renderItemMS}
              keyExtractor={item => item.pir_id}
            />
          </Box>

          <Box style={styles.box}>
            <Text style={styles.textBoxes}>
              Gas sensor:
            </Text>
            <FlatList
              style={styles.flatList}
              data={gasList}
              renderItem={renderItemGS}
              keyExtractor={item => item.mq_id}
            />
          </Box>

          </Stack>
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
    backgroundColor: "#07A875",
    width: "90%",
    height: 310,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    shadowColor: "black",
    shadowRadius: 5
  },
  textBoxes: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 22,
    paddingHorizontal: 15,
    fontFamily: "Segoe UI Symbol"
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
    fontFamily: "Segoe UI Symbol",
    fontWeight: "bold",
  },
  textBtn: {
    fontSize: 22,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Segoe UI Symbol"
  }
});

export default GasLevels;