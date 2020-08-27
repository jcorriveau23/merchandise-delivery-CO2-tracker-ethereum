/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import './shim';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
import HDWalletProvider from 'truffle-hdwallet-provider';
const mnemonic =
  'session world scan patient panic cloth wine morning update venture weasel humble'; // 12 word mnemonic
const Provider = new HDWalletProvider(mnemonic, 'http://192.168.0.16:7545');
const web3 = new Web3(Provider);

//var block = web3.eth.getBlock('latest');
//var account = web3.eth.getAccounts(console.log);
web3.eth.defaultAccount = '0xf9Bb59aF9eC60D64274a4d2a61D55CB004FBEa5e';

export default class App extends Component {
  send_transaction() {
    const privateKey = Buffer(
        '2f5a91464049996a4948ed874409f4cfc56c775ee89760bf9db212927668acb7',
        'hex',
    );

    web3.eth.getTransactionCount('0xf9Bb59aF9eC60D64274a4d2a61D55CB004FBEa5e', function(err, count){
      var rawTx = {
        nonce: count,
        gasLimit: '0x200710',
        to: '0xcBa6623F40b24c65D13fb6e630A413E59E72ca01',
        value: ('0x' + web3.utils.toWei('0.01')),
      };
      var tx = new Tx(rawTx);
      tx.sign(privateKey);

      var serializedTx = tx.serialize();

      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then(console.log);
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>default account: {web3.eth.defaultAccount}!</Text>
        <Text>1 ether is : {web3.utils.toWei('0.1')} wei</Text>
        <Button onPress={() => this.send_transaction()} title="Click me!" />
      </View>
    );
  }
}
//
// const App = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>block: {block['_U']}!</Text>
//       <Text>account: {account['_W']}!</Text>
//     </View>
//   );
// };
// export default App;
