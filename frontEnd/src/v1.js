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
				"name": "_commandID",
				"type": "uint256"
			}
		],
		"name": "Associate_Command",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_commandID",
				"type": "uint256"
			}
		],
		"name": "command_completed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_commandID",
				"type": "uint256"
			}
		],
		"name": "get_command_info",
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
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
		"name": "get_product_commandID",
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
		"name": "get_product_commands_size",
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
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
		"name": "new_command",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "commandID",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
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
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "trajectID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "CO2Counter",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "traject_start",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
				"internalType": "uint256",
				"name": "trajectID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "CO2Counter",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "trajetc_stop",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const contract_address = '0x6219FE6d1f891DDeAF367729b813C1DE34e388D0';

const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
import HDWalletProvider from 'truffle-hdwallet-provider';
const mnemonic ='wagon sick artefact august more home program science famous fun magnet crew'; // 12 word mnemonic
const Provider = new HDWalletProvider(mnemonic, 'http://192.168.0.16:7545');
const web3 = new Web3(Provider);
const contract = new web3.eth.Contract(abi, contract_address);
var trajectIDG = -1;

web3.eth.defaultAccount = '0x653fbbf28aDDBf0b0526026e238eF42C377d62DC';



export default class v1 extends Component {
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
      associate_command(UPC, UniquenessID, CommandID) {
        if(CommandID == undefined || UPC == undefined){
          Alert.alert('Error','must enter a Traject ID and scan an UPC');
        }
        else{
          const privateKey = Buffer(
            '2f5a91464049996a4948ed874409f4cfc56c775ee89760bf9db212927668acb7',
            'hex',
          );
          const data = contract.methods.Associate_Command(UPC, UniquenessID, CommandID).encodeABI();
      
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
                    console.log(error.toString());
                    if (error.toString().includes("traject already assigned to product")) {
                      Alert.alert('Error: traject already assigned to this product','Traject ID: ' + CommandID);
                    } 
                    else if(error.toString().includes("this command does not exist")){
                      Alert.alert('Error: command does not exist','Traject ID: ' + CommandID);
                    }
                    else if(error.toString().includes("a command not completed is already assigned to this product")){
                      Alert.alert('Error: Open command currently associated to that product','Command ID: ' + CommandID);
                    }
                    else if(error.toString().includes("must be a product registered")){
                      Alert.alert('Error: product not registered','UPC: ' + UPC);
                    }
                  }
                  else {
                    Alert.alert(
                      'Command assigned to this product!',
                      'UPC: ' + UPC + '\nUnique ID: ' + UniquenessID + '\nCommand ID: ' + CommandID,
                    );
                  }
                },
              );
            },
          );
        } 
      }
    
      init_command(UPC) {
        const privateKey = Buffer(
          '2f5a91464049996a4948ed874409f4cfc56c775ee89760bf9db212927668acb7',
          'hex',
        );
        const data = contract.methods.new_command().encodeABI();
    
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
      async Get_product_command(UPC, unique) {
        try {
          var lenght = await contract.methods.get_product_commands_size(UPC, unique).call();
          console.log(lenght);
        }
        catch(e){
          Alert.alert('No command registered yet', 'Product UPC: ' + UPC + '\nUnique ID: ' + unique);
        }
    
        var command_list = [];
        var i = 0;
        for (i=0; i < lenght; i++){
          try {
            var result = await contract.methods.get_product_commandID(UPC, unique, i).call();
            command_list.push(result);
            
          }
          catch(e){
            Alert.alert('something went wrong', 'Product UPC: ' + UPC + '\nUnique ID: ' + unique);
          }
        }
        Alert.alert('command ID request', 'Product UPC: ' + UPC + '\nProduct uniqueID: ' + unique + '\nTrajects ID list: ' + command_list);
      }
    
      async get_command_info(commandID){
        console.log('get_command_info');
        try {
          var result = await contract.methods.get_command_info(commandID).call();
          console.log(result['0']);
          console.log(result['1']);
          console.log(result['2']);
          Alert.alert('Command info', 'Command ID: ' + commandID + '\nTotal weight: ' + result['0'] + '\nTotal volume: ' + result['1'] + '\nDone: ' + result['2']);
        }
        catch(e){
          Alert.alert('Error: this command ID does not exist', 'Traject ID: ' + commandID);
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
                  this.init_command(this.state.qr.UPC, this.state.qr.Unique, parseInt(this.state.textinputTrajectID))
                }
                title="init_command" 
                color={'brown'}
              />
              <TextInput 
                onChangeText={this.textinputTrajectID}
                keyboardType = {'numeric'}
                maxLenght = {12}
                placeholder={'enter command ID'}
              />
              <Button
                onPress={() =>
                  this.associate_command(this.state.qr.UPC, this.state.qr.Unique, parseInt(this.state.textinputTrajectID))
                }
                title="Add product to command ID" 
                color={'black'}
              />
              <Button
                onPress={() => this.Get_product_command(this.state.qr.UPC, this.state.qr.Unique)}
                title="product command?"
                color={'blue'}
              />
              <Button
                onPress={() =>
                  this.get_command_info(parseInt(this.state.textinputTrajectID))
                }
                title="get command info" 
                color={'brown'}
              />
            </SafeAreaView>
          </>
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