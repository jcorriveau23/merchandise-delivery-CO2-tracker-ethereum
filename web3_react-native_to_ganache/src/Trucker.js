import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class Trucker extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Button
          title={"init traject"}
          //onPress=
        /> 
        <Button
          title={"end traject"}
          onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
              data: "get info"
          })}
        />
        <Button
          title={"discharge"}
          //onPress=
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