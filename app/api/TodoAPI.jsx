'use strict';

const $ = require('jquery');

module.exports = {
    // // have removed calls to these from the app as replacing local storage with firebase 
    // setTodos: function setTodos (todos) {
    //     if ($.isArray(todos)) {
    //         localStorage.setItem('todos', JSON.stringify(todos));
    //         return todos;
    //     }
    // },
    // getTodos: function getTodos () {

    //     var stringTodos = localStorage.getItem('todos');
    //     var todos = [];

    //     try {
    //         todos = JSON.parse(stringTodos);
    //     } catch (err) {  }

    //     return $.isArray(todos) ? todos : [];

    // },
    filterTodos: function filterTodos (todos, showCompleted, searchText) {

        var filteredTodos = todos;

        // filter by showCompleted
        // the `filter` method is an array method that returns an array of the items for which true is returned when the passed function is called on it 
        filteredTodos = filteredTodos.filter(todo => {

            // this logic negates the completed boolean returning items that are false (not completed) or if the `showCompleted` boolean is true returns all
            return !todo.completed || showCompleted;
        });

        // filter by searchText
        filteredTodos = filteredTodos.filter(todo => {
            let todoText = todo.text.toLowerCase();
            return todoText.indexOf(searchText.toLowerCase()) > -1 ? true : false;
        });

        // sort todos with non-completed first
        filteredTodos.sort((a, b) => {
            if (!a.completed && b.completed) return -1;
            if (a.completed && !b.completed) return 1;
            return 0;
        });

        return filteredTodos;

    }
};