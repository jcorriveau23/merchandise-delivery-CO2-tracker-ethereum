import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class OrderList extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Button
          title={"init new command"}
          onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
              data: "Register"
          })}
        /> 
        <Button
          title={"Get product info"}
          onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
              data: "get info"
          })}
        />
        <Button
          title={"Open order"}
          onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
              data: "Register"
          })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});