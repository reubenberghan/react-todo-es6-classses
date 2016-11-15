'use strict';

// all the modules required to run the tests on the components
const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const expect = require('expect');
const $ = require('jQuery');
// this is a special module required for react testing as we need to be able to 'render' the component to test its functions
// and this module provides the utilities to do so
const TestUtils = require('react-addons-test-utils');

// bring in our redux store
const configureStore = require('configureStore');

// our component to be tested
import { TodoApp } from 'TodoApp';
import TodoList from 'TodoList';

describe('TodoApp', () => {

    it('should exist', () => {
        expect(TodoApp).toExist();
    });

    it('should render TodoList', () => {
        const store = configureStore.configure();
        const provider = TestUtils.renderIntoDocument(
            <Provider store={ store }>
                <TodoApp />
            </Provider>
        );

        const todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
        const todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);

        expect(todoList.length).toEqual(1);
    });

});