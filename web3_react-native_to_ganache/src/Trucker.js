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
		"name": "get_command_traject_list_index",
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
		"name": "get_command_traject_list_size",
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
				"internalType": "string",
				"name": "_upc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_trajectID",
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
const contract_address = '0xB9FFD1b6E5fdA101da064F52e5Ed1685be4f7aCD';

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
			trajectInfo: "",

			trajectID: 0,

		};
	}

	async componentDidMount() {
		var trajectID = await contract.methods.get_trucker_current_trajectID().call();
		await this.get_traject_info(trajectID);
		this.setState({ trajectID: trajectID });
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

		// info has been added to the traject
		if (added == true) {

		}


	}

	async get_traject_info(trajectID) {
		try {
			var trajectInfo = await contract.methods.get_traject_info(trajectID).call();
			this.setState({ trajectInfo: trajectInfo });
			console.log(trajectInfo);
		}
		catch (e) {
			//Alert.alert('Error: this command ID does not exist', 'Traject ID: ' + trajectID);
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
						title={"grab traject"}
						onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
							data: "grab_traject"
						})}
					/>
				</View>
				<Text style={styles.descriptionText}>Grab a ready traject created by the loading attendant from scanning a trailer</Text>
				<Separator />
				<View>
					<Button
						color={'green'}
						title={"start traject"}
						onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
							data: "traject_start"
						})}
					/>
				</View>
				<Text style={styles.descriptionText}>Mark the traject as started from scanning the truck CO2 counter. Store the time, truck CO2 emissions counter value and truck ID on the chain</Text>
				<Separator />
				<View>
					<Text style={styles.textTitle}>Current traject ID : {this.state.trajectID}</Text>
					<Text style={styles.text}>traject total weight: {this.state.trajectInfo['0']}</Text>
					<Text style={styles.text}>traject total volume: {this.state.trajectInfo['1']}</Text>
					<Text style={styles.text}>traject CO2 emission: {this.state.trajectInfo['2']}</Text>
					<Text style={styles.text}>traject started: {String(this.state.trajectInfo['4'])}</Text>
					<Text style={styles.text}>traject done: {String(this.state.trajectInfo['5'])}</Text>
					<Text style={styles.ipfsHash}
						onPress={() => Linking.openURL("https://ipfs.infura.io/ipfs/" + this.state.trajectInfo['6'])}
					>IPFS hash: {String(this.state.trajectInfo['6'])}
					</Text>
				</View>
				<Separator />
				<View>
					<Button
						color={'#e00000'}
						title={"end traject"}
						onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
							data: "traject_stop"
						})}
					/>
				</View>
				<Text style={styles.descriptionText}>Mark a traject as completed from scanning the truck CO2 counter.</Text>
				<Separator />
				<View>
					<Button
						color={'green'}
						title={"part discharge"}
						onPress={() => this.props.navigation.navigate("PartDischarge", {
							data: this.state.trajectInfo
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