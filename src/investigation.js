let equip = [0,0,0,0,0,0,0,0];
let change = [
    {
        symbol: '',
        slot: 'mainhand',
        reference: 'mainhands'
    },
    {
        symbol: '',
        slot: 'offhand',
        reference: 'offhands'
    },
    {
        symbol: '',
        slot: 'head',
        reference: 'heads'
    },
    {
        symbol: '',
        slot: 'body',
        reference: 'bodies'
    },
    {
        symbol: '',
        slot: 'necklace',
        reference: 'necklaces'
    },
    {
        symbol: '',
        slot: 'ring',
        reference: 'rings'
    },
    {
        symbol: '*',
        slot: 'accessory',
        reference: 'accessories'
    },
    {
        symbol: '',
        slot: 'mount',
        reference: 'mounts'
    },

];
let numChange;

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

var equipped = {
    mainhand: {},
    offhand: {},
    head: {},
    body: {},
    necklace: {},
    ring: {},
    accessory: {},
    pet: {},
    mount: {}
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

function recurveIncrement(index, equipped) {
    let i = index;
    let r = equipped;
    console.log(r);

    if (i >= equip.length-1) {
        console.log(r)
        //This is where calculations would be.
        //Would set a maximum of specified result
        return ; 
    }
    if (change[i].symbol === '*') {
        //only change equipment on this stage
        let t = index + 1;
        for(let x = 0; x < numChange[i]; x++) {
            equip[i]+=1;
            try {
                r[change[i].slot] = sortedEquipment[change[i].reference][x];
            } catch (error) {
                console.log({
                    i: i,
                    x: x,
                });
                console.log(sortedEquipment[change[i].reference][x]);
                console.log(r[change[i].slot]);
            }
            recurveIncrement(t, r);
        }
    } else {
        i+=1;
        recurveIncrement(i);
    }
}


equip