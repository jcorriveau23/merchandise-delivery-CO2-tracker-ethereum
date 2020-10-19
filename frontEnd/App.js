/**
 * Product scanner that add product Weight, Volume and Id to the blockchain
 * Each UPC got his place on the blockchain
 *
 * UPC => Id of 12 number that is the same for each identical products
 */

import React, {Component} from 'react';

import Routes from "./src/Routes";

export default class App extends Component{
  render(){
		console.disableYellowBox = true;
    return <Routes/>;
  }
}
