import {calculateBonuses} from './functions';

export const searchOptions = [{
    id: 0,
    option: 'damage',
    selected: false,
    key: 'Damage'
},{
    id: 1,
    option: 'empower_chance',
    selected: false,
    key: 'Empower Chance'
},{
    id: 2,
    option: 'critical_chance',
    selected: false,
    key: 'Critical Chance'
},{
    id: 3,
    option: 'dual_strike',
    selected: false,
    key: 'Dual Strike'
},{
    id: 4,
    option: 'evade',
    selected: false,
    key: 'Evade'
},{
    id: 5,
    option: 'block',
    selected: false,
    key: 'Block'
},{
    id: 6,
    option: 'absorb_chance',
    selected: false,
    key: 'Absorb Chance'
},{
    id: 7,
    option: 'deflect_chance',
    selected: false,
    key: 'Deflect'
},{
    id: 8,
    option: 'lifesteal',
    selected: false,
    key: 'Lifesteal'
},{
    id: 9,
    option: 'quad_strike',
    selected: false,
    key: 'Quad Strike'
},{
    id: 10,
    option: 'richochet_chance',
    selected: false,
    key: 'Ricochet Chance'
},{
    id: 11,
    option: 'healing',
    selected: false,
    key: 'Healing'
},{
    id: 12,
    option: 'team_enrage',
    selected: false,
    key: 'Team Enrage'
},{
    id: 13,
    option: 'sp_damage',
    selected: false,
    key: 'SP Damage'
},{
    id: 14,
    option: 'physicalDamageBonus',
    selected: false,
    key: 'Physical Damage Bonus'
},{
    id: 15,
    option: 'physicalDamageOutput',
    selected: false,
    key: 'Physical Damage Output'
},{
    id: 16,
    option: 'physicalDamageMitigation',
    selected: false,
    key: 'Physical Damage Mitigation',
},{
    id: 17,
    option: 'physicalHealthEfficiency',
    selected: false,
    key: 'Physical Health Efficiency'
},{
    id: 20,
    option: 'electric_damage',
    selected: false,
    key: 'Electric Damage Bonus'
},{
    id: 21,
    option: 'electric_resistance',
    selected: false,
    key: 'Electric Resistance'
},{
    id: 22,
    option: 'electricDamageBonus',
    selected: false,
    key: 'Electric Damage Bonus'
},{
    id: 23,
    option: 'electricDamageOutput',
    selected: false,
    key: 'Electric Damage Output'
},{
    id: 24,
    option: 'electricDamageMitigation',
    selected: false,
    key: 'Electric Damage Mitigation'
},{
    id: 25,
    option: 'electricHealthEfficiency',
    selected: false,
    key: 'Electric Health Efficiency'
},{
    id: 30,
    option: 'water_damage',
    selected: false,
    key: 'Water Damage Bonus'
},{
    id: 31,
    option: 'water_resistance',
    selected: false,
    key: 'Water Resistance'
},{
    id: 32,
    option: 'waterDamageBonus',
    selected: false,
    key: 'Water Damage Bonus'
},{
    id: 33,
    option: 'waterDamageOutput',
    selected: false,
    key: 'Water Damage Output'
},{
    id: 34,
    option: 'waterDamageMitigation',
    selected: false,
    key: 'Water Damage Mitigation'
},{
    id: 35,
    option: 'waterHealthEfficiency',
    selected: false,
    key: 'Water Health Efficiency'
},{
    id: 36,
    option: 'fire_damage',
    selected: false,
    key: 'Fire Damage Bonus'
},{
    id: 37,
    option: 'fire_resistance',
    selected: false,
    key: 'Fire Resistance'
},{
    id: 38,
    option: 'fireDamageBonus',
    selected: false,
    key: 'Fire Damage Bonus'
},{
    id: 39,
    option: 'fireDamageOutput',
    selected: false,
    key: 'Fire Damage Output'
},{
    id: 40,
    option: 'fireDamageMitigation',
    selected: false,
    key: 'Fire Damage Mitigation'
},{
    id: 41,
    option: 'fireHealthEfficiency',
    selected: false,
    key: 'Fire Health Efficiency'
},{
    id: 42,
    option: 'earth_damage',
    selected: false,
    key: 'Earth Damage Bonus'
},{
    id: 43,
    option: 'earth_resistance',
    selected: false,
    key: 'Earth Resistance'
},{
    id: 44,
    option: 'earthDamageBonus',
    selected: false,
    key: 'Earth Damage Bonus'
},{
    id: 45,
    option: 'earthDamageOutput',
    selected: false,
    key: 'Earth Damage Output'
},{
    id: 46,
    option: 'earthDamageMitigation',
    selected: false,
    key: 'Earth Damage Mitigation'
},{
    id: 47,
    option: 'earthHealthEfficiency',
    selected: false,
    key: 'Earth Health Efficiency'
},{
    id: 48,
    option: 'air_damage',
    selected: false,
    key: 'Air Damage Bonus'
},{
    id: 49,
    option: 'air_resistance',
    selected: false,
    key: 'Air Resistance'
},{
    id: 50,
    option: 'airDamageBonus',
    selected: false,
    key: 'Air Damage Bonus'
},{
    id: 51,
    option: 'aircDamageOutput',
    selected: false,
    key: 'Air Damage Output'
},{
    id: 52,
    option: 'airDamageMitigation',
    selected: false,
    key: 'Air Damage Mitigation'
},{
    id: 53,
    option: 'airHealthEfficiency',
    selected: false,
    key: 'Air Health Efficiency'
}];
/*

//future, would be imported for calculations

//will be brought in from application
*/
export let change = [
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
        symbol: '',
        slot: 'accessory',
        reference: 'accessories'
    },
    {
        symbol: '',
        slot: 'mount',
        reference: 'mounts'
    },

];

