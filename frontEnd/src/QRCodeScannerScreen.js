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
		"name": "Associate_Itinerary",
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
				"name": "_CO2Counter",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_truckID",
				"type": "uint256"
			}
		],
		"name": "Itinerary_start",
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
				"name": "_CO2Counter",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_truckID",
				"type": "uint256"
			}
		],
		"name": "Itinerary_stop",
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
				"internalType": "uint256",
				"name": "_trailerID",
				"type": "uint256"
			}
		],
		"name": "associate_trailer",
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
				"name": "_ItineraryID",
				"type": "uint256"
			}
		],
		"name": "get_Itinerary_emission",
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
				"name": "_ItineraryID",
				"type": "uint256"
			}
		],
		"name": "get_Itinerary_info",
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
				"internalType": "uint256",
				"name": "_commandID",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_index",
				"type": "uint8"
			}
		],
		"name": "get_command_Itinerary_list_index",
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
				"name": "_commandID",
				"type": "uint256"
			}
		],
		"name": "get_command_Itinerary_list_size",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
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
		"name": "get_current_ItineraryID",
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
				"internalType": "string",
				"name": "_upc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_ItineraryID",
				"type": "uint256"
			}
		],
		"name": "get_product_emission",
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
				"name": "_trailerID",
				"type": "uint256"
			}
		],
		"name": "get_trailer_current_Itinerary",
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
		"name": "get_trucker_current_ItineraryID",
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
				"internalType": "uint256",
				"name": "_ItineraryID",
				"type": "uint256"
			}
		],
		"name": "grab_Itinerary",
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
				"name": "_IpfsItineraryHash",
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
		"name": "new_Itinerary",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ItineraryID",
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
	}
];
const contract_address = '0x2CE6a9050599abc80f5AECd93ecfAE30fF1A4F90';

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
				  ItineraryID: 0};
}

