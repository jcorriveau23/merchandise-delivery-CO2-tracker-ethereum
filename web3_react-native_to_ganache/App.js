/**
 * Product scanner that add product Weight, Volume and Id to the blockchain
 * Each UPC got his place on the blockchain
 *
 * UPC => Id of 12 number that is the same for each identical products
 */
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_upc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_unique",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_trajectID",
				"type": "uint256"
			}
		],
		"name": "Associate_Traject",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_upc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_weight",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_volume",
				"type": "uint256"
			}
		],
		"name": "New_product",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_numUPC",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "nb",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_upc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_unique",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "get_product_traject",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_upc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_unique",
				"type": "uint256"
			}
		],
		"name": "get_product_traject_size",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_trajectID",
				"type": "uint256"
			}
		],
		"name": "get_traject_info",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_upc",
				"type": "string"
			}
		],
		"name": "get_upc_Volume",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Volume",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_upc",
				"type": "string"
			}
		],
		"name": "get_upc_weight",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Weight",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "new_traject_ID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "trajectID",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const contract_address = '0x7eE7Ac43da2a8135457d45F809eBa68f0da4Fb6E';

import React, {Component} from 'react';
import './shim';

import QRCodeScanner from 'react-native-qrcode-scanner';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  Alert,
} from 'react-native';

