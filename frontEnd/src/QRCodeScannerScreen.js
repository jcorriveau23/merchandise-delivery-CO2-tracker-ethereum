import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import './shim';

const $abi = require('./ABI_and_keys')

const mnemonic = $abi.mnemonic
const abi = $abi.abi
const contract_address = $abi.contract_address
const publicKey = $abi.publicKey
const privateKey = $abi.privateKey
const infuraAPI = $abi.Infura_api

const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
import HDWalletProvider from 'truffle-hdwallet-provider';

const Provider = new HDWalletProvider(mnemonic, infuraAPI);
const web3 = new Web3(Provider);
const contract = new web3.eth.Contract(abi, contract_address, {from: publicKey});
web3.eth.defaultAccount = publicKey;

const AsyncAlert = (Title, message) => {
    return new Promise((resolve, reject) => {
        Alert.alert(
            Title,
            message,
            [
                { text: 'YES', onPress: () => resolve('YES') },
                { text: 'NO', onPress: () => resolve('NO') }
            ],
            { cancelable: false }
        )
    })
}

export default class QRCodeScannerScreen extends Component {
constructor(props){
    super(props);
    this.state = {function: "",
				  orderID: 0,
				  ItineraryID: 0};
}

componentDidMount(){
    const qrCodeType = this.props.navigation.getParam("data", "No data read");
	const orderID = this.props.navigation.getParam("orderID", "No data read");
	const ItineraryID = this.props.navigation.getParam("ItineraryID", "No data read");
    this.setState({function: qrCodeType,
					orderID: orderID,
					ItineraryID: ItineraryID});
}
onRead = async e => {
    const QrCodeJson = JSON.parse(e.data);  
    // 1: Register product (order Picker)
    if(this.state.function == "Register"){
      console.log("SUCCESS: function: "+ this.state.function);
      await this.register_product(QrCodeJson.UPC, QrCodeJson.Weight, QrCodeJson.Volume);
    }
    // 2: Get product info (order Picker)
    else if(this.state.function == "get info"){
      console.log("SUCCESS: function: "+ this.state.function);
      await this.Get_product_Volume(QrCodeJson.UPC);
    }
    // 3: Associate Order (order Picker)
    else if(this.state.function == "Associate_order_to_unique_product"){
      console.log("SUCCESS: function: "+ this.state.function);
      var added = await this.Associate_order_to_unique_product(QrCodeJson.UPC, QrCodeJson.Unique);
	}
	// 4: get product order list (order Picker)
	else if(this.state.function == "get_product_order_list"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.Get_product_order(QrCodeJson.UPC, QrCodeJson.Unique);
	}
	// 5: associate Itinerary (loading attendant)
	else if(this.state.function == "Associate_itinerary_to_order"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.Associate_itinerary_to_order(QrCodeJson.UPC, QrCodeJson.Unique);
	}
	// 6: associate trailer (loading attendant)
	else if(this.state.function == "Associate_trailer_to_itinerary"){
		console.log("SUCCESS: function: "+ this.state.function);
		var added = await this.Associate_trailer_to_itinerary(QrCodeJson.trailerID);
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

	if(this.state.function == "Associate_itinerary_to_order" || this.state.function == "Associate_trailer_to_itinerary"){
		await this.props.navigation.navigate("LoadingAttendant", {
			data: this.state.orderID,
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
async register_product(UPC, Weight, Volume) {

	const data = contract.methods.register_product(UPC, Weight, Volume).encodeABI();
	const nonce = await web3.eth.getTransactionCount(publicKey);
	var gasPrice = await web3.eth.getGasPrice();
	var gasLimit = await web3.eth.getBlock("latest", false);

	const signedTx = await web3.eth.accounts.signTransaction(
		{
			nonce: nonce,
			gasLimit: '0x' + gasLimit.gasLimit.toString(16),
			gasPrice: '0x' + parseInt(gasPrice).toString(16),
			to: contract_address,
			data: data,
		},
		privateKey
	);
	var resolve = await AsyncAlert('Do you want to register this product?', 'UPC: ' +UPC +'\nWeight: ' +Weight +' kg\nVolume: ' +Volume +' cm^3');
	if(resolve = "YES"){
		try{
			await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			Alert.alert('Sucess','Product registered:\nUPC: ' + UPC);
		}catch(error){
			if (error.toString().includes("product already registered")) {
				  Alert.alert('Error','this product was already registered:\nUPC: ' + UPC);
			}
			else{
				Alert.alert("Error:", error.toString())
			}
		}
	}
}
async Associate_order_to_unique_product(UPC, UniquenessID) {

	const data = contract.methods.Associate_order_to_unique_product(UPC, UniquenessID).encodeABI();
	const nonce = await web3.eth.getTransactionCount(publicKey);
	var gasPrice = await web3.eth.getGasPrice();
	var gasLimit = await web3.eth.getBlock("latest", false);

	const signedTx = await web3.eth.accounts.signTransaction(
		{
			nonce: nonce,
			gasLimit: '0x' + gasLimit.gasLimit.toString(16),
			gasPrice: '0x' + parseInt(gasPrice).toString(16),
			to: contract_address,
			data: data,
		},
		privateKey
	);
	var resolve = await AsyncAlert('Do you want to assign a product to an order?', 'UPC: ' + UPC + '\nUnique ID: ' + UniquenessID + '\nOrder ID: ' + this.state.orderID);
	if(resolve = "YES"){
		try{
			await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			Alert.alert('Sucess: Order assigned to this product!','UPC: ' + UPC + '\nUnique ID: ' + UniquenessID + '\nOrder ID: ' + this.state.orderID,);
			return true;

		}catch(error){
			if(error.toString().includes("order must not be completed")){
				Alert.alert('Error: order must not be completed','Itinerary ID: ' + this.state.orderID);
			}
			else if(error.toString().includes("an order not completed is already assigned to this product")){
				Alert.alert('Error: Order already associated to that product','Order ID: ' + this.state.orderID);
			}
			else if(error.toString().includes("must be a product registered")){
				Alert.alert('Error: product not registered','UPC: ' + UPC);
			}
			else{
				Alert.alert("Error:", error.toString())
			}
			return false;
		}
	}
}
async Associate_itinerary_to_order(UPC, UniquenessID){
	try {
		var lenght = await contract.methods.get_product_orders_size(UPC, UniquenessID).call();
		var orderID = await contract.methods.get_product_orderID(UPC, UniquenessID, lenght-1).call(); // get the last orderID associated to that Itinerary
		this.setState({orderID: orderID});
	}catch(error){
		Alert.alert('this product was not assign to an order yet', 'Product UPC: ' + UPC + '\nUnique ID: ' + UniquenessID);	
	}

	const data = contract.methods.Associate_itinerary_to_order(orderID).encodeABI();
	const nonce = await web3.eth.getTransactionCount(publicKey);
	var gasPrice = await web3.eth.getGasPrice();
	var gasLimit = await web3.eth.getBlock("latest", false);

	const signedTx = await web3.eth.accounts.signTransaction(
		{
			nonce: nonce,
			gasLimit: '0x' + gasLimit.gasLimit.toString(16),
			gasPrice: '0x' + parseInt(gasPrice).toString(16),
			to: contract_address,
			data: data,
		},
		privateKey
	);
	var resolve = await AsyncAlert('Do you want to assign an order to an itinerary?', 'order ID: ' + orderID + '\nItinerary ID: ' + this.state.ItineraryID);
	if(resolve = "YES"){
		try{
			await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			Alert.alert('Sucess: Itinerary assign to that order','order ID: ' + orderID + '\nItinerary ID: ' + this.state.ItineraryID);
			return true;
			
		}catch(error){
			Alert.alert('Error: ', 'order ID: ' + orderID + '\nItinerary ID: ' + this.state.ItineraryID);
		}
	}
	return false;
}
async Associate_trailer_to_itinerary(trailerID){

	const data = contract.methods.Associate_trailer_to_itinerary(trailerID).encodeABI();
	const nonce = await web3.eth.getTransactionCount(publicKey);
	var gasPrice = await web3.eth.getGasPrice();
	var gasLimit = await web3.eth.getBlock("latest", false);

	const signedTx = await web3.eth.accounts.signTransaction(
		{
			nonce: nonce,
			gasLimit: '0x' + gasLimit.gasLimit.toString(16),
			gasPrice: '0x' + parseInt(gasPrice).toString(16),
			to: contract_address,
			data: data,
		},
		privateKey
	);
	var resolve = await AsyncAlert('Do you want to assign a trailer to an itinerary?', "trailer ID: "+ trailerID + '\nItinerary ID: ' + this.state.ItineraryID);
	if(resolve = "YES"){
		try{
			await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			Alert.alert('Sucess: trailer ID assigned to Itinerary',"trailer ID: "+ trailerID + '\nItinerary ID: ' + this.state.ItineraryID);
			return true;
			
		}catch(error){
			Alert.alert('Error', 'could not added trailerID to Itinerary\n' + "trailer ID: "+ trailerID + '\nItinerary ID: ' + this.state.ItineraryID);
		}
	}
	return false;
}
async grab_Itinerary(trailerID){

	var ItineraryID = await contract.methods.get_trailer_current_Itinerary(trailerID).call();

	const data = contract.methods.grab_Itinerary(ItineraryID).encodeABI();
	const nonce = await web3.eth.getTransactionCount(publicKey);
	var gasPrice = await web3.eth.getGasPrice();
	var gasLimit = await web3.eth.getBlock("latest", false);

	const signedTx = await web3.eth.accounts.signTransaction(
		{
			nonce: nonce,
			gasLimit: '0x' + gasLimit.gasLimit.toString(16),
			gasPrice: '0x' + parseInt(gasPrice).toString(16),
			to: contract_address,
			data: data,
		},
		privateKey
	);
	var resolve = await AsyncAlert('Do you want to grab that itinerary?', "Itinerary ID: "+ ItineraryID + '\nTrailer ID: ' + trailerID);
	if(resolve = "YES"){
		try{
			await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			Alert.alert('Sucess: Grabed new Itinerary',"Itinerary ID: "+ ItineraryID + '\nTrailer ID: ' + trailerID);
			return true;
			
		}catch(error){
			Alert.alert('Error', 'could not grabed this Itinerary\n' + "Itinerary ID: "+ ItineraryID + '\nTrailer ID: ' + trailerID);
		}
	}
	return false;
}
async Itinerary_start(co2Emission, truckID){
	var ItineraryID = await contract.methods.get_trucker_current_ItineraryID().call();

	const data = contract.methods.Itinerary_start(co2Emission, truckID).encodeABI();
	const nonce = await web3.eth.getTransactionCount(publicKey);
	var gasPrice = await web3.eth.getGasPrice();
	var gasLimit = await web3.eth.getBlock("latest", false);

	const signedTx = await web3.eth.accounts.signTransaction(
		{
			nonce: nonce,
			gasLimit: '0x' + gasLimit.gasLimit.toString(16),
			gasPrice: '0x' + parseInt(gasPrice).toString(16),
			to: contract_address,
			data: data,
		},
		privateKey
	);
	var resolve = await AsyncAlert('do you want to initiate the itinerary?',"Itinerary ID: "+ ItineraryID + '\ntruck ID: ' + truckID + "\nCO2 counter at start: " + co2Emission);
	if(resolve = "YES"){
		try{
			await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			Alert.alert('Sucess: Itinerary started',"Itinerary ID: "+ ItineraryID + '\ntruck ID: ' + truckID + "\nCO2 counter at start: " + co2Emission);
			return true;
			
		}catch(error){
			Alert.alert('Error', 'Itinerary could not started\n' + "Itinerary ID: "+ ItineraryID + '\ntruck ID: ' + truckID);
		}
	}
	return false;
}
async Itinerary_stop(co2Emission, truckID){

	var ItineraryID = await contract.methods.get_trucker_current_ItineraryID().call();

	const data = contract.methods.Itinerary_stop(co2Emission, truckID).encodeABI();
	const nonce = await web3.eth.getTransactionCount(publicKey);
	var gasPrice = await web3.eth.getGasPrice();
	var gasLimit = await web3.eth.getBlock("latest", false);

	const signedTx = await web3.eth.accounts.signTransaction(
		{
			nonce: nonce,
			gasLimit: '0x' + gasLimit.gasLimit.toString(16),
			gasPrice: '0x' + parseInt(gasPrice).toString(16),
			to: contract_address,
			data: data,
		},
		privateKey
	);
	var resolve = await AsyncAlert('Do you want to end this itierary?', "Itinerary ID: "+ ItineraryID + '\nTruck ID: ' + truckID + "\nTot CO2 emission: " + co2Emission);
	if(resolve = "YES"){
		try{
			
			await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

			Alert.alert('Sucess: Itinerary stoped', "Itinerary ID: "+ ItineraryID + '\nTruck ID: ' + truckID + "\nTot CO2 emission: " + co2Emission);
			return true;
			
		}catch(error){
			Alert.alert('Error', 'Itinerary could not be stoped\n' + "Itinerary ID: "+ ItineraryID + '\nTruck ID: ' + truckID);
		}
	}
	return false;
}
async Get_product_Volume(UPC) {
  var weight = await contract.methods.get_upc_weight(UPC).call();
  var volume = await contract.methods.get_upc_Volume(UPC).call();
  console.log(weight);
  Alert.alert('Product Info', 'Product UPC: ' + UPC + '\nWeight registered: ' + weight + '\nVolume registered: ' + volume);
}
async Get_product_order(UPC, unique) {
  try {
    var lenght = await contract.methods.get_product_orders_size(UPC, unique).call();
    console.log(lenght);
  }
  catch(e){
    Alert.alert('No order registered yet', 'Product UPC: ' + UPC + '\nUnique ID: ' + unique);
  }

  var order_list = [];
  var i = 0;
  for (i=0; i < lenght; i++){
    try {
      var result = await contract.methods.get_product_orderID(UPC, unique, i).call();
      order_list.push(result);
      
    }
    catch(e){
      Alert.alert('something went wrong', 'Product UPC: ' + UPC + '\nUnique ID: ' + unique);
    }
  }
  Alert.alert('order ID request', 'Product UPC: ' + UPC + '\nProduct uniqueID: ' + unique + '\nItinerarys ID list: ' + order_list);
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