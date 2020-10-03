import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Alert, AsyncStorage, Linking} from 'react-native';
import {NavigationEvents} from "react-navigation";
import './shim';

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
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
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
		"inputs": [],
		"name": "get_current_command_id",
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
const contract_address = '0x9e05BfB5555e10a09F4a0AdBef331B926454a097';

const Web3 = require('web3');
const IPFS  = require('ipfs-mini');
const ipfs = new IPFS({host: "ipfs.infura.io", port: 5001, protocol: "https"});

const Tx = require('ethereumjs-tx').Transaction;
import HDWalletProvider from 'truffle-hdwallet-provider';
const mnemonic ='wagon sick artefact august more home program science famous fun magnet crew'; // 12 word mnemonic
const Provider = new HDWalletProvider(mnemonic, 'http://192.168.0.16:7545');
const web3 = new Web3(Provider);
const contract = new web3.eth.Contract(abi, contract_address);
const privateKey = '0x2f5a91464049996a4948ed874409f4cfc56c775ee89760bf9db212927668acb7'
const publicKey = '0xf9Bb59aF9eC60D64274a4d2a61D55CB004FBEa5e'

export default class OrderPicker extends Component {
  
  constructor(props){
    super(props);
    this.state = {
		function: "",
		QrCodeScan: "",
		orderInfo: "",
		IpfsURL: "",

		commandID: 0,
    	totalWeight: 0,
    	totalVolume: 0,
		done: false
	};
  }

  async going_back(){
	const qrCode = await this.props.navigation.getParam("data", "No data read");
	console.log("return: " + qrCode.UPC);
	
	const functions = await this.props.navigation.getParam("function", "No data read");
	console.log("return: " + functions);

	const added = await this.props.navigation.getParam("added", "No data read");
	console.log("return: " + added);

	this.setState({QrcodeScan: qrCode.UPC});
	this.setState({function: functions});

	if (functions == "Associate_command"){
		
		var currentOrder = [];
		var currentOrderString = "";



		if(added == true){	
			// async storage the new items	
			var order = await AsyncStorage.getItem('order');
			await this.get_command_info(this.state.commandID, false);

			if(order == null){
				// no order stored first product
				currentOrder.push(qrCode);
				currentOrderString = JSON.stringify(currentOrder);
			}
			else{
				console.log(order)
				currentOrder = JSON.parse(order);
				currentOrder.push(qrCode);
				currentOrderString = JSON.stringify(currentOrder);
			}

			await AsyncStorage.setItem('order', currentOrderString);

			console.log("Product added => async storage: " + currentOrderString)
			}
			
		}

		
	}

  
  async componentDidMount(){
	var commandID = await contract.methods.get_current_command_id().call();
	await this.get_command_info(commandID, false);
	//this.setState({orderInfo: orderInfo});
	this.setState({commandID: commandID});
	

  }

  async init_command() {

    const data = contract.methods.new_command().encodeABI();
	const nonce = await web3.eth.getTransactionCount(publicKey);
	const signedTx = await web3.eth.accounts.signTransaction(
		{
			nonce: nonce,
			gasLimit: '0x200710',
			gasPrice: '0x0A',
			to: contract_address,
			data: data,
		},
		privateKey
	);
	try{
		await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

		var newcommandID = await contract.methods.get_current_command_id().call();
		this.setState({commandID: newcommandID});
		this.setState({IpfsURL: ""})
		await this.get_command_info(newcommandID, false);

		Alert.alert('Order created', 'Order ID: ' + this.state.commandID);  
	}catch(error){
		if (error.toString().includes("already have an open command")) {
			Alert.alert('Error: user already have an open order', 'open orderID: ' + this.state.commandID);
		} 
	}
  }

  async close_command() {
		
	try{
		var order = await AsyncStorage.getItem('order'); 
		var hash = await ipfs.add(order);
		

		var IpfsURL = 'https://ipfs.infura.io/ipfs/'+hash;

		console.log(IpfsURL);
	}
	catch(error){
		console.log(error);
		if(error.toString().includes("null is not an object")){
			Alert.alert('Error: nothing in order', 'wont store order in IPFS\norderID: ' + this.state.commandID);
			var hash = 0; //
		}
		else{
			Alert.alert('Error: IPFS Storing did not work', 'orderID: ' + this.state.commandID);
			return -1;
		}
	}

	const data = contract.methods.command_completed(hash).encodeABI();  // send (32 + 2) bytes ipfs hash
	const nonce = await web3.eth.getTransactionCount(publicKey);
	const signedTx = await web3.eth.accounts.signTransaction(
		{
			nonce: nonce,
			gasLimit: '0x200710',
			gasPrice: '0x0A',
			to: contract_address,
			data: data,
		},
		privateKey
	);
	try{
		await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		await this.get_command_info(this.state.commandID, false);
		
		Alert.alert('Order closed', 'Order ID: ' + this.state.commandID + '\n' + 'IPFS hash: ' + IpfsURL);
		this.setState({IpfsURL: IpfsURL}) 
		await AsyncStorage.clear();

	}catch(error){
		if (error.toString().includes("user has no open order")) {
			Alert.alert('Error: user has no open order', 'close orderID: ' + this.state.commandID);
		  } 
	}
  } 

  async get_command_info(commandID, alert){
    console.log('get_command_info');
    try {
	  var orderInfo = await contract.methods.get_command_info(commandID).call();
	  this.setState({orderInfo: orderInfo});
	  if(alert == true){
		Alert.alert('Command info', 'Command ID: ' + commandID + '\nTotal weight: ' + orderInfo['0'] + '\nTotal volume: ' + orderInfo['1'] + '\nDone: ' + orderInfo['2']);
	  }
	  return orderInfo;
    }
    catch(e){
	  Alert.alert('Error: this command ID does not exist', 'Traject ID: ' + commandID);
	}
  }
  render() {
    return (
		
      <View style={styles.container}>
		<NavigationEvents onDidFocus={() => this.going_back()} />
        <Button
          title={"Register Product"}
          onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
              data: "Register",
              commandID: 0
          })}
        />
        <Button
          title={"Get product info"}
          onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
              data: "get info",
              commandID: 0
          })}
        />
        <Button
          title={"start order"}
          onPress={() => this.init_command()}
        />
        <Button
          title={"close order"}
          onPress={() => this.close_command()}
        />
        <Text>Current Order ID : {this.state.commandID}</Text>
		<Text>order total weight: {this.state.orderInfo['0']}</Text>
		<Text>order total volume: {this.state.orderInfo['1']}</Text>
		<Text>order done: {String(this.state.orderInfo['2'])}</Text>
		<Text style={{color: 'blue'}} 
			onPress={() => Linking.openURL(this.state.IpfsURL)}
			>IPFS hash: {String(this.state.orderInfo['3'])}
		</Text>
        <Button
          title={"add product to order"}
          onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
              data: "Associate_command",
              commandID: this.state.commandID
          })}
        />
        <Button
          title={"Get product command list"}
          onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
			data: "get_product_info"
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