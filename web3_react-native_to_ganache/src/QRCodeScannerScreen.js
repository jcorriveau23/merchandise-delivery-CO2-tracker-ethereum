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
                  commandID: 0};
}

componentDidMount(){
    const qrCodeType = this.props.navigation.getParam("data", "No data read");
    const commandID = this.props.navigation.getParam("commandID", "No data read");
    this.setState({function: qrCodeType,
                    commandID: commandID});
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
    else{
      console.log("ERROR: function: "+ this.state.function + ", no corresponding QR code function!");
    }

    await this.props.navigation.navigate("OrderPicker", {
		data: QrCodeJson,
		function: this.state.function,
		added: added
    })
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
async associate_command(UPC, UniquenessID, CommandID) {

	const data = contract.methods.Associate_Command(UPC, UniquenessID, CommandID).encodeABI();
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
		Alert.alert('Command assigned to this product!','UPC: ' + UPC + '\nUnique ID: ' + UniquenessID + '\nCommand ID: ' + CommandID,);
		return true;

	}catch(error){
		if(error.toString().includes("this command does not exist")){
			Alert.alert('Error: command does not exist','Traject ID: ' + CommandID);
		}
		else if(error.toString().includes("a command not completed is already assigned to this product")){
			Alert.alert('Error: Order already associated to that product','Command ID: ' + CommandID);
		}
		else if(error.toString().includes("must be a product registered")){
			Alert.alert('Error: product not registered','UPC: ' + UPC);
		}
		return false;

	}
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
    Alert.alert('Command info', 'Command ID: ' + commandID + '\nTotal weight: ' + result['0'] + '\nTotal volume: ' + result['1'] + '\nDone: ' + result['2'] +'\nIPFS hash: ' + result['3']);
  }
  catch(e){
    Alert.alert('Error: this command ID does not exist', 'Traject ID: ' + commandID);
  }
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