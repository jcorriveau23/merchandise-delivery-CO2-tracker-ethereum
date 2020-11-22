module.exports = {
    abi : [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_orderID",
                    "type": "uint256"
                }
            ],
            "name": "Associate_itinerary_to_order",
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
                    "name": "_unique",
                    "type": "uint256"
                }
            ],
            "name": "Associate_order_to_unique_product",
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
            "name": "Associate_trailer_to_itinerary",
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
                    "name": "ipfsHash",
                    "type": "string"
                }
            ],
            "name": "close_order",
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
            "name": "get_current_order_id",
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
                    "internalType": "uint256",
                    "name": "_orderID",
                    "type": "uint256"
                },
                {
                    "internalType": "uint8",
                    "name": "_index",
                    "type": "uint8"
                }
            ],
            "name": "get_order_Itinerary_list_index",
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
                    "name": "_orderID",
                    "type": "uint256"
                }
            ],
            "name": "get_order_Itinerary_list_size",
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
                    "name": "_orderID",
                    "type": "uint256"
                }
            ],
            "name": "get_order_info",
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
            "name": "get_product_orderID",
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
            "name": "get_product_orders_size",
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
            "inputs": [],
            "name": "init_itinerary",
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
            "name": "init_order",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "orderID",
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
            "name": "register_product",
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
        }
    ],
    contract_address : '0x42d252C728739DF6ba95F739ff9C1AD4DF006Df2',
    Infura_api: 'https://kovan.infura.io/v3/64cb42b562044403aeb899e757921511',

    //Order Picker Keys
    mnemonic_OP : 'your Order Picker hdwallet mnemonic',
    privateKey_OP : 'your Order Picker private key',
    publicKey_OP : 'your Order Picker public key',

    //Loading attendant Keys
    mnemonic_LA : 'your Loading attendant hdwallet mnemonic',
    privateKey_LA : 'your Loading attendant private key',
    publicKey_LA : 'your Order Picker public key',

    //Trucker Keys
    mnemonic_T : 'your Trucker hdwallet mnemonic',
    privateKey_T : 'your Trucker private key',
    publicKey_T : 'your Trucker public key',
} 