import React from 'react';
import Router from "../components/Router";
import Stats from "../components/Stats";
import { shallow, mount } from 'enzyme';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";

import {equipment} from '../equipment';
import {sets} from '../sets';
import {stats} from '../stats';

var wrapper;
describe('Layout', () => {
	beforeEach(function() {
		wrapper = shallow(<Stats />);
	});
	it('Containers a title and sharable-link area', () => {
		console.log('here');
	});
})