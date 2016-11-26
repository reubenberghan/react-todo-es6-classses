'use strict';

const expect = require('expect');

const TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {

    // karma function which allows us to run some code before each test
    // has an opposite `afterEach` which allows us to run code after
    beforeEach(() => {
        localStorage.removeItem('todos');
    });

    it('should exist', () => {
        expect(TodoAPI).toExist();
    });
    
    // // no need to test as removed from the app
    // describe('setTodos', () => {
    //     it('should set valid todos array', () => {

    //         var todos = [{ id: 11, text: 'test todo', completed: false }];

    //         TodoAPI.setTodos(todos);

    //         var actualTodos = JSON.parse(localStorage.getItem('todos'));

    //         expect(actualTodos).toEqual(todos);

    //     });

    //     it('should not set invalid todos array', () => {

    //         var invalidTodo = { a: 'b' };
    //         TodoAPI.setTodos(invalidTodo);

    //         // localStorage.getItem() returns null if not item not found
    //         expect(localStorage.getItem('todos')).toBe(null);

    //     });
    // });
    
    // describe('getTodos', () => {
    //     it('should return empty array for bad localStorage data', () => {

    //         var actualTodos = TodoAPI.getTodos();

    //         expect(actualTodos).toEqual([]);

    //     });

    //     it('should return todos if valid array in localStorage', () => {

    //         var todos = [{ id: 11, text: 'test todo', completed: false }];

    //         localStorage.setItem('todos', JSON.stringify(todos));

    //         var actualTodos = TodoAPI.getTodos();

    //         expect(actualTodos).toEqual(todos);
            
    //     });
    // });

    describe('filterTodos', () => {

        // test todos with dummy data to be used for each test
        var todos = [{
            id: 1,
            text: 'Some text',
            completed: true
        }, {
            id: 2,
            text: 'Other text',
            completed: false
        }, {
            id: 3,
            text: 'Some more text',
            completed: true
        }];

        it('should return all items if showCompleted is true', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });

        it('should return only completed false items if showCompleted is false', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, false, '');
            expect(filteredTodos.length).toBe(1);
        });

        it('should sort by completed status', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos[0].completed).toBe(false);
        });

        it('should filter todos by searchText', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, 'some');
            expect(filteredTodos.length).toBe(2);
        });

        it('should filter todos by searchText if upper case', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, 'Some');
            expect(filteredTodos.length).toBe(2);
        });

        it('should return all todos if searchText is empty', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });

    });

});