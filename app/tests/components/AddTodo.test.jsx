'use strict';

// all the modules required to run the tests on the components
const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const $ = require('jQuery');
// this is a special module required for react testing as we need to be able to 'render' the component to test its functions
// and this module provides the utilities to do so
const TestUtils = require('react-addons-test-utils');

import * as actions from 'actions';

// our component to be tested
import { AddTodo } from 'AddTodo';

describe('AddTodo', () => {

    it('should exist', () => {
        expect(AddTodo).toExist();
    });

    it('should dispatch ADD_TODO if non-empty string submitted', () => {

        const spy = expect.createSpy();
        const testStr = 'test string';
        const action = actions.startAddTodo(testStr);

        const addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={ spy } />);
        const $el = $(ReactDOM.findDOMNode(addTodo));

        // set our input value to test string and test that submitting the form will call onAddTodo with the test string
        addTodo.refs.todoText.value = testStr;
        TestUtils.Simulate.submit($el.find('form')[0]);
        expect(spy).toHaveBeenCalledWith(action);

    });

    it('should not dispatch ADD_TODO if empty string submitted', () => {

        const spy = expect.createSpy();
        const addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={ spy } />);
        const $el = $(ReactDOM.findDOMNode(addTodo));

        // assert that our form input is an empty string and test that submitting will not call onAddTodo
        expect(addTodo.refs.todoText.value).toBe('');
        TestUtils.Simulate.submit($el.find('form')[0]);
        expect(spy).toNotHaveBeenCalled();

    });

});