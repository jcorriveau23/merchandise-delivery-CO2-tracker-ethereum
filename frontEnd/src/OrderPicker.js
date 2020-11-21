import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Alert, Linking, Dimensions, ImageBackground, AsyncStorage } from 'react-native';
import { NavigationEvents } from "react-navigation";
import './shim';
const $abi = require('./ABI_and_keys')

const Web3 = require('web3');
import HDWalletProvider from 'truffle-hdwallet-provider';
const Tx = require('ethereumjs-tx').Transaction;

const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

const mnemonic = $abi.mnemonic
const abi = $abi.abi
const contract_address = $abi.contract_address
const publicKey = $abi.publicKey
const privateKey = $abi.privateKey

const Provider = new HDWalletProvider(mnemonic, 'http://192.168.0.16:7545');
const web3 = new Web3(Provider);
const contract = new web3.eth.Contract(abi, contract_address);


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

export default class OrderPicker extends Component {

	constructor(props) {
		super(props);
		this.state = {
			function: "",
			QrCodeScan: "",
			orderInfo: "",
			IpfsURL: "",

			orderID: 0,
			totalWeight: 0,
			totalVolume: 0,
			done: false
		};
	}

	async going_back() {
		const qrCode = await this.props.navigation.getParam("data", "No data read");
		const functions = await this.props.navigation.getParam("function", "No data read");
		const added = await this.props.navigation.getParam("added", "No data read");

		this.setState({ QrcodeScan: qrCode.UPC });
		this.setState({ function: functions });

		if (functions == "Associate_order_to_unique_product") {

			var currentOrder = [];
			var currentOrderString = "";

			if (added == true) {
				// async storage the new items	
				var order = await AsyncStorage.getItem('order');
				await this.get_order_info(this.state.orderID, false);

				if (order == null) {
					// no order stored first product

					currentOrder.push(qrCode);
					var jsonOrder = {
						"orderID": this.state.orderID,
						"productList": currentOrder
					};
					currentOrderString = JSON.stringify(jsonOrder);
				}
				else {
					var currentOrderJSON = JSON.parse(order);
					currentOrderJSON['productList'].push(qrCode);
					currentOrderString = JSON.stringify(currentOrderJSON);
				}

				await AsyncStorage.setItem('order', currentOrderString);

				console.log("Product added => async storage: " + currentOrderString)
			}

		}


	}

	async componentDidMount() {
		var orderID = await contract.methods.get_current_order_id().call();
		await this.get_order_info(orderID, false);
		//this.setState({orderInfo: orderInfo});
		this.setState({ orderID: orderID });


	}

	async init_order() {

		const data = contract.methods.init_order().encodeABI();
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
		var resolve = await AsyncAlert('Do you want to initiate a new order?');
		if(resolve = "YES"){
			try {
				await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

				var neworderID = await contract.methods.get_current_order_id().call();
				this.setState({ orderID: neworderID });
				this.setState({ IpfsURL: "" })
				await this.get_order_info(neworderID, false);

				Alert.alert('Order created', 'Order ID: ' + this.state.orderID);
			} catch (error) {
				if (error.toString().includes("already have an open order")) {
					Alert.alert('Error: user already have an open order', 'open orderID: ' + this.state.orderID);
				}
			}
		}
	}

	async close_order() {
		var resolve = await AsyncAlert('Do you want to close this order?');
		if(resolve = "YES"){
			try {
				var order = await AsyncStorage.getItem('order');
				var jsonOrder = JSON.parse(order);
				jsonOrder['totWeight'] = this.state.orderInfo['0'];
				jsonOrder['totVolume'] = this.state.orderInfo['1'];
				jsonOrder['timeStamp'] = new Date();
				var hash = await ipfs.add(JSON.stringify(jsonOrder));


				var IpfsURL = 'https://ipfs.infura.io/ipfs/' + hash;

				console.log(IpfsURL);
			}
			catch (error) {
				console.log(error);
				if (error.toString().includes("null is not an object")) {
					Alert.alert('Error: nothing in order', 'wont store order in IPFS\norderID: ' + this.state.orderID);
					var hash = 0; //
				}
				else {
					Alert.alert('Error: IPFS Storing did not work', 'orderID: ' + this.state.orderID);
					return -1;
				}
			}

			const data = contract.methods.close_order(hash).encodeABI();  // send (32 + 2) bytes ipfs hash
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
				await this.get_order_info(this.state.orderID, false);

				Alert.alert('Order closed', 'Order ID: ' + this.state.orderID + '\n' + 'IPFS hash: ' + IpfsURL);
				this.setState({ IpfsURL: IpfsURL })
				AsyncStorage.removeItem("order");

			} catch (error) {
				if (error.toString().includes("user has no open order")) {
					Alert.alert('Error: user has no open order', 'close orderID: ' + this.state.orderID);
				}
			}
	
		}
	}
	async get_order_info(orderID, alert) {
		console.log('get_order_info');
		try {
			var orderInfo = await contract.methods.get_order_info(orderID).call();
			this.setState({ orderInfo: orderInfo });
			if (alert == true) {
				Alert.alert('Order info', 'Order ID: ' + orderID + '\nTotal weight: ' + orderInfo['0'] + '\nTotal volume: ' + orderInfo['1'] + '\nDone: ' + orderInfo['2']);
			}
			return orderInfo;
		}
		catch (e) {
			//Alert.alert('Error: this order ID does not exist', 'Itinerary ID: ' + orderID);
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
						<Text style={styles.title}>OrderPicker</Text>
					</ImageBackground>
				</View>
				<View>
					<Button
						color={'green'}
						title={"Register Product"}
						onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
							data: "Register",
							orderID: 0
						})}
					/>
					<Text style={styles.text}>Register the Weight and Volume of a product (UPC code) on the chain.</Text>
				</View>
				<Separator />
				<View>
					<Button
						color={'green'}
						title={"start order"}
						onPress={() => this.init_order()}
					/>
					<Text style={styles.text}>initiate an order.</Text>
				</View>
				<Separator />
				<View>
					<Text style={styles.textTitle}>Your current Order ID : {this.state.orderID}</Text>
					<Text style={styles.textCenter}>Total weight: {this.state.orderInfo['0']}</Text>
					<Text style={styles.textCenter}>Total volume: {this.state.orderInfo['1']}</Text>

					<Text style={styles.textCenter}>order done: {String(this.state.orderInfo['2'])}</Text>
					<Text style={styles.ipfs}
						onPress={() => Linking.openURL("https://ipfs.infura.io/ipfs/" + this.state.orderInfo['3'])}
					>IPFS hash: {String(this.state.orderInfo['3'])}
					</Text>
				</View>
				<Separator />
				<View>
					<Button
						color={'green'}
						title={"add product to order"}
						onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
							data: "Associate_order_to_unique_product",
							orderID: this.state.orderID
						})}
					/>
					<Text style={styles.text}>Scan a product, to link it to your current order ID</Text>
				</View>
				<Separator />

				<View>
					<Button
						color={'#e00000'}
						title={"close order"}
						onPress={() => this.close_order()}
					/>
					<Text style={styles.text}>close your order and store its content on IPFS</Text>
				</View>
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
	textCenter: {
		fontSize: 15,
		textAlign: "center"
	},
	text: {
		fontSize: 15,
		textAlign: "justify",
		margin: 5
	},
	ipfs: {
		fontSize: 10,
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
		marginTop: 20,
		fontWeight: 'bold',
		fontSize: 20
	},
	separator: {
		marginVertical: 8,
		borderBottomColor: '#737373',
		borderBottomWidth: StyleSheet.hairlineWidth,
	}

});