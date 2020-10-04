import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Button
          title={"Order Picker App"}
          onPress={() => this.props.navigation.navigate("OrderPicker")}
        />
        <Button
          title={"Loading attendent App"}
          onPress={() => this.props.navigation.navigate("LoadingAttendant")}
        />
        <Button
          title={"Trucker App"}
          onPress={() => this.props.navigation.navigate("Trucker")}
        />
        <Button
          title={"v1 App"}
          onPress={() => this.props.navigation.navigate("v1")}
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