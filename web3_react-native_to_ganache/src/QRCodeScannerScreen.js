import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
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
				"internalType": "uint256",
				"name": "_commandID",
				"type": "uint256"
			}
		],
		"name": "Associate_Traject",
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
		"name": "get_current_trajectID",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_IpfsTrajectHash",
				"type": "string"
			}
		],
		"name": "loading_completed",
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
		"name": "new_traject",
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
const contract_address = '0x6Fc86F3aeBc3E01b61d29D17CE2F1211cd33BbD4';

const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
import HDWalletProvider from 'truffle-hdwallet-provider';
const mnemonic ='wagon sick artefact august more home program science famous fun magnet crew'; // 12 word mnemonic
const Provider = new HDWalletProvider(mnemonic, 'http://192.168.0.16:7545');
const web3 = new Web3(Provider);
const contract = new web3.eth.Contract(abi, contract_address);
const privateKey = '0x2f5a91464049996a4948ed874409f4cfc56c775ee89760bf9db212927668acb7'
const publicKey = '0xf9Bb59aF9eC60D64274a4d2a61D55CB004FBEa5e'

web3.eth.defaultAccount = '0x653fbbf28aDDBf0b0526026e238eF42C377d62DC';

export default class QRCodeScannerScreen extends Component {

constructor(props){
    super(props);
    this.state = {function: "",
				  commandID: 0,
				  trajectID: 0};
}

componentDidMount(){
    const qrCodeType = this.props.navigation.getParam("data", "No data read");
	const commandID = this.props.navigation.getParam("commandID", "No data read");
	const trajectID = this.props.navigation.getParam("trajectID", "No data read");
    this.setState({function: qrCodeType,
					commandID: commandID,
					trajectID: trajectID});
}
onRead = async e => {
    const QrCodeJson = JSON.parse(e.data);  
    // 1: Register product
    if(this.state.function == "Register"){
      console.log("SUCCESS: function: "+ this.state.function);
      await this.new_product(QrCodeJson.UPC, QrCodeJson.Weight, QrCodeJson.Volume);
    }
    // 2: Get product info
    else if(this.state.function == "get info"){
      console.log("SUCCESS: function: "+ this.state.function);
      await this.Get_product_Volume(QrCodeJson.UPC);
    }
    // 3: Associate Order
    else if(this.state.function == "Associate_command"){
      console.log("SUCCESS: function: "+ this.state.function);
      var added = await this.associate_command(QrCodeJson.UPC, QrCodeJson.Unique, this.state.commandID);
	}
	// 4: get product order list
	else if(this.state.function == "get_product_info"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.Get_product_command(QrCodeJson.UPC, QrCodeJson.Unique);
	}
	// 5: get product order list
	else if(this.state.function == "associate_traject"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.associate_traject(QrCodeJson.UPC, QrCodeJson.Unique);
	}
    else{
      console.log("ERROR: function: "+ this.state.function + ", no corresponding QR code function!");
	}

	if(this.state.function == "associate_traject"){
		await this.props.navigation.navigate("LoadingAttendant", {
			data: this.state.commandID,
			function: this.state.function,
			added: added
		})
	}
    else{
		await this.props.navigation.navigate("OrderPicker", {
		data: QrCodeJson,
		function: this.state.function,
		added: added
	})
	}
}
async new_product(UPC, Weight, Volume) {

	const data = contract.methods.New_product(UPC, Weight, Volume).encodeABI();
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
		Alert.alert('Good Job!','New Product registered!\nUPC: ' +UPC +'\nWeight: ' +Weight +' kg\nVolume: ' +Volume +' m^3');

	}catch(error){
		if (error.toString().includes("product already registered")) {
              Alert.alert('OUPS!','this product was already registered:\nUPC: ' + UPC);
		} 
	}
}
async associate_command(UPC, UniquenessID) {

	const data = contract.methods.Associate_Command(UPC, UniquenessID).encodeABI();
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
		Alert.alert('Command assigned to this product!','UPC: ' + UPC + '\nUnique ID: ' + UniquenessID + '\nCommand ID: ' + this.state.commandID,);
		return true;

	}catch(error){
		if(error.toString().includes("command must not be completed")){
			Alert.alert('Error: command must not be completed','Traject ID: ' + this.state.commandID);
		}
		else if(error.toString().includes("a command not completed is already assigned to this product")){
			Alert.alert('Error: Order already associated to that product','Command ID: ' + this.state.commandID);
		}
		else if(error.toString().includes("must be a product registered")){
			Alert.alert('Error: product not registered','UPC: ' + UPC);
		}
		return false;
	}
}
async associate_traject(UPC, UniquenessID){
	try {
		var lenght = await contract.methods.get_product_commands_size(UPC, UniquenessID).call();
		var commandID = await contract.methods.get_product_commandID(UPC, UniquenessID, lenght-1).call(); // get the last commandID associated to that traject
		this.setState({commandID: commandID});
	}catch(error){
		Alert.alert('this product was not assign to a command yet', 'Product UPC: ' + UPC + '\nUnique ID: ' + UniquenessID);	
	}

	const data = contract.methods.Associate_Traject(commandID).encodeABI();
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
		Alert.alert('traject assign to that command','command ID: ' + commandID + '\nTraject ID: ' + this.state.trajectID);
		return true;
		
	}catch(error){
		console.log(error);
		Alert.alert('something went wrong', 'command ID: ' + commandID + '\nTraject ID: ' + this.state.trajectID);
	}
	return false;
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> scan a product to {this.state.function}</Text>
        <QRCodeScanner
            reactivate={true}
            reactivateTimeout={1000}
            showMarker={true}
            onRead={this.onRead}
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