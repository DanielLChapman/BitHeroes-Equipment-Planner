import React from 'react';
import Router from "../components/Router";
import Equipment from "../components/Equipment";
import { shallow, mount } from 'enzyme';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";

import {equipment} from '../equipment';
import {sets} from '../sets';

var wrapper;
describe('Layout', () => {
	beforeEach(function() {
		var mainhands = {}, offhands = {}, 
	    bodies = {}, heads = {}, rings = {}, 
	    necklaces = {}, pets = {}, accessories = {};
	    Object.keys(equipment).forEach( (x) => {
	      switch(equipment[x].slot) {
	        case 'Offhand':
	          offhands[x] = equipment[x];
	          break;
	        case 'Body':
	          bodies[x] = equipment[x];
	          break;
	        case 'Head':
	          heads[x] = equipment[x];
	          break;
	        case 'Ring':
	          rings[x] = equipment[x];
	          break;
	        case 'Necklace':
	          necklaces[x] = equipment[x];
	          break;
	        case 'Pet':
	          pets[x] = equipment[x];
	          break;
	        case 'Accessory':
	          accessories[x] = equipment[x];
	          break;
	        default: 
	          mainhands[x] = equipment[x];
	      }
	    });

	    const sortedEquipment = {
	        mainhands, 
	        offhands, 
	        bodies, 
	        heads, 
	        rings, 
	        necklaces, 
	        pets, 
	        accessories
	      }
		const props = {
			equipment,
			sets,
			sortedEquipment
		}
		wrapper = shallow(<Equipment {...props} />);
	});
	it('Containers 3 buttons', () => {
		expect(wrapper.find('.by-main-buttons').length).toBe(3);
	});
	it('expects to find 3 uls with names', () => {
		expect(wrapper.find('.by-set-reveal').length).toBe(1);
		expect(wrapper.find('.by-mythic-reveal').length).toBe(1);
		expect(wrapper.find('.by-slot-reveal').length).toBe(1);
	})
	it('Expects .by-set-reveal to contain 18 lis', () => {
		expect(wrapper.find('.by-sets-names').length).toBe(18);
	});
	it('Expects .by-mythic-reveal to contain 16 lis', () => {
		expect(wrapper.find('.by-mythic-reveal').find('li').length).toBe(16);
	});
	it('Expects .by-slot-reveal to contain 8 lis', () => {
		expect(wrapper.find('.by-slot-reveal').find('.by-slot-types').length).toBe(8);
		expect(wrapper.find('.by-slot-types').first().find('ul').length).toBe(1);
		expect(wrapper.find('.by-slot-types').first().find('span').length).toBe(1);
		expect(wrapper.find('.by-slot-types').first().find('ul').find('li').length).toBeGreaterThan(0);
	});

})