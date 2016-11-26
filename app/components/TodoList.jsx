'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Todo from 'Todo';
import TodoAPI from 'TodoAPI';

// as with our `Todo` component for testing we need to export our `TodoList` component before it has `connect` called on it
export class TodoList extends React.Component {
    render () {
        var { todos, showCompleted, searchText } = this.props;

        // as our todos come as an array list we need a function map over that array and return each item
        // we can use the built in JavaScript array method `map` to do just that
        // When iterating over an array generating multiple instances of a component we have to give them a unique `key` prop 
        // this `key` prop is used internally by React to keep track of the individual components
        // in our case each `todo` has an `id` property which we can use
        var renderTodos = () => {
            const filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText) || [];

            if (filteredTodos.length === 0) {
                return (
                    <p className="container__message">Nothing to do...</p>
                );
            }

            return filteredTodos.map((todo) => {

                // note that we can pass each prop of the `todo` item down to the `Todo` component using the spread operator
                // this means we don't have to explicitly define the props we want to pass down
                return (
                    <Todo key={ todo.id } { ...todo } />
                );
            });
        };

        return (
            <div>
                { renderTodos() }
            </div>
        );
    }
}

// using the `connect` method from `react-redux` we can pass the requried state to the component
// to ensure our 'connected' component is the one used when it is 'required' by other files we export it using `default`
export default connect(
    state => state
)(TodoList);

// module.exports = TodoList;