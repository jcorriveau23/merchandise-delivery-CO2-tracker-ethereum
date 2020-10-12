import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Dimensions, ImageBackground} from 'react-native';

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
        <Button
          title={"Product Info"}
          onPress={() => this.props.navigation.navigate("ProductInfo")}
        />
        <Button
          title={"Command Info"}
          onPress={() => this.props.navigation.navigate("LoadingAttendant")}
        />
        <Button
          title={"Traject Info"}
          onPress={() => this.props.navigation.navigate("Trucker")}
        />

      </View>
    );
  }
}

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    marginTop: 0
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  imageBackground: {
    width: width*0.4,
    height: width*0.4,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    marginTop: 25,
    fontWeight: 'bold',
    fontSize: 20
  }
});