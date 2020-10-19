import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);

export default class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            source={require("../asset/header.png")}
            style={styles.imageBackground}
            resizeMode="contain"
          >
            <Text style={styles.title}>Home</Text>
          </ImageBackground>
        </View>
        <View>
          <Button
            title={"Order Picker App"}
            onPress={() => this.props.navigation.navigate("OrderPicker")}
            color={'green'}
          />
          <Text style={styles.text}>Register Product, initiate an order, link unique products to order and when done, store the order content on IPFS</Text>
        </View>
        <Separator />
        <View>
          <Button
            title={"Loading attendant App"}
            onPress={() => this.props.navigation.navigate("LoadingAttendant")}
            color={'green'}
          />
          <Text style={styles.text}>Initiate an Itinerary, link trailer to Itinerary, link order to Itinerary and when done, store the Itinerary content on IPFS</Text>
        </View>
        <Separator />
        <View>
          <Button
            title={"Trucker App"}
            onPress={() => this.props.navigation.navigate("Trucker")}
            color={'green'}
          />
          <Text style={styles.text}>Grab an Itinerary ready to be deliver, link his truck to the Itinerary, indicate when the Itinerary started, indicate when the Itinerary is done and add CO2 emissions to Itinerary</Text>
        </View>
        <Separator />
        <View>
          <Button
            title={"Client App"}
            onPress={() => this.props.navigation.navigate("Info")}
            color={'green'}
          />
          <Text style={styles.text}>Get info on unique product, order, Itinerary and more importantly, on their corresponding CO2 emissions</Text>
        </View>
      </View>
    );
  }
}

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    marginTop: 0
  },
  text: {
    fontSize: 15,
    textAlign: "justify",
    margin: 10
  },
  imageBackground: {
    width: width * 0.4,
    height: width * 0.4,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 25
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

});