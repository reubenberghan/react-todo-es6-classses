'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class AddTodo extends React.Component {
    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
        const { dispatch } = this.props;

        const todoStr = this.refs.todoText.value;

        if (todoStr.length > 0) {
            this.refs.todoText.value = '';
            dispatch(actions.startAddTodo(todoStr));
        } else {
            this.refs.todoText.focus();
        }

    }

    render () {
        return (
            <div className="container__footer">
                <form ref="form" onSubmit={ this.handleSubmit }>
                    <input type="text" ref="todoText" placeholder="What do you need to do?" />
                    <button className="button expanded">Add Todo</button>
                </form>
            </div>
        );
    }
}

export default connect()(AddTodo);