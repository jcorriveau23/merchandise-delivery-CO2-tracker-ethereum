import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Alert, Dimensions, ImageBackground, Linking } from 'react-native';
import { NavigationEvents, SafeAreaView } from "react-navigation";
import './shim';

import Container from './Container';

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

const Item = ({ commandID }) => (
	<View>
		<Text>{commandID}</Text>
	</View>
);

const renderItem = ({ item }) => (
	<Item commandID={item.commandID} />
);

export default class Info extends Component {

	constructor(props) {
		super(props);
		this.state = {
			UPC: "scan a product",
			Unique: 0,
			Json_Product_info: {
				commandIDList: [],
				productTotEmission: 0
			},
			ItineraryInfo: "",
			orderInfo: "",
		};
	}

	async going_back() {
		var ProductQrCode = await this.props.navigation.getParam("data", "No data read");
		if (ProductQrCode != "No data read") {
			this.setState({ UPC: ProductQrCode.UPC });
			this.setState({ Unique: ProductQrCode.Unique });

			var size = this.Get_product_info(this.state.UPC, this.state.Unique);
		}
	}

	async Get_product_info(UPC, unique) {
		var lenght = 0;
		var commandLenght;
		var ItineraryLenght;
		var commandID;
		var ItineraryID;
		var totProductEmission = 0;
		var ProductCO2EmissionPart = 0;
		var ItineraryCO2Emission = 0;


		var JsonProductInfo = {
			"commandIDList": []
		}

		try {
			commandLenght = await contract.methods.get_product_commands_size(UPC, unique).call();
			console.log(lenght);
		}
		catch (e) {
			Alert.alert('Product not registered yet', 'Product UPC: ' + UPC + '\nUnique ID: ' + unique);
		}


		var i = 0;
		for (i = 0; i < commandLenght; i++) {

			commandID = await contract.methods.get_product_commandID(UPC, unique, i).call();
			await this.get_command_info(commandID);

			var newCommandID = {
				"commandID": commandID,
				"commandHash": this.state.orderInfo['3'],
				"ItineraryList": []
			};

			try {
				ItineraryLenght = await contract.methods.get_command_Itinerary_list_size(commandID).call();
				var j = 0;
				for (j = 0; j < ItineraryLenght; j++) {
					ItineraryID = await contract.methods.get_command_Itinerary_list_index(commandID, j).call();

					await this.get_Itinerary_info(ItineraryID);
					ProductCO2EmissionPart = await contract.methods.get_product_emission(UPC, ItineraryID).call();

					totProductEmission = parseInt(totProductEmission) + parseInt(ProductCO2EmissionPart);

					var newItineraryID = {
						"ItineraryID": ItineraryID,
						"ItineraryHash": this.state.ItineraryInfo['6'],
						"ItineraryCO2Emission": this.state.ItineraryInfo['2'],
						"ProductCO2EmissionPart": ProductCO2EmissionPart
					};

					newCommandID["ItineraryList"].push(newItineraryID)
				}
			}
			catch (e) {
				console.log(e);
				console.log("some command are not yet assigned to an Itinerary")
			}
			JsonProductInfo["commandIDList"].push(newCommandID);
			JsonProductInfo["productTotEmission"] = totProductEmission;
		}
		console.log(JsonProductInfo);
		this.setState({ Json_Product_info: JsonProductInfo })
		return commandLenght;
	}

	async get_Itinerary_info(ItineraryID) {
		try {
			var ItineraryInfo = await contract.methods.get_Itinerary_info(ItineraryID).call();
			this.setState({ ItineraryInfo: ItineraryInfo });
			return ItineraryInfo;
		}
		catch (e) {
			Alert.alert('Error: this command ID does not exist', 'Itinerary ID: ' + ItineraryID);
		}
	}

	async get_command_info(commandID) {
		try {
			var orderInfo = await contract.methods.get_command_info(commandID).call();
			this.setState({ orderInfo: orderInfo });
			return orderInfo;
		}
		catch (e) {
			Alert.alert('Error: this command ID does not exist', 'Itinerary ID: ' + commandID);
		}
	}
	render() {
		return (
			<Container>
				<NavigationEvents onDidFocus={() => this.going_back()} />
				<View style={styles.header}>
					<ImageBackground
						source={require("../asset/header.png")}
						style={styles.imageBackground}
						resizeMode="contain"
					>
						<Text style={styles.title}>Product Info</Text>
					</ImageBackground>
				</View>
				<View>
					<Button
						color={'green'}
						title={"Scan a product"}
						onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
							data: "get_product_info"
						})}
					/>
				</View>
				<Text style={styles.text}>Scan a product to get its orders itinerary and CO2 transport emissions</Text>
				<Separator />
				<View>
					<Text style={styles.textBold}>UPC: {this.state.UPC}</Text>
					<Text style={styles.textBold}>Unique: {this.state.Unique}</Text>
					{this.state.Json_Product_info.commandIDList.map((command, index) => {
						return <View key={command.commandID}>
							<Text style={styles.textBold}>command ID: {command.commandID}</Text>
							<Text style={styles.ipfs}
								onPress={() => Linking.openURL("https://ipfs.infura.io/ipfs/" + command.commandHash)}
							>IPFS order hash: {String(command.commandHash)}
							</Text>
							{
								command.ItineraryList.map((Itinerary, index) => {
									return <>
										<View key={command.commandID}>
											<Text style={styles.textBold}>  Itinerary ID: {Itinerary.ItineraryID} </Text>
											<Text style={styles.ipfs}
												onPress={() => Linking.openURL("https://ipfs.infura.io/ipfs/" + Itinerary.ItineraryHash)}
											>IPFS Itinerary hash: {String(Itinerary.ItineraryHash)}
											</Text>
											<Text style={styles.text}>      Itinerary's total': {Itinerary.ItineraryCO2Emission} kg CO2 éq.</Text>
											<Text>      product's part: {Itinerary.ProductCO2EmissionPart} kg CO2 éq.</Text>
										</View>
									</>
								}
								)
							}
						</View>
					})}
					<Text style={styles.textBold}>Product total transport emissions: {this.state.Json_Product_info['productTotEmission']}  kg CO2 éq.</Text>
				</View>
			</Container >
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
	text: {
		fontSize: 14,
		textAlign: "justify",
		margin: 0
	},
	textBold: {
		fontSize: 14,
		textAlign: "justify",
		margin: 0,
		fontWeight: "bold"
	},
	ipfs: {
		fontSize: 9,
		textAlign: "center",
		color: 'blue',
		fontWeight: "bold"
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