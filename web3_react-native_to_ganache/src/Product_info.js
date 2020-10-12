import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Alert, Dimensions, ImageBackground} from 'react-native';
import {NavigationEvents, SafeAreaView} from "react-navigation";
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
const contract_address = '0x66e3DCcD2Bb9ae2a364Bb57A70d46CEDeb26Bc3B';

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

const Item = ({ commandID }) => (
	<View>
	  <Text>{commandID}</Text>
	</View>
  );

const renderItem = ({ item }) => (
	<Item commandID = {item.commandID} />
);

export default class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
            UPC: "",
            Unique: 0,
			command_list: [],
			Json_Product_info: {commandIDList: []},
			list: [{commandID: 1,
					trajectList: [{trajectID: 333}]},
					{commandID: 2,
					trajectList: []},
					{commandID: 477,
					trajectList: []}
					]
        };
    }
    async going_back(){
		var ProductQrCode = await this.props.navigation.getParam("data", "No data read");
		if(ProductQrCode != "No data read"){
			this.setState({UPC: ProductQrCode.UPC});
			this.setState({Unique: ProductQrCode.Unique});
			
			var size = this.Get_product_info(this.state.UPC, this.state.Unique);
		}
  }
    async Get_product_info(UPC, unique) {
		var lenght = 0;
		var commandLenght;
		var trajectLenght;
		var commandID;
		var trajectID;
		var totProductEmission = 0;
		var ProductCO2EmissionPart = 0;
		var trajectCO2Emission = 0;


		var JsonProductInfo = {
			"commandIDList": []
		}

        try {
          commandLenght = await contract.methods.get_product_commands_size(UPC, unique).call();
          console.log(lenght);
        }
        catch(e){
          Alert.alert('Product not registered yet', 'Product UPC: ' + UPC + '\nUnique ID: ' + unique);
        }
    
        var command_list = [];
        var co2_emissions = [];
        
        var i = 0;
        for (i=0; i < commandLenght; i++){

			commandID = await contract.methods.get_product_commandID(UPC, unique, i).call();

			var newCommandID = {
				"commandID": commandID,
				"trajectList": []
			};

			try{
				trajectLenght = await contract.methods.get_command_traject_list_size(commandID).call();
				var j = 0;
				for (j=0; j < trajectLenght; j++){
					trajectID = await contract.methods.get_command_traject_list_index(commandID, j).call();
					console.log( "trajectID: "+ trajectID);

					trajectCO2Emission = await contract.methods.get_traject_emission(trajectID).call();
					console.log( "traject emission: "+ trajectCO2Emission);

					ProductCO2EmissionPart = await contract.methods.get_product_emission(UPC, trajectID).call();
					console.log( "product part: "+ ProductCO2EmissionPart);

					totProductEmission += ProductCO2EmissionPart;

					var newTrajectID = {
						"trajectID": trajectID,
						"trajectCO2Emission": trajectCO2Emission,
						"ProductCO2EmissionPart": ProductCO2EmissionPart
					};
 
					newCommandID["trajectList"].push(newTrajectID)
				}
			}
			catch(e){
				console.log(e);
				console.log("some command are not yet assigned to a traject")
			}
			command_list.push(commandID);
			JsonProductInfo["commandIDList"].push(newCommandID);
			JsonProductInfo["productTotEmission"] = totProductEmission;
        }
        console.log(JsonProductInfo);
		this.setState({command_list: command_list});
		this.setState({Json_Product_info: JsonProductInfo})
        return commandLenght;
    }

  render() {
    return (
	  <SafeAreaView style={styles.container}>
        <NavigationEvents onDidFocus={() => this.going_back()}/>
		<View style={styles.header}>
        <ImageBackground
            source={require("../asset/header.png")}
            style={styles.imageBackground}
            resizeMode="contain"
        >
        <Text style={styles.title}>Product Info</Text>
        </ImageBackground>
        </View>
        <Button
          title={"Scan a product"}
          onPress={() => this.props.navigation.navigate("QRCodeScannerScreen", {
            data: "get_product_info"
        })}
        />
        <Text>UPC: {this.state.UPC}</Text>
        <Text>Unique: {this.state.Unique}</Text>
		{this.state.Json_Product_info.commandIDList.map((command, index) => {
			return <View>
				<Text>command ID: {command.commandID}</Text>
				{
					command.trajectList.map((traject, index) => {
						return <>
								<Text>    traject ID: {traject.trajectID} </Text>
								<Text>        traject CO2 emission: {traject.trajectCO2Emission} </Text>
								<Text>        product emission part: {traject.ProductCO2EmissionPart} </Text>
							</>
					}
					)
				}
				<Text>total product emission: {this.state.Json_Product_info.productTotEmission}</Text>
			</View>

		})		
		}

	  </SafeAreaView>
    );
  }
}

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    marginTop: 0
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  imageBackground: {
    width: width*0.4,
    height: width*0.4,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    marginTop: 25,
    fontWeight: 'bold',
    fontSize: 15
  }
});