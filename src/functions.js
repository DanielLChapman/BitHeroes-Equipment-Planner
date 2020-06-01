import { sets } from './sets';
import { base, enchantTypes} from './stats';

export const enchants = {
  enchantSlot1: {
      slot1: 'None',
      slot2: 'None'
  }, enchantSlot2: {
      slot1: 'None',
      slot2: 'None'
  }, enchantSlot3: {
      slot1: 'None',
      slot2: 'None'
  }, enchantSlot4: {
      slot1: 'None',
      slot2: 'None'
  }, enchantSlot5: {
      slot1: 'None',
      slot2: 'None'
  }, enchantSlot6: {
      slot1: 'None',
      slot2: 'None'
  }
};

export const searchObjectArray = (objectArray, searchQuery, compareTo) => {
  let returnQuery = compareTo;
  for (let i = 0; i < objectArray.length; i++) {
    if (objectArray[i][searchQuery] === compareTo) {
      returnQuery = objectArray[i];
    }
  }

  if (returnQuery === compareTo) {
    returnQuery = {
      id: 'x',
      title: "None",
      selected: false,
      effect: "speed",
      value:  0,
      key: 'enchant'
    };
  }

  return returnQuery;
}

export const linkCalculation = (stats) => {
  let rA, rD, rE, rB, pRR;
  let q = 0;
  if(stats.block >= 100) {
    q = 100;
  }
  let s = stats;
  
  var defaultLinks = JSON.parse(JSON.stringify(base.default_stats.links));
  rA = stats.absorb_chance/100;
  rD = Math.abs((1-rA)*stats.deflect_chance/100);
  rE =  Math.abs((1-rA-rD)*stats.evade/100);
  rB = Math.abs((1-rA-rD-rE)*q/100);
  s.damage += s.sp_damage;
  s.fire_damage += s.sp_damage;
  s.electric_damage += s.sp_damage;
  s.water_damage += s.sp_damage;
  s.air_damage += s.sp_damage;
  s.earth_damage += s.sp_damage;
  /* elementals 
  fire_damage: 0,
		fire_resistance: 0,
		electric_damage: 0,
		electric_resistance: 0,
		water_damage: 0,
		water_resistance: 0,
		air_damage: 0,
		air_resistance: 0,
		earth_damage: 0,
    earth_resistance: 0,
  */

  //DEFENSE
  //cap DR
  let pDR = stats.damage_reduction > 75 ? 75 : stats.damage_reduction;
  let eDR = stats.electric_resistance > 75 ? 75 : stats.electric_resistance;
  let wDR = stats.water_resistance > 75 ? 75 : stats.water_resistance;
  let fDR = stats.fire_resistance > 75 ? 75 : stats.fire_resistance;
  let rDR = stats.earth_resistance > 75 ? 75 : stats.earth_resistance;
  let aDR = stats.air_resistance > 75 ? 75 : stats.air_resistance;
  //total
  let trElectric = Math.min(75, eDR*1 + wDR*0 + fDR*.75 + rDR*.75 + aDR*.75 + pDR * .75);
  let trWater = Math.min(75, eDR*.75 + wDR*1 + fDR*0 + rDR*.75 + aDR*.75 + pDR * .75);
  let trFire = Math.min(75, eDR*.75 + wDR*.75 + fDR*1 + rDR*0 + aDR*.75 + pDR * .75);
  let trEarth = Math.min(75, eDR*.75 + wDR*.75 + fDR*.75 + rDR*1 + aDR*0 + pDR * .75);
  let trAir = Math.min(75, eDR*0 + wDR*.75 + fDR*.75 + rDR*.75 + aDR*1 + pDR *.75);
  let trPhysical = Math.min(75, eDR*.75 + wDR*.75 + fDR*.75 + rDR*.75 + aDR*.75 + pDR * 1);

  defaultLinks['totalPhysicalDamageReduction'] = trPhysical;
  defaultLinks['totalElectricDamageReduction'] = trElectric;
  defaultLinks['totalWaterDamageReduction'] = trWater;
  defaultLinks['totalFireDamageReduction'] = trFire;
  defaultLinks['totalEarthDamageReduction'] = trEarth;
  defaultLinks['totalAirDamageReduction'] = trAir;

  //OFFENSE
  let tElectric = s.electric_damage*1 + s.water_damage*.0 + s.fire_damage*.75 + s.earth_damage * .75 + s.air_damage * .75 + s.damage * .75;
  let tWater = s.electric_damage*.75 + s.water_damage*1 + s.fire_damage*0 + s.earth_damage * .75 + s.air_damage * .75 + s.damage * .75;
  let tFire = s.electric_damage*.75 + s.water_damage*.75 + s.fire_damage*1 + s.earth_damage * 0 + s.air_damage * .75 + s.damage * .75;
  let tEarth = s.electric_damage*.75 + s.water_damage*.75 + s.fire_damage*.75 + s.earth_damage * 1 + s.air_damage * 0 + s.damage * .75;
  let tAir = s.electric_damage*.0 + s.water_damage*.75 + s.fire_damage*.75 + s.earth_damage * .75 + s.air_damage * 1 + s.damage * .75;
  let tPhysical = s.electric_damage*.75 + s.water_damage*.75 + s.fire_damage*.75 + s.earth_damage * .75 + s.air_damage * .75 + s.damage * 1;

  let elementsFL = [
    {
      element: 'electric',
      tseries: tElectric,
      lowerseries: trElectric,
    },
    {
      element: 'water',
      tseries: tWater,
      lowerseries: trWater,
    },
    {
      element: 'fire',
      tseries: tFire,
      lowerseries: trFire,
    },
    {
      element: 'earth',
      tseries: tEarth,
      lowerseries: trEarth,
    },
    {
      element: 'air',
      tseries: tAir,
      lowerseries: trAir,
    },
    {
      element: 'physical',
      tseries: tPhysical,
      lowerseries: trPhysical,
    }
  ]

  let tempTurns = 0;
  tempTurns = (((s.agility+s.power) / 2) * ((s.agility+s.power) / 2))/s.power/(30*(100+s.speed)/100);


  for (let i = 0; i < elementsFL.length; i++) {
    let e = elementsFL[i].element;
    defaultLinks[e+"DamageBonus"] = ((100+(s.critical_chance*s.critical_damage)/100)*(100+(elementsFL[i].tseries ))/100)*((100+(s.empower_chance))/100)*((100+(s.dual_strike))/100)*(((s.quad_strike)/100*3+100)/100)*(100+(s.richochet_chance))/100;
    defaultLinks[e+"DamageBonus"] = parseFloat(defaultLinks[e+"DamageBonus"].toFixed(2));
  
    defaultLinks[e+"DamageOutput"] = (tempTurns*2000)*(defaultLinks[e+"DamageBonus"])/100;
    defaultLinks[e+"DamageOutput"] = parseFloat(defaultLinks[e+"DamageOutput"].toFixed(2));

    //damage mitigation

    
    //physical
    let lseries = elementsFL[i].lowerseries;
    pRR = Math.abs((1-rA-rD-rE-(rB*.5))*lseries/100);
    defaultLinks[e+"DamageMitigation"] = (1-((1-rD-rE-(rB/2)-pRR-rA)))*100;
    defaultLinks[e+"DamageMitigation"] = parseFloat(defaultLinks[e+"DamageMitigation"].toFixed(2));

    //health efficiency
    defaultLinks[e+'HealthEfficiency'] = (1/(1-rD-rD-(rB/2)-pRR-rA*2))*100;
    defaultLinks[e+'HealthEfficiency'] = parseFloat(defaultLinks[e+'HealthEfficiency'].toFixed(2));
  }

  return defaultLinks;
}

