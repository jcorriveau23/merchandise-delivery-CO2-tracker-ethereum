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
				"name": "_trailerID",
				"type": "uint256"
			}
		],
		"name": "get_trailer_current_traject",
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
		"name": "get_traject_emission",
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
		"inputs": [],
		"name": "get_trucker_current_trajectID",
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
				"name": "_trajectID",
				"type": "uint256"
			}
		],
		"name": "grab_traject",
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
				"name": "_CO2Counter",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_truckID",
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
				"name": "_CO2Counter",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_truckID",
				"type": "uint256"
			}
		],
		"name": "traject_stop",
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
const contract_address = '0x70B621393c4498694288786Bc628fBd17c732fd2';

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
	// 5: associate traject (loading attendant)
	else if(this.state.function == "associate_traject"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.associate_traject(QrCodeJson.UPC, QrCodeJson.Unique);
	}
	// 6: associate trailer (loading attendant)
	else if(this.state.function == "associate_trailer"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.associate_trailer(QrCodeJson.trailerID);
	}
	// 7: associate trailer (Trucker)
	else if(this.state.function == "grab_traject"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.grab_traject(QrCodeJson.trailerID);
	}
	// 8: traject start (Trucker)
	else if(this.state.function == "traject_start"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.traject_start(QrCodeJson.Emission, QrCodeJson.truckID);
	}
	// 9: traject stop (Trucker)	
	else if(this.state.function == "traject_stop"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.traject_stop(QrCodeJson.Emission, QrCodeJson.truckID);
	}
	// 10: get_product (Trucker)	
	else if(this.state.function == "get_product_info"){
		console.log("SUCCESS: function: "+ this.state.function);
	}
    else{
      console.log("ERROR: function: "+ this.state.function + ", no corresponding QR code function!");
	}

	if(this.state.function == "associate_traject" || this.state.function == "associate_trailer"){
		await this.props.navigation.navigate("LoadingAttendant", {
			data: this.state.commandID,
			function: this.state.function,
			trailerID: QrCodeJson,
			added: added
		})
	}
	else if(this.state.function == "grab_traject" || this.state.function == "traject_start" || this.state.function == "traject_stop" ){
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
		Alert.alert('trailer ID assigned to traject',"trailer ID: "+ trailerID + '\ntraject ID: ' + this.state.trajectID);
		return true;
		
	}catch(error){
		console.log(error);
		Alert.alert('Error', 'could not added trailerID to traject\n' + "trailer ID: "+ trailerID + '\ntraject ID: ' + this.state.trajectID);
	}
	return false;
}
async grab_traject(trailerID){

	var trajectID = await contract.methods.get_trailer_current_traject(trailerID).call();

	const data = contract.methods.grab_traject(trajectID).encodeABI();
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
		Alert.alert('Grabed new traject',"Traject ID: "+ trajectID + '\nTrailer ID: ' + trailerID);
		return true;
		
	}catch(error){
		console.log(error);
		Alert.alert('Error', 'could not grabed this traject\n' + "Traject ID: "+ trajectID + '\nTrailer ID: ' + trailerID);
	}
	return false;
}
async traject_start(co2Emission, truckID){
	var trajectID = await contract.methods.get_trucker_current_trajectID().call();

	const data = contract.methods.traject_start(co2Emission, truckID).encodeABI();
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
		Alert.alert('Traject started',"Traject ID: "+ trajectID + '\ntruck ID: ' + truckID + "\nCO2 counter at start: " + co2Emission);
		return true;
		
	}catch(error){
		console.log(error);
		Alert.alert('Error', 'Traject could not started\n' + "Traject ID: "+ trajectID + '\ntruck ID: ' + truckID);
	}
	return false;
}
async traject_stop(co2Emission, truckID){

	var trajectID = await contract.methods.get_trucker_current_trajectID().call();

	const data = contract.methods.traject_stop(co2Emission, truckID).encodeABI();
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
		co2Emission = await contract.methods.get_traject_emission(trajectID).call();

		Alert.alert('Traject stoped',"Traject ID: "+ trajectID + '\nTruck ID: ' + truckID + "\nTot CO2 emission: " + co2Emission);
		return true;
		
	}catch(error){
		console.log(error);
		Alert.alert('Error', 'Traject could not be stoped\n' + "Traject ID: "+ trajectID + '\nTruck ID: ' + truckID);
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