componentDidMount(){
    const qrCodeType = this.props.navigation.getParam("data", "No data read");
	const commandID = this.props.navigation.getParam("commandID", "No data read");
	const ItineraryID = this.props.navigation.getParam("ItineraryID", "No data read");
    this.setState({function: qrCodeType,
					commandID: commandID,
					ItineraryID: ItineraryID});
}
onRead = async e => {
    const QrCodeJson = JSON.parse(e.data);  
    // 1: Register product (order Picker)
    if(this.state.function == "Register"){
      console.log("SUCCESS: function: "+ this.state.function);
      await this.new_product(QrCodeJson.UPC, QrCodeJson.Weight, QrCodeJson.Volume);
    }
    // 2: Get product info (order Picker)
    else if(this.state.function == "get info"){
      console.log("SUCCESS: function: "+ this.state.function);
      await this.Get_product_Volume(QrCodeJson.UPC);
    }
    // 3: Associate Order (order Picker)
    else if(this.state.function == "Associate_command"){
      console.log("SUCCESS: function: "+ this.state.function);
      var added = await this.associate_command(QrCodeJson.UPC, QrCodeJson.Unique, this.state.commandID);
	}
	// 4: get product order list (order Picker)
	else if(this.state.function == "get_product_command_list"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.Get_product_command(QrCodeJson.UPC, QrCodeJson.Unique);
	}
	// 5: associate Itinerary (loading attendant)
	else if(this.state.function == "associate_Itinerary"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.associate_Itinerary(QrCodeJson.UPC, QrCodeJson.Unique);
	}
	// 6: associate trailer (loading attendant)
	else if(this.state.function == "associate_trailer"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.associate_trailer(QrCodeJson.trailerID);
	}
	// 7: associate trailer (Trucker)
	else if(this.state.function == "grab_Itinerary"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.grab_Itinerary(QrCodeJson.trailerID);
	}
	// 8: Itinerary start (Trucker)
	else if(this.state.function == "Itinerary_start"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.Itinerary_start(QrCodeJson.Emission, QrCodeJson.truckID);
	}
	// 9: Itinerary stop (Trucker)	
	else if(this.state.function == "Itinerary_stop"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.Itinerary_stop(QrCodeJson.Emission, QrCodeJson.truckID);
	}
	// 10: get_product (Trucker)	
	else if(this.state.function == "get_product_info"){
		console.log("SUCCESS: function: "+ this.state.function);
	}
    else{
      console.log("ERROR: function: "+ this.state.function + ", no corresponding QR code function!");
	}

	if(this.state.function == "associate_Itinerary" || this.state.function == "associate_trailer"){
		await this.props.navigation.navigate("LoadingAttendant", {
			data: this.state.commandID,
			function: this.state.function,
			trailerID: QrCodeJson,
			added: added
		})
	}
	else if(this.state.function == "grab_Itinerary" || this.state.function == "Itinerary_start" || this.state.function == "Itinerary_stop" ){
		await this.props.navigation.navigate("Trucker", {
			function: this.state.function,
			trailerID: QrCodeJson,
			added: added
		})
	}
	else if(this.state.function == "get_product_info"){
		await this.props.navigation.navigate("ProductInfo", {
			data: QrCodeJson
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
		Alert.alert('Good Job!','New Product registered!\nUPC: ' +UPC +'\nWeight: ' +Weight +' kg\nVolume: ' +Volume +' cm^3');

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
			Alert.alert('Error: command must not be completed','Itinerary ID: ' + this.state.commandID);
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
async associate_Itinerary(UPC, UniquenessID){
	try {
		var lenght = await contract.methods.get_product_commands_size(UPC, UniquenessID).call();
		var commandID = await contract.methods.get_product_commandID(UPC, UniquenessID, lenght-1).call(); // get the last commandID associated to that Itinerary
		this.setState({commandID: commandID});
	}catch(error){
		Alert.alert('this product was not assign to a command yet', 'Product UPC: ' + UPC + '\nUnique ID: ' + UniquenessID);	
	}

	const data = contract.methods.Associate_Itinerary(commandID).encodeABI();
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
		Alert.alert('Itinerary assign to that command','command ID: ' + commandID + '\nItinerary ID: ' + this.state.ItineraryID);
		return true;
		
	}catch(error){
		console.log(error);
		Alert.alert('something went wrong', 'command ID: ' + commandID + '\nItinerary ID: ' + this.state.ItineraryID);
	}
	return false;
}
async associate_trailer(trailerID){

	const data = contract.methods.associate_trailer(trailerID).encodeABI();
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
		Alert.alert('trailer ID assigned to Itinerary',"trailer ID: "+ trailerID + '\nItinerary ID: ' + this.state.ItineraryID);
		return true;
		
	}catch(error){
		console.log(error);
		Alert.alert('Error', 'could not added trailerID to Itinerary\n' + "trailer ID: "+ trailerID + '\nItinerary ID: ' + this.state.ItineraryID);
	}
	return false;
}
async grab_Itinerary(trailerID){

	var ItineraryID = await contract.methods.get_trailer_current_Itinerary(trailerID).call();

	const data = contract.methods.grab_Itinerary(ItineraryID).encodeABI();
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
		Alert.alert('Grabed new Itinerary',"Itinerary ID: "+ ItineraryID + '\nTrailer ID: ' + trailerID);
		return true;
		
	}catch(error){
		console.log(error);
		Alert.alert('Error', 'could not grabed this Itinerary\n' + "Itinerary ID: "+ ItineraryID + '\nTrailer ID: ' + trailerID);
	}
	return false;
}
async Itinerary_start(co2Emission, truckID){
	var ItineraryID = await contract.methods.get_trucker_current_ItineraryID().call();

	const data = contract.methods.Itinerary_start(co2Emission, truckID).encodeABI();
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
		Alert.alert('Itinerary started',"Itinerary ID: "+ ItineraryID + '\ntruck ID: ' + truckID + "\nCO2 counter at start: " + co2Emission);
		return true;
		
	}catch(error){
		console.log(error);
		Alert.alert('Error', 'Itinerary could not started\n' + "Itinerary ID: "+ ItineraryID + '\ntruck ID: ' + truckID);
	}
	return false;
}
async Itinerary_stop(co2Emission, truckID){

	var ItineraryID = await contract.methods.get_trucker_current_ItineraryID().call();

	const data = contract.methods.Itinerary_stop(co2Emission, truckID).encodeABI();
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
		co2Emission = await contract.methods.get_Itinerary_emission(ItineraryID).call();

		Alert.alert('Itinerary stoped',"Itinerary ID: "+ ItineraryID + '\nTruck ID: ' + truckID + "\nTot CO2 emission: " + co2Emission);
		return true;
		
	}catch(error){
		console.log(error);
		Alert.alert('Error', 'Itinerary could not be stoped\n' + "Itinerary ID: "+ ItineraryID + '\nTruck ID: ' + truckID);
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
  Alert.alert('command ID request', 'Product UPC: ' + UPC + '\nProduct uniqueID: ' + unique + '\nItinerarys ID list: ' + command_list);
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> scan a product to {this.state.function}</Text>
        <QRCodeScanner
            reactivate={true}
            reactivateTimeout={2000}
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