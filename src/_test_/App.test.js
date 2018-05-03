import React from 'react';
import Router from "../components/Router";
import App from "../components/App";
import { shallow, mount } from 'enzyme';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";

import {equipment} from '../equipment';
import {sets} from '../sets';

var wrapper;
describe('Layout', () => {
	beforeEach(function() {
		wrapper = shallow(<App />);
	});
	it('Containers a title and sharable-link area', () => {
		expect(wrapper.find('.header').length).toBe(1);
		expect(wrapper.find('.title').length).toBe(1);
		expect(wrapper.find('.sharable-link').length).toBe(1);
	});
	it('Breaks the page into left and right', () => {
		expect(wrapper.find('.left').length).toBe(1);
		expect(wrapper.find('.right').length).toBe(1);
	});
	it('Expects a equipped section and an equipment section', () => {
		expect(wrapper.find('.equipped').length).toBe(1);
		expect(wrapper.find('.equipment').length).toBe(1);
	});
	it('Expects under equipment a Equipment component', () => {
		expect(wrapper.find('.equipment').find('Equipment').length).toBe(1);
	});
	it('Expects .equip to have a Equipped component', () => {
		expect(wrapper.find('.equipped').find('Equipped').length).toBe(1);
	});
	it('Has an area for bonuses', () => {
		expect(wrapper.find('.bonuses').length).toBe(1);
		expect(wrapper.find('BonusView').length).toBe(1);
	});
})