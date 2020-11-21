
var assert = require('assert');
const Command_preparator = artifacts.require('Command_preparator');



contract('Command_preparator', () => {

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 1 - contract deploy test
	it('Should deploy smart contract properly', async () => {
		const contract = await Command_preparator.deployed();
		assert(contract.address != '');
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 2
	it('A product weight and volume can be registered', async () => {
		const contract = await Command_preparator.deployed();
		await contract.register_product("10000000000001", 3, 2);

		let weight = await contract.get_upc_weight.call("10000000000001");
		assert.equal(weight, 3, "the weight has been registered correctly");
		let volume = await contract.get_upc_Volume.call("10000000000001");
		assert.equal(volume, 2, "the volume has been registered correctly");
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 3
	it('Cant registered a duplicate UPC to the chain', async () => {
		const contract = await Command_preparator.deployed();
		try {
			await contract.register_product("10000000000001", 3, 2);
			await contract.register_product("10000000000001", 3, 2); // duplicate call an error should occur on the console
		}
		catch(e){
			console.log('error: ' + e.reason) // print the error
			assert.equal(e.reason, "product already registered", "product with same UPC was added to the chain");
		}
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 4
	it("a order can be initiated by a loading attendant", async () => {
		const contract = await Command_preparator.deployed();
		orderID = -1;

		await contract.init_order();
		var orderID = await contract.get_current_order_id();
		console.log('order created ID: ' + orderID) // print the error
		assert.equal(orderID, 0, "could not initiate the first order of the contract")
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 5
	it("can't open 2 itinerary at the same time", async () => {
		const contract = await Command_preparator.deployed();
		try{
			await contract.init_order();
		}
		catch(e){
			console.log('error: ' + e.reason) // print the error
			assert.equal(e.reason, "already have an open Order", "user cant open a new order if already have one not close");
		}
		
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 6
	it('Cant add a order to a not registered product', async () => {
		const contract = await Command_preparator.deployed();
		try {
			
			await contract.Associate_order_to_unique_product("30000000000003", 3);  // the product was not registered an error should occur on the console
		}
		catch(e){
			console.log('error: ' + e.reason) // print the error
			assert.equal(e.reason, "must be a product registered", "added a order to a product not registered...");
		}
		await contract.close_order("ipfs link in string");
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 7
	it('A order can be add to a registered product', async () => {
		const contract = await Command_preparator.deployed();
		
		caca = await contract.init_order();

		await contract.register_product("300000000000033", 3, 2);		// register product weight and volume
		await contract.Associate_order_to_unique_product("300000000000033", 1);	// associate a traject to a specific product
		await contract.close_order("ipfs link in string");

		let orderID = await contract.get_product_orderID.call("300000000000033", 1, 0);
		console.log('order ID added: ' + orderID);
		assert.equal(orderID, 1, "orderID was not set correctly");

		
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 8
	it('multiple orders can be assign to a registered product', async () => {
		const contract = await Command_preparator.deployed();
		await contract.register_product("3000000000000333", 3, 2);		// register product weight and volume

		for (let i=0; i<10; i++){  		// associate 10 traject to a specific product
			
			await contract.init_order();
			await contract.Associate_order_to_unique_product("3000000000000333", 1);
			await contract.close_order("ipfs link in string");

			let order = await contract.get_product_orderID.call("3000000000000333", 1, i); // index i of orderIDs list
			console.log('added: ' + i +' => ' + order);
		}

		let order = await contract.get_product_orderID.call("3000000000000333", 1, 2);  // index 2 of traject list
		assert.equal(order, 4, "order was not set correctly");  // index 2 trajecst ID must equal to 4 in this case
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 9
	it('revert when trying to view a orderID with index greater than orderIDs list size', async () => {
		const contract = await Command_preparator.deployed();
		await contract.register_product("30000000000003333", 3, 2);		// register product weight and volume
		
		await contract.init_order();
		
		await contract.Associate_order_to_unique_product("30000000000003333", 3);
		await contract.close_order("ipfs link in string");

		try{
			await contract.get_product_orderID.call('30000000000003333', 3, 4)  // should be reverted 
		}
		catch(e){
			assert.equal(e.toString().includes("index out of bound"), true, "an error should have occured: index out of bound");
		}

	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 10
	it('can get the lenght of a product order list', async () => {
		const contract = await Command_preparator.deployed();
		await contract.register_product("3000000000033333", 3, 2);		// register product weight and volume

		for (let i=0; i<10; i++){  		// associate 10 traject to a specific product
			
			await contract.init_order();
			await contract.Associate_order_to_unique_product("3000000000033333", 1);
			await contract.close_order("ipfs link in string");
			let order = await contract.get_product_orderID.call("3000000000033333", 1, i); // index i of orderIDs list
			console.log('added: ' + i +' => ' + order);
		}

		let size = await contract.get_product_orders_size.call("3000000000033333", 1);  // index 2 of traject list
		assert.equal(size, 10, "the size of the product's order list does not correspond");  // index 2 trajecst ID must equal to 2 in this case
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 11
	it('validate that a order weight and volume cummulate with adding product', async () => {
		const contract = await Command_preparator.deployed();

		currentOrder = await contract.get_current_order_id();
		console.log("current order: " + currentOrder)
		
		let info = await contract.get_order_info(currentOrder);

		console.log("order ID: " + currentOrder)
		console.log("tot Weight: " + info[0]['words'][0])
		console.log("tot Volume: " +info[1]['words'][0])

		assert.equal(info[0]['words'][0], 3, "the weight has not incremented"); 
		assert.equal(info[1]['words'][0], 2, "the volume has not incremented"); 
		assert.equal(info[2], true, "order is not mark as done"); 
		assert.equal(info[3], "ipfs link in string", "ipfs link not stored correctly"); 
	});
	
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 12
	it('We can initiate a new Itinerary', async () => {
		const contract = await Command_preparator.deployed();
		itineraryID = 8;

		await contract.init_itinerary();
		itineraryID = await contract.get_trucker_current_ItineraryID()

		console.log("current itinerary: " + itineraryID)
		assert.equal(itineraryID, 0, "could not initiate de initirery");
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 13
	it("can't open 2 itinerary at the same time", async () => {
		const contract = await Command_preparator.deployed();
		try{
			await contract.init_itinerary();
		}
		catch(e){
			console.log('error: ' + e.reason) // print the error
			assert.equal(e.reason, "already have an open Itinerary", "user cant open a new Itinerary if already have one not close");
		}
		
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 14
	it("cant close an open itinerary without associating a trailer to it", async () => {
		const contract = await Command_preparator.deployed();

		try{
			await contract.loading_completed("ipfs link in string"); // close itinerary as loading attendant
		}
		catch(e){
			console.log('error: ' + e.reason) // print the error
			assert.equal(e.reason, "a trailer must be assigned to this Itinerary before closing", "user cannot close an itinerary without associatin a trailer/container to it");	
		}
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 15
	it("can close an itinerary when associating a trailer to it", async () => {
		const contract = await Command_preparator.deployed();

		var itineraryIDTrailer = -1

		await contract.Associate_trailer_to_itinerary(666);					// add trailer to traject
		await contract.loading_completed("ipfs link in string"); // close itinerary as loading attendant

		var itineraryID = await contract.get_current_ItineraryID()
		console.log("current itinerary ID: " + itineraryID)
		itineraryIDTrailer = await contract.get_trailer_current_Itinerary(666)
		console.log("trailer itinerary ID: " + itineraryIDTrailer)

		var itineraryInfo = await contract.get_Itinerary_info(itineraryID)

		assert.equal(itineraryIDTrailer + 1, itineraryID + 1, "trailer current itineraryID did not change")
		assert.equal(itineraryInfo[3], true, "did not mark itinerary as loaded")
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 16
	it("can add orders to itinerary", async () => {
		const contract = await Command_preparator.deployed();

		await contract.init_itinerary();

		itineraryID = await contract.get_current_ItineraryID()
		console.log("current itinerary: " + itineraryID)
		await contract.Associate_itinerary_to_order(22);

		itineraryInfo = await contract.get_Itinerary_info(itineraryID);
		console.log("current Loading attendant Itinerary ID: " + itineraryID)
		console.log("total Weight: " + itineraryInfo[0]['words'][0])
		console.log("total Volume: " + itineraryInfo[1]['words'][0])

		assert.equal(itineraryInfo[0]['words'][0], 3, "could not add order 22 to open itinerary")
		assert.equal(itineraryInfo[1]['words'][0], 2, "could not add order 22 to open itinerary")


		itineraryListSize = await contract.get_order_Itinerary_list_size(22);
		itineraryID = await contract.get_order_Itinerary_list_index(22, 0)
		
		console.log("Order 22 => itinerary list size: " + itineraryListSize)
		console.log("Order 22 => itinerary ID : " + itineraryID)

		assert.equal(itineraryListSize, 1, "itinerary not added to order")
		assert.equal(itineraryID, 1, "not the right itinerary added to the order")

		await contract.Associate_trailer_to_itinerary(6666)

		await contract.loading_completed("ipfs link in string")

	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 17
	it("multiple order ID can be added to an itinerary and cummulated weight + Volume correspond", async () => {
		const contract = await Command_preparator.deployed();
		var totWeight = 0;
		var totVolume = 0;

		await contract.init_itinerary();

		itineraryID = await contract.get_current_ItineraryID();
		console.log("current itinerary: " + itineraryID);

		for (i = 0; i < 22; i++){
			await contract.Associate_itinerary_to_order(i);
			console.log("added itinerary: " + i)
			orderInfo = await contract.get_order_info(i)

			totWeight += orderInfo[0]['words'][0]
			totVolume += orderInfo[1]['words'][0]
		}
		
		console.log("Weight cumulated: " + totWeight + ", Volume cumulated: " + totVolume)

		itineraryInfo = await contract.get_Itinerary_info(itineraryID)

		assert.equal(totWeight, itineraryInfo[0]['words'][0], "Weight cumulated is not the same")
		assert.equal(totVolume, itineraryInfo[1]['words'][0], "Volume cumulated is not the same")

		await contract.Associate_trailer_to_itinerary(66666)
		await contract.loading_completed("ipfs link in string")
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 18
	it("A trucker can grab an itinerary", async () => {
		const contract = await Command_preparator.deployed();
		
		itineraryID = -1;

		await contract.grab_Itinerary(2);  // itinerary 2 from last test
		itineraryID = await contract.get_trucker_current_ItineraryID();
		assert.equal(itineraryID, 2, "could not grab the itinerary ID")

	});
	
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 19
	it("a trucker can start a traject, by sending the CO2Counter truck Counter value and truckID", async () => {
		const contract = await Command_preparator.deployed();

		itineraryID = await contract.get_trucker_current_ItineraryID();
		
		CO2Counter = 9000
		truckID = 999
		await contract.Itinerary_start(CO2Counter, truckID)

		itineraryInfo = await contract.get_Itinerary_info(itineraryID)

		console.log("itinerary ID: " + itineraryID + "started")
		console.log("CO2 counter value: " + itineraryInfo[2]['words'][0])
		console.log("itinerary started: " + itineraryInfo[3])

		assert.equal(itineraryInfo[2]['words'][0], CO2Counter, "did not set CO2 Counter")
		assert.equal(itineraryInfo[3], true, "did not mark the itinerary as started")

	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 20
	it("a trucker cant end an itinerary when closing the itinerary with a different truckID", async () => {
		const contract = await Command_preparator.deployed();

		var itineraryID = await contract.get_trucker_current_ItineraryID();

		var CO2Counter_stop = 9900
		var truckID = 888
		try{
			await contract.Itinerary_stop(CO2Counter_stop, truckID)
		}
		catch(e){
			console.log("Error: " + e.reason)
			assert.equal(e.reason, "must be the same truck as Itinerary started", "did not detect different truckID")
		}
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 21
	it("a trucker cant end an itinerary when closing the itinerary with a CO2 counter lower than the start counter", async () => {
		const contract = await Command_preparator.deployed();

		var itineraryID = await contract.get_trucker_current_ItineraryID();
		
		var CO2Counter_stop = 100 // lower than start (9000)
		var truckID = 999

		try{
			await contract.Itinerary_stop(CO2Counter_stop, truckID)
		}
		catch(e){
			console.log("Error: " + e.reason)
			assert.equal(e.reason, "CO2 emission of an Itinerary cant be lower than the start of the itinerary", "did not detect lower CO2 counter emissions")
		}

	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 22
	it("a trucker can end a traject by sending the CO2Counter truck Counter value and truckID", async () => {
		const contract = await Command_preparator.deployed();

		var itineraryID = await contract.get_trucker_current_ItineraryID();
		
		var CO2Counter_start = 9000
		var CO2Counter_stop = 9900
		var truckID = 999
		await contract.Itinerary_stop(CO2Counter_stop, truckID)

		itineraryInfo = await contract.get_Itinerary_info(itineraryID)
		console.log("itinerary ID: " + itineraryID)
		console.log("CO2 counter value: " + itineraryInfo[2]['words'][0])
		console.log("itinerary done; " + itineraryInfo[4])

		assert.equal(itineraryInfo[2]['words'][0], CO2Counter_stop - CO2Counter_start, "did not calculate stop - start CO2 value")
		assert.equal(itineraryInfo[4], true, "did not mark the itinerary as done")

	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 23
	it("we can get from total CO2 itinerary emissions, specific emissions from one product", async () => {
		const contract = await Command_preparator.deployed();

		var expectedProductCO2 = 0;
		var ProductCO2 = 0
		var UPC = "300000000000033"
		var Unique = 1
		var ProductWeight = 3
		var ProductVolume = 2
		var itineraryID = -1
		
		orderListSize = await contract.get_product_orders_size(UPC, Unique)

		for(i = 0; i < orderListSize; i++){
			orderID = await contract.get_product_orderID(UPC, Unique, i)
			console.log("participated in orderID: " + orderID)

			itineraryListSize = await contract.get_order_Itinerary_list_size(orderID);

			for(j=0; j < itineraryListSize; j++){
				itineraryID = await contract.get_order_Itinerary_list_index(orderID, j)
				console.log("participated in itineraryID: " + itineraryID);

				itineraryInfo = await contract.get_Itinerary_info(itineraryID)
				
				itineraryCO2Emissions = itineraryInfo[2]['words'][0]
				itineraryTotalWeight = itineraryInfo[0]['words'][0]
				itineraryTotalVolume = itineraryInfo[1]['words'][0]

				expectedProductCO2 += parseInt(itineraryCO2Emissions * 0.5 * ((ProductWeight / itineraryTotalWeight) + (ProductVolume / itineraryTotalVolume)));
				ProductCO2 += parseInt(await contract.get_product_emission(UPC, itineraryID));
				console.log("expected Product cumulate emissions: " + expectedProductCO2);
				console.log("from contract Product cumulate emissions: " + ProductCO2)

			}
		
			assert.equal(expectedProductCO2, ProductCO2, "Problem in CO2 product calculation")
		}
	});
});
