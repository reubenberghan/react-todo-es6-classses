'use strict';

const React = require('react');
const { connect } = require('react-redux');
const actions = require('actions');

export const AddTodo = React.createClass({
    handleSubmit: function onSubmitAddTodo (e) {
        e.preventDefault();
        const { dispatch } = this.props;

        const todoStr = this.refs.todoText.value;

        if (todoStr.length > 0) {
            this.refs.todoText.value = '';
            dispatch(actions.startAddTodo(todoStr));
        } else {
            this.refs.todoText.focus();
        }

    },
    render: function renderAddTodo () {
        return (
            <div className="container__footer">
                <form ref="form" onSubmit={ this.handleSubmit }>
                    <input type="text" ref="todoText" placeholder="What do you need to do?" />
                    <button className="button expanded">Add Todo</button>
                </form>
            </div>
        );
    }
});

export default connect()(AddTodo);