const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
import HDWalletProvider from 'truffle-hdwallet-provider';
const mnemonic ='wagon sick artefact august more home program science famous fun magnet crew'; // 12 word mnemonic
const Provider = new HDWalletProvider(mnemonic, 'http://192.168.0.16:7545');
const web3 = new Web3(Provider);
const contract = new web3.eth.Contract(abi, contract_address);
var trajectIDG = -1;
//var block = web3.eth.getBlock('latest');
//var account = web3.eth.getAccounts(console.log);
web3.eth.defaultAccount = '0x653fbbf28aDDBf0b0526026e238eF42C377d62DC';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      qr: 0,
      textinputTrajectID: "",
      textinputUPC: ""
    };
    this.textinputTrajectID = this.textinputTrajectID.bind(this);
    this.textinputUPC = this.textinputUPC.bind(this);
  }

  textinputTrajectID(text){
    this.setState({
      textinputTrajectID: text
    })
  }

  textinputUPC(text){
    this.setState({
      textinputUPC: text
    })
  }

  onRead = (e) => {
    const stringToJsonData = JSON.parse(e.data); // de string a json
    this.setState({qr: stringToJsonData});
  };
  new_product(UPC, Weight, Volume) {
    if(UPC == undefined){
      Alert.alert(
        'Error!',
        'must scan an UPC'
      );
    }
    else{
      const privateKey = Buffer(
        '2f5a91464049996a4948ed874409f4cfc56c775ee89760bf9db212927668acb7',
        'hex',
      );
      const data = contract.methods.New_product(UPC, Weight, Volume).encodeABI();
  
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
                Alert.alert(
                  'OUPS!',
                  'this product was already registered:\nUPC: ' + UPC,
                );
              } else {
                Alert.alert(
                  'Good Job!',
                  'New Product registered!\nUPC: ' +
                    UPC +
                    '\nWeight: ' +
                    Weight +
                    ' kg\nVolume: ' +
                    Volume +
                    ' m^3',
                );
              }
            },
          );
        },
      );
    }
    
  }
  associate_traject(UPC, UniquenessID, TrajectID) {
    if(TrajectID == undefined || UPC == undefined){
      Alert.alert('Error','must enter a Traject ID and scan an UPC');
    }
    else{
      const privateKey = Buffer(
        '2f5a91464049996a4948ed874409f4cfc56c775ee89760bf9db212927668acb7',
        'hex',
      );
      const data = contract.methods.Associate_Traject(UPC, UniquenessID, TrajectID).encodeABI();
  
      web3.eth.getTransactionCount('0xf9Bb59aF9eC60D64274a4d2a61D55CB004FBEa5e',function (err, count) {
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
  
          web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (error) {
              if (error != null){
                if (error.toString().includes("traject already assigned to product")) {
                  Alert.alert('Error: traject already assigned to this product','Traject ID: ' + TrajectID);
                } 
                else if(error.toString().includes("this traject does not exist")){
                  Alert.alert('Error: traject does not exist','Traject ID: ' + TrajectID);
                }
              }
              else {
                Alert.alert(
                  'Traject assigned to this product!',
                  'UPC: ' + UPC + '\nUnique ID: ' + UniquenessID + '\nTraject ID: ' + TrajectID,
                );
              }
            },
          );
        },
      );
    } 
  }

  init_traject(UPC) {
    const privateKey = Buffer(
      '2f5a91464049996a4948ed874409f4cfc56c775ee89760bf9db212927668acb7',
      'hex',
    );
    const data = contract.methods.new_traject_ID().encodeABI();

    web3.eth.getTransactionCount('0xf9Bb59aF9eC60D64274a4d2a61D55CB004FBEa5e',function (err, count) {
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

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (error) {
            if (error != null) {
              Alert.alert('error',error);
            } 
            else {
              Alert.alert(
                'Traject created',
                'traject ID: ' + trajectIDG
              );
            }
          },
        );
        trajectIDG = trajectIDG + 1;
      },
    );
    
  }
  async Get_product_Volume(UPC) {
    var weight = await contract.methods.get_upc_weight(UPC).call();
    var volume = await contract.methods.get_upc_Volume(UPC).call();
    console.log(weight);
    Alert.alert('Product Info', 'Product UPC: ' + UPC + '\nWeight registered: ' + weight + '\nVolume registered: ' + volume);
  }
  async Get_product_traject(UPC, unique) {
    try {
      var lenght = await contract.methods.get_product_traject_size(UPC, unique).call();
      console.log(lenght);
    }
    catch(e){
      Alert.alert('No traject registered yet', 'Product UPC: ' + UPC + '\nUnique ID: ' + unique);
    }

    var traject_list = [];
    for (i=0; i < lenght; i++){
      try {
        var result = await contract.methods.get_product_traject(UPC, unique, i).call();
        traject_list.push(result);
        
      }
      catch(e){
        Alert.alert('something went wrong', 'Product UPC: ' + UPC + '\nUnique ID: ' + unique);
      }
    }
    Alert.alert('Traject ID request', 'Product UPC: ' + UPC + '\nProduct uniqueID: ' + unique + '\nTrajects ID list: ' + traject_list);
  }

  async get_traject_info(trajectID){
    console.log('get_traject_info');
    try {
      var result = await contract.methods.get_traject_info(trajectID).call();
      console.log(result['0']);
      console.log(result['1']);
      console.log(result['2']);
      Alert.alert('Traject info', 'Traject ID: ' + trajectID + '\nTotal weight: ' + result['0'] + '\nTotal volume: ' + result['1'] + '\nDone: ' + result['2']);
    }
    catch(e){
      Alert.alert('Error: this traject ID does not exist', 'Traject ID: ' + trajectID);
    }
  }

  render() {
    return (
      <>
        <SafeAreaView>
          <Text>user: {web3.eth.defaultAccount}</Text>
        </SafeAreaView>
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
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: 'red'}}>
            UPC: {this.state.qr.UPC}
          </Text>
          <Text style={{fontWeight: 'bold', color: 'red'}}>
            Unique: {this.state.qr.Unique}
          </Text>
          <Text style={{fontWeight: 'bold', color: 'red'}}>
            Weight: {this.state.qr.Weight}
          </Text>
          <Text style={{fontWeight: 'bold', color: 'red'}}>
            Volume: {this.state.qr.Volume}
          </Text>
          <Button
            onPress={() =>
              this.new_product(
                this.state.qr.UPC,
                this.state.qr.Weight,
                this.state.qr.Volume,
              )
            }
            title="Register UPC"
          />
          <Button
            onPress={() => this.Get_product_Volume(this.state.qr.UPC)}
            title="get product info"
            color={'red'}
          />
          <Button
            onPress={() =>
              this.init_traject(this.state.qr.UPC, this.state.qr.Unique, parseInt(this.state.textinputTrajectID))
            }
            title="init_traject" 
            color={'brown'}
          />
          <TextInput 
            onChangeText={this.textinputTrajectID}
            keyboardType = {'numeric'}
            maxLenght = {12}
            placeholder={'enter traject ID'}
          />
          <Button
            onPress={() =>
              this.associate_traject(this.state.qr.UPC, this.state.qr.Unique, parseInt(this.state.textinputTrajectID))
            }
            title="Add product to traject ID" 
            color={'black'}
          />
          <Button
            onPress={() => this.Get_product_traject(this.state.qr.UPC, this.state.qr.Unique)}
            title="product trajects?"
            color={'blue'}
          />
          <Button
            onPress={() =>
              this.get_traject_info(parseInt(this.state.textinputTrajectID))
            }
            title="get traject info" 
            color={'brown'}
          />
        </SafeAreaView>
      </>
    );
  }
}
/* For an upc text input
          <TextInput 
          onChangeText={this.textinputUPC}
            keyboardType = {'numeric'}
            maxLenght = {12}
            placeholder={'enter UPC'}
          />
          */