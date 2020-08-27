/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
const abi = [
  {
    constant: true,
    inputs: [
      {
        internalType: 'string',
        name: '_upc',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_unit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_weight',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_volume',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_trajectID',
        type: 'uint256',
      },
    ],
    name: 'New_product',
    outputs: [
      {
        internalType: 'uint256',
        name: 'Weight',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'get_numUPC',
    outputs: [
      {
        internalType: 'uint256',
        name: 'nb',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'string',
        name: '_upc',
        type: 'string',
      },
    ],
    name: 'get_upc_Volume',
    outputs: [
      {
        internalType: 'uint256',
        name: 'Volume',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'string',
        name: '_upc',
        type: 'string',
      },
    ],
    name: 'get_upc_weight',
    outputs: [
      {
        internalType: 'uint256',
        name: 'Weight',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_TruckID',
        type: 'uint256',
      },
    ],
    name: 'init_traject',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const contract_address = '0x7363F863Fa674FF093843e2B9a6dFCeECAf001eC';

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
  Alert,
} from 'react-native';

const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
import HDWalletProvider from 'truffle-hdwallet-provider';
const mnemonic =
  'session world scan patient panic cloth wine morning update venture weasel humble'; // 12 word mnemonic
const Provider = new HDWalletProvider(mnemonic, 'http://192.168.0.16:7545');
const web3 = new Web3(Provider);
const contract = new web3.eth.Contract(abi, contract_address);

//var block = web3.eth.getBlock('latest');
//var account = web3.eth.getAccounts(console.log);
web3.eth.defaultAccount = '0xf9Bb59aF9eC60D64274a4d2a61D55CB004FBEa5e';

export default class App extends Component {
  send_transaction() {
    const privateKey = Buffer(
      '2f5a91464049996a4948ed874409f4cfc56c775ee89760bf9db212927668acb7',
      'hex',
    );

    web3.eth.getTransactionCount(
      '0xf9Bb59aF9eC60D64274a4d2a61D55CB004FBEa5e',
      function (err, count) {
        var rawTx = {
          nonce: count,
          gasLimit: '0x200710',
          to: '0xcBa6623F40b24c65D13fb6e630A413E59E72ca01',
          value: '0x' + web3.utils.toWei('0.01'),
        };
        var tx = new Tx(rawTx);
        tx.sign(privateKey);

        var serializedTx = tx.serialize();

        web3.eth
          .sendSignedTransaction('0x' + serializedTx.toString('hex'))
          .then(console.log);
      },
    );
  }
  new_product(UPC, Weight, Volume) {
    const privateKey = Buffer(
      '2f5a91464049996a4948ed874409f4cfc56c775ee89760bf9db212927668acb7',
      'hex',
    );
    const data = contract.methods.New_product(UPC, 1, 1, 1, 1).encodeABI();

    web3.eth.getTransactionCount(
      '0xf9Bb59aF9eC60D64274a4d2a61D55CB004FBEa5e',
      function (err, count) {
        var rawTx = {
          nonce: web3.utils.toHex(count),
          gasLimit: '0x200710',
          gasPrice: '0x0A',
          to: contract_address,
          data: data,
        };
        var tx = new Tx(rawTx);
        tx.sign(privateKey);

        var serializedTx = tx.serialize();

        web3.eth.sendSignedTransaction(
          '0x' + serializedTx.toString('hex'),
          function (error) {
            if (error != null) {
              Alert.alert('OUPS!', 'this product was already registered:\nUPC: ' + UPC,
              );
            } else {
              Alert.alert('Good Job', 'New Product registered!\nUPC: ' + UPC);
            }
          },
        );
      },
    );
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
        <Button onPress={() => this.new_product('111111111114', 0, 0)} title="Add Product!" />
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
