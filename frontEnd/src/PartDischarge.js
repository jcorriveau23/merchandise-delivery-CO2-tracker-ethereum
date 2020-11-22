import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Alert, AsyncStorage, Linking, Dimensions, ImageBackground } from 'react-native';
import { NavigationEvents } from "react-navigation";
import './shim';

const $abi = require('./ABI_and_keys')

const mnemonic = $abi.mnemonic
const abi = $abi.abi
const contract_address = $abi.contract_address
const publicKey = $abi.publicKey
const privateKey = $abi.privateKey
const infuraAPI = $abi.Infura_api

const Web3 = require('web3');
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
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

export default class PartDischarge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ItineraryInfo: "",

            ItineraryID: 0,
            trailerIds: [],
            orderList: []
        };
    }

    async componentDidMount() {
        var ItineraryInfo = await this.props.navigation.getParam("data", "No data read");
        this.setState({ ItineraryInfo: ItineraryInfo });

        var hash = ItineraryInfo['6'];

        var ItineraryContent = await this.ipfsRead(hash);
        var ItineraryContentJson = JSON.parse(ItineraryContent)
        this.setState({
            ItineraryID: ItineraryContentJson.ItineraryID,
            trailerIds: ItineraryContentJson['trailerIDs'],
            orderList: ItineraryContentJson['orderList'],
        });
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
    async ipfsRead(hash) {
        try {
            return await ipfs.cat(hash);
        }
        catch (e) {

        }


    }

    async dischargeOrder(index) {
        var newOrderList = this.state.orderList;
        newOrderList.splice(index, 1);
        this.setState({ orderList: newOrderList })
    }
    async dischargeTrailer(index) {
        var newTrailerList = this.state.trailerIds;
        newTrailerList.splice(index, 1);
        this.setState({ trailerIds: newTrailerList })
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
        try {
            await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            var newItineraryID = await contract.methods.get_current_ItineraryID().call();
            this.setState({ ItineraryID: newItineraryID });
            return true;

        } catch (error) {
            if (error.toString().includes("already have an open Itinerary")) {
                Alert.alert('Error: user already have an open Itinerary', 'open Itinerary ID: ' + this.state.ItineraryID);
            }
            else{
                Alert.alert("Error:", error.toString())
            }
            return false;
        }
    }
    async associate_Itinerary(orderID) {

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
        try {
            await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            Alert.alert('Itinerary assign to that order', 'order ID: ' + orderID + '\nItinerary ID: ' + this.state.ItineraryID);
            return true;

        } catch (error) {
            Alert.alert('something went wrong', 'order ID: ' + orderID + '\nItinerary ID: ' + this.state.ItineraryID);
            return false;
        }

    }
    async Associate_trailer_to_itinerary(trailerID) {

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
        try {
            await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            Alert.alert('trailer ID assigned to Itinerary', "trailer ID: " + trailerID + '\nItinerary ID: ' + this.state.ItineraryID);
            return true;

        } catch (error) {
            Alert.alert('Error', 'could not added trailerID to Itinerary\n' + "trailer ID: " + trailerID + '\nItinerary ID: ' + this.state.ItineraryID);
            return false;
        }

    }
    async AsyncStorageItinerary(){
        var ItineraryInfo = await contract.methods.get_Itinerary_info(this.state.ItineraryID).call();
        var jsonItinerary = {
            ItineraryID: this.state.ItineraryID,
            trailerIDs: this.state.trailerIds,
            orderList: this.state.orderList,
            totWeight: ItineraryInfo['0'],
            totVolume: ItineraryInfo['1']
        }
        var jsonItineraryString = JSON.stringify(jsonItinerary);
        AsyncStorage.setItem('Itinerary', jsonItineraryString);
    }
    async loading_completed() {

        try {
            var Itinerary = await AsyncStorage.getItem('Itinerary');
            var hash = await ipfs.add(Itinerary);
            var IpfsURL = 'https://ipfs.infura.io/ipfs/' + hash;
            console.log(IpfsURL);
        }
        catch (error) {
            Alert.alert('Error: IPFS Storing did not work', 'ItineraryID: ' + this.state.ItineraryID);
            return false;
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
            Alert.alert('Itinerary loaded', 'Itinerary ID: ' + this.state.ItineraryID);

            AsyncStorage.removeItem("Itinerary");
            return true;
        } catch (error) {
            if (error.toString().includes("Itinerary is already loaded")) {
                Alert.alert('Error: Itinerary was already loaded', 'Itinerary ID: ' + this.state.ItineraryID);
            }
            else{
                Alert.alert("Error:", error.toString())
            }
            return false;
        }
    }
    async reconstruct_Itinerary() {
        var Title = "";
        var message = "";
        var resolve = "";
        var valid = false;

        Title = 'initiate a new Itinerary?';
        message = "";
        resolve = await AsyncAlert(Title, message);

        if (resolve == 'YES') {
            valid = await this.init_Itinerary();
            if (valid == true) {

                var i = 0;
                for (i; i < this.state.orderList.length; i++) {
                    valid == false;

                    Title = 'Add an Itinerary?';
                    message = 'Do you want to add order ID: ' + this.state.orderList[i].orderID + '\nto Itinerary ID: ' + this.state.ItineraryID;
                    resolve = await AsyncAlert(Title, message);
                    if (resolve == 'YES') {
                        valid = await this.associate_Itinerary(this.state.orderList[i].orderID);
                    }
                    if (valid == false) {
                        var newOrderList = this.state.orderList;
                        newOrderList.splice(i, 1);
                        this.setState({ orderList: newOrderList })
                    }
                }
                for (i = 0; i < this.state.trailerIds.length; i++) {
                    valid = false;

                    Title = 'Add a trailer?';
                    message = 'Do you want to add trailer ID: ' + this.state.trailerIds[i].trailerID + '\nto Itinerary ID: ' + this.state.ItineraryID;
                    resolve = await AsyncAlert(Title, message);
                    if (resolve == 'YES') {
                        valid = await this.Associate_trailer_to_itinerary(this.state.trailerIds[i].trailerID);
                    }
                    if (valid == false) {
                        var newTrailerList = this.state.trailerIds;
                        newTrailerList.splice(index, 1);
                        this.setState({ trailerIds: newTrailerList })
                    }
                }
                valid = false;

                Title = 'Close Itinerary?';
                message = 'Do you want to close Itinerary ID: ' + this.state.ItineraryID;
                resolve = await AsyncAlert(Title, message);
                await this.AsyncStorageItinerary();
                if (resolve == 'YES') {
                    valid = await this.loading_completed();
                }
            }

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground
                        source={require("../asset/header.png")}
                        style={styles.imageBackground}
                        resizeMode="contain"
                    >
                        <Text style={styles.title}>Part discharge</Text>
                    </ImageBackground>
                </View>
                <View>
                    <Text style={styles.textTitle}>Select order you are discharging!</Text>
                    {this.state.orderList.map((order, index) => {
                        return <View key={order.orderID}>
                            <Text style={styles.textList} onPress={() => this.dischargeOrder(index)} >{order.orderID}</Text>
                        </View>
                    })
                    }

                    <Text style={styles.textTitle}>Select Trailer you are discharging! </Text>
                    {this.state.trailerIds.map((trailer, index) => {
                        return <View key={trailer.trailerID}>
                            <Text style={styles.textList} onPress={() => this.dischargeTrailer(index)} >{trailer.trailerID}</Text>
                        </View>
                    })
                    }
                </View>
                <Text></Text>
                <Separator />
                <View>
                    <Button
                        color={'green'}
                        title={"Good to go?"}
                        onPress={() => this.reconstruct_Itinerary()}
                    />
                </View>
                <Separator />
                <View>
                    <Button
                        color={'orange'}
                        title={"Reset?"}
                        onPress={() => this.componentDidMount()}
                    />
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
        textDecorationLine: 'underline',
        margin: 10
    },
    textList: {
        fontSize: 15,
        textAlign: "center",
        margin: 5
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