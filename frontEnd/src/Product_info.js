import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Alert, Dimensions, ImageBackground, Linking } from 'react-native';
import { NavigationEvents, SafeAreaView } from "react-navigation";
import './shim';

import Container from './Container';

const $abi = require('./ABI_and_keys')

const mnemonic = $abi.mnemonic
const abi = $abi.abi
const contract_address = $abi.contract_address
const infuraAPI = $abi.Infura_api

const Web3 = require('web3');
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

const Tx = require('ethereumjs-tx').Transaction;
import HDWalletProvider from 'truffle-hdwallet-provider';

const Provider = new HDWalletProvider(mnemonic, infuraAPI);
const web3 = new Web3(Provider);
const contract = new web3.eth.Contract(abi, contract_address);

const Separator = () => (
	<View style={styles.separator} />
);

const Item = ({ orderID }) => (
	<View>
		<Text>{orderID}</Text>
	</View>
);

const renderItem = ({ item }) => (
	<Item orderID={item.orderID} />
);

export default class Info extends Component {

	constructor(props) {
		super(props);
		this.state = {
			UPC: "scan a product",
			Unique: 0,
			Json_Product_info: {
				orderIDList: [],
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
		var orderLenght;
		var ItineraryLenght;
		var orderID;
		var ItineraryID;
		var totProductEmission = 0;
		var ProductCO2EmissionPart = 0;
		var ItineraryCO2Emission = 0;


		var JsonProductInfo = {
			"orderIDList": []
		}

		try {
			orderLenght = await contract.methods.get_product_orders_size(UPC, unique).call();
			console.log(lenght);
		}
		catch (e) {
			Alert.alert('Product not registered yet', 'Product UPC: ' + UPC + '\nUnique ID: ' + unique);
		}


		var i = 0;
		for (i = 0; i < orderLenght; i++) {

			orderID = await contract.methods.get_product_orderID(UPC, unique, i).call();
			await this.get_order_info(orderID);

			var newOrderID = {
				"orderID": orderID,
				"orderHash": this.state.orderInfo['3'],
				"ItineraryList": []
			};

			try {
				ItineraryLenght = await contract.methods.get_order_Itinerary_list_size(orderID).call();
				var j = 0;
				for (j = 0; j < ItineraryLenght; j++) {
					ItineraryID = await contract.methods.get_order_Itinerary_list_index(orderID, j).call();

					await this.get_Itinerary_info(ItineraryID);
					ProductCO2EmissionPart = await contract.methods.get_product_emission(UPC, ItineraryID).call();

					totProductEmission = parseInt(totProductEmission) + parseInt(ProductCO2EmissionPart);

					var newItineraryID = {
						"ItineraryID": ItineraryID,
						"ItineraryHash": this.state.ItineraryInfo['6'],
						"ItineraryCO2Emission": this.state.ItineraryInfo['2'],
						"ProductCO2EmissionPart": ProductCO2EmissionPart
					};

					newOrderID["ItineraryList"].push(newItineraryID)
				}
			}
			catch (e) {
				console.log(e);
				console.log("some order are not yet assigned to an Itinerary")
			}
			JsonProductInfo["orderIDList"].push(newOrderID);
			JsonProductInfo["productTotEmission"] = totProductEmission;
		}
		console.log(JsonProductInfo);
		this.setState({ Json_Product_info: JsonProductInfo })
		return orderLenght;
	}

	async get_Itinerary_info(ItineraryID) {
		try {
			var ItineraryInfo = await contract.methods.get_Itinerary_info(ItineraryID).call();
			this.setState({ ItineraryInfo: ItineraryInfo });
			return ItineraryInfo;
		}
		catch (e) {
			Alert.alert('Error: this order ID does not exist', 'Itinerary ID: ' + ItineraryID);
		}
	}

	async get_order_info(orderID) {
		try {
			var orderInfo = await contract.methods.get_order_info(orderID).call();
			this.setState({ orderInfo: orderInfo });
			return orderInfo;
		}
		catch (e) {
			Alert.alert('Error: this order ID does not exist', 'Itinerary ID: ' + orderID);
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
					{this.state.Json_Product_info.orderIDList.map((order, index) => {
						return <View key={order.orderID}>
							<Text style={styles.textBold}>order ID: {order.orderID}</Text>
							<Text style={styles.ipfs}
								onPress={() => Linking.openURL("https://ipfs.infura.io/ipfs/" + order.orderHash)}
							>IPFS order hash: {String(order.orderHash)}
							</Text>
							{
								order.ItineraryList.map((Itinerary, index) => {
									return <>
										<View key={order.orderID}>
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