'use strict';

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from 'actions';

// exporting our component here allows us to access it in our tests
// as what is exported below as the default has been passed through the `connect` method and expects a store
export class Todo extends React.Component {
    render () {
        const { id, text, completed, createdAt, completedAt, dispatch } = this.props;
        const todoClassName = completed ? 'todo todo-completed' : 'todo';
        const renderDate = () => {
            let message = 'Created ';
            let timestamp = createdAt;

            if (completed) {
                message = 'Completed ';
                timestamp = completedAt;
            }

            return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
        };

        return (
            <div className={ todoClassName }>
                <input type="checkbox" id={ id } checked={ completed } onChange={ () => dispatch(actions.startUpdateTodo(id, completed)) } />
                <label htmlFor={ id }>
                    <p>{ text }</p>
                    <p className="todo__subtext">{ renderDate() }</p>
                </label>
            </div>
        );
    }
}

// we don't always need to pass state but calling connect on our exported component provides the `dispatch` method to our `props` object
// allowing us to dispatch actions as in the case of `Todo` where we need to toggle todos
export default connect()(Todo);

// module.exports = Todo;