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

export default class Trucker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ItineraryInfo: "",

			ItineraryID: 0,

		};
	}

	async componentDidMount() {
		var ItineraryID = await contract.methods.get_trucker_current_ItineraryID().call();
		await this.get_Itinerary_info(ItineraryID);
		this.setState({ ItineraryID: ItineraryID });
	}

	async going_back() {
		var functions = await this.props.navigation.getParam("function", "No data read");
		var added = await this.props.navigation.getParam("added", "No data read");
		var trailerID = await this.props.navigation.getParam("trailerID", "No data read");

		await this.componentDidMount();

		console.log(trailerID);
		console.log(functions);
		console.log(added);

		this.setState({ function: functions });

		// info has been added to the Itinerary
		if (added == true) {

		}


	}

	async get_Itinerary_info(ItineraryID) {
		try {
			var ItineraryInfo = await contract.methods.get_Itinerary_info(ItineraryID).call();
			this.setState({ ItineraryInfo: ItineraryInfo });
			console.log(ItineraryInfo);
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
						<Text style={styles.title}>Trucker</Text>
					</ImageBackground>
				</View>
				<View>
					<Button
						color={'green'}
						title={"grab Itinerary"}
						onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
							data: "grab_Itinerary"
						})}
					/>
				</View>
				<Text style={styles.descriptionText}>Grab a ready itinerary created by the loading attendant by scanning a trailer</Text>
				<Separator />
				<View>
					<Button
						color={'green'}
						title={"start Itinerary"}
						onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
							data: "Itinerary_start"
						})}
					/>
				</View>
				<Text style={styles.descriptionText}>Mark the itinerary as started from scanning the truck CO2 counter. Store the time, truck CO2 emissions counter value and truck ID on the chain</Text>
				<Separator />
				<View>
					<Text style={styles.textTitle}>Current Itinerary ID : {this.state.ItineraryID}</Text>
					<Text style={styles.text}>Itinerary total weight: {this.state.ItineraryInfo['0']}</Text>
					<Text style={styles.text}>Itinerary total volume: {this.state.ItineraryInfo['1']}</Text>
					<Text style={styles.text}>Itinerary CO2 emission: {this.state.ItineraryInfo['2']}</Text>
					<Text style={styles.text}>Itinerary started: {String(this.state.ItineraryInfo['4'])}</Text>
					<Text style={styles.text}>Itinerary done: {String(this.state.ItineraryInfo['5'])}</Text>
					<Text style={styles.ipfsHash}
						onPress={() => Linking.openURL("https://ipfs.infura.io/ipfs/" + this.state.ItineraryInfo['6'])}
					>IPFS hash: {String(this.state.ItineraryInfo['6'])}
					</Text>
				</View>
				<Separator />
				<View>
					<Button
						color={'#e00000'}
						title={"end Itinerary"}
						onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
							data: "Itinerary_stop"
						})}
					/>
				</View>
				<Text style={styles.descriptionText}>Mark an itinerary as completed by scanning the truck CO2 counter.</Text>
				<Separator />
				<View>
					<Button
						color={'green'}
						title={"part discharge"}
						onPress={() => this.props.navigation.navigate("PartDischarge", {
							data: this.state.ItineraryInfo
						})}
					/>
				</View>
				<Text style={styles.descriptionText}>Partially discharge the truck</Text>
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
	descriptionText: {
		fontSize: 15,
		textAlign: "justify",
		margin: 5
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