export const calculateBonuses = (baseStats = [6, 6, 6], equipmentOn, runes = [], enchantments = {}, accessoryLevel = 1, t12 = true) => {
  let bonuses = {
    mythics: [],
    sets: {},
    ancients: [],
    pets: [],
    mounts: []
  };
  let setsToSort = {};
  let urlEnd = "";
  let stats = {...base.default_stats};
  let ancientEquipped = false;
  let ancientEquipped2 = false;
  let ancientEquipped3 = false;
  var doubled = {
    enchant: false,
    mount: false,
    rune: false
  }

  Object.keys(equipmentOn).forEach((x, i) => {
    if (equipmentOn[x].type === "ancient") {
      bonuses.ancients.push(equipmentOn[x]);
      urlEnd += equipmentOn[x].shareID;
      stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
      if (equipmentOn[x].name === "Starweave") {
        ancientEquipped = true;
      }
      if (equipmentOn[x].name === "Polychromatic Blaster") {
        ancientEquipped2 = true;
      }
      if (equipmentOn[x].name === "Elementarium") {
        ancientEquipped3 = true;
      }
      if (t12) {
        stats.damage += 5;
        stats.damage_reduction += 5;
      }
      
    }
    if (equipmentOn[x]['elemental'] ) {
      if (! equipmentOn[x]['elemental'].flat) {
        let temp = equipmentOn[x]['elemental'];
        stats[temp.element_type + "_" + temp.element_modifier] += parseInt(temp.element_value, 10);
      } else {
        let temp = equipmentOn[x]['elemental'];
        stats.elemental_flat['temp.element_type '] += temp.element_value;
      }
      
    }

    if (equipmentOn[x]['elemental2'] ) {
      if (! equipmentOn[x]['elemental2'].flat) {
        let temp = equipmentOn[x]['elemental2'];
        stats[temp.element_type + "_" + temp.element_modifier] += parseInt(temp.element_value, 10);
      } else {
        let temp = equipmentOn[x]['elemental2'];
        stats.elemental_flat['temp.element_type '] += temp.element_value;
      }
      
    }

    if (equipmentOn[x].type === "mythic" ) {
      bonuses.mythics.push(equipmentOn[x]);
      urlEnd += equipmentOn[x].shareID;
      stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
    } else  if (equipmentOn[x].type === "set") {
      setsToSort[equipmentOn[x].partOfSet] = setsToSort[equipmentOn[x].partOfSet] + 1 || 1;
      if (equipmentOn[x].slot === "Pet" || equipmentOn[x].slot === "Accessory") {
        bonuses.pets.push(equipmentOn[x]);
        stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
      }
      /*elemental: {
        element_value: 3,
        element_type: "water",
        element_modifier: "resist"
      }*/


      urlEnd += equipmentOn[x].shareID;
    } else if (equipmentOn[x].slot === "Pet" || equipmentOn[x].slot === "Accessory") {
      bonuses.pets.push(equipmentOn[x]);
      urlEnd += equipmentOn[x].shareID;
      stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
    }/*
    if (i === 8 ) {
      stats.fire_damage += "%"// + " + stats.elemental_flat.fire + " Flat";
      stats.air_damage += "%"// + " + stats.elemental_flat.air + " Flat";
      stats.electric_damage += "%"// + " + stats.elemental_flat.electric + " Flat";
      stats.earth_damage += "%"// + " + stats.elemental_flat.earth + " Flat";
      stats.water_damage += "%"// + " + stats.elemental_flat.water + " Flat";
    }*/
  });


  if (ancientEquipped2) {
    let numMythics = 0;
    let x = 0;
    Object.keys(equipmentOn).forEach((p) => {
      switch(equipmentOn[p].type) {
        case 'mythic': 
          numMythics++;
          x = p;
          break;
        default:
          break
      }
    });
    if (numMythics === 1) {
      stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
    }
  }

  

  Object.keys(setsToSort).forEach((x) => {
    if (setsToSort[x] >= 2 ) {
      //grab set to get set bonuses,
      let setWorkingOn = sets[x];
      //Figure out which bonuses it gets;
      bonuses.sets[x] = [];
      if (ancientEquipped) {
          setsToSort[x] += 1;
        }
      Object.keys(setWorkingOn.setBonuses).forEach((y) => {
        if (setsToSort[x] >= parseInt(y, 10)) {
          bonuses.sets[x].push(setWorkingOn.setBonuses[y]);
          if (setWorkingOn.name !== 'Apocalypse') {
            stats = setStatBonuses(setWorkingOn.name, equipmentOn, stats, y, accessoryLevel);
          } else if (setWorkingOn.name === 'Apocalypse') {
              if (y === '3') {
                doubled.enchant = true;
              }
              if (y === '4') {
                doubled.mount = true;
              }
              if (y === '5') {
                doubled.rune = true;
              }
              
          }
          
          
        }
      })
    }
  });
  let hasAddedQ = false;

  
  //Add Mount
  if (Object.keys(equipmentOn.mount).length > 0) {
    urlEnd+="?";
    hasAddedQ = true;
    stats[equipmentOn.mount.effect] += equipmentOn.mount.value;
    if (doubled.mount) {
      stats[equipmentOn.mount.effect] += equipmentOn.mount.value;
    }
    urlEnd+= "mount=" + equipmentOn.mount.id;
    bonuses.mounts = equipmentOn.mount;

  }

  if (accessoryLevel !== 1) {
    if (!hasAddedQ) {
      urlEnd+="?";
      hasAddedQ = true;
    } else {
      urlEnd+="&"
    }
    urlEnd += "accessory=" + accessoryLevel;
  }

  //Add Runes
  if (runes.length !== 0) {
    if (runes.length > 4) {
      runes.splice(4);
    }
    let runesForURL = "";
    for (var i = 0; i < runes.length; i++) {

      if (runes[i].id !== 'x') {
        let tempRune = runes[i];
        stats[tempRune.effect] += tempRune.value;
        if (doubled.rune || ancientEquipped3) {
          stats[tempRune.effect] += tempRune.value;
        }
        runesForURL += tempRune.id;
      }

    }

    if (runesForURL !== "") {
      if (!hasAddedQ) {
        urlEnd+="?";
        hasAddedQ = true;
      } else {
        urlEnd+="&"
      }
      urlEnd += "runes=" + runesForURL;
    }


  }

  //Add Enchants
  let c = 0;

  if (Object.keys(enchantments).length > 0 && JSON.stringify(enchants) !== JSON.stringify(enchantments)) {
    let tempURL = "", tempURL2 = "";
    if (!hasAddedQ) {
      tempURL+="?";
      hasAddedQ = true;
    } else {
      tempURL+="&"
    }
    tempURL += "enchantments=";
    Object.keys(enchantments).forEach((x) => {
      if (!['alreadyUpdated', 'ownUpdate'].includes(x)) {
      
        if (c <= 5) {

          let r1 = searchObjectArray(enchantTypes, 'title', enchantments[x]['slot1'].title);
          let r2 = searchObjectArray(enchantTypes, 'title', enchantments[x]['slot2'].title);

          let enchantArray = [];
          for (var i = 0; i < enchantTypes.length; i++) {
            enchantArray.push(enchantTypes[i].title);
          } 
          
          if (r1.value > 2 || !enchantArray.includes(r1.title)) {
            r1 =  {
              id: 'xx',
              title: "None",
              selected: false,
              effect: "speed",
              value:  0,
              key: 'enchant'
            };
          }
          if (r2.value > 2 || !enchantArray.includes(r2.title)) {
            r2 =  {
              id: 'xx',
              title: "None",
              selected: false,
              effect: "speed",
              value:  0,
              key: 'enchant'
            };
          }

          //stats[r2.effect] += r2.value;
          //stats[r1.effect] += r1.value;
          //adding decimals seems to become a repeating decimal, this is a team fix. 
          stats[r1.effect] = Math.round((stats[r1.effect]+r1.value)*1000)/1000;
          stats[r2.effect] = Math.round((stats[r2.effect]+r2.value)*1000)/1000;

          if (doubled.enchant) {
            stats[r1.effect] = Math.round((stats[r1.effect]+r1.value)*1000)/1000;
            stats[r2.effect] = Math.round((stats[r2.effect]+r2.value)*1000)/1000;

          }

          if (r1.effect2) {
            //stats[r1.effect2] += r1.value2;
            stats[r1.effect2] = Math.round((stats[r1.effect2]+r1.value2)*1000)/1000;
            if (doubled.enchant) {
              //stats[r1.effect2] += r1.value2;
              stats[r1.effect2] = Math.round((stats[r1.effect2]+r1.value2)*1000)/1000;
            }
          }
          if (r2.effect2) {
            //stats[r2.effect2] += r2.value2;
            stats[r2.effect2] = Math.round((stats[r2.effect2]+r2.value2)*1000)/1000;
            if (doubled.enchant) {
              //stats[r2.effect2] += r2.value2;
              stats[r2.effect2] = Math.round((stats[r2.effect2]+r2.value2)*1000)/1000;
            }
          }


          tempURL2 += r1.id + "" + r2.id;

        }
        c++;
      }
    });

    if (tempURL2 !== "xxxxxxxxxxxxxxxxxxxxxxxx") {
      urlEnd += tempURL + tempURL2;
    }
  }

  stats.power = baseStats[0];
  stats.stamina = baseStats[1];
  stats.agility = baseStats[2];

  if (baseStats[0] !== 6 || baseStats[1] !== 6 || baseStats[2] !== 6) {
    if (!hasAddedQ) {
      urlEnd+="?";
      hasAddedQ = true;
    } else {
      urlEnd+="&"
    }
    urlEnd += "p=" + baseStats[0] + "&s=" + baseStats[1] + "&a=" + baseStats[2];
  }


  stats.links = linkCalculation(stats);

  bonuses.equipmentOn = equipmentOn;
  base.current_stats = stats;

  return {bonuses, urlEnd, stats};
}

export const convertName = (name) => {
  name = name.split(' ').join('_');
  name = name.split("'").join("");
  name = name.toLowerCase();
  return name;
}

export const setStatBonuses = (name, equipped, stats, count = 2, aU = 0) => {
  let numLegendary = 0, numSets = 0, numMythics = 0, accessoryUpgrade = aU ;
  Object.keys(equipped).forEach((x) => {
    switch(equipped[x].type) {
      case 'set':
        numSets++;
        break;
      case 'legendary':
        numLegendary++;
        break;
      case 'mythic': 
        numMythics++;
        break;
      default:
        break
    }
  });

  count = parseInt(count, 10);
  switch(name) {
  case 'Divinity':
    if (equipped.mainhand.slot === 'Sword' && count === 2) {
      stats.damage += 5;
    }
    if (count === 3) {
      stats.damage += 30;
    }
    break;
  case 'Night Walker':
    if (count === 2) {
      stats.absorb_chance += 2;
    }
    if (count === 4) {
      stats.damage_reduction += 15;
    }
    break;
  case "Trugdor's Call":
    if (count === 2) {
      stats.dual_strike += 4;
    }
    if (count === 3) {
      stats.richochet_chance += 7;
    }
    break;
  case "Arsenal":
    if (count === 2) {
      stats.richochet_chance += 2;
    }
    if (count === 3) {
      stats.damage += 10;
    }
    if (count === 4) {
      stats.damage += 30;
    }
    break;
  case "Taldrilth's Artifacts":
    if (count === 2) {
      stats.deflect_chance += 3;
    }
    if (count === 3) {
      stats.absorb_chance += 6;
    }
    break;
  case 'Bushido':
    stats.damage += 10;
    stats.damage_reduction -= 10;
    break;
  case 'Conduction':
    if (count === 2) {
      if (equipped.mainhand.slot === "Bow" || equipped.mainhand.slot === "Spear" ||equipped.mainhand.slot === "Laser Gun" || equipped.mainhand.slot === "Crossbow" || equipped.mainhand.slot === "Staff") {
        stats.damage += 5;
      }
    }
    if (count === 3) {
      stats.empower_chance += 5;
    }
    if (count === 4) {
      stats.empower_chance += 25;
    }
    break;
  case 'Grasberg':
    if (count ===2 ) {
      stats.team_enrage += 3;
    }
    if (count ===3 ) {
      stats.deflect_chance += 7.5;
    }
    break;
  case 'Vanpels':
    if (count === 2 && equipped.mainhand.slot === 'Spear') {
      stats.empower_chance += 5;
    }
    if (count === 3 ) {
      stats.damage += 8;
    }
    break;
  case 'Luminary':
    if (count === 2) {
      stats.damage_enrage += 5;
    }
    if (count === 3) {
      stats.healing += 15;
    }
    break;
  case 'Polaris':
    if (count === 2) {
      stats.damage_enrage += 5;
    }
    if (count === 4) {
      stats.damage_reduction += 20;
    }
    break;
  case 'Lunar Guardian':
    if (count === 2) {
      stats.healing += 15;
    }
    break;
  case 'Obliteration':
    if (count === 4) {
      stats.damage_reduction += 15;
    }
    break;
  case 'Agony':
    if (count === 2) {
      stats.damage += 3;
    }
    if (count === 4) {
      stats.richochet_chance += 10;
    }
    break;
  case 'Eruption':
    if (count === 3) {
      stats.evade += 12;
    }
    break;
  case 'Illustrious Artifacts':
    if (count === 2) {
      stats.damage += 4;
      stats.healing += 4;
    }
    break;
  case 'Taters':
    if (count === 2) {
      stats.speed += 4;
    }
    break;
  case 'Inferno':
    if (count === 2) {
      stats.empower_chance += 4;
    }
    if (count === 4) {
      stats.sp_damage += 20;
    }
    break;
  case 'Requiem':
    if (count === 2) {
      stats.damage += 25;
    }
    if (count === 3) {
      stats.damage += 24;
    }
    break;
  case 'Gatekeeper':
    if (count === 2) {
      stats.quad_strike += 0.5;
    }
    break;
  case 'Featherfall':
    if (count === 2) {
      stats.damage += 4;
    }
    if (count === 3) {
      stats.speed += 4;
    }
    if (count === 4) {
      stats.dual_strike += 4;
    }
    if (count === 5) {
      stats.empower_chance += 4;
    }
    if (count === 6) {
      stats.quad_strike += 2;
    }
    break;
  case 'Hellfire':
    if (count === 2) {
      stats.damage_reduction += 4;
    }
    if (count === 3) {
      stats.block += 8;
    }
    if (count === 4) {
      stats.evade += 4;
    }
    if (count === 5) {
      stats.deflect_chance += 3;
    }
    if (count === 6) {
      stats.absorb_chance += 4;
    }
    break;
  case 'Pew Pew':
    stats.richochet_chance += 3;
    break;
  case 'Hysteria':
    stats.damage += 10;
    break;
  case 'Bub':
    stats.absorb_chance += 2;
    break;
  case 'Superstition':
    stats.team_enrage += 3;
    break;
  case 'Night Visage':
    stats.damage += 5;
    break;
  case 'Cometfell':
    stats.quad_strike += 1;
    break;
  case 'Nebuleye':
    stats.damage += parseInt(numLegendary, 10);
    break;
  case 'Hood Of Menace': 
    stats.evade += 5;
    break;
  case 'Crypt Tunic':
    stats.deflect_chance += 2;
    break;
  case "Fish N' Barrel":
    stats.damage_reduction += 5;
    stats.damage -= 5;
    break;
  case 'Magmasher':
    stats.healing += 10;
    break;
  case 'Nemesis':
    stats.dual_strike += 4;
    break;
  case 'Bedlam':
    stats.healing += 8;
    break;
  case 'Veilage':
    stats.empower_chance += 4;
    break;
  case 'Flickerate':
    stats.absorb_chance += 2;
    break;
  case 'Dewey Decal':
    stats.damage += 5;
    break;
  case 'Shifting Breeze':
    stats.speed += 4;
    break;
  case 'Brightstar':
    stats.deflect_chance+= 3;
    break;
  case 'Lava Defender':
    stats.redirect_chance += 5;
    break;
  case 'Moon Collage':
    stats.damage += 5.5;
    break;
  case 'Mewmeck':
    stats.damage += 1;
    stats.dual_strike += 1;
    stats.empower_chance+= 1;
    break;
  case 'Peppermint Ring':
    stats.team_enrage += 2;
    stats.damage += 1;
    break;
  case 'Peeper':
    stats.damage += 8;
    break;
  case 'Ataraxia':
    stats.damage += parseInt(numSets, 10);
    break;
  case 'Oblivion':
    stats.absorb_chance += 1;
    stats.deflect_chance += 1;
    stats.evade += 1;
    break;
  case 'Twitch':
    stats.damage_reduction += 4.5;
    break;
  case 'Radiance':
    stats.damage += .75 * parseInt(numMythics, 10);
    stats.damage_reduction += .75 * parseInt(numMythics, 10);
    break;
  case 'Vile Focus':
    stats.absorb_chance += 3;
    break;
  case 'Abhorence':
    stats.richochet_chance += 1.5;
    stats.empower_chance += 1;
    stats.dual_strike += 1;
    break;
  case 'Cloak of Dark Tides':
    stats.damage_reduction -= 5;
    stats.damage += 5;
    break;
  case 'Widowmaker':
    stats.critical_chance += 16+(1*accessoryUpgrade);
    stats.critical_damage += 50;
    stats.empower_chance += 8;
    break;
  case 'Seaphims Grace':
    stats.block += 20+(1*accessoryUpgrade);
    stats.evade += 10+(.5*accessoryUpgrade);
    stats.evade += 4;
    break;
  case 'Melvin Champ':
    stats.dual_strike += 20+(.5*accessoryUpgrade);
    stats.critical_chance += 16+(1*accessoryUpgrade);
    break;
  case 'Abominable Trophy':
    stats.damage_reduction += 20+(1*accessoryUpgrade);
    stats.absorb_chance += 5;
    break;
  case 'Wrath':
    stats.deflect_chance += 10+(.75*accessoryUpgrade);
    stats.absorb_chance += 7.5;
    break
  case 'Baronets':
    stats.empower_chance += 20+(1*accessoryUpgrade);
    stats.dual_strike += 9;
    break;
  case 'Astaroths Diadem':
    stats.empower_chance += 3.5+(.5*accessoryUpgrade);
    stats.dual_strike += 3.5+(.5*accessoryUpgrade);
    stats.damage += 6;
    stats.speed += 6;
    stats.critical_chance += 5;
    stats.critical_damage += 50;
    break;
  case 'Melvin Stew':
    stats.absorb_chance += 15+(.5*accessoryUpgrade);
    break;
  case 'The Atomising Neutrino Accelerator':
    stats.block += 60+(2*accessoryUpgrade);
    break;
  case 'Travelling Forge':
    stats.dual_strike += 12+(.5*accessoryUpgrade);
    stats.empower_chance += 12+(.5*accessoryUpgrade)
    stats.critical_chance += 10;
    break;
  case 'Transcendence':
    stats.critical_chance += 40+(1*accessoryUpgrade);
    stats.dual_strike += 4.5+(.25*accessoryUpgrade);
    stats.empower_chance += 4.5+(.25*accessoryUpgrade)
    break;
  case 'Sakura':
    stats.damage_reduction += 25;
    stats.block += 10+(2*accessoryUpgrade)
    break;
  case 'Zaserite Wings':
    stats.critical_chance+=10+(.4*accessoryUpgrade);
    stats.empower_chance+=6+(.2*accessoryUpgrade);
    stats.dual_strike+=6+(.2*accessoryUpgrade);
    stats.damage+=6+(.2*accessoryUpgrade);
    stats.speed+=6+(.2*accessoryUpgrade);
    stats.life_steal += 6;
    break;
  case 'Drozgul':
    stats.damage_reduction+=8+(1*accessoryUpgrade);
    stats.evade += 5;
    stats.absorb_chance += 5;
    stats.deflect_chance += 5;
    break;
  case 'Seraphims Grace':
    stats.block += 20+(1*accessoryUpgrade);
    stats.evade += 10+(.5*accessoryUpgrade);
    stats.deflect_chance += 5;
    break;
  case 'Acropodium':
    stats.damage+=30.5+(1*accessoryUpgrade);
    break;
  case 'Melvin Cloak':
    stats.damage += 2;
    break;
  case 'Degenera':
    stats.absorb_chance += 1;
    stats.deflect_chance += 1;
    stats.damage_reduction += 1;
    break;
  case 'Bassault':
    stats.damage_reduction += 5;
    break;
  case 'Frostybite':
    stats.sp_damage += 5;
    break;
  case 'Meteor Chain':
    stats.dual_strike += 1;
    stats.empower_chance += 1;
    break;
  case 'Vortex Zapper':
    stats.richochet_chance += 3;
    break;
  case 'Meteor Blaster':
    stats.healing += 10;
    break;
  case 'Power Core':
    stats.damage_reduction += 25+(1*accessoryUpgrade);
    stats.evade += 5;
    break;
  case 'Goldwings Chivalry':
      stats.damage_reduction += 16+(1*accessoryUpgrade);
      stats.absorb_chance += 8;
      stats.damage += -4;
      break;
  case 'Jupingz':
    stats.empower_chance += 14.5+(0.5*accessoryUpgrade);
    stats.dual_strike += 14.5+(0.5*accessoryUpgrade);
    break;
  case 'Vortex Band':
    stats.damage_reduction += 4.5;
    break;
  case 'Nice To Meat Ya':
    stats.damage_reduction += 2;
    stats.absorb_chance += 1;
    break;
  case 'Gold Pendant':
    stats.damage += 10+(.5*accessoryUpgrade);
    stats.speed += 10+(.5*accessoryUpgrade);
    stats.dual_strike += 9;
    break;
  case 'Honor Cloud':
    stats.critical_chance += 30;
    stats.evade += 10;
    break;
  case 'Merciless':
    if (count === 2 && equipped.mainhand.slot === "Spear") {

      stats.damage += 5;
    }
    if (count === 4) {
      stats.damage += 35;
    }
    break;
  case 'Earthen Might':
    if (count === 2) {
      stats.deflect_chance += 2;
    }
    if (count === 4) {
      stats.damage_reduction += 25;
    }
    break;
  case 'Ultimatum':
      stats.dual_strike += 2;
      stats.quad_strike += 0.5;
      break;
  case 'Slibinas':
    stats.block += 1;
    stats.evade += 1;
    stats.damage_reduction += 1;
    stats.absorb_chance += 0.5;
    stats.deflect_chance += 0.5;
    break;
  case 'Sleipnir':
    stats.damage += 5;
    break;
  case 'Pep Pep':
    stats.quad_strike += 1;
    break;
  case 'Blorg Implant':
    stats.damage += 10;
    break;
  case 'Timeweaver Garments':
    stats.damage_reduction += 5;
    break;
  case 'Trident':
      if (count === 2) {
        stats.sp_damage += 15;
      }
      break;
  case 'Venom':
    if (count === 2) {
      stats.team_enrage += 2;
    }
    if (count === 3) {
      stats.damage_reduction += 2.5;
    }
    if (count === 4) {
      stats.damage_reduction += 17.5;
    }
    break;
  case 'Camouflage':
    if (count === 2) {
      stats.quad_strike += 1;
    }
    if (count === 3) {
      stats.ignore_defense += 5;
    }
    if (count === 4) {
      stats.damage += 40;
    }
    break;
  case 'Mistery':
      if (count === 2) {
        stats.dual_strike += 4;
      }
      break;
  case 'Courage':
    if (count === 2) {
      stats.sp_damage += 10;
    }
    break;
  case 'Blind Souls':
    stats.absorb_chance += 5;
    break;
  case "Conquerors Fury":
    stats.empower_chance += 4;
    break;
  case "Battleplate":
    stats.sp_damage += 5;
    break;
  case 'Windstalker': 
    stats.damage += 8;
    break;
  case 'Proton Beem Zapper':
    stats.richochet_chance += 1.5;
    stats.quad_strike += 0.5;
    break;
  case 'Empyrean Vindicator':
    stats.damage_reduction += 5;
    break;
  case 'Phoenix Ravager':
    stats.damage_reduction += 5;
    break;
  case 'Ironbark Longbow':
    stats.damage += 8;
    break;
  case 'Hydronus Helmet':
    stats.speed += 3;
    stats.critical_chance += 8;
    break;
  case 'Hydragar Stone':
    stats.absorb_chance += 5;
    break;

  case 'Glamounir':
    stats.absorb_chance += 1;
    stats.deflect_chance += 1;
    stats.evade += 1;
    break;
  case 'Bassoul':
    stats.absorb_chance += 2;
    stats.damage += 1;
    break;
  case 'Demonmullet':
    stats.damage_reduction += 2;
    break;
  case 'Scrawny':
    stats.empower_chance += 2;
    stats.speed += 2;
    break;
  case 'Chippity':
    stats.damage += 1;
    stats.dual_strike += 1;
    stats.empower_chance += 1;
    stats.speed += 1;
    break;

  case 'Dragonskull':
    if (count === 2) {
      stats.damage += 2;
    }
    break;
  case 'Blackarrow':
    if (count === 2) {
      stats.absorb_chance += 2;
    }
    break;
  case 'Voltio':
    if (count === 4) {
      stats['electric_damage'] += 60;
    }
    if (count === 6) {
      stats['electric_damage'] += 100;
    }
    break;
  case 'Nephilim Shield':
    stats.dual_strike += 4;
    break;
  case 'Nephilim Legacy':
    stats.damage += 4;
    stats.damage_reduction += 4;
    break;
  case 'Nephilim Casque':
    stats.speed += 5;
    break;
  case 'Nephilim Girdle':
    stats.empower_chance += 5;
    break;
  case 'Pyroc':
    if (count === 2) {
      stats.empower_chance += 2;
    }
    if (count === 3) {
      stats['fire_damage'] += 15;
    }
    if (count === 4) {
      stats['fire_damage'] += 30;
    }
    break;
  case 'Nepulus':
    if (count === 3) {
      stats.deflect_chance += 8;
    }
    if (count === 4) {
      stats['water_resistance'] += 18;
    }
    break;
  case 'Pangea':
    if (count === 4) {
      stats.block += 40;
    }
    break;
  case 'Lucernas':
    if (count === 2) {
      stats.team_enrage += 2;
    }
    if (count === 3) {
      stats['air_damage'] += 15;
    }
    if (count === 4) {
      stats.healing += 15;
    }
    break;
  case 'Astaroth Flag':
      stats.critical_chance += 20+(1*accessoryUpgrade);
      stats.damage += 18+(.5*accessoryUpgrade);
      break;
  case 'Bit Chain':
    stats.critical_chance += 14
    stats.damage += 11+(.5*accessoryUpgrade);
    stats.dual_strike += 11+(.5*accessoryUpgrade);
    break;
  case 'Mirror Wings':
    stats.block += 22 + (2*accessoryUpgrade);
    stats.deflect_chance += 10;
    break; 
  case 'Ancient Pendant':
    stats.speed += 10+(.5*accessoryUpgrade);
    stats.damage += 10+(.5*accessoryUpgrade);
    stats.dual_strike += 4;
    break; 
  case 'Grim Ward':
    stats.damage_enrage += 10+(.5*accessoryUpgrade);
    stats.health += 10+(.5*accessoryUpgrade);
    stats.deflect_chance += 5;
    break;  
  case 'Carbi':
    stats.water_resistance += 10;
    stats.damage_reduction += 20+(1*accessoryUpgrade);
    break;
  case 'Gryphen Resistor':
    stats.block += 22+(2*accessoryUpgrade);
    stats.deflect_chance += 10;
    setStatBonuses.electric_resistance += 5;
    break;
  case 'Amaglon':
    stats.block += 8;
    break;
  case 'Ceraunos':
    if (count === 2) {
      stats.evade += 10;
    }
    if (count === 3) {
      stats.air_resistance += 12;
    }
    break;
  case 'Nugget Of Grasberg':
    stats.evade += 1.5;
    stats.block += 5;
    break;
  case 'Tatooi':
    stats.block += 70 + (2.5*accessoryUpgrade);
    break;
  case 'Misty Shrowd':
    stats.damage_reduction += 26+(1*accessoryUpgrade);
    stats.block += 18+(.5*accessoryUpgrade);
    break;
  case 'Hunter Trophy':
    stats.damage_reduction += 26;
    stats.absorb_chance += 5 + (0.5*accessoryUpgrade);
    break;
  case 'Resistor':
    stats.block += 32;
    stats.damage_reduction += 10;
    stats.deflect_chance += 5;
    break;
  case 'Mythic Core':
    stats.damage_reduction += 28;
    stats.evade += 8;
    break;
  case 'Seraphim Ascendence':
    stats.evade += 22;
    stats.block += 26+(2.5*accessoryUpgrade);
    break;
  case 'Ascendancy':
    stats.dual_strike += 7;
    stats.empower_chance += 7;
    stats.critical_chance += 50 + (3*accessoryUpgrade);
    stats.critical_damage += 10;
    break;
  case 'Astaroths Crown':
    stats.empower_chance += 6+(.25*accessoryUpgrade);
    stats.dual_strike += 6+(.25*accessoryUpgrade);
    stats.damage += 6+(.25*accessoryUpgrade);
    stats.speed += 6+(.25*accessoryUpgrade);
    stats.critical_chance += 6+(.25*accessoryUpgrade);
    stats.critical_damage += 88;
    break;
  case 'Shokan Attachment':
    stats.damage += 7+(.75*accessoryUpgrade);
    stats.speed += 8;
    stats.empower_chance += 8;
    stats.dual_strike += 8;
    stats.critical_chance += 15+(.75*accessoryUpgrade);
    stats.life_steal += 10;
    break;
  case 'Hailes Power Supply':
    stats.empower_chance += 18+(.5*accessoryUpgrade);
    stats.dual_strike += 20+(1*accessoryUpgrade);
    break;
  case 'Divine Ward':
    stats.dual_strike += 17+(.5*accessoryUpgrade);
    stats.quad_strike += 5+(.25*accessoryUpgrade);
    stats.richochet_chance += 3;
    break;
  case' Fobett':
    stats.critical_chance += 30+(1.25*accessoryUpgrade);
    stats.critical_damage += 70;
    break;
  case 'Manticore':
    if (count === 2) {
      stats.redirect_chance += 2;
      stats.absorb_chance += 2;
    }
    if (count === 4) {
      stats.damage_reduction += 20;
      stats.redirect_chance += 15;
    }
    break;
  case "Behemoth": 
    if (count === 2) {
      stats.empower_chance += 4;
    }
    if (count === 3) {
      stats.earth_damage += 50;
    }
    if (count === 4) {
      stats.dual_strike += 15;
      stats.earth_damage += 30;
    }
    break;
  case 'Raiju':
    if (count === 2) {
      stats.electric_damage += 10;
    }
    if (count === 3) {
      stats.empower_chance += 10;
    }
    if (count === 4) {
      stats.speed += 10;
      stats.electric_damage += 30;
      stats.damage -= 3;
    }
    break;
  case 'Kaijin Fang':
    stats.damage_reduction += 8;
    break;
  case 'Kaijin Ring':
    stats.healing += 16;
    break;
  case 'Kaijin Reminder ':
    stats.damage += 25;
    break;
  case 'Kaijin Furnace':
    stats.damage += 12;
    break;
  //Add in legendary enchant and accessories, mounts too
  default: 
    //console.log(name, equipped, stats);
    break;
  };

  return stats;
}