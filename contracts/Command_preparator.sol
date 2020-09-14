pragma solidity ^0.5.0;

contract Command_preparator{

    struct Data {
        UPC[] upcs;
        mapping (string => UPCIds) UpcToIndex;
        uint numUPC;

        Traject[] trajects;
        uint numTrajects;
        
    }

    struct UPC {
        string UPC;
        uint Weight;
        uint Volume;
        mapping(uint => Product) uniqueProduct;
        uint numberProduct;
    }

    struct Product {
        uint[] trajectID; // dynamic list of product trajects
        uint8 size;
    }

    struct Traject {
        uint truckID;
        uint trajectID;
        uint totWeight;
        uint totVolume;
        // uint fromID;
        // uint toID;
        bool done;
        //uint co2Emission
    }

    struct UPCIds {
        uint ID;
        bool isValue;
    }

    Data D;

    // function init_traject(uint _TruckID) public returns(uint id){
    //     Traject memory newTraject = Traject(_TruckID, 0, 0, 0);

    //     return id;
    // }

    function get_numUPC() public view returns(uint nb){
        return D.numUPC;
    }

    function get_upc_weight(string memory _upc) public view returns(uint Weight){
        return D.upcs[D.UpcToIndex[_upc].ID].Weight;
    }

    function get_upc_Volume(string memory _upc) public view returns(uint Volume){
        return D.upcs[D.UpcToIndex[_upc].ID].Volume;
    }

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

     function Associate_Traject(string memory _upc, uint _unique, uint _trajectID) public returns(uint) {

         require(_trajectID < D.numTrajects, 'this traject does not exist');
         require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
         
         uint8 size =  D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size;   // index that point where to add the next traject
         // if first traject that we add to the product
         if (size == 0){
             D.upcs[D.UpcToIndex[_upc].ID].numberProduct++;       //new count added
         }
         else{
             require(D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].trajectID[size - 1] != _trajectID, 'traject already assigned to product');
         }

         D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].trajectID.push(_trajectID); // add the traject to the list
         D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size++;

         D.trajects[_trajectID].totWeight += D.upcs[D.UpcToIndex[_upc].ID].Weight;  // add product weight and volume to traject
         D.trajects[_trajectID].totVolume += D.upcs[D.UpcToIndex[_upc].ID].Volume;

         return 1;
     }


    function get_product_traject_size(string memory _upc, uint _unique) public view returns(uint){
        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        require(D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size != 0, 'No traject registered yet');

        return D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size;
    }


    function get_product_traject(string memory _upc, uint _unique, uint _index) public view returns(uint){

        require(_index < D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size, 'index out of bound');
        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        require(D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size != 0, 'No traject registered yet');
        
        return D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].trajectID[_index];  // return the trajectID of the index
    }

    function new_traject_ID() public returns(uint trajectID){
        
        Traject memory newTraject;
        //newTraject.truckID = _TruckID;
        newTraject.trajectID = D.numTrajects;   // ID equal = the number of traject initialise by the contract
        newTraject.totWeight = 0;
        newTraject.totVolume = 0;
        newTraject.done = false;

        D.trajects.push(newTraject);
        D.numTrajects++;

        return trajectID;
    }

    function get_traject_info(uint _trajectID) public view returns(uint, uint, bool){
        require(_trajectID < D.numTrajects, 'this traject does not exist');

        return (D.trajects[_trajectID].totWeight, D.trajects[_trajectID].totVolume, D.trajects[_trajectID].done);
    }

    function traject_start(uint trajectID, uint CO2Counter, uint time) public returns(bool){

    }

    function trajetc_stop(uint trajectID, uint CO2Counter, uint time) public returns(bool){

    }
}