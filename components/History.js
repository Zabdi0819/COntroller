import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Text, View, NativeBaseProvider, ScrollView, Box, FlatList } from 'native-base';
import axios from "axios";

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

const History = () => {
  const imageBG = require("../assets/Bg_login.jpg");
  const [msList, setMSList] = useState({})
  const [gasList, setGasList] = useState({})

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

  useEffect(() => {
    getMSHistory();
  }, [])

  return (
    <ImageBackground source={imageBG} resizeMode="cover" style={styles.image}>
      <NativeBaseProvider>
        <ScrollView w="100%">
          <Box style={styles.box}>
            <Text style={styles.textBoxes}>
              Motion sensor:
            </Text>
            <FlatList
              style={{
                marginTop: 15,
                marginHorizontal: 20,
                marginBottom: 20,
                backgroundColor: "#061430",
                color: "black"
              }}
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
              style={{
                marginTop: 15,
                marginHorizontal: 20,
                marginBottom: 20,
                backgroundColor: "white",
                color: "black"
              }}
              data={msList}
              renderItem={renderItemMS}
              keyExtractor={item => item.pir_id}
            />
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
    width: "90%",
    height: 300,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 8,
    borderColor: "white",
    shadowColor: "#0AE09E",
    shadowRadius: 5
  },
  textBoxes: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: "14pt",
    padding: 4
  }
});

export default History;