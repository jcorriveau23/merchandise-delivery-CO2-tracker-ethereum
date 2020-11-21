pragma solidity ^0.5.0;

contract Command_preparator{

    struct Data {
        UPC[] upcs;
        mapping (string => UPCIds) UpcToIndex;
        uint numUPC;

        Order[] orders;
        uint numOrders;

        Itinerary[] Itineraries;
        uint numItineraries;

        mapping(address => uint) openOrderID;  // link the orderpicker to his current order ID
        mapping(address => uint) LoadingAttendantOpenItineraryID;  // link the loading attendant to his current Itinerary ID
        mapping(address => uint) TruckerOpenItineraryID;  // link the trucker to his current Itinerary ID
        mapping(uint => trailer) TrailerCurrentItinerary; //  Ling the trailer to his current Itinerary ID
    }

    struct UPC {                                // store the weight and volume of a specific product (UPC)
        uint Weight;        
        uint Volume;
        mapping(uint => Product) uniqueProduct; // mapping all unique instantiation of the product
        uint numberProduct;                     // number of unique instantiation
    }

    struct trailer {
        uint currentItineraryID;
        bool isValue;
    }

    struct UPCIds {         // index of the UPC array that doesn't allowed duplication
        uint ID;
        bool isValue;
    }

    struct Product {
        uint[] orderIDs; // dynamic list of orders that is link to this unique product
        uint8 size;
    }

    struct Order {
        uint[] ItineraryIDs;  // dynamic list of ItineraryIDs taken by the order
        uint8 size;         // keep tracks of the number of Itinerary the order take parts in
        uint totWeight;     // total weight of the order = sums of products weight
        uint totVolume;     // total volume of the order = sums of products volume

        bool done;          // 'true' when the order is ready to be charge
        string ipfsOrderHash;
    }

    struct Itinerary {
        uint[] TrailerIDs;  // dynamic list of trailerID (some truc can carry more than one trailer)
        uint8 nbTrailers;
        uint truckID;       // truck that drive the Itinerary
        uint totWeight;     // total weight of the Itinerary = sums of orders total weight
        uint totVolume;     // total volume of the Itinerary = sums of orders total volume

        bool loaded;         // true when the Itinerary is fully charged
        bool started;          // true when the Itinerary is done => co2Emission is valid
        bool done;          // true when the Itinerary is done => co2Emission is valid
        uint co2Emission;   // only valid when => done = true
        string ipfsItineraryHash;
    }

    Data D;

    // get_numUPC
    // description: return the number of registered product on the contract
    // input: N/A
    // output: number of registered product
    function get_numUPC() public view returns(uint nb){
        return D.numUPC;
    }

    // get_upc_weight
    // description: return the weight of a registered product
    // input: _upc of the product
    // output: weight of the product
    function get_upc_weight(string memory _upc) public view returns(uint Weight){
        return D.upcs[D.UpcToIndex[_upc].ID].Weight;
    }

    // get_upc_Volume
    // description: return the volume of a registered product
    // input: _upc of the product
    // output: volume of the product
    function get_upc_Volume(string memory _upc) public view returns(uint Volume){
        return D.upcs[D.UpcToIndex[_upc].ID].Volume;
    }

    // register_product
    // description: register a new product (same UPC can't be registered twice)
    // input: _UPC, _weight, _volume of the new product
    // output:
    function register_product(string memory _upc, uint _weight, uint _volume) public returns(uint) {

        require(D.UpcToIndex[_upc].isValue == false, 'product already registered');
        // Product not generated yet
        D.UpcToIndex[_upc].isValue = true;   // no duplication of upc
        D.UpcToIndex[_upc].ID = D.numUPC;
        D.numUPC++;
        

        UPC memory newUPC;
        newUPC.Weight = _weight;
        newUPC.Volume = _volume;
        newUPC.numberProduct = 0;
        D.upcs.push(newUPC);

        return 1;
    }

    // init_order
    // description: create a new order and return the ID of the order
    // input: N/A
    // return: ID of the order (index in the orders array)
    function init_order() public returns(uint orderID){
        
        uint _orderID = D.openOrderID[msg.sender];
        if(_orderID < D.numOrders){   // 
            require(D.orders[_orderID].done == true, "already have an open Order");  
        }
        
        Order memory newOrder;
        newOrder.size = 0;
        newOrder.totWeight = 0;
        newOrder.totVolume = 0;
        newOrder.done = false;

        D.orders.push(newOrder);
        D.openOrderID[msg.sender] = D.numOrders;
        
        D.numOrders++;

        return (D.numOrders - 1);  // return the index (orderID) of this new order
    }

    // Associate_order_to_unique_product
    // description: add to a unique product's orderIDs list, a new order
    // input: UPC and unique code of the product
    // return: 1 if sucess
    function Associate_order_to_unique_product(string memory _upc, uint _unique) public returns(uint) {
        
        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        
        uint _orderID = D.openOrderID[msg.sender];
        if(_orderID < D.numOrders){   
            require(D.orders[_orderID].done == false, "order must not be completed");  
        }
         
         uint8 size =  D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size;   // index that point where to add the order in the unique product array
         // if first order that we add to the product
         if (size == 0){
             D.upcs[D.UpcToIndex[_upc].ID].numberProduct++;       //new instantiation of the product 
         }
         else{
             uint index = D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].orderIDs[size - 1];    // last order
             require(D.orders[index].done == true, 'a order not completed is already assigned to this product');
             // require that the Itinerary is done not only the last order------------------------------------------------------------------------------------
         }

         D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].orderIDs.push(_orderID); // add the order to the list
         D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size++;

         D.orders[_orderID].totWeight += D.upcs[D.UpcToIndex[_upc].ID].Weight;  // add product weight and volume to Itinerary
         D.orders[_orderID].totVolume += D.upcs[D.UpcToIndex[_upc].ID].Volume;

         return 1;
     }

    // get_product_orders_size
    // description: return the size of a product's order list
    // input: _upc and _unique of a unique product
    // return: orderIDs list size
    function get_product_orders_size(string memory _upc, uint _unique) public view returns(uint){
        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        require(D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size != 0, 'No Order registered yet');

        return D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size;
    }

    // get_product_orderID
    // description: return a single orderID of the list
    // input: _upc and _unique of a unique product + _index of the orderIDs list we want to check
    // return: orderID
    function get_product_orderID(string memory _upc, uint _unique, uint _index) public view returns(uint){

        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        require(D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size != 0, 'No Order registered yet');
        require(_index < D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size, 'index out of bound');
        
        
        return D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].orderIDs[_index];  // return the ItineraryID of the index
    }

    // get_order_info
    // description: return the info of a order
    // input: _orderID
    // return: total weight of the order, total volume of the order and if the order is done or not
    function get_order_info(uint _orderID) public view returns(uint, uint, bool, string memory){
        require(_orderID < D.numOrders, 'this Order does not exist');

        return (D.orders[_orderID].totWeight, D.orders[_orderID].totVolume, D.orders[_orderID].done, D.orders[_orderID].ipfsOrderHash);
    }

     // get_current_order_id
    // description: return the current orderID of a user (orderPicker)
    // input: N/A
    // return: orderID of the user
    function get_current_order_id() public view returns(uint){
        return D.openOrderID[msg.sender];
    }

    // close_order
    // description: set the order completed on the blockchain, it can now be store in an Itinerary
    // input: _orderID
    // return: 
    function close_order(string memory ipfsHash) public returns(bool){

        uint _orderID = D.openOrderID[msg.sender];
        require(D.orders[_orderID].done == false, 'this Order is already done');

        D.orders[_orderID].done = true;
        D.orders[_orderID].ipfsOrderHash = ipfsHash;
        return true;
    }
    
    // get_order_Itinerary_list_size
    // description: return the number of Itinerary this order has take part of
    // input: _orderID
    // return: total weight of the order, total volume of the order and if the order is done or not
    function get_order_Itinerary_list_size(uint _orderID) public view returns(uint8){
        require(_orderID < D.numOrders, 'this Order does not exist');

        return D.orders[_orderID].size;
    }
    
    // get_order_Itinerary_list_index
    // description: one ItineraryID of the order's ItineraryIDs list
    // input: _orderID, _index
    // return: total weight of the order, total volume of the order and if the order is done or not
    function get_order_Itinerary_list_index(uint _orderID, uint8 _index) public view returns(uint){
        require(_orderID < D.numOrders, 'this Order does not exist');
        require(D.orders[_orderID].size > _index);

        return D.orders[_orderID].ItineraryIDs[_index];
    }
    
    // init_itinerary
    // description: create a new Itinerary
    // input: N/A
    // return: the ItineraryID of the new Itinerary (index of the Itineraries list)
    function init_itinerary() public returns(uint ItineraryID){
        uint _ItineraryID = D.LoadingAttendantOpenItineraryID[msg.sender];
        
        if(_ItineraryID < D.numItineraries){   
            require(D.Itineraries[_ItineraryID].loaded == true, "already have an open Itinerary");  
        }
        
        Itinerary memory newItinerary;
        newItinerary.nbTrailers = 0;
        newItinerary.truckID = 0;
        newItinerary.totWeight = 0;
        newItinerary.totVolume = 0;
        newItinerary.loaded = false;
        newItinerary.started = false;
        newItinerary.done = false;
        newItinerary.co2Emission = 0;

        D.Itineraries.push(newItinerary);
        D.LoadingAttendantOpenItineraryID[msg.sender] = D.numItineraries;
        D.numItineraries++;

        return (D.numItineraries - 1);
    }

    // get_current_ItineraryID
    // description: return the current itineraryID of a user (Loading attendant)
    // input: N/A
    // return: itineraryID of the user
    function get_current_ItineraryID() public view returns(uint){
        return D.LoadingAttendantOpenItineraryID[msg.sender];
    }

    // loading_completed
    // description: Mark the itinerary as loaded 
    // input: IPFS hash of the itinerary content
    // return: N/A
    function loading_completed(string memory _IpfsItineraryHash) public returns(bool){
        uint _ItineraryID = D.LoadingAttendantOpenItineraryID[msg.sender];
        require(D.Itineraries[_ItineraryID].loaded == false, "Itinerary is already loaded");
        require(D.Itineraries[_ItineraryID].nbTrailers > 0, "a trailer must be assigned to this Itinerary before closing");

        
        D.Itineraries[_ItineraryID].loaded = true;
        D.Itineraries[_ItineraryID].ipfsItineraryHash = _IpfsItineraryHash;
    }
    
    // Associate_itinerary_to_order
    // description: add the itineraryID value into an order Struct
    // input: orderID that we want to add to this itinerary
    // return: N/A
    function Associate_itinerary_to_order(uint _orderID) public returns(bool) {
        
        require(_orderID < D.numOrders, "this Order does not exist");
        require(D.orders[_orderID].done == true, "this Order is not completed");
        uint size = D.orders[_orderID].size; // index where to add the new ItineraryID
        if(size > 0){
            // if order was already assigned to an Itinerary
            uint last_ItineraryID = D.orders[_orderID].ItineraryIDs[size-1];
            require(D.Itineraries[last_ItineraryID].done == true, "an Itinerary not completed is already assigned to that Order");
        }
        
        uint _ItineraryID = D.LoadingAttendantOpenItineraryID[msg.sender];
        require(_ItineraryID < D.numItineraries, 'this Itinerary does not exist');
        require(D.Itineraries[_ItineraryID].loaded == false, "this Itinerary must not be already loaded");
        
        
        
        D.orders[_orderID].ItineraryIDs.push(_ItineraryID);
        D.orders[_orderID].size++;
        
        D.Itineraries[_ItineraryID].totWeight += D.orders[_orderID].totWeight;
        D.Itineraries[_ItineraryID].totVolume += D.orders[_orderID].totVolume;
        
        return true;
     }
     
    // Associate_trailer_to_itinerary
    // description: add a trailers ID to the user current Itinerary (a truck can transport multiple trailers)
    // input: ID of a order and ID of the Itinerary
    // return: N/A
    function Associate_trailer_to_itinerary(uint _trailerID) public returns(bool) {
        uint _ItineraryID = D.LoadingAttendantOpenItineraryID[msg.sender];
        require(_ItineraryID < D.numItineraries, 'this Itinerary does not exist');
        require(D.Itineraries[_ItineraryID].loaded == false, "this Itinerary must not be already loaded");
        if(D.TrailerCurrentItinerary[_trailerID].isValue == true){
            require(D.Itineraries[D.TrailerCurrentItinerary[_trailerID].currentItineraryID].done == true, "trailer current itinery is not done");
        }
        else{
            D.TrailerCurrentItinerary[_trailerID].isValue = true;
        }
        D.Itineraries[_ItineraryID].TrailerIDs.push(_trailerID);
        D.Itineraries[_ItineraryID].nbTrailers++;
        D.TrailerCurrentItinerary[_trailerID].currentItineraryID = _ItineraryID;
    }
    
    // get_Itinerary_info
    // description: get the information of an itineraryID
    // input: ID of an itinerary
    // return: totWeight, totVolume, co2Emissions, loaded, started, done, IPFS Hash
    function get_Itinerary_info(uint _ItineraryID) public view returns(uint, uint, uint, bool, bool, bool, string memory){
        require(_ItineraryID < D.numItineraries, 'this Itinerary does not exist');

        return (D.Itineraries[_ItineraryID].totWeight, D.Itineraries[_ItineraryID].totVolume, D.Itineraries[_ItineraryID].co2Emission, D.Itineraries[_ItineraryID].loaded, D.Itineraries[_ItineraryID].started, D.Itineraries[_ItineraryID].done, D.Itineraries[_ItineraryID].ipfsItineraryHash);
    }
    
    // get_trailer_current_Itinerary
    // description: get a trailerID, his current itineraryID
    // input: ID of a trailer
    // return: itineraryID associated to the trailer
    function get_trailer_current_Itinerary(uint _trailerID) public view returns(uint){
        require(D.TrailerCurrentItinerary[_trailerID].isValue == true, "trailer does not exist");
        return D.TrailerCurrentItinerary[_trailerID].currentItineraryID;
    }

    // get_trucker_current_ItineraryID
    // description: get the current itinerary of a user (trucker)
    // input: N/A
    // return: ID of the current itinerary of the user    
    function get_trucker_current_ItineraryID() public view returns(uint){
        return D.TruckerOpenItineraryID[msg.sender];
    }

    // grab_Itinerary
    // description: grab a loaded itinerary for a user (Trucker)
    // input: ID of the itinerary
    // return: N/A     
    function grab_Itinerary(uint _ItineraryID) public returns(bool){
        
        
        require(_ItineraryID < D.numItineraries, 'this Itinerary does not exist');
        require(D.Itineraries[_ItineraryID].loaded == true, "this Itinerary must be loaded");
        require(D.Itineraries[_ItineraryID].started == false, "this Itinerary must not be completed");
        uint _lastItineraryID = D.TruckerOpenItineraryID[msg.sender];
        if(_lastItineraryID > 0){
            require(D.Itineraries[_lastItineraryID].done == true, "trucker must have completed is last Itinerary");
        }
        
        D.TruckerOpenItineraryID[msg.sender] = _ItineraryID;
    }    

    // Itinerary_start
    // description: mark the user itinerary as started and store the CO2 truck count into the itinerary
    // input: CO2 value of the truck CO2 counter and the ID of the truck
    // return: N/A   
    function Itinerary_start(uint _CO2Counter, uint _truckID) public returns(bool){
        uint _ItineraryID = D.TruckerOpenItineraryID[msg.sender];
        require(_ItineraryID < D.numItineraries, 'this Itinerary does not exist');
        require(D.Itineraries[_ItineraryID].loaded == true, "this Itinerary must be loaded");
        require(D.Itineraries[_ItineraryID].started == false, "this Itinerary must not be started");
        
        D.Itineraries[_ItineraryID].started = true;
        D.Itineraries[_ItineraryID].truckID = _truckID;
        D.Itineraries[_ItineraryID].co2Emission = _CO2Counter;
        
    }

    // Itinerary_stop
    // description: mark the user itinerary as ended and store the differance between the end and the start CO2 value into the itinerary
    // input: CO2 value of the truck CO2 counter and the ID of the truck
    // return: N/A  
    function Itinerary_stop(uint _CO2Counter, uint _truckID) public returns(bool){
        uint _ItineraryID = D.TruckerOpenItineraryID[msg.sender];
        require(_ItineraryID < D.numItineraries, 'this Itinerary does not exist');
        require(D.Itineraries[_ItineraryID].started == true, "this Itinerary must be started");
        require(D.Itineraries[_ItineraryID].done == false, "this must not already be completed");
        require(D.Itineraries[_ItineraryID].truckID == _truckID, "must be the same truck as Itinerary started");
        require(D.Itineraries[_ItineraryID].co2Emission <= _CO2Counter, "CO2 emission of an Itinerary cant be lower than the start of the itinerary");
        
        D.Itineraries[_ItineraryID].done = true;
        D.Itineraries[_ItineraryID].co2Emission = _CO2Counter - D.Itineraries[_ItineraryID].co2Emission;
    }

    // get_Itinerary_emission
    // description: return the total emission of an ended itinerary
    // input: ID of a completed itinerary
    // return: CO2 emissions of the itinerary     
    function get_Itinerary_emission(uint _ItineraryID) public view returns (uint){
        require(_ItineraryID < D.numItineraries, 'this Itinerary does not exist');
        require(D.Itineraries[_ItineraryID].done == true, "this is not completed");
        
        return D.Itineraries[_ItineraryID].co2Emission;
    }

    // get_product_emission
    // description: return products emission's part in an itinerary
    // input: UPC of a product, and ID of an itinerary it has been part of
    // return: its part bases on the formula in the doc  
    function get_product_emission(string memory _upc, uint _ItineraryID) public view returns (uint){
        require(_ItineraryID < D.numItineraries, 'this Itinerary does not exist');
        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        require(D.Itineraries[_ItineraryID].done == true, "this is not completed");
        
        uint merchandiseWeight = D.Itineraries[_ItineraryID].totWeight;
        uint merchandiseVolume = D.Itineraries[_ItineraryID].totVolume;
        uint productWeight = D.upcs[D.UpcToIndex[_upc].ID].Weight;
        uint productVolume = D.upcs[D.UpcToIndex[_upc].ID].Volume;
        
        
        return (D.Itineraries[_ItineraryID].co2Emission*(productWeight*merchandiseVolume + productVolume*merchandiseWeight) / (2*merchandiseWeight*merchandiseVolume));
    }
}