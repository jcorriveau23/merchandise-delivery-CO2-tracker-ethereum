import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Alert, AsyncStorage, Linking, Dimensions, ImageBackground } from 'react-native';
import { NavigationEvents } from "react-navigation";
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
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

const Tx = require('ethereumjs-tx').Transaction;
import HDWalletProvider from 'truffle-hdwallet-provider';
const mnemonic = 'wagon sick artefact august more home program science famous fun magnet crew'; // 12 word mnemonic
const Provider = new HDWalletProvider(mnemonic, 'http://192.168.0.16:7545');
const web3 = new Web3(Provider);
const contract = new web3.eth.Contract(abi, contract_address);
const privateKey = '0x2f5a91464049996a4948ed874409f4cfc56c775ee89760bf9db212927668acb7'
const publicKey = '0xf9Bb59aF9eC60D64274a4d2a61D55CB004FBEa5e'

const Separator = () => (
	<View style={styles.separator} />
);

export default class LoadingAttendant extends Component {

	constructor(props) {
		super(props);
		this.state = {
			commandID: 0,
			ItineraryInfo: "",

			ItineraryID: 0,
			totalWeight: 0,
			totalVolume: 0,
			done: false
		};
	}
	async going_back() {
		var commandID = await this.props.navigation.getParam("data", "No data read");
		var functions = await this.props.navigation.getParam("function", "No data read");
		var added = await this.props.navigation.getParam("added", "No data read");
		var trailerID = await this.props.navigation.getParam("trailerID", "No data read");

		this.setState({ commandID: commandID });
		this.setState({ function: functions });

		// info has been added to the Itinerary
		if (added == true) {
			var currentItinerary = [];
			var currentItineraryString = "";

			// async storage the current Itinerary info	
			var Itinerary = await AsyncStorage.getItem('Itinerary');


			if (functions.includes("Itinerary")) {
				var orderInfo = await contract.methods.get_command_info(commandID).call();

				var newCommand = {
					"commandID": commandID,
					"totWeight": orderInfo['0'],
					"totVolume": orderInfo['1']
				}

				await this.get_Itinerary_info(this.state.ItineraryID, false);

				if (Itinerary == null) {
					// no Itinerary stored first command added
					currentItinerary.push(newCommand);
					var jsonItinerary = {
						"ItineraryID": this.state.ItineraryID,
						"trailerIDs": [],
						"commandList": currentItinerary
					};
					currentItineraryString = JSON.stringify(jsonItinerary);
				}
				else {
					var currentItineraryJSON = JSON.parse(Itinerary);
					currentItineraryJSON['commandList'].push(newCommand);
					currentItineraryString = JSON.stringify(currentItineraryJSON);
				}

			}

			else if (functions.includes("trailer")) {
				if (Itinerary == null) {
					// no Itinerary stored first trailer added
					var jsonItinerary = {
						"ItineraryID": this.state.ItineraryID,
						"trailerIDs": [],
						"commandList": []
					};
					jsonItinerary["trailerIDs"].push(trailerID)
					currentItineraryString = JSON.stringify(jsonItinerary);
				}
				else {
					var currentItineraryJSON = JSON.parse(Itinerary);
					currentItineraryJSON['trailerIDs'].push(trailerID);
					currentItineraryString = JSON.stringify(currentItineraryJSON);
				}
			}
			AsyncStorage.setItem('Itinerary', currentItineraryString);
		}


	}

	async componentDidMount() {
		var ItineraryID = await contract.methods.get_current_ItineraryID().call();
		await this.get_Itinerary_info(ItineraryID, false);
		this.setState({ ItineraryID: ItineraryID });
	}

	async init_Itinerary() {

		const data = contract.methods.new_Itinerary().encodeABI();
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
		try {
			await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

			var newItineraryID = await contract.methods.get_current_ItineraryID().call();
			this.setState({ ItineraryID: newItineraryID });
			await this.get_Itinerary_info(newItineraryID, false);

			Alert.alert('Itinerary created', 'Itinerary ID: ' + this.state.ItineraryID);
		} catch (error) {
			if (error.toString().includes("already have an open Itinerary")) {
				Alert.alert('Error: user already have an open Itinerary', 'open Itinerary ID: ' + this.state.ItineraryID);
			}
		}
	}

