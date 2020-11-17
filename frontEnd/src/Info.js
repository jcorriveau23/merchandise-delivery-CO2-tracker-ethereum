import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);

export default class Info extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            source={require("../asset/header.png")}
            style={styles.imageBackground}
            resizeMode="contain"
          >
            <Text style={styles.title}>Client APP</Text>
          </ImageBackground>
        </View>
        <View>
          <Button
            color={'green'}
            title={"Product Info"}
            onPress={() => this.props.navigation.navigate("ProductInfo")}
          />
        <Text style={styles.text}>Get info from scanning a specific products</Text>
        </View>
        <Separator />
        <View>
          <Button
            color={'green'}
            title={"Order Info"}
            onPress={() => this.props.navigation.navigate("ProductInfo")}
          />
          <Text style={styles.textTodo}> To do: Get info from a Order ID</Text>
        </View>
        <Separator />
        <View>
          <Button
            color={'green'}
            title={"Itinerary Info"}
            onPress={() => this.props.navigation.navigate("ProductInfo")}
          />
          <Text style={styles.textTodo}> To do: Get info from an Itinerary ID</Text>
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
  textTodo: {
    fontSize: 15,
    color: 'red',
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
    marginTop: 25,
    fontWeight: 'bold',
    fontSize: 20

  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});