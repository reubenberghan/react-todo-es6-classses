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
import { Todo } from 'Todo';

describe('Todo', () => {

    it('should exist', () => {
        expect(Todo).toExist();
    });

    it('should dispatch TOGGLE_TODO with id on click', () => {

        const testTodo = { id: 11, text: 'test task', completed: false };

        const action = actions.startUpdateTodo(testTodo.id, testTodo.completed);

        const spy = expect.createSpy();

        const todo = TestUtils.renderIntoDocument(<Todo { ...testTodo } dispatch={ spy } />);

        const $el = $(ReactDOM.findDOMNode(todo));

        TestUtils.Simulate.change($el.find('input[type="checkbox"]')[0]);

        expect(spy).toHaveBeenCalledWith(action);

    });

});