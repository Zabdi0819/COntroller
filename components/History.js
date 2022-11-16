import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Text, View, NativeBaseProvider, ScrollView, Box, FlatList, Button, Stack } from 'native-base';
import axios from "axios";

//MOTION SENSOR ITEMS -------------------------------------------------------------------
const ItemMS = (props) => (
  <NativeBaseProvider>
    <View style={styles.cardView}>
      <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'white' }}>
        {props.pir_id}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <Text fontWeight={"bold"}>State: </Text>{" " + props.state}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <Text fontWeight={"bold"}>Date Time: </Text>{" " + props.date_time}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <Text fontWeight={"bold"}>User: </Text>{" " + props.name + " " + props.last_name}
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
        <Text fontWeight={"bold"}>State: </Text>{" " + props.state}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <Text fontWeight={"bold"}>Date Time: </Text>{" " + props.date_time}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <Text fontWeight={"bold"}>User: </Text>{" " + props.name + " " + props.last_name}
      </Text>

    </View>
  </NativeBaseProvider>

);


const History = () => {
  const imageBG = require("../assets/Bg_login.jpg");
  const [msList, setMSList] = useState({})
  const [gasList, setGasList] = useState({})

  //Get data
  //MOTION SENSOR -----------------------------------------------------------------------------------
  const getMSHistory = async () => {
    const response = await axios.get('http://192.168.100.241/Proyecto/motionSensor.php')
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
    const response = await axios.get('http://192.168.100.241/Proyecto/gasSensor.php')
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
    height: 260,
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
    paddingVertical: 10
  },
  flatList: {
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#07A875"
  },
  cardView: {
    backgroundColor: "#061430",
    borderRadius: 20,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 3,
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
    fontWeight: "bold"
  },
  textBtn: {
    fontSize: 22,
    color: "black",
    textAlign: "center",
    fontWeight: "bold"
  }
});

export default History;