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
            trajectInfo: "",

            trajectID: 0,
            trailerIds: [],
            commandList: []
        };
    }

    async componentDidMount() {
        var trajectInfo = await this.props.navigation.getParam("data", "No data read");
        this.setState({ trajectInfo: trajectInfo });

        var hash = trajectInfo['6'];

        var trajectContent = await this.ipfsRead(hash);
        var trajectContentJson = JSON.parse(trajectContent)
        this.setState({
            trajectID: trajectContentJson.trajectID,
            trailerIds: trajectContentJson['trailerIDs'],
            commandList: trajectContentJson['commandList'],
        });
    }

    async get_traject_info(trajectID) {
        try {
            var trajectInfo = await contract.methods.get_traject_info(trajectID).call();
            this.setState({ trajectInfo: trajectInfo });

            return trajectInfo;
        }
        catch (e) {
            Alert.alert('Error: this command ID does not exist', 'Traject ID: ' + trajectID);
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
        var newCommandList = this.state.commandList;
        newCommandList.splice(index, 1);
        this.setState({ commandList: newCommandList })
    }
    async dischargeTrailer(index) {
        var newTrailerList = this.state.trailerIds;
        newTrailerList.splice(index, 1);
        this.setState({ trailerIds: newTrailerList })
    }
    async init_traject() {

        const data = contract.methods.new_traject().encodeABI();
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

            var newtrajectID = await contract.methods.get_current_trajectID().call();
            this.setState({ trajectID: newtrajectID });
            return true;

        } catch (error) {
            if (error.toString().includes("already have an open traject")) {
                Alert.alert('Error: user already have an open traject', 'open traject ID: ' + this.state.trajectID);
            }
            return false;
        }
    }
    async associate_traject(commandID) {

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
        try {
            await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            Alert.alert('traject assign to that command', 'command ID: ' + commandID + '\nTraject ID: ' + this.state.trajectID);
            return true;

        } catch (error) {
            console.log(error);
            Alert.alert('something went wrong', 'command ID: ' + commandID + '\nTraject ID: ' + this.state.trajectID);
            return false;
        }

    }
    async associate_trailer(trailerID) {

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
        try {
            await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            Alert.alert('trailer ID assigned to traject', "trailer ID: " + trailerID + '\ntraject ID: ' + this.state.trajectID);
            return true;

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'could not added trailerID to traject\n' + "trailer ID: " + trailerID + '\ntraject ID: ' + this.state.trajectID);
            return false;
        }

    }
    async AsyncStorageTraject(){
        var trajectInfo = await contract.methods.get_traject_info(this.state.trajectID).call();
        var jsonTraject = {
            trajectID: this.state.trajectID,
            trailerIDs: this.state.trailerIds,
            commandList: this.state.commandList,
            totWeight: trajectInfo['0'],
            totVolume: trajectInfo['1']
        }
        var jsonTrajectString = JSON.stringify(jsonTraject);
        AsyncStorage.setItem('traject', jsonTrajectString);
    }
    async loading_completed() {

        try {
            var traject = await AsyncStorage.getItem('traject');
            var hash = await ipfs.add(traject);
            var IpfsURL = 'https://ipfs.infura.io/ipfs/' + hash;
            console.log(IpfsURL);
        }
        catch (error) {
            Alert.alert('Error: IPFS Storing did not work', 'trajectID: ' + this.state.trajectID);
            return false;
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
            await this.get_traject_info(this.state.trajectID, false);
            Alert.alert('traject loaded', 'traject ID: ' + this.state.trajectID);

            AsyncStorage.removeItem("traject");
            return true;
        } catch (error) {
            if (error.toString().includes("traject is already loaded")) {
                Alert.alert('Error: traject was already loaded', 'traject ID: ' + this.state.trajectID);
            }
            return false;
        }
    }
    async reconstruct_traject() {
        var Title = "";
        var message = "";
        var resolve = "";
        var valid = false;

        Title = 'initiate a new traject?';
        message = "";
        resolve = await AsyncAlert(Title, message);

        if (resolve == 'YES') {
            valid = await this.init_traject();
            if (valid == true) {


                var i = 0;
                for (i; i < this.state.commandList.length; i++) {
                    valid == false;

                    Title = 'Add a traject?';
                    message = 'Do you want to add order ID: ' + this.state.commandList[i].commandID + '\nto traject ID: ' + this.state.trajectID;
                    resolve = await AsyncAlert(Title, message);
                    if (resolve == 'YES') {
                        valid = await this.associate_traject(this.state.commandList[i].commandID);
                    }
                    if (valid == false) {
                        var newCommandList = this.state.commandList;
                        newCommandList.splice(i, 1);
                        this.setState({ commandList: newCommandList })
                    }

                }
                for (i = 0; i < this.state.trailerIds.length; i++) {
                    valid = false;

                    Title = 'Add a trailer?';
                    message = 'Do you want to add trailer ID: ' + this.state.trailerIds[i].trailerID + '\nto traject ID: ' + this.state.trajectID;
                    resolve = await AsyncAlert(Title, message);
                    if (resolve == 'YES') {
                        valid = await this.associate_trailer(this.state.trailerIds[i].trailerID);
                    }
                    if (valid == false) {
                        var newTrailerList = this.state.trailerIds;
                        newTrailerList.splice(index, 1);
                        this.setState({ trailerIds: newTrailerList })
                    }
                }
                valid = false;

                Title = 'Close traject?';
                message = 'Do you want to close traject ID: ' + this.state.trajectID;
                resolve = await AsyncAlert(Title, message);
                await this.AsyncStorageTraject();
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
                    {this.state.commandList.map((command, index) => {
                        return <View key={command.commandID}>
                            <Text style={styles.textList} onPress={() => this.dischargeOrder(index)} >{command.commandID}</Text>
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
                        onPress={() => this.reconstruct_traject()}
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