	async loading_completed() {

		try {
			var Itinerary = await AsyncStorage.getItem('Itinerary');
			var jsonItinerary = JSON.parse(Itinerary);
			jsonItinerary['totWeight'] = this.state.ItineraryInfo['0'];
			jsonItinerary['totVolume'] = this.state.ItineraryInfo['1'];
			var hash = await ipfs.add(JSON.stringify(jsonItinerary));


			var IpfsURL = 'https://ipfs.infura.io/ipfs/' + hash;

			console.log(IpfsURL);
		}
		catch (error) {
			console.log(error);
			if (error.toString().includes("null is not an object")) {
				Alert.alert('Error: nothing in Itinerary', 'wont store order in IPFS\nItineraryID: ' + this.state.ItineraryID);
				var hash = 0; //
			}
			else {
				Alert.alert('Error: IPFS Storing did not work', 'ItineraryID: ' + this.state.ItineraryID);
				return -1;
			}
		}

		const data = contract.methods.loading_completed(hash).encodeABI();
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
		try {
			await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			await this.get_Itinerary_info(this.state.ItineraryID, false);

			Alert.alert('Itinerary ready to go', 'Itinerary ID: ' + this.state.ItineraryID);
			AsyncStorage.removeItem("Itinerary");
		} catch (error) {
			console.log(error);
			if (error.toString().includes("Itinerary is already loaded")) {
				Alert.alert('Error: Itinerary was already loaded', 'Itinerary ID: ' + this.state.ItineraryID);
			}
			else if(error.toString().includes("a trailer must be assigned")){
				Alert.alert('Error: You need to assign a trailer', 'Itinerary ID: ' + this.state.ItineraryID);
			}
		}
	}

	async get_Itinerary_info(ItineraryID, alert) {
		console.log('get_command_info');
		try {
			var ItineraryInfo = await contract.methods.get_Itinerary_info(ItineraryID).call();
			this.setState({ ItineraryInfo: ItineraryInfo });
			if (alert == true) {
				Alert.alert('Itinerary info', 'Itinerary ID: ' + commandID + '\nTruck ID: ' + orderInfo['0'] + '\nTotal weight: ' + orderInfo['1'] + '\nTotal volume: ' + orderInfo['2'] + '\nCO2 emission: ' + orderInfo['3'] + '\nDone: ' + orderInfo['4']);
			}
			return ItineraryInfo;
		}
		catch (e) {
			//Alert.alert('Error: this command ID does not exist', 'Itinerary ID: ' + ItineraryID);
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<NavigationEvents onDidFocus={() => this.going_back()} />
				<View style={styles.header}>
					<ImageBackground
						source={require("../asset/header.png")}
						style={styles.imageBackground}
						resizeMode="contain"
					>
						<Text style={styles.title}>Loading Attendant</Text>
					</ImageBackground>
				</View>
				<View>
					<Button
						color={'green'}
						title={"init new Itinerary"}
						onPress={() => this.init_Itinerary()}
					/>
				</View>
				<Text style={styles.descriptionText}>Initiate an itinerary</Text>
				<Separator />
				<View>
					<Text style={styles.textTitle}>Current Itinerary ID : {this.state.ItineraryID}</Text>
					<Text style={styles.text}>Itinerary total weight: {this.state.ItineraryInfo['0']}</Text>
					<Text style={styles.text}>Itinerary total volume: {this.state.ItineraryInfo['1']}</Text>
					<Text style={styles.text}>Itinerary CO2 emission: {this.state.ItineraryInfo['2']}</Text>
					<Text style={styles.text}>Itinerary Ready: {String(this.state.ItineraryInfo['3'])}</Text>
					<Text style={styles.ipfsHash}
						onPress={() => Linking.openURL("https://ipfs.infura.io/ipfs/" + this.state.ItineraryInfo['6'])}
					>IPFS hash: {String(this.state.ItineraryInfo['6'])}
					</Text>
				</View>
				<Separator />
				<View>
					<Button
						color={'green'}
						title={"Associate trailer to Itinerary"}
						onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
							data: "associate_trailer",
							ItineraryID: this.state.ItineraryID
						})}
					/>
				</View>
				<Text style={styles.descriptionText}>Associate a trailer to the itinerary</Text>
				<Separator />
				<View>
					<Button
						color={'green'}
						title={"add command"}
						onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
							data: "associate_Itinerary",
							ItineraryID: this.state.ItineraryID
						})}
					/>
				</View>
				<Text style={styles.descriptionText}>Associate an order to an itinerary</Text>
				<Separator />
				<View>
					<Button
						color={'#e00000'}
						title={"loading completed"}
						onPress={() => this.loading_completed()}
					/>
				</View>
				<Text style={styles.descriptionText}>Close the Itinerary and mark it as ready to go. Store the itinerary content in IPFS.</Text>
			</View>
		);
	}
}

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white"
	},
	header: {
		marginTop: 0
	},
	textTitle: {
		fontSize: 19,
		textAlign: "center",
		fontWeight: "bold",
		textDecorationLine: 'underline'
	},
	text: {
		fontSize: 15,
		textAlign: "center",
		margin: 0
	},
	ipfsHash: {
		fontSize: 10,
		textAlign: "center",
		color: 'blue',
		fontWeight: "bold",
		margin: 5
	},
	descriptionText: {
		fontSize: 15,
		textAlign: "justify",
		margin: 5
	},
	imageBackground: {
		width: width * 0.4,
		height: width * 0.4,
		alignItems: 'center'
	},
	title: {
		color: 'white',
		marginTop: 25,
		fontWeight: 'bold',
		fontSize: 15
	},
	separator: {
		marginVertical: 8,
		borderBottomColor: '#737373',
		borderBottomWidth: StyleSheet.hairlineWidth,
	}

});