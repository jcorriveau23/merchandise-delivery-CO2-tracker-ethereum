import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Alert, AsyncStorage, Linking} from 'react-native';
import {NavigationEvents} from "react-navigation";
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
				"name": "trajectID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "CO2Counter",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
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
				"name": "trajectID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "CO2Counter",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "trajetc_stop",
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
const contract_address = '0x6Fc86F3aeBc3E01b61d29D17CE2F1211cd33BbD4';

const Web3 = require('web3');
const IPFS  = require('ipfs-mini');
const ipfs = new IPFS({host: "ipfs.infura.io", port: 5001, protocol: "https"});

const Tx = require('ethereumjs-tx').Transaction;
import HDWalletProvider from 'truffle-hdwallet-provider';
const mnemonic ='wagon sick artefact august more home program science famous fun magnet crew'; // 12 word mnemonic
const Provider = new HDWalletProvider(mnemonic, 'http://192.168.0.16:7545');
const web3 = new Web3(Provider);
const contract = new web3.eth.Contract(abi, contract_address);
const privateKey = '0x2f5a91464049996a4948ed874409f4cfc56c775ee89760bf9db212927668acb7'
const publicKey = '0xf9Bb59aF9eC60D64274a4d2a61D55CB004FBEa5e'

export default class LoadingAttendant extends Component {

    constructor(props){
        super(props);
        this.state = {
            trajectInfo: "",
            IpfsURL: "",
    
            trajectID: 0,
            totalWeight: 0,
            totalVolume: 0,
            done: false
        };
    }
    async componentDidMount(){
        var trajectID = await contract.methods.get_current_trajectID().call();
        await this.get_traject_info(trajectID, false);
        //this.setState({orderInfo: orderInfo});
        this.setState({trajectID: trajectID});
        
    
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
        try{
            await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
            var newtrajectID = await contract.methods.get_current_trajectID().call();
            this.setState({trajectID: newtrajectID});
            this.setState({IpfsURL: ""})
            await this.get_traject_info(newtrajectID, false);
    
            Alert.alert('traject created', 'traject ID: ' + this.state.trajectID);  
        }catch(error){
            if (error.toString().includes("already have an open traject")) {
                Alert.alert('Error: user already have an open traject', 'open traject ID: ' + this.state.trajectID);
            } 
        }
    }
    async loading_completed(){

        // IPFS
        var hash = "traject content hash"

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
        try{
            await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
            await this.get_traject_info(this.state.trajectID, false);
    
            Alert.alert('traject loaded', 'traject ID: ' + this.state.trajectID);  
        }catch(error){
            if (error.toString().includes("traject is already loaded")) {
                Alert.alert('Error: traject was already loaded', 'traject ID: ' + this.state.trajectID);
            } 
        }
    }
    async get_traject_info(trajectID, alert){
        console.log('get_command_info');
        try {
          var trajectInfo = await contract.methods.get_traject_info(trajectID).call();
          this.setState({trajectInfo: trajectInfo});
          if(alert == true){
            Alert.alert('Traject info', 'Traject ID: ' + commandID + '\nTruck ID: ' + orderInfo['0'] + '\nTotal weight: ' + orderInfo['1'] + '\nTotal volume: ' + orderInfo['2'] + '\nCO2 emission: ' + orderInfo['3'] + '\nDone: ' + orderInfo['4']);
          }
          return trajectInfo;
        }
        catch(e){
          Alert.alert('Error: this command ID does not exist', 'Traject ID: ' + trajectID);
        }
    }
  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.going_back()} />
        <Button
          title={"init new traject"}
          onPress={() => this.init_traject()}
        /> 
        <Button
          title={"loading completed"}
          onPress={() => this.loading_completed()}
        /> 
        <Text>Current traject ID : {this.state.trajectID}</Text>
		<Text>traject total weight: {this.state.trajectInfo['1']}</Text>
		<Text>traject total volume: {this.state.trajectInfo['2']}</Text>
		<Text>traject loaded: {String(this.state.trajectInfo['4'])}</Text>
        <Text>traject done: {String(this.state.trajectInfo['5'])}</Text>
		<Text style={{color: 'blue'}} 
			onPress={() => Linking.openURL(this.state.IpfsURL)}
			>IPFS traject hash: {String(this.state.trajectInfo['3'])}
		</Text>
        <Button
          title={"Associate trailer to traject"}
          onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
              data: "associate_traject"
          })}
        />
        <Button
          title={"add command"}
          onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
              data: "associate_traject",
              trajectID: this.state.trajectID
            })}
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