let numChange, sortedE;

let maximum = {
    equipment: {
        mainhand: {},
        offhand: {},
        head: {},
        body: {},
        necklace: {},
        ring: {},
        accessory: {},
        pet: {},
        mount: {}
    },
    runes: [],
    enchants: {

    },
    value: 0
};

let equip = 0;


export const optimize = (searchingFor, options, currentlyEquipped, runes, enchants, stats, sortedEquipment, index=0 ) => {
    currentlyEquipped = {
        equipped: currentlyEquipped,
        enchants,
        runes,
        stats,

    }
    //modifiying searchingFor to fit with algorithm already made
    let sFR = [...change];

    numChange = [sortedEquipment.mainhands.length,sortedEquipment.offhands.length,sortedEquipment.heads.length,sortedEquipment.bodies.length,sortedEquipment.necklaces.length,sortedEquipment.rings.length,sortedEquipment.accessories.length,16];

    sortedE = sortedEquipment;

    for (var x = 0; x < sFR.length; x++) {
        if (options.includes(sFR[x].reference)) {
            sFR[x].symbol = '*';
        }
    }

    equip = 0;

    recurveIncrement(0, currentlyEquipped, sFR);
}


function recurveIncrement(index, equippedInput, whatToChange) {
    let i = index;
    let equipped = {
        mainhand: equippedInput.equipped.mainhand || {},
        offhand: equippedInput.equipped.offhand || {},
        head: equippedInput.equipped.head || {},
        body: equippedInput.equipped.body || {},
        necklace: equippedInput.equipped.necklace || {},
        ring: equippedInput.equipped.ring || {},
        accessory: equippedInput.equipped.accessory || {},
        pet: equippedInput.equipped.pet || {},
        mount: equippedInput.equipped.mount || {}
    };
    let runes = equippedInput.runes;
    let enchants = equippedInput.enchants;
    let stats = equippedInput.stats;
    let r;
    
    console.log(whatToChange.length);
    if (i === 8 ) {
        let bonuses = calculateBonuses(stats, equipped, runes, enchants, 2);
        console.log(bonuses);
        //This is where calculations would be.

        //Would set a maximum of specified result
        return ; 
    }
    else if (whatToChange[i].symbol === '*') {
        //only change equipment on this stage
        let t = index + 1;
        for(let x = 0; x < numChange[i]; x++) {
            equip[i]+=1;
            try {
                equipped[change[i].slot] = sortedE[whatToChange[i].reference][x];
            } catch (error) {
                console.log({
                    i: i,
                    x: x,
                });
                console.log(sortedE[whatToChange[i].reference][x]);
                console.log(equipped[change[i].slot]);
            }
            r = {
                equipped,
                enchants,
                runes,
                stats,
        
            }
            recurveIncrement(t, r, whatToChange);
        }
    } else {
        i+=1;
        r = {
            equipped,
            enchants,
            runes,
            stats,
    
        }
        recurveIncrement(i, r, whatToChange);
    }
    
}
