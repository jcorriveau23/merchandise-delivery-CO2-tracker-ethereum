import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Alert, AsyncStorage, Linking, Dimensions, ImageBackground } from 'react-native';
import { NavigationEvents } from "react-navigation";
import './shim';
const $abi = require('./ABI_and_keys')

const Web3 = require('web3');
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

const mnemonic = $abi.mnemonic
const abi = $abi.abi
const contract_address = $abi.contract_address
const publicKey = $abi.publicKey
const privateKey = $abi.privateKey
const infuraAPI = $abi.Infura_api

const Tx = require('ethereumjs-tx').Transaction;
import HDWalletProvider from 'truffle-hdwallet-provider';

const Provider = new HDWalletProvider(mnemonic, infuraAPI);
const web3 = new Web3(Provider);
const contract = new web3.eth.Contract(abi, contract_address, {from: publicKey});
web3.eth.defaultAccount = publicKey;

const Separator = () => (
	<View style={styles.separator} />
);

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

export default class LoadingAttendant extends Component {

	constructor(props) {
		super(props);
		this.state = {
			orderID: 0,
			ItineraryInfo: "",

			ItineraryID: 0,
			totalWeight: 0,
			totalVolume: 0,
			done: false
		};
	}
	async going_back() {
		var orderID = await this.props.navigation.getParam("data", "No data read");
		var functions = await this.props.navigation.getParam("function", "No data read");
		var added = await this.props.navigation.getParam("added", "No data read");
		var trailerID = await this.props.navigation.getParam("trailerID", "No data read");

		this.setState({ orderID: orderID });
		this.setState({ function: functions });

		// info has been added to the Itinerary
		if (added == true) {
			var currentItinerary = [];
			var currentItineraryString = "";

			// async storage the current Itinerary info	
			var Itinerary = await AsyncStorage.getItem('Itinerary');


			if (functions.includes("Associate_itinerary_to_order")) {
				var orderInfo = await contract.methods.get_order_info(orderID).call();

				var newOrder = {
					"orderID": orderID,
					"totWeight": orderInfo['0'],
					"totVolume": orderInfo['1']
				}

				await this.get_Itinerary_info(this.state.ItineraryID, false);

				if (Itinerary == null) {
					// no Itinerary stored first order added
					currentItinerary.push(newOrder);
					var jsonItinerary = {
						"ItineraryID": this.state.ItineraryID,
						"trailerIDs": [],
						"orderList": currentItinerary
					};
					currentItineraryString = JSON.stringify(jsonItinerary);
				}
				else {
					var currentItineraryJSON = JSON.parse(Itinerary);
					currentItineraryJSON['orderList'].push(newOrder);
					currentItineraryString = JSON.stringify(currentItineraryJSON);
				}

			}

			else if (functions.includes("Associate_trailer_to_itinerary")) {
				console.log()
				if (Itinerary == null) {
					// no Itinerary stored first trailer added
					var jsonItinerary = {
						"ItineraryID": this.state.ItineraryID,
						"trailerIDs": [],
						"orderList": []
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
		console.log(ItineraryID)
		await this.get_Itinerary_info(ItineraryID, false);
		this.setState({ ItineraryID: ItineraryID });
	}

	async init_Itinerary() {

		const data = contract.methods.init_itinerary().encodeABI();
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
		var resolve = await AsyncAlert('Do you want to initiate a new itinerary?');
		if(resolve = "YES"){
			try {
				await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

				var newItineraryID = await contract.methods.get_current_ItineraryID().call();
				this.setState({ ItineraryID: newItineraryID });
				await this.get_Itinerary_info(newItineraryID, false);

				Alert.alert('Sucess: Itinerary created', 'Itinerary ID: ' + this.state.ItineraryID);
			} catch (error) {
				if (error.toString().includes("already have an open Itinerary")) {
					Alert.alert('Error: user already have an open Itinerary', 'open Itinerary ID: ' + this.state.ItineraryID);
				}
				else{
					Alert.alert("Error:", error.toString())
				}
			}
		}
	}

	async loading_completed() {
		var resolve = await AsyncAlert('Do you want to complete the loading of this itinerary ?');
		if(resolve = "YES"){
			try {
				var Itinerary = await AsyncStorage.getItem('Itinerary');
				var jsonItinerary = JSON.parse(Itinerary);
				jsonItinerary['totWeight'] = this.state.ItineraryInfo['0'];
				jsonItinerary['totVolume'] = this.state.ItineraryInfo['1'];
				jsonItinerary['timeStamp'] = new Date();
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
				else{
					Alert.alert("Error:", error.toString())
				}
			}
		}
	}

	async get_Itinerary_info(ItineraryID, alert) {
		console.log('get_order_info');
		try {
			var ItineraryInfo = await contract.methods.get_Itinerary_info(ItineraryID).call();
			this.setState({ ItineraryInfo: ItineraryInfo });
			if (alert == true) {
				Alert.alert('Itinerary info', 'Itinerary ID: ' + orderID + '\nTruck ID: ' + orderInfo['0'] + '\nTotal weight: ' + orderInfo['1'] + '\nTotal volume: ' + orderInfo['2'] + '\nCO2 emission: ' + orderInfo['3'] + '\nDone: ' + orderInfo['4']);
			}
			return ItineraryInfo;
		}
		catch (e) {
			//Alert.alert('Error: this order ID does not exist', 'Itinerary ID: ' + ItineraryID);
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
							data: "Associate_trailer_to_itinerary",
							ItineraryID: this.state.ItineraryID
						})}
					/>
				</View>
				<Text style={styles.descriptionText}>Associate a trailer to the itinerary</Text>
				<Separator />
				<View>
					<Button
						color={'green'}
						title={"add order"}
						onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
							data: "Associate_itinerary_to_order",
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