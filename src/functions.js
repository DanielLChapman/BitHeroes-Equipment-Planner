import { sets } from './sets';
import { base } from './stats';
import {enchantTypes} from './enchants';



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

export const setAllTheSame = (stat, min, max, modifier, value) => {
  stat[modifier] += value;
  min[modifier] += value;
  max[modifier] += value;
  return [stat, min, max];
}
export const calculateBonuses = (baseStats = [6, 6, 6], equipmentOn, runes = [], enchantments = {}, accessoryLevel = 1, t12 = true, evolviumTable={}) => {
  let bonuses = {
    mythics: [],
    sets: {},
    ancients: [],
    pets: [],
    mounts: []
  };
  let setsToSort = {};
  let urlEnd = "";
  let stats = Object.assign({}, base.default_stats);
  let min_stats = Object.assign({}, base.default_stats);
  let max_stats = Object.assign({}, base.default_stats);
  let ancientEquipped = false;
  let ancientEquipped2 = false;
  let ancientEquipped3 = false;
  var doubled = {
    enchant: false,
    mount: false,
    rune: false
  };
  let sparking_soulcatcher = false;
  let evolviumIsEquipped = false;
  let evolviumName = "";
  let akiho = false;

  Object.keys(equipmentOn).forEach((x, i) => {
    if (equipmentOn[x].type === "ancient") {
      bonuses.ancients.push(equipmentOn[x]);
      urlEnd += equipmentOn[x].shareID;
      [stats, min_stats, max_stats] = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel, min_stats, max_stats);
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
        [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, 'damage_reduction', 5);
        [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, 'damage', 5);
      }
      if (equipmentOn[x].name === "Evolvium Offense" || equipmentOn[x].name === "Evolvium Defense") {
        evolviumIsEquipped = true;
        evolviumName = equipmentOn[x].name;
      }
      
    }
    if (equipmentOn[x]['elemental'] ) {
      if (! equipmentOn[x]['elemental'].flat) {
        let temp = equipmentOn[x]['elemental'];
        stats[temp.element_type + "_" + temp.element_modifier] += parseInt(temp.element_value, 10);
        min_stats[temp.element_type + "_" + temp.element_modifier] += parseInt(temp.element_value, 10);
        max_stats[temp.element_type + "_" + temp.element_modifier] += parseInt(temp.element_value, 10);
      } else {
        let temp = equipmentOn[x]['elemental'];
        stats.elemental_flat['temp.element_type '] += temp.element_value;
        min_stats.elemental_flat['temp.element_type '] += temp.element_value;
        max_stats.elemental_flat['temp.element_type '] += temp.element_value;
      }
      
    }

    if (equipmentOn[x]['elemental2'] ) {
      if (! equipmentOn[x]['elemental2'].flat) {
        let temp = equipmentOn[x]['elemental2'];
        stats[temp.element_type + "_" + temp.element_modifier] += parseInt(temp.element_value, 10);
        min_stats[temp.element_type + "_" + temp.element_modifier] += parseInt(temp.element_value, 10);
        max_stats[temp.element_type + "_" + temp.element_modifier] += parseInt(temp.element_value, 10);
      } else {
        let temp = equipmentOn[x]['elemental2'];
        stats.elemental_flat['temp.element_type '] += temp.element_value;
        min_stats.elemental_flat['temp.element_type '] += temp.element_value;
        max_stats.elemental_flat['temp.element_type '] += temp.element_value;
      }
      
    }

    if(equipmentOn[x]['innate']) {
      let temp = equipmentOn[x]['innate'];
      [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, temp.type, temp.value);
    }

    if (equipmentOn[x].type === "mythic" ) {
      bonuses.mythics.push(equipmentOn[x]);
      urlEnd += equipmentOn[x].shareID;
      [stats, min_stats, max_stats] = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel, min_stats, max_stats);
      if (equipmentOn[x].name === "Sparking Soulcatcher") {
        sparking_soulcatcher = true;
      }
    } else  if (equipmentOn[x].type === "set") {
      setsToSort[equipmentOn[x].partOfSet] = setsToSort[equipmentOn[x].partOfSet] + 1 || 1;
      if (equipmentOn[x].slot === "Pet" || equipmentOn[x].slot === "Accessory") {
        bonuses.pets.push(equipmentOn[x]);
        [stats, min_stats, max_stats] = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel, min_stats, max_stats);
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
      [stats, min_stats, max_stats] = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel, min_stats, max_stats);
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
          if (equipmentOn[p].slot !== "Accessory" && equipmentOn[p].slot !== "Mount" && equipmentOn[p].slot !== "Pet" ) {
            numMythics++;
            x = p;
          }
          
          break;
        default:
          break
      }
    });
    if (numMythics === 1) {
      [stats, min_stats, max_stats] = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel, min_stats, max_stats);
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
            [stats, min_stats, max_stats] = setStatBonuses(setWorkingOn.name, equipmentOn, stats, y, accessoryLevel, min_stats, max_stats);
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

          if (setWorkingOn.name === 'Akiho') {
            if (y === '4' ) {
              akiho = true;
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

    let multiplier;
    doubled.mount ? multiplier = 2 : multiplier = 1;

    if (equipmentOn.mount.hasOwnProperty('min') && equipmentOn.mount.hasOwnProperty('max')) {
      
      stats[equipmentOn.mount.effect] += equipmentOn.mount.value * multiplier;
      min_stats[equipmentOn.mount.effect] += equipmentOn.mount.min * multiplier;
      max_stats[equipmentOn.mount.effect] += equipmentOn.mount.max * multiplier;
    } else {
      [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, equipmentOn.mount.effect, equipmentOn.mount.value * multiplier);
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
    if (runes.length > 6) {
      runes.splice(6);
    }
    if (runes.length < 4) {
      runes.push(['x', 'x', 'x', 'x','x', 'x']);
      runes.splice(6);
    }
    let runesForURL = "";
    for (var i = 0; i < runes.length; i++) {

      if (runes[i].id !== 'x') {
        let tempRune = runes[i];
        let multiplier = 1;

        
      
        if ((doubled.rune || ancientEquipped3 ) && i <= 3) {
          multiplier = 2;
        } 

        
        
        //min max
        

        if (tempRune.hasOwnProperty('min') && tempRune.hasOwnProperty('max')) {
          stats[tempRune.effect] += tempRune.value * multiplier;
          min_stats[tempRune.effect] += tempRune.min * multiplier;
          max_stats[tempRune.effect] += tempRune.max * multiplier;
        } else {
          [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, tempRune.effect, tempRune.value * multiplier);
        }
        
        
      } 
      runesForURL += runes[i].id ;
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

    let enchantArray = [];
    for (var p = 0; p < enchantTypes.length; p++) {
      enchantArray.push(enchantTypes[p].title);
    } 

    let multiple;
    doubled.enchant ? multiple = 2 : multiple = 1;
    Object.keys(enchantments).forEach((x) => {
      if (!['alreadyUpdated', 'ownUpdate'].includes(x)) {
      
        if (c <= 5) {

          let r1 = searchObjectArray(enchantTypes, 'title', enchantments[x]['slot1'].title);
          let r2 = searchObjectArray(enchantTypes, 'title', enchantments[x]['slot2'].title);


          let r1Value = r1.value*multiple;
          let r2Value = r2.value*multiple;
          
          

          //DRY this later

          //stats[r2.effect] += r2.value;
          //stats[r1.effect] += r1.value;
          //adding decimals seems to become a repeating decimal, this is a team fix. 
          stats[r1.effect] = Math.round((stats[r1.effect]+r1Value)*1000)/1000;
          min_stats[r1.effect] = Math.round((min_stats[r1.effect]+r1Value)*1000)/1000;
          max_stats[r1.effect] = Math.round((max_stats[r1.effect]+r1Value)*1000)/1000;
          
          stats[r2.effect] = Math.round((stats[r2.effect]+r2Value)*1000)/1000;
          min_stats[r2.effect] = Math.round((min_stats[r2.effect]+r2Value)*1000)/1000;
          max_stats[r2.effect] = Math.round((max_stats[r2.effect]+r2Value)*1000)/1000;

          if (r1.effect2) {
            //stats[r1.effect2] += r1.value2;
            stats[r1.effect2] = Math.round((stats[r1.effect2]+(r1.value2)*multiple)*1000)/1000;
            min_stats[r1.effect2] = Math.round((min_stats[r1.effect2]+(r1.value2)*multiple)*1000)/1000;
            max_stats[r1.effect2] = Math.round((max_stats[r1.effect2]+(r1.value2)*multiple)*1000)/1000;
          }
          if (r2.effect2) {
            //stats[r2.effect2] += r2.value2;
            stats[r2.effect2] = Math.round((stats[r2.effect2]+(r2.value2)*multiple)*1000)/1000;
            min_stats[r2.effect2] = Math.round((min_stats[r2.effect2]+(r2.value2)*multiple)*1000)/1000;
            max_stats[r2.effect2] = Math.round((max_stats[r2.effect2]+(r2.value2)*multiple)*1000)/1000;
            
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

  if (sparking_soulcatcher) {

    //values may be different, not as easy to DRY.
    let maxDamageAddAvg = stats.healing*.5;
    let maxDamageAddMin = min_stats.healing*.5;
    let maxDamageAddMax = max_stats.healing*.5;
    if (maxDamageAddAvg > 15) {
      maxDamageAddAvg = 15;
    }
    if (maxDamageAddMin > 15) {
      maxDamageAddMin = 15;
    }
    if (maxDamageAddMax > 15) {
      maxDamageAddMax = 15;
    }
    
    stats.damage += maxDamageAddAvg; 
    min_stats.damage += maxDamageAddMin;
    max_stats.damage += maxDamageAddMax;
  }

  if (akiho) {
    //values can be different, not as cut and DRY
    let evadeNum = Math.floor(stats.redirect_chance / 5);
    stats.evade += evadeNum * 2.5;

     evadeNum = Math.floor(min_stats.redirect_chance / 5);
    min_stats.evade += evadeNum * 2.5;

     evadeNum = Math.floor(max_stats.redirect_chance / 5);
    max_stats.evade += evadeNum * 2.5;
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


  if (evolviumIsEquipped) {

    if (JSON.stringify(evolviumTable) === JSON.stringify({})) {
      console.log('empty table, try doing something else');
    }
    else {
      if (evolviumName === 'Evolvium Offense') {
        if (evolviumTable.aorb !== '') {
          if (evolviumTable.aorb === 'a') {
            [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, 'damage', 5);
            
          } else {
            [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, 'speed', 5);
          }
         
        }
        if (evolviumTable.eorf !== '') {
          if (evolviumTable.eorf === 'e') {
            [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, 'dual_strike', 5);
          } else {
            [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, 'empower_chance', 5);
          }
         
        }
        if (evolviumTable.gorh !== '') {
          if (evolviumTable.gorh === 'g') {
            stats.damage += 7.5
            min_stats.damage += 3;
            max_stats.damage += 12;
          }
        }
      }
      else if (evolviumName === 'Evolvium Defense') {
        if (evolviumTable.aorb !== '') {
          if (evolviumTable.aorb === 'a') {
              [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, 'damage_reduction', 5);
          } else {
              [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, 'block', 10);
          }
        }
        if (evolviumTable.cord !== '') {
          if (evolviumTable.aorb === 'c') {
              [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, 'evade', 5);
          } else {
              [stats, min_stats, max_stats] = setAllTheSame(stats, min_stats, max_stats, 'absorb', 2.5);
          }
        }
      }


      if (!hasAddedQ) {
        urlEnd+="?";
        hasAddedQ = true;
      } else {
        urlEnd+="&"
      }
      urlEnd += "evolvium=" + evolviumTable.aorb + evolviumTable.cord + evolviumTable.eorf + evolviumTable.gorh;
    }
    
  }
  
  

  stats.links = linkCalculation(stats);
  min_stats.links = linkCalculation(min_stats);
  max_stats.links = linkCalculation(max_stats);

  bonuses.equipmentOn = equipmentOn;
  base.current_stats = stats;

  return {bonuses, urlEnd, stats, min_stats, max_stats};
}

export const convertName = (name) => {
  name = name.split(' ').join('_');
  name = name.split("'").join("");
  name = name.toLowerCase();
  return name;
}

export const setStatBonuses = (name, equipped, stats, count = 2, aU = 0, min_stats, max_stats) => {
  let numLegendary = 0, numSets = 0, numMythics = 0, accessoryUpgrade = aU ;
  let usedMinMax = false;
  let statsToChange = {};


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
        statsToChange.damage = 5;
      }
      if (count === 3) {
         
        max_stats.damage += 30;
      }
      break;
    case 'Night Walker':
      if (count === 2) {
        statsToChange.absorb_chance = 2;
      }
      if (count === 4) {
         
        stats.damage_reduction += 15;
        max_stats.damage_reduction += 15;
      }
      break;
    case "Trugdor's Call":
      if (count === 2) {
        statsToChange.dual_strike = 4;
      }
      if (count === 3) {
         
        
        max_stats.richochet_chance += 7;
      }
      break;
    case "Arsenal":
      if (count === 2) {
        statsToChange.richochet_chance = 2;
      }
      if (count === 3) {
         
        stats.damage += 10;
        max_stats.damage += 10;
      }
      if (count === 4) {
         
        stats.damage += 15;
        min_stats.damage += 1;
        max_stats.damage += 30;
      }
      break;
    case "Taldrilth's Artifacts":
      if (count === 2) {
        statsToChange.deflect_chance = 3;
      }
      if (count === 3) {
        statsToChange.absorb_chance = 6;
      }
      break;
    case 'Bushido':
      statsToChange.damage = 10;
      statsToChange.damage_reduction = -10;
      break;
    case 'Conduction':
      if (count === 2) {
        if (equipped.mainhand.slot === "Bow" || equipped.mainhand.slot === "Spear" ||equipped.mainhand.slot === "Laser Gun" || equipped.mainhand.slot === "Crossbow" || equipped.mainhand.slot === "Staff") {
          statsToChange.damage = 5;
        }
      }
      if (count === 3) {
        statsToChange.empower_chance = 5;
      }
      if (count === 4) {
         
      
        max_stats.damage += 25;
      }
      break;
    case 'Grasberg':
      if (count ===2 ) {
        statsToChange.team_enrage = 3;
      }
      if (count ===3 ) {
        statsToChange.deflect_chance = 7.5;
      }
      break;
    case 'Vanpels':
      if (count === 2 && equipped.mainhand.slot === 'Spear') {
        statsToChange.empower_chance = 5;
      }
      if (count === 3 ) {
        statsToChange.damage = 8;
      }
      break;
    case 'Luminary':
      if (count === 2) {
        statsToChange.damage_enrage = 5;
      }
      if (count === 3) {
        statsToChange.healing = 15;
      }
      break;
    case 'Polaris':
      if (count === 2) {
        statsToChange.damage_enrage = 5;
      }
      if (count === 4) {
         
        stats.damage_reduction += 13;
        min_stats.damage_reduction += 1;
        max_stats.damage_reduction += 25;
      }
      break;
    case 'Lunar Guardian':
      if (count === 2) {
        statsToChange.healing = 15;
      }
      break;
    case 'Obliteration':
      if (count === 4) {
         
        stats.damage_reduction += 15;
        max_stats.damage_reduction += 15;
      }
      break;
    case 'Agony':
      if (count === 2) {
        statsToChange.damage = 3;
      }
      if (count === 4) {
        statsToChange.richochet_chance = 10;
      }
      break;
    case 'Eruption':
      if (count === 3) {
        statsToChange.evade = 12;
      }
      break;
    case 'Illustrious Artifacts':
      if (count === 2) {
        statsToChange.damage = 4;
        statsToChange.healing = 4;
      }
      break;
    case 'Taters':
      if (count === 2) {
        statsToChange.speed = 4;
      }
      break;
    case 'Inferno':
      if (count === 2) {
        statsToChange.empower_chance = 4;
      }
      if (count === 4) {
        statsToChange.sp_damage = 20;
      }
      break;
    case 'Requiem':
      if (count === 2) {
        statsToChange.damage = 25;
      }
      if (count === 3) {
         
        stats.damage += 13;
        min_stats.damage += 1;
        max_stats.damage += 24;
      }
      break;
    case 'Gatekeeper':
      if (count === 2) {
        statsToChange.quad_strike = 0.5;
      }
      break;
    case 'Featherfall':
      if (count === 2) {
        statsToChange.damage = 4;
      }
      if (count === 3) {
        statsToChange.speed = 4;
      }
      if (count === 4) {
        statsToChange.dual_strike = 4;
      }
      if (count === 5) {
        statsToChange.empower_chance = 4;
      }
      if (count === 6) {
        statsToChange.quad_strike = 2;
      }
      break;
    case 'Hellfire':
      if (count === 2) {
        statsToChange.damage_reduction = 4;
      }
      if (count === 3) {
        statsToChange.block = 8;
      }
      if (count === 4) {
        statsToChange.evade = 4;
      }
      if (count === 5) {
        statsToChange.deflect_chance = 3;
      }
      if (count === 6) {
        statsToChange.absorb_chance = 4;
      }
      break;
    case 'Pew Pew':
      statsToChange.richochet_chance = 3;
      break;
    case 'Hysteria':
       
      stats.damage += 5;
      min_stats.damage += 1;
      max_stats.damage += 10;
      break;
    case 'Bub':
      statsToChange.absorb_chance = 2;
      break;
    case 'Superstition':
      statsToChange.team_enrage = 3;
      break;
    case 'Night Visage':
       
      stats.damage += 0;
      min_stats.damage += 0;
      max_stats.damage += 5;
      break;
    case 'Virulence':
      if (count === 2) {
         
        max_stats.damage_reduction += 20;
      }
      break;
    case 'Cometfell':
      statsToChange.quad_strike = 1;
      break;
    case 'Nebuleye':
      statsToChange.damage = parseInt(numLegendary, 10);
      break;
    case 'Hood Of Menace': 
       
      stats.evade += 0;
      min_stats.evade += 0;
      max_stats.evade += 5;
      break;
    case 'Crypt Tunic':
      statsToChange.deflect_chance = 2;
      break;
    case "Fish N' Barrel":
      statsToChange.damage_reduction = 5;
      statsToChange.damage = -5;
      break;
    case 'Magmasher':
      statsToChange.healing = 10;
      break;
    case 'Nemesis':
      statsToChange.dual_strike = 4;
      break;
    case 'Bedlam':
      statsToChange.healing = 8;
      break;
    case 'Veilage':
      statsToChange.empower_chance = 4;
      break;
    case 'Flickerate':
      statsToChange.absorb_chance = 2;
      break;
    case 'Dewey Decal':
       
      stats.damage += 5;
      min_stats.damage += 0;
      max_stats.damage += 5;
      break;
    case 'Shifting Breeze':
      statsToChange.speed = 4;
      break;
    case 'Brightstar':
      statsToChange.deflect_chance= 3;
      break;
    case 'Lava Defender':
      statsToChange.redirect_chance = 5;
      break;
    case 'Moon Collage':
      stats.damage += 4;
      min_stats.damage += 1;
      max_stats.damage += 50;
       
      break;
    case 'Mewmeck':
      statsToChange.damage = 1;
      statsToChange.dual_strike = 1;
      statsToChange.empower_chance= 1;
      break;
    case 'Peppermint Ring':
      statsToChange.team_enrage = 2;
      statsToChange.damage = 1;
      break;
    case 'Peeper':
       
      stats.damage += 4;
      min_stats.damage += 1;
      max_stats.damage += 8;
      break;
    case 'Ataraxia':
      statsToChange.damage = parseInt(numSets, 10);
      break;
    case 'Oblivion':
      statsToChange.absorb_chance = 1;
      statsToChange.deflect_chance = 1;
      statsToChange.evade = 1;
      break;
    case 'Twitch':
       
      stats.damage_reduction += 4;
      min_stats.damage_reduction += 1;
      max_stats.damage_reduction += 8;
      break;
    case 'Radiance':
      statsToChange.damage = .75 * parseInt(numMythics, 10);
      statsToChange.damage_reduction = .75 * parseInt(numMythics, 10);
      break;
    case 'Vile Focus':
       
      stats.absorb_chance += 3;
      min_stats.absorb_chance += 0;
      max_stats.absorb_chance += 3;
      break;
    case 'Abhorence':
      statsToChange.richochet_chance = 1.5;
      statsToChange.empower_chance = 1;
      statsToChange.dual_strike = 1;
      break;
    case 'Cloak of Dark Tides':
      statsToChange.damage_reduction = -5;
      statsToChange.damage = 5;
      break;
    case 'Widowmaker':
      statsToChange.critical_chance = 16+(1*accessoryUpgrade);
      statsToChange.critical_damage = 50;
      statsToChange.empower_chance = 8;
      break;
    case 'Seaphims Grace':
      statsToChange.block = 20+(1*accessoryUpgrade);
      statsToChange.evade = 10+(.5*accessoryUpgrade);
      statsToChange.evade = 4;
      break;
    case 'Melvin Champ':
      statsToChange.dual_strike = 20+(.5*accessoryUpgrade);
      statsToChange.critical_chance = 16+(1*accessoryUpgrade);
      break;
    case 'Abominable Trophy':
      statsToChange.damage_reduction = 20+(1*accessoryUpgrade);
      statsToChange.absorb_chance = 5;
      break;
    case 'Wrath':
      statsToChange.deflect_chance = 10+(.75*accessoryUpgrade);
      statsToChange.absorb_chance = 7.5;
      break
    case 'Baronets':
      statsToChange.empower_chance = 20+(1*accessoryUpgrade);
      statsToChange.dual_strike = 9;
      break;
    case 'Astaroths Diadem':
      statsToChange.empower_chance = 3.5+(.5*accessoryUpgrade);
      statsToChange.dual_strike = 3.5+(.5*accessoryUpgrade);
      statsToChange.damage = 6;
      statsToChange.speed = 6;
      statsToChange.critical_chance = 5;
      statsToChange.critical_damage = 50;
      break;
    case 'Melvin Stew':
      statsToChange.absorb_chance = 15+(.5*accessoryUpgrade);
      break;
    case 'The Atomising Neutrino Accelerator':
      statsToChange.block = 60+(2*accessoryUpgrade);
      break;
    case 'Travelling Forge':
      statsToChange.dual_strike = 12+(.5*accessoryUpgrade);
      statsToChange.empower_chance = 12+(.5*accessoryUpgrade)
      statsToChange.critical_chance = 10;
      break;
    case 'Transcendence':
      statsToChange.critical_chance = 40+(1*accessoryUpgrade);
      statsToChange.dual_strike = 4.5+(.25*accessoryUpgrade);
      statsToChange.empower_chance = 4.5+(.25*accessoryUpgrade)
      break;
    case 'Sakura':
      statsToChange.damage_reduction = 25;
      statsToChange.block = 10+(2*accessoryUpgrade)
      break;
    case 'Zaserite Wings':
      statsToChange.critical_chance=10+(.4*accessoryUpgrade);
      statsToChange.empower_chance=6+(.2*accessoryUpgrade);
      statsToChange.dual_strike=6+(.2*accessoryUpgrade);
      statsToChange.damage=6+(.2*accessoryUpgrade);
      statsToChange.speed=6+(.2*accessoryUpgrade);
      statsToChange.life_steal = 6;
      break;
    case 'Drozgul':
      statsToChange.damage_reduction=8+(1*accessoryUpgrade);
      statsToChange.evade = 5;
      statsToChange.absorb_chance = 5;
      statsToChange.deflect_chance = 5;
      break;
    case 'Seraphims Grace':
      statsToChange.block = 20+(1*accessoryUpgrade);
      statsToChange.evade = 10+(.5*accessoryUpgrade);
      statsToChange.deflect_chance = 5;
      break;
    case 'Acropodium':
      statsToChange.damage=30.5+(1*accessoryUpgrade);
      break;
    case 'Melvin Cloak':
      statsToChange.damage = 2;
      break;
    case 'Degenera':
      statsToChange.absorb_chance = 1;
      statsToChange.deflect_chance = 1;
      statsToChange.damage_reduction = 1;
      break;
    case 'Bassault':
       
      stats.damage_reduction += 0;
      min_stats.damage_reduction += 0;
      max_stats.damage_reduction += 5;
      break;
    case 'Frostybite':
      statsToChange.sp_damage = 5;
      break;
    case 'Meteor Chain':
      statsToChange.dual_strike = 1;
      statsToChange.empower_chance = 1;
      break;
    case 'Vortex Zapper':
      statsToChange.richochet_chance = 3;
      break;
    case 'Meteor Blaster':
       
      stats.healing += 7.5;
      min_stats.healing += 5;
      max_stats.healing += 10;
      break;
    case 'Power Core':
      statsToChange.damage_reduction = 25+(1*accessoryUpgrade);
      statsToChange.evade = 5;
      break;
    case 'Goldwings Chivalry':
        statsToChange.damage_reduction = 16+(1*accessoryUpgrade);
        statsToChange.absorb_chance = 8;
        statsToChange.damage = -4;
        break;
    case 'Jupingz':
      statsToChange.empower_chance = 14.5+(0.5*accessoryUpgrade);
      statsToChange.dual_strike = 14.5+(0.5*accessoryUpgrade);
      break;
    case 'Vortex Band':
       
      stats.damage_reduction += 2.5;
      min_stats.damage_reduction += 1;
      max_stats.damage_reduction += 4.5;
      break;
    case 'Nice To Meat Ya':
      statsToChange.damage_reduction = 2;
      statsToChange.absorb_chance = 1;
      break;
    case 'Gold Pendant':
      statsToChange.damage = 10+(.5*accessoryUpgrade);
      statsToChange.speed = 10+(.5*accessoryUpgrade);
      statsToChange.dual_strike = 9;
      break;
    case 'Honor Cloud':
      statsToChange.critical_chance = 30;
      statsToChange.evade = 10;
      break;
    case 'Merciless':
      if (count === 2 && equipped.mainhand.slot === "Spear") {

        statsToChange.damage = 5;
      }
      if (count === 4) {
         
        stats.damage += 25;
        min_stats.damage += 15;
        max_stats.damage += 35;
      }
      break;
    case 'Earthen Might':
      if (count === 2) {
        statsToChange.deflect_chance = 2;
      }
      if (count === 4) {
         
        stats.damage += 17.5;
        min_stats.damage_reduction += 10;
        max_stats.damage_reduction += 25;
      }
      break;
    case 'Ultimatum':
        statsToChange.dual_strike = 2;
        statsToChange.quad_strike = 0.5;
        break;
    case 'Slibinas':
      statsToChange.block = 1;
      statsToChange.evade = 1;
      statsToChange.damage_reduction = 1;
      statsToChange.absorb_chance = 0.5;
      statsToChange.deflect_chance = 0.5;
      break;
    case 'Sleipnir':
       
      stats.damage += 5;
      min_stats.damage += 0;
      max_stats.damage += 5;
      break;
    case 'Pep Pep':
      statsToChange.quad_strike = 1;
      break;
    case 'Blorg Implant':
       
      stats.damage += 0;
      min_stats.damage += 0;
      max_stats.damage += 10;
      break;
    case 'Timeweaver Garments':
       
      stats.damage_reduction += 5;
      min_stats.damage_reduction += 0;
      max_stats.damage_reduction += 5;
      break;
    case 'Trident':
        if (count === 2) {
          statsToChange.sp_damage = 15;
        }
        break;
    case 'Venom':
      if (count === 2) {
        statsToChange.team_enrage = 2;
      }
      if (count === 3) {
        statsToChange.damage_reduction = 2.5;
      }
      if (count === 4) {
         
        stats.damage_reduction += 17.5;
        max_stats.damage_reduction += 17.5;
      }
      break;
    case 'Camouflage':
      if (count === 2) {
        statsToChange.quad_strike = 1;
      }
      if (count === 3) {
        statsToChange.ignore_defense = 5;
      }
      if (count === 4) {
        statsToChange.damage = 40;
      }
      break;
    case 'Mistery':
        if (count === 2) {
          statsToChange.dual_strike = 4;
        }
        break;
    case 'Courage':
      if (count === 2) {
        statsToChange.sp_damage = 10;
      }
      break;
    case 'Blind Souls':
       
      stats.absorb_chance += 2.5;
      min_stats.absorb_chance += 0.5;
      max_stats.absorb_chance += 25;
      break;
    case "Conquerors Fury":
      statsToChange.empower_chance = 4;
      break;
    case "Battleplate":
      statsToChange.sp_damage = 5;
      break;
    case 'Windstalker': 
       
      stats.damage += 4;
      min_stats.damage += 1;
      max_stats.damage += 8;
      break;
    case 'Proton Beem Zapper':
      statsToChange.richochet_chance = 1.5;
      statsToChange.quad_strike = 0.5;
      break;
    case 'Empyrean Vindicator':
       
      stats.damage_reduction += 0;
      min_stats.damage_reduction += 0;
      max_stats.damage_reduction += 5;
      break;
    case 'Phoenix Ravager':
       
      stats.damage_reduction += 0;
      min_stats.damage_reduction += 0;
      max_stats.damage_reduction += 5;
      break;
    case 'Ironbark Longbow':
       
      stats.damage += 4;
      min_stats.damage += 2;
      max_stats.damage += 8;
      break;
    case 'Hydronus Helmet':
      statsToChange.speed = 3;
      statsToChange.critical_chance = 8;
      break;
    case 'Hydragar Stone':
       
      stats.absorb_chance += 5;
      min_stats.absorb_chance +=0;
      max_stats.absorb_chance += 5;
      break;

    case 'Glamounir':
      statsToChange.absorb_chance = 1;
      statsToChange.deflect_chance = 1;
      statsToChange.evade = 1;
      break;
    case 'Bassoul':
      statsToChange.absorb_chance = 2;
      statsToChange.damage = 1;
      break;
    case 'Demonmullet':
      statsToChange.damage_reduction = 2;
      break;
    case 'Scrawny':
      statsToChange.empower_chance = 2;
      statsToChange.speed = 2;
      break;
    case 'Chippity':
      statsToChange.damage = 1;
      statsToChange.dual_strike = 1;
      statsToChange.empower_chance = 1;
      statsToChange.speed = 1;
      break;

    case 'Dragonskull':
      if (count === 2) {
         
        max_stats.damage += 12;
        stats.damage += 7;
        min_stats.damage += 2;
      }
      break;
    case 'Blackarrow':
      if (count === 2) {
         
        max_stats.absorb_chance += 7;
        stats.absorb_chance += 4.5;
        min_stats.absorb_chance += 2;
      }
      break;
    case 'Voltio':
      if (count === 4) {
         
        stats['electric_damage'] += 30;
        min_stats['electric_damage'] += 0;
        max_stats['electric_damage'] += 60;
      }
      if (count === 6) {
         
        max_stats['electric_damage'] += 50;
      }
      break;
    case 'Nephilim Shield':
      statsToChange.dual_strike = 4;
      break;
    case 'Nephilim Legacy':
      statsToChange.damage = 4;
      statsToChange.damage_reduction = 4;
      break;
    case 'Nephilim Casque':
       
      stats.speed += 5;
      min_stats.speed += 0;
      max_stats.speed += 5;
      break;
    case 'Nephilim Girdle':
       
      stats.empower_chance += 3.75;
      min_stats.empower_chance += 1.25;
      max_stats.empower_chance += 6.25
      break;
    case 'Pyroc':
      if (count === 2) {
        statsToChange.empower_chance = 2;
      }
      if (count === 3) {
         
        max_stats['fire_damage'] += 15;
      }
      if (count === 4) {
        stats['fire_damage'] += 30;
         
        max_stats['fire_damage'] += 30;
      }
      break;
    case 'Nepulus':
      if (count === 3) {
        statsToChange.deflect_chance = 8;
      }
      if (count === 4) {
        stats['water_resistance'] += 14;
        min_stats['water_resistance'] += 8;
        max_stats['water_resistance'] += 18;
         
      }
      break;
    case 'Pangea':
      if (count === 4) {
        statsToChange.block = 40;
      }
      break;
    case 'Lucernas':
      if (count === 2) {
        statsToChange.team_enrage = 2;
      }
      if (count === 3) {
         
        max_stats['air_damage'] += 15;
        stats['air_damage'] += 15;
      }
      if (count === 4) {
         
        max_stats.healing += 15;
        stats.healing += 7.5;
        min_stats.healing += 1.5;
      }
      break;
    case 'Astaroth Flag':
        statsToChange.critical_chance = 20+(1*accessoryUpgrade);
        statsToChange.damage = 18+(.5*accessoryUpgrade);
        break;
    case 'Bit Chain':
      statsToChange.critical_chance = 14
      statsToChange.damage = 11+(.5*accessoryUpgrade);
      statsToChange.dual_strike = 11+(.5*accessoryUpgrade);
      break;
    case 'Mirror Wings':
      statsToChange.block = 22 + (2*accessoryUpgrade);
      statsToChange.deflect_chance = 10;
      break; 
    case 'Ancient Pendant':
      statsToChange.speed = 10+(.5*accessoryUpgrade);
      statsToChange.damage = 10+(.5*accessoryUpgrade);
      statsToChange.dual_strike = 4;
      break; 
    case 'Grim Ward':
      statsToChange.damage_enrage = 10+(.5*accessoryUpgrade);
      statsToChange.health = 10+(.5*accessoryUpgrade);
      statsToChange.deflect_chance = 5;
      break;  
    case 'Carbi':
      statsToChange.water_resistance = 10;
      statsToChange.damage_reduction = 20+(1*accessoryUpgrade);
      break;
    case 'Gryphen Resistor':
      statsToChange.block = 22+(2*accessoryUpgrade);
      statsToChange.deflect_chance = 10;
      statsToChange.electric_resistance = 5;
      break;
    case 'Amaglon':
      statsToChange.block = 8;
      break;
    case 'Ceraunos':
      if (count === 2) {
         
        max_stats.evade += 10;
        stats.evade += 5;
        min_stats.evade += 0;
      }
      if (count === 3) {
         
        max_stats.air_resistance += 12;
        stats.air_resistance += 6;
        min_stats.air_resistance += 0;
      }
      break;
    case 'Nugget Of Grasberg':
      statsToChange.evade = 1.5;
      statsToChange.block = 5;
      break;
    case 'Tatooi':
      statsToChange.block = 70 + (2.5*accessoryUpgrade);
      break;
    case 'Misty Shrowd':
      statsToChange.damage_reduction = 26+(1*accessoryUpgrade);
      statsToChange.block = 18+(.5*accessoryUpgrade);
      break;
    case 'Hunter Trophy':
      statsToChange.damage_reduction = 26;
      statsToChange.absorb_chance = 5 + (0.5*accessoryUpgrade);
      break;
    case 'Resistor':
      statsToChange.block = 32 + (2*accessoryUpgrade);
      statsToChange.damage_reduction = 10;
      statsToChange.deflect_chance = 5 + (.5*accessoryUpgrade);
      break;
    case 'Mythic Core':
      statsToChange.damage_reduction = 28;
      statsToChange.evade = 8;
      break;
    case 'Seraphim Ascendence':
      statsToChange.evade = 22;
      statsToChange.block = 26+(2.5*accessoryUpgrade);
      break;
    case 'Ascendancy':
      statsToChange.dual_strike = 7;
      statsToChange.empower_chance = 7;
      statsToChange.critical_chance = 50 + (3*accessoryUpgrade);
      stats.critical_damage += 6;
      min_stats.critical_damage += 2;
      max_stats.critical_damage += 10;
      break;
    case 'Astaroths Crown':
      statsToChange.empower_chance = 6+(.25*accessoryUpgrade);
      statsToChange.dual_strike = 6+(.25*accessoryUpgrade);
      statsToChange.damage = 6+(.25*accessoryUpgrade);
      statsToChange.speed = 6+(.25*accessoryUpgrade);
      statsToChange.critical_chance = 6+(.25*accessoryUpgrade);
      statsToChange.critical_damage = 88;
      break;
    case 'Shokan Attachment':
      statsToChange.damage = 7+(.75*accessoryUpgrade);
      statsToChange.speed = 8;
      statsToChange.empower_chance = 8;
      statsToChange.dual_strike = 8;
      statsToChange.critical_chance = 15+(.75*accessoryUpgrade);
      statsToChange.life_steal = 10;
      break;
    case 'Hailes Power Supply':
      statsToChange.empower_chance = 18+(.5*accessoryUpgrade);
      statsToChange.dual_strike = 20+(1*accessoryUpgrade);
      break;
    case 'Divine Ward':
      statsToChange.dual_strike = 17+(.5*accessoryUpgrade);
      statsToChange.quad_strike = 5+(.25*accessoryUpgrade);
      statsToChange.richochet_chance = 3;
      break;
    case' Fobett':
      statsToChange.critical_chance = 30+(1.25*accessoryUpgrade);
      statsToChange.critical_damage = 70;
      break;
    case 'Manticore':
      if (count === 2) {
        statsToChange.redirect_chance = 2;
        statsToChange.absorb_chance = 2;
      }
      if (count === 4) {
         
        max_stats.damage_reduction += 20;
        max_stats.redirect_chance += 15;
        stats.damage_reduction += 20;
        stats.redirect_chance += 15;
      }
      break;
    case "Behemoth": 
      if (count === 2) {
        statsToChange.empower_chance = 4;
      }
      if (count === 3) {
         
        max_stats.earth_damage = 50;
      }
      if (count === 4) {
        statsToChange.dual_strike = 15;
        max_stats.earth_damage += 30;
        stats.earth_damage += 30;
      }
      break;
    case 'Raiju':
      if (count === 2) {
         
        max_stats.electric_damage += 10;
        stats.electric_damage += 10;
      }
      if (count === 3) {
         
        max_stats.empower_chance += 100;
        stats.empower_chance += 50;
        min_stats.empower_chance += 10;
      }
      if (count === 4) {
        statsToChange.speed = 10;
        statsToChange.electric_damage = 30;
        max_stats.daamge -= 3;
        stats.damage -= 15;
        min_stats.damage -= 30;
        //probably better to calculate this after everything is counted for a total empower. 
      }
      break;
    case 'Kaijin Fang':
       
      stats.damage_reduction += 4;
      min_stats.damage_reduction += 0;
      max_stats.damage_reduction += 10;
      break;
    case 'Kaijin Ring':
      statsToChange.healing = 16;
      break;
    case 'Kaijin Reminder ':
       
      stats.damage += 0;
      min_stats.damage += 0;
      max_stats.damage += 25;
      break;
    case 'Kaijin Furnace':
       
      stats.damage += 7.5;
      min_stats.damage += 3;
      max_stats.damage += 12;
      break;
    case 'Kaijin Augury':
       
      stats.damage_reduction += 0;
      min_stats.damage_reduction += 0;
      max_stats.damage_reduction += 10;
      break;
    case 'Flamewarden':
      if (count === 4) {
        statsToChange.evade = 10;
        statsToChange.fire_resistance = 10;
      }
      break;
    case 'Cursed':
      if (count === 2) {
        statsToChange.damage = 3;
      }
      break;
    case 'Tapior': 
      if (count === 2) {
        statsToChange.healing = 8;
      }
      if (count === 3 && equipped.mainhand.slot === "Staff") {
        statsToChange.healing = 16;
      }
      break;
    case 'Water Demon':
      if (count === 4) {
         
        max_stats.water_damage += 40;
        stats.water_damage += 25;
        min_stats.water_damage += 10;
      }
      break;
    case 'Sparks':
      if (count === 2) {
        max_stats.healing += 25;
      }
      break;
    case 'Tau Bless':
       
      stats.damage += 2.5;
      min_stats.damage += 1;
      max_stats.damage += 4.5;
      break;
    case 'Huntress Savior':
       
      stats.healing += 20;
      min_stats.healing += 0;
      max_stats.healing += 20;
      break;
    case 'Frozen Beads':
       
      stats.deflect_chance += 5;
      min_stats.deflect_chance += 0;
      max_stats.deflect_chance += 5;
      break;
    case 'Demons Garments':
       
      min_stats.damage += 5;
      min_stats.damage_reduction += 5;
      break;
    case 'Sparking Husk':
       
      stats.empower_chance += 5;
      min_stats.empower_chance += 0;
      max_stats.empower_chance += 5;
      break;
    case 'Supay':
      if (count === 3) {
         
        max_stats.earth_resistance += 15;
        stats.earth_resistance += 9;
        min_stats.earth_resistance += 3;
      }
      if (count === 4) {
        statsToChange.block = 20;
      }
      break;
    case 'Quetzal Sorrow':
      statsToChange.life_steal = 5;
      break;
    case 'Quetzal Gift':
       
      stats.evade += 5;
      min_stats.evade += 0;
      max_stats.evade += 5;
      break;
    case 'Montezuma':
      if (count === 2) {
        statsToChange.speed = 5;
      }
      if (count === 3) {
         
        max_stats.air_damage += 12;
        stats.air_damage += 7.5
        min_stats.air_damage += 3;
      }
      break;
    case 'Quetzal Greatcloak': 
      statsToChange.critical_chance = 5;
      break;
    case 'Quetzal Faith':
        statsToChange.dual_strike = 4;
        break;
    case 'Eleuia':
        if (count === 2) {
          statsToChange.damage = 3;
        }
        if (count === 3) {
          statsToChange.healing = 10;
        }
        if (count === 4) {
          statsToChange.fire_resistance = 15;
        }
      break;
    case 'Saywite':
        if (count === 2 ) {
          stats.team_enrage += 3;
          max_stats.team_enrage += 3;
        }
        if (count === 3) {
          statsToChange.water_resistance = 20;
          statsToChange.damage = -10;
        } 
        if (count === 4) {
          max_stats.water_resistance += 25;
          statsToChange.block = 20;
        }
      break;
    case 'Quetzal Warshield':
      statsToChange.deflect_chance = 4;
      break;
    case 'Quetzal Scaled Vest':
       
      stats.damage_reduction += 5;
      min_stats.damage_reduction += 1;
      max_stats.damage_reduction += 10;
      break;
    case 'Akiho':
      if (count === 2) {
        max_stats.evade += 5;
        stats.evade += 5;
      }
      if (count === 3) {
        stats.evade += 15;
        max_stats.evade += 15;
      }
      break;
    case 'Boreas Fire Scrolls':
      statsToChange.damage = 3;
      break;
    case 'Boreas Battleaxe':
       
      max_stats.air_damage = 10;
      break;
    case 'Boreas Spacecap':
       
      max_stats.air_damage = 20;
      break;
    case 'Evenor':
      if (count === 2) {
        max_stats.empower_chance += 4;
        min_stats.damage += 3;
        stats.damage += 7.5
        max_stats.damage += 12;
      }
      break;
    case 'Wrightbros':
      if (count === 2) {
        max_stats.air_damage += 12;
        stats.air_damage += 7.5
        min_stats.air_damage += 3;
      }
      if (count === 3) {
        max_stats.empower_chance += 15; 
        stats.empower_chance += 15;
      }
      if (count === 4) {
        statsToChange.air_damage = 15;
      }
      break;
    case 'Perkunas':
      if (count === 2) {
        statsToChange.redirect_chance = 5;
      }
      if (count === 3) {
        max_stats.block += 20;
        stats.block += 20;
      }
      break;
    case 'Powerful Totem':
      statsToChange.block = 30+(2*accessoryUpgrade);
      statsToChange.damage_reduction = 15;
      break;
    case 'Thorstein Scale':
      stats.team_enrage += 3;
      break;
    case 'Thorstein Wall':
      max_stats.fire_damage += 10;
      break;
    case 'Thorstein Talisman':
      statsToChange.healing = 20;
      break;
    case 'Thorstein Crown':
      max_stats.absorb_chance += 5;
      break;

    case 'Ondina':
      if (count === 2) {
        stats.water_resistance += 5
        max_stats.water_resistance += 10;
      }
      if (count === 4) {
        stats.deflect_chance += 25;
        max_stats.deflect_chance += 25;
      }
      break;
    case 'Orvar':
      if (count === 2) {
        max_stats.healing += 20;
      }
      if (count === 3 ) {
        max_stats.electric_damage += 20;
      } 
      break;
    case 'Einar':
      if (count === 2) {
        statsToChange.richochet_chance = 3;
      }
      if (count === 3) {
        statsToChange.fire_damage = 5;
        max_stats.damage_enrage += 40;
      }
      if (count === 4) {
        statsToChange.fire_damage = 15;
      }
      break;
    case 'Sigbiorn':
      if (count === 3) {
        statsToChange.earth_resistance = 10;
      }
      if (count === 4) {
        statsToChange.earth_resistance = 10;
      }
      break;
    default: 
      //console.log(name, equipped, stats);
      break;
  };

  if (!usedMinMax) {
    Object.keys(statsToChange).forEach((x) => {
      stats[x] += parseInt(statsToChange[x], 10);
      min_stats[x] += parseInt(statsToChange[x], 10);
      max_stats[x] += parseInt(statsToChange[x], 10);
    });
  }
  

  return [stats, min_stats, max_stats];
}