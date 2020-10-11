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
const contract_address = '0x70B621393c4498694288786Bc628fBd17c732fd2';

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
			commandID: 0,
            trajectInfo: "",
    
            trajectID: 0,
            totalWeight: 0,
            totalVolume: 0,
            done: false
        };
	}
	async going_back(){
		var commandID = await this.props.navigation.getParam("data", "No data read");
		var functions = await this.props.navigation.getParam("function", "No data read");
		var added = await this.props.navigation.getParam("added", "No data read");
		var trailerID = await this.props.navigation.getParam("trailerID", "No data read");

		console.log(commandID);
		console.log(trailerID);
		console.log(functions);
		console.log(added);

		this.setState({commandID: commandID});
		this.setState({function: functions});

		// info has been added to the traject
		if(added == true){	
			var currentTraject = [];
			var currentTrajectString = "";

			// async storage the current traject info	
			var traject = await AsyncStorage.getItem('traject');

			
			if(functions.includes("traject")){
				var orderInfo = await contract.methods.get_command_info(commandID).call();

				var newCommand = {
					"commandID": commandID,
					"totWeight": orderInfo['0'],
					"totVolume": orderInfo['1']
				}

				await this.get_traject_info(this.state.trajectID, false);
	
				if(traject == null){
					// no traject stored first command added
					currentTraject.push(newCommand);
					var jsonTraject = {
						"trajectID": this.state.trajectID,
						"trailerIDs": [],
						"commandList": currentTraject
					};
					currentTrajectString = JSON.stringify(jsonTraject);
				}
				else{
					var currentTrajectJSON = JSON.parse(traject);
					currentTrajectJSON['commandList'].push(newCommand);
					currentTrajectString = JSON.stringify(currentTrajectJSON);
				}

				}	
			
			else if(functions.includes("trailer")){
				if(traject == null){
					// no traject stored first trailer added
					var jsonTraject = {
						"trajectID": this.state.trajectID,
						"trailerIDs": [],
						"commandList": []
					};
					jsonTraject["trailerIDs"].push(trailerID)
					currentTrajectString = JSON.stringify(jsonTraject);
				}
				else{
					var currentTrajectJSON = JSON.parse(traject);
					currentTrajectJSON['trailerIDs'].push(trailerID);
					currentTrajectString = JSON.stringify(currentTrajectJSON);
				}
			}
			AsyncStorage.setItem('traject', currentTrajectString);
			console.log(currentTrajectString);
		}
			

	}

    async componentDidMount(){
        var trajectID = await contract.methods.get_current_trajectID().call();
        await this.get_traject_info(trajectID, false);
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
            await this.get_traject_info(newtrajectID, false);
    
            Alert.alert('traject created', 'traject ID: ' + this.state.trajectID);  
        }catch(error){
            if (error.toString().includes("already have an open traject")) {
                Alert.alert('Error: user already have an open traject', 'open traject ID: ' + this.state.trajectID);
            } 
        }
	}
	
    async loading_completed(){

		try{
			var traject = await AsyncStorage.getItem('traject');
			var jsonTraject = JSON.parse(traject); 
			jsonTraject['totWeight'] = this.state.trajectInfo['1'];
			jsonTraject['totVolume'] = this.state.trajectInfo['2'];
			var hash = await ipfs.add(JSON.stringify(jsonTraject));
			
	
			var IpfsURL = 'https://ipfs.infura.io/ipfs/'+hash;
	
			console.log(IpfsURL);
		}
		catch(error){
			console.log(error);
			if(error.toString().includes("null is not an object")){
				Alert.alert('Error: nothing in traject', 'wont store order in IPFS\ntrajectID: ' + this.state.trajectID);
				var hash = 0; //
			}
			else{
				Alert.alert('Error: IPFS Storing did not work', 'trajectID: ' + this.state.trajectID);
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
		<Text>traject total weight: {this.state.trajectInfo['0']}</Text>
		<Text>traject total volume: {this.state.trajectInfo['1']}</Text>
		<Text>traject CO2 emission: {this.state.trajectInfo['2']}</Text>
        <Text>traject loaded: {String(this.state.trajectInfo['3'])}</Text>
        <Text>traject started: {String(this.state.trajectInfo['4'])}</Text>
		<Text>traject done: {String(this.state.trajectInfo['5'])}</Text>
		<Text style={{color: 'blue'}} 
			onPress={() => Linking.openURL("https://ipfs.infura.io/ipfs/"+this.state.trajectInfo['6'])}
			>IPFS hash: {String(this.state.trajectInfo['6'])}
		</Text>
        <Button
          title={"Associate trailer to traject"}
          onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
			  data: "associate_trailer",
			  trajectID: this.state.trajectID
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