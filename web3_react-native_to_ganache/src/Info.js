import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class Info extends Component {

  render() {
    return (
      <View style={styles.container}>
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