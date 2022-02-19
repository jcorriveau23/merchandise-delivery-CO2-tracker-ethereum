# CO2_Merchandise_Transportation_Tracker

Proof of concept of a DAPP on Ethereum that track the carbon footprint of merchandise delivery base on products weight and volume.
The goal is to internalize itineraries emissions on products directly.

# Contract deployed on Kovan test Network

https://kovan.etherscan.io/address/0x42d252C728739DF6ba95F739ff9C1AD4DF006Df2

# How to set up the app

1) clone the repo
2) in a command line located in root/frontend, enter npm install
3) in root/frontend/ABI_and_keys.js enter your Kovan mnemonic, private, and public keys for all 3 type of users (can be the same for all users and it must be an hdwallet)
4) connect your phone to your computer
5) in a command line located in root/frontend, enter **react-native start**
6) in another command line located in root/frontend, enter **react-native run-android**

Now you should be able to interact with the contract, you can use QR codes located in root/QrCodes or make your own products

There is no restriction on keys right now any hdwallet can act as any type of users.

See demo of how to use the app:
https://www.youtube.com/watch?v=TZ-BCY8ahPA&t=240s

# Structure of the system:

![Alt text](README_picture/System_structure.jpg?raw=true)

# Contract data Structure:
![Alt text](README_picture/Contract_structure.jpg?raw=true)

# Application pages
## Home
<img src="README_picture/HOME.jpg" alt="HOME" width="300"/>

## Order Picker APP
<img src="README_picture/Order_Picker_APP.jpg" alt="Order_Picker_APP" width="300"/>

## Loading Attendant APP
<img src="README_picture/Loading_attendant_APP.jpg" alt="Loading_attendant_APP" width="300"/>

## Trucker APP
<img src="README_picture/Trucker_APP.jpg" alt="Trucker_APP" width="300"/>

## Product Info APP
<img src="README_picture/Product_info.jpg" alt="Product_info" width="300"/>




