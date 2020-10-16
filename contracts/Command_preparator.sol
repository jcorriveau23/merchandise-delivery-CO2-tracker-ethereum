pragma solidity ^0.5.0;

contract Command_preparator{

    struct Data {
        UPC[] upcs;
        mapping (string => UPCIds) UpcToIndex;
        uint numUPC;

        Command[] commands;
        uint numCommands;

        Itinerary[] Itinerarys;
        uint numItinerarys;

        mapping(address => uint) openCommandID;  // link the orderpicker to is current order ID
        mapping(address => uint) LoadingAttendantOpenItineraryID;  // link the loading attendant to his current Itinerary ID
        mapping(address => uint) TruckerOpenItineraryID;  // link the trucker to his current Itinerary ID
        mapping(uint => uint) TrailerCurrentItinerary; //  Ling the trailer to his current Itinerary ID
    }

    struct UPC {                                // store the weight and volume of a specific product (UPC)
        string UPC;// could be deleted
        uint Weight;        
        uint Volume;
        mapping(uint => Product) uniqueProduct; // mapping all unique instantiation of the product
        uint numberProduct;                     // number of unique instantiation
    }

    struct UPCIds {         // index of the UPC array that doesn't allowed duplication
        uint ID;
        bool isValue;
    }

    struct Product {
        uint[] commandIDs; // dynamic list of commands that is link to this unique product
        uint8 size;
    }

    struct Command {
        uint[] ItineraryIDs;  // dynamic list of ItineraryIDs taken by the command
        uint8 size;         // keep tracks of the number of Itinerary the command take parts in
        uint totWeight;     // total weight of the command = sums of products weight
        uint totVolume;     // total volume of the command = sums of products volume

        bool done;          // 'true' when the command is ready to be charge
        string ipfsCommandHash;
        //uint co2Emission
    }

    struct Itinerary {
        uint[] TrailerIDs;  // dynamic list of trailerID (some truc can carry more than one trailer)
        uint8 nbTrailers;    //
        uint truckID;       // truck that drive the Itinerary
        uint totWeight;     // total weight of the Itinerary = sums of commands total weight
        uint totVolume;     // total volume of the Itinerary = sums of commands total volume
        // uint fromID;
        // uint toID;
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

    // New_product
    // description: register a new product (same UPC can't be registered twice)
    // input: _UPC, _weight, _volume of the new product
    // output:
    function New_product(string memory _upc, uint _weight, uint _volume) public returns(uint) {

        require(D.UpcToIndex[_upc].isValue == false, 'product already registered');
        // Product not generated yet
        D.UpcToIndex[_upc].isValue = true;   // no duplication of upc
        D.UpcToIndex[_upc].ID = D.numUPC;
        D.numUPC++;
        

        UPC memory newUPC;
        newUPC.UPC = _upc;
        newUPC.Weight = _weight;
        newUPC.Volume = _volume;
        newUPC.numberProduct = 0;
        D.upcs.push(newUPC);

        return 1;
    }

    // new_command
    // description: create a new command and return the ID of the command
    // input: N/A
    // return: ID of the command (index in the commands array)
    function new_command() public returns(uint commandID){
        
        uint _commandID = D.openCommandID[msg.sender];
        if(_commandID < D.numCommands){   
            require(D.commands[_commandID].done == true, "already have an open command");  
        }
        
        Command memory newCommand;
        newCommand.size = 0;
        newCommand.totWeight = 0;
        newCommand.totVolume = 0;
        newCommand.done = false;

        D.commands.push(newCommand);
        D.openCommandID[msg.sender] = D.numCommands;
        
        D.numCommands++;

        return (D.numCommands - 1);  // return the index (commandID) of this new command
    }

    // Associate_command
    // description: add to a unique product's commandIDs list, a new command
    // input:
    // return:
     function Associate_Command(string memory _upc, uint _unique) public returns(uint) {
        
        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        
        uint _commandID = D.openCommandID[msg.sender];
        if(_commandID < D.numCommands){   
            require(D.commands[_commandID].done == false, "command must not be completed");  
        }
         
         uint8 size =  D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size;   // index that point where to add the command in the unique product array
         // if first command that we add to the product
         if (size == 0){
             D.upcs[D.UpcToIndex[_upc].ID].numberProduct++;       //new instantiation of the product 
         }
         else{
             uint index = D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].commandIDs[size - 1];    // last command
             require(D.commands[index].done == true, 'a command not completed is already assigned to this product');
             // require that the Itinerary is done not only the last command------------------------------------------------------------------------------------
         }

         D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].commandIDs.push(_commandID); // add the command to the list
         D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size++;

         D.commands[_commandID].totWeight += D.upcs[D.UpcToIndex[_upc].ID].Weight;  // add product weight and volume to Itinerary
         D.commands[_commandID].totVolume += D.upcs[D.UpcToIndex[_upc].ID].Volume;

         return 1;
     }

    // get_product_commands_size
    // description: return the size of a product's command list
    // input: _upc and _unique of a unique product
    // return: commandIDs list size
    function get_product_commands_size(string memory _upc, uint _unique) public view returns(uint){
        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        require(D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size != 0, 'No command registered yet');

        return D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size;
    }

    // get_product_commandID
    // description: return a single commandID of the list
    // input: _upc and _unique of a unique product + _index of the commandIDs list we want to check
    // return: commandID
    function get_product_commandID(string memory _upc, uint _unique, uint _index) public view returns(uint){

        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        require(D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size != 0, 'No command registered yet');
        require(_index < D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size, 'index out of bound');
        
        
        return D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].commandIDs[_index];  // return the ItineraryID of the index
    }

    // get_command_info
    // description: return the info of a command
    // input: _commandID
    // return: total weight of the command, total volume of the command and if the command is done or not
    function get_command_info(uint _commandID) public view returns(uint, uint, bool, string memory){
        require(_commandID < D.numCommands, 'this command does not exist');

        return (D.commands[_commandID].totWeight, D.commands[_commandID].totVolume, D.commands[_commandID].done, D.commands[_commandID].ipfsCommandHash);
    }
    
    // get_command_Itinerary_list_size
    // description: return the number of Itinerary this command has take part of
    // input: _commandID
    // return: total weight of the command, total volume of the command and if the command is done or not
    function get_command_Itinerary_list_size(uint _commandID) public view returns(uint8){
        require(_commandID < D.numCommands, 'this command does not exist');

        return D.commands[_commandID].size;
    }
    
    // get_command_Itinerary_list_index
    // description: one ItineraryID of the command's ItineraryIDs list
    // input: _commandID, _index
    // return: total weight of the command, total volume of the command and if the command is done or not
    function get_command_Itinerary_list_index(uint _commandID, uint8 _index) public view returns(uint){
        require(_commandID < D.numCommands, 'this command does not exist');
        require(D.commands[_commandID].size > _index);

        return D.commands[_commandID].ItineraryIDs[_index];
    }
    
    // get_command_info
    // description: return the info of a command
    // input: _commandID
    // return: total weight of the command, total volume of the command and if the command is done or not
    function get_current_command_id() public view returns(uint){

        return D.openCommandID[msg.sender];
    }

    // command_completed
    // description: set the command completed on the blockchain, it can now be store in an Itinerary
    // input: _commandID
    // return: 
    function command_completed(string memory ipfsHash) public returns(bool){

        uint _commandID = D.openCommandID[msg.sender];
        require(D.commands[_commandID].done == false, 'this command is already done');

        //D.openCommandID[msg.sender] = 0;
        D.commands[_commandID].done = true;
        D.commands[_commandID].ipfsCommandHash = ipfsHash;
        return true;
    }

    // new_Itinerary
    // description: create a new Itinerary
    // input: N/A
    // return: the ItineraryID of the new Itinerary (index of the Itinerarys list)
    function new_Itinerary() public returns(uint ItineraryID){
        uint _ItineraryID = D.LoadingAttendantOpenItineraryID[msg.sender];
        
        if(_ItineraryID < D.numItinerarys){   
            require(D.Itinerarys[_ItineraryID].loaded == true, "already have an open Itinerary");  
        }
        
        Itinerary memory newItinerary;
        newItinerary.nbTrailers = 0;
        newItinerary.truckID = 0;
        newItinerary.totWeight = 0;
        newItinerary.totVolume = 0;
        newItinerary.loaded = false;
        newItinerary.done = false;
        newItinerary.co2Emission = 0;

        D.Itinerarys.push(newItinerary);
        D.LoadingAttendantOpenItineraryID[msg.sender] = D.numItinerarys;
        D.numItinerarys++;

        return (D.numItinerarys - 1);
    }
    
    function loading_completed(string memory _IpfsItineraryHash) public returns(bool){
        uint _ItineraryID = D.LoadingAttendantOpenItineraryID[msg.sender];
        require(D.Itinerarys[_ItineraryID].loaded == false, "Itinerary is already loaded");
        require(D.Itinerarys[_ItineraryID].nbTrailers > 0, "a trailer must be assigned to this Itinerary before closing");
        D.Itinerarys[_ItineraryID].loaded = true;
        D.Itinerarys[_ItineraryID].ipfsItineraryHash = _IpfsItineraryHash;
    }
    
    function get_current_ItineraryID() public view returns(uint){
        return D.LoadingAttendantOpenItineraryID[msg.sender];
    }
    
    // Associate_Itinerary
    // description: add a command to an Itinerary
    // input: ID of a command and ID of the Itinerary
    // return: 
     function Associate_Itinerary(uint _commandID) public returns(bool) {
        
        require(_commandID < D.numCommands, "this command does not exist");
        require(D.commands[_commandID].done == true, "this command is not completed");
        uint size = D.commands[_commandID].size; // index where to add the new ItineraryID
        if(size > 0){
            // if command was already assigned to an Itinerary
            uint last_ItineraryID = D.commands[_commandID].ItineraryIDs[size-1];
            require(D.Itinerarys[last_ItineraryID].done == true, "an Itinerary not completed is already assigned to that command");
        }
        
        uint _ItineraryID = D.LoadingAttendantOpenItineraryID[msg.sender];
        require(_ItineraryID < D.numItinerarys, 'this Itinerary does not exist');
        require(D.Itinerarys[_ItineraryID].loaded == false, "this Itinerary must not be already loaded");
        
        
        
        D.commands[_commandID].ItineraryIDs.push(_ItineraryID);
        D.commands[_commandID].size++;
        
        D.Itinerarys[_ItineraryID].totWeight += D.commands[_commandID].totWeight;
        D.Itinerarys[_ItineraryID].totVolume += D.commands[_commandID].totVolume;
        
        return true;
     }
     
    // associate_trailer
    // description: add a trailers ID to the Itinerarys (a truck transport multiple trailers)
    // input: ID of a command and ID of the Itinerary
    // return:      
    function associate_trailer(uint _trailerID) public returns(bool) {
        uint _ItineraryID = D.LoadingAttendantOpenItineraryID[msg.sender];
        require(_ItineraryID < D.numItinerarys, 'this Itinerary does not exist');
        require(D.Itinerarys[_ItineraryID].loaded == false, "this Itinerary must not be already loaded");
        
        D.Itinerarys[_ItineraryID].TrailerIDs.push(_trailerID);
        D.Itinerarys[_ItineraryID].nbTrailers++;
        D.TrailerCurrentItinerary[_trailerID] = _ItineraryID;
    }
    
    function get_Itinerary_info(uint _ItineraryID) public view returns(uint, uint, uint, bool, bool, bool, string memory){
        require(_ItineraryID < D.numItinerarys, 'this Itinerary does not exist');

        return (D.Itinerarys[_ItineraryID].totWeight, D.Itinerarys[_ItineraryID].totVolume, D.Itinerarys[_ItineraryID].co2Emission, D.Itinerarys[_ItineraryID].loaded, D.Itinerarys[_ItineraryID].started, D.Itinerarys[_ItineraryID].done, D.Itinerarys[_ItineraryID].ipfsItineraryHash);
    }
    
    function get_trailer_current_Itinerary(uint _trailerID) public view returns(uint){
        return D.TrailerCurrentItinerary[_trailerID];
    }
    
    function get_trucker_current_ItineraryID() public view returns(uint){
        return D.TruckerOpenItineraryID[msg.sender];
    }
    
    function grab_Itinerary(uint _ItineraryID) public returns(bool){
        
        
        require(_ItineraryID < D.numItinerarys, 'this Itinerary does not exist');
        require(D.Itinerarys[_ItineraryID].loaded == true, "this Itinerary must be loaded");
        require(D.Itinerarys[_ItineraryID].started == false, "this Itinerary must not be completed");
        uint _lastItineraryID = D.TruckerOpenItineraryID[msg.sender];
        if(_lastItineraryID > 0){
            require(D.Itinerarys[_lastItineraryID].done == true, "trucker must have completed is last Itinerary");
        }
        
        
        D.TruckerOpenItineraryID[msg.sender] = _ItineraryID;
    }    

    function Itinerary_start(uint _CO2Counter, uint _truckID) public returns(bool){
        uint _ItineraryID = D.TruckerOpenItineraryID[msg.sender];
        require(_ItineraryID < D.numItinerarys, 'this Itinerary does not exist');
        require(D.Itinerarys[_ItineraryID].loaded == true, "this Itinerary must be loaded");
        require(D.Itinerarys[_ItineraryID].started == false, "this Itinerary must not be started");
        
        D.Itinerarys[_ItineraryID].started = true;
        D.Itinerarys[_ItineraryID].truckID = _truckID;
        D.Itinerarys[_ItineraryID].co2Emission = _CO2Counter;
        
    }

    function Itinerary_stop(uint _CO2Counter, uint _truckID) public returns(bool){
        uint _ItineraryID = D.TruckerOpenItineraryID[msg.sender];
        require(_ItineraryID < D.numItinerarys, 'this Itinerary does not exist');
        require(D.Itinerarys[_ItineraryID].started == true, "this Itinerary must be started");
        require(D.Itinerarys[_ItineraryID].done == false, "this Itinerary must be started");
        require(D.Itinerarys[_ItineraryID].truckID == _truckID, "must be the same truck as Itinerary started");
        require(D.Itinerarys[_ItineraryID].co2Emission < _CO2Counter, "CO2 emission of an Itinerary cant be negative");
        
        D.Itinerarys[_ItineraryID].done = true;
        D.Itinerarys[_ItineraryID].co2Emission = _CO2Counter - D.Itinerarys[_ItineraryID].co2Emission;
    }
    
    function get_Itinerary_emission(uint _ItineraryID) public view returns (uint){
        require(_ItineraryID < D.numItinerarys, 'this Itinerary does not exist');
        require(D.Itinerarys[_ItineraryID].done == true, "this is not completed");
        
        return D.Itinerarys[_ItineraryID].co2Emission;
    }
    
    function get_product_emission(string memory _upc, uint _ItineraryID) public view returns (uint){
        require(_ItineraryID < D.numItinerarys, 'this Itinerary does not exist');
        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        require(D.Itinerarys[_ItineraryID].done == true, "this is not completed");
        
        uint merchandiseWeight = D.Itinerarys[_ItineraryID].totWeight;
        uint merchandiseVolume = D.Itinerarys[_ItineraryID].totVolume;
        uint productWeight = D.upcs[D.UpcToIndex[_upc].ID].Weight;
        uint productVolume = D.upcs[D.UpcToIndex[_upc].ID].Volume;
        
        
        return (D.Itinerarys[_ItineraryID].co2Emission*(productWeight*merchandiseVolume + productVolume*merchandiseWeight) / (2*merchandiseWeight*merchandiseVolume));
    }
}