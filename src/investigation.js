let equip = [0,0,0,0,0,0,0,0];
let change = ['*','*','*','','*','','*',''];
let numChange = [2,2,2,2,2,2,2,2];

let sortedEquipment =  {
    mainhands: [],
    offhands: [],
    heads: [],
    bodies: [],
    necklaces: [],
    rings: [],
    accessories: [],
    pets: []
};


Object.keys(equipment).forEach( (x) => {

      switch(equipment[x].slot) {
        case 'Offhand':
          sortedEquipment.offhands.push(equipment[x]);
          break;
        case 'Body':
          sortedEquipment.bodies.push(equipment[x]);
          break;
        case 'Head':
          sortedEquipment.heads.push(equipment[x]);
          break;
        case 'Ring':
          sortedEquipment.rings.push(equipment[x]);
          break;
        case 'Necklace':
          sortedEquipment.necklaces.push(equipment[x]);
          break;
        case 'Pet':
          sortedEquipment.pets.push(equipment[x]);
          break;
        case 'Accessory':
          sortedEquipment.accessories.push(equipment[x]);
          break;
        default: 
          sortedEquipment.mainhands.push(equipment[x]);
      };
});

numChange = [sortedEquipment.mainhands.length,sortedEquipment.offhands.length,sortedEquipment.heads.length,sortedEquipment.bodies.length,sortedEquipment.necklaces.length,sortedEquipment.rings.length,sortedEquipment.accessories.length,16];

numOptions;

let endingIndex = equip.length-1;
let startIndex = 0;

function startRecurve() {
    recurveIncrement(startIndex);
}

function recurveIncrement(index) {
    let i = index;

    if (i >= equip.length-1) {
        //This is where calculations would be.
        //Would set a maximum of specified result
        return ; 
    }
    if (change[i] === '*') {
        //skip changing this equip
        let t = index + 1;
        for(let x = 0; x < numChange[i]; x++) {
            equip[i]+=1;
            recurveIncrement(t);
        }
    } else {
        i+=1;
        recurveIncrement(i);
    }
}


equip