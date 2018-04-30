import React from 'react';
import Router from "../components/Router";
import App from "../components/App";
import Equipment from "../components/Equipment";
import { shallow, mount } from 'enzyme';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";

import {equipment} from '../equipment';
import {sets} from '../sets';

var wrapper, equipmentWrapper, props;
describe('Add Function', () => {
	beforeEach(function() {
		wrapper = shallow(<App />);
		var mainhands = {}, offhands = {}, 
	    bodies = {}, heads = {}, rings = {}, 
	    necklaces = {}, pets = {}, accessories = {}, mythics = {};

	    Object.keys(equipment).forEach( (x) => {
	    	if (equipment[x].type === "mythic") {
        		mythics[x] = equipment[x];
     		}
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
		props = {
			equipment,
			sets,
			sortedEquipment,
			mythics,
			equipItem: jest.fn()
		}
		equipmentWrapper = shallow(<Equipment {...props} />);
	});

	it('Contains a equipment area', () => {
		//Do one for each area, mythic, set, slot
		expect(wrapper.find('Equipment').dive().find('.by-set-reveal-sub-ares_legacy').find('li').first().length).toBe(1);
		expect(wrapper.find('Equipment').dive().find('.by-mythic-reveal').find('li').first().length).toBe(1);
		expect(wrapper.find('Equipment').dive().find('.by-slots-body-reveal').find('li').first().length).toBe(1);
	});

	it('Equips the clicked item', () => {
		wrapper.find('Equipment').dive().find('.by-set-reveal-sub-ares_legacy').find('li').first().simulate('click');
		expect(wrapper.state().equipped.mainhand).toBeDefined();
		wrapper.find('Equipment').dive().find('.by-mythic-reveal').find('li').first().simulate('click');
		expect(wrapper.state().equipped.mainhand.name).toBe('Pew Pew');
		wrapper.find('Equipment').dive().find('.by-slots-accessory-reveal').find('li').first().simulate('click');
		expect(wrapper.state().equipped.accessory.name).toBe('Acropodium');
	})
});

