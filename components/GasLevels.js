import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Text, View, NativeBaseProvider, ScrollView, Box, FlatList, Button, Stack, Fab, Icon } from 'native-base';
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";


//GAS SENSOR ITEMS --------------------------------------------------------------------------
const ItemGS = (props) => (
  <NativeBaseProvider>
    <View style={styles.cardView}>
      <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'white' }}>
        {props.id}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <Text fontWeight={"bold"}>Value: </Text>{" " + props.value}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <Text fontWeight={"bold"}>State: </Text>{" " + props.state}
      </Text>
      <Text style={{ textTransform: 'uppercase', color: 'white' }} >
        <Text fontWeight={"bold"}>Date Time: </Text>{" " + props.date_time}
      </Text>


    </View>
  </NativeBaseProvider>

);


const GasLevels = ({ navigation }) => {
  const imageBG = require("../assets/Bg_login.jpg");
  const [gasList, setGasList] = useState({})

  //Get data
  //GAS SENSOR -------------------------------------------------------------------------------------
  const getGSHistory = async () => {
    const response = await axios.get('http://192.168.0.20/Proyecto/gasLevel.php')
    setGasList(response.data)
    console.log(response.data)
    console.log('typeof', typeof (response.data))
  };

  const renderItemGS = ({ item }) => (
    <ItemGS
      id={item.id}
      value={item.value}
      state={item.state}
      date_time={item.date_time}
    />
  )

  const refresh = () => {
    getGSHistory();
  };

  useEffect(() => {
    getGSHistory();
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
            width={"40"}
            height={"10"}
            onPress={refresh}
          >
            <Text style={styles.text}>Refresh</Text>
          </Button>
        </Stack>
        
          <FlatList
            style={styles.flatList}
            data={gasList}
            renderItem={renderItemGS}
            keyExtractor={item => item.id}
          />
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
    paddingHorizontal: 15
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

export default GasLevels;