import React from 'react';
import Router from "../components/Router";
import Equipped from "../components/Equipped";
import { shallow, mount } from 'enzyme';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";

import {equipment} from '../equipment';
import {sets} from '../sets';

var wrapper;
describe('Layout', () => {
	beforeEach(function() {
		const props = {
			equipped: {
				mainhand: {},
		        offhand: {},
		        body: {},
		        head: {},
		        ring: {},
		        necklace: {},
		        pet: {},
		        accessory: {}
			},
			removeItem: jest.fn()
		}
		wrapper = shallow(<Equipped {...props} />);
	});
	it('Contains 8 EquipContainers', () => {
		expect(wrapper.find('.equipped-container').length).toBe(8);
	});
})