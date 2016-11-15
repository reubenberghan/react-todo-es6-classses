'use strict';

// all the modules required to run the tests on the components
const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const $ = require('jQuery');
// this is a special module required for react testing as we need to be able to 'render' the component to test its functions
// and this module provides the utilities to do so
const TestUtils = require('react-addons-test-utils');

// our component to be tested
import { TodoSearch } from 'TodoSearch';

describe('TodoSearch', () => {

    it('should exist', () => {
        expect('TodoSearch').toExist();
    });

    it('should dispatch SET_SEARCH_TEXT on input change', () => {

        const testSearchStr = 'Dog';
        const action = {
            type: 'SET_SEARCH_TEXT',
            searchText: testSearchStr
        };

        const spy = expect.createSpy();
        const todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={ spy } />);

        todoSearch.refs.searchText.value = testSearchStr;

        TestUtils.Simulate.change(todoSearch.refs.searchText);

        expect(spy).toHaveBeenCalledWith(action);

    });

    it('should dispatch TOGGLE_SHOW_COMPLETED when checkbox checked', () => {

        const action = { type: 'TOGGLE_SHOW_COMPLETED' };
        const testCompletedBool = true;

        const spy = expect.createSpy();
        const todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={ spy } />);

        todoSearch.refs.showCompleted.checked = testCompletedBool;

        TestUtils.Simulate.change(todoSearch.refs.showCompleted);
        
        expect(spy).toHaveBeenCalledWith(action);

    });

});