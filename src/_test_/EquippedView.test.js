import React from 'react';
import Router from "../components/Router";
import EquippedView from "../components/EquippedView";
import { shallow, mount } from 'enzyme';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";

import {equipment} from '../equipment';
import {sets} from '../sets';

var wrapper, props;
describe('Layout', () => {
	beforeEach(function() {
		props = {
			equipped: {...equipment['phobos']} 
		}
		wrapper = shallow(<EquippedView {...props}/>);
	});
	it('Contains a div for images and an img tag', () => {
		expect(wrapper.find('.equipped-image-view').length).toBe(1);
		expect(wrapper.find('img').length).toBe(1);
	});
	it('Contains a span for names', () => {
		expect(wrapper.find('span').length).toBe(1);
	});

	it('Contains something else if there is no names', () => {
		props = {
			equipped: {

			}
		}
		var wrapper2 = shallow(<EquippedView {...props} />);
		expect(wrapper2.find('img').length).toBe(0);
		expect(wrapper2.find('.nothing-to-see-here').length).toBe(1);
	})
})