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

import { configure } from 'configureStore';

// our component to be tested
import ConnectedTodoList, { TodoList } from 'TodoList';
import ConnectedTodo, { Todo } from 'Todo';

describe('TodoList', () => {

    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render one Todo component for each todo item', ()=> {

        const todos = [{
            id: 1,
            text: 'Do something',
            completed: false,
            createdAt: 500,
            completedAt: null
        }, {
            id: 2,
            text: 'Check mail',
            completed: false,
            createdAt: 600,
            completedAt: null
        }];

        const store = configure({
            todos
        });

        const provider = TestUtils.renderIntoDocument(
            <Provider store={ store }>
                <ConnectedTodoList />
            </Provider>
        );

        const todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
        const todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

        expect(todosComponents.length).toBe(todos.length);

    });

    it('should render no todos message if no todos', ()=> {

        const todos = [];

        const todoList = TestUtils.renderIntoDocument(<TodoList todos={ todos } />);
        const $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);

    });

});