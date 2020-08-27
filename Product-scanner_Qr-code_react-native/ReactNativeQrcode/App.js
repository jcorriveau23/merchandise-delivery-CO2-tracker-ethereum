import React, {Component} from 'react';
import './global';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

// const Web3 = require('web3'); // pour se connecter sur la blockchain
// var web3 = new Web3('ws://localhost:8546');

export default class App extends Component {
  state = {
    qr: '',
  };
  onRead = (e) => {
    const stringToJsonData = JSON.parse(e.data); // de string a json
    this.setState({qr: stringToJsonData});
  };
  // componentWillMount() {
  //   const web3 = new Web3(
  //     new Web3.providers.HttpProvider('https://mainnet.infura.io/'),
  //   );
  //
  //   web3.eth.getBlock('latest').then(console.log);
  // }

  render() {
    return (
      <>
        <SafeAreaView>
          <ScrollView>
            <QRCodeScanner
              reactivate={true}
              reactivateTimeout={1000}
              showMarker={true}
              onRead={this.onRead}
            />
          </ScrollView>
        </SafeAreaView>
        <SafeAreaView>
          <Text>UPC: {this.state.qr.UPC}</Text>
          <Text>Unique: {this.state.qr.Unique}</Text>
          <Text>Weight: {this.state.qr.Weight}</Text>
          <Text>Volume: {this.state.qr.Volume}</Text>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {flex: 1, fontSize: 18, padding: 32, color: '#777'},
  textBold: {fontWeight: '500', color: '#000'},
  buttonText: {fontSize: 21, color: 'rgb(0,122,255)'},
  buttonTouchable: {padding: 16},
});
