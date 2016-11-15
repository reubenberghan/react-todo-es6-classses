'use strict';

const expect = require('expect');
const df = require('deep-freeze-strict');

const reducers = require('reducers');

describe('Reducers', () => {

    describe('searchTextReducer', () => {

        it('should set search text', () => {
            const action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'dog'
            };

            const res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toEqual(action.searchText);
        });

    });

    describe('showCompletedReducer', () => {

        it('should toggle show completed', () => {
            const action = { type: 'TOGGLE_SHOW_COMPLETED' }

            const res = reducers.showCompletedReducer(df(false), df(action));

            expect(res).toEqual(true);
        });

    });

    describe('todosReducer', () => {

        it('should add new todo', () => {
            const action = {
                type: 'ADD_TODO',
                todo: {
                    id: 'abc123',
                    text: 'Something to do',
                    completed: false,
                    createdAt: 123
                }
            };

            const res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(action.todo);
        });

        it('should update todo', () => {
            const currentState = [{
                id: 1,
                text: 'test',
                completed: true,
                createdAt: 0,
                completedAt: 123
            }];

            const updates = {
                completed: false,
                completedAt: null
            };

            const action = {
                type: 'UPDATE_TODO',
                id: currentState[0].id,
                updates
            };

            const res = reducers.todosReducer(df(currentState), df(action));
            
            expect(res[0].completed).toEqual(updates.completed);
            expect(res[0].completedAt).toEqual(updates.completedAt);
            expect(res[0].text).toEqual(currentState[0].text);
        });

        it('should add existing todos', () => {
            const todos = [{
                id: '111',
                text: 'anything',
                completed: false,
                completedAt: null,
                createdAt: 100
            }];
            const action = {
                type: 'ADD_TODOS',
                todos
            };

            const res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(todos[0]);
        });

        it('should remove existing todos on LOGOUT', () => {
            const todos = [{
                id: '111',
                text: 'anything',
                completed: false,
                completedAt: null,
                createdAt: 100
            }];
            const action = {
                type: 'LOGOUT'
            };

            const res = reducers.todosReducer(df(todos), df(action));

            expect(res.length).toEqual(0);
        });

    });

    describe('authReducer', () => {

        it('should add uid on login', () => {
            const action = { type: 'LOGIN', uid: '123abc' };

            const res = reducers.authReducer(df({}), df(action));

            expect(res).toEqual({ uid: action.uid });
        });

        it('should remove uid(s) on logout', () => {
            const authData = { uid: '123abc' };
            const action = { type: 'LOGOUT' };

            const res = reducers.authReducer(df(authData), df(action));

            expect(res).toEqual({});
        });

    });

});