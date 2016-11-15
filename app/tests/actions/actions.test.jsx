'use strict';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const expect = require('expect');

import firebase, { firebaseRef } from 'app/firebase';
import * as actions from 'actions';

const createMockStore = configureMockStore([ thunk ]);

describe('Actions', () => {

    it('should exist', () => {
        expect(actions).toExist();
    });

    it('should generate search text action', () => {
        const action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'Some search text'
        };
        const res = actions.setSearchText(action.searchText);

        expect(res).toEqual(action);
    });

    it('should generate toggle show completed action', () => {
        const action = { type: 'TOGGLE_SHOW_COMPLETED' };
        const res = actions.toggleShowCompleted();

        expect(res).toEqual(action);
    });

    it('should generate add todo action', () => {
        const action = {
            type: 'ADD_TODO',
            todo: {
                id: 'abc123',
                text: 'Something to do',
                completed: false,
                createdAt: 123
            }
        };
        const res = actions.addTodo(action.todo);

        expect(res).toEqual(action);
    });

    it('should generate add todos action object', () => {
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
        const res = actions.addTodos(todos);

        expect(res).toEqual(action);
    });

    it('should generate update todo action', () => {
        const action = {
            type: 'UPDATE_TODO',
            id: 1,
            updates: { completed: false }
        };
        const res = actions.updateTodo(action.id, action.updates);

        expect(res).toEqual(action);
    });

    it('should generate login action', () => {
        const action = { type: 'LOGIN', uid: '123abc' };

        const res = actions.login(action.uid);

        expect(res).toEqual(action);
    });

    it('should generate logout action', () => {
        const action = { type: 'LOGOUT' };

        const res = actions.logout();

        expect(res).toEqual(action);
    });

    describe('Tests with firebase todos', () => {
        let testTodoRef;
        let uid;
        let todosRef;

        const testTodo = {
            text: 'Something to do',
            completed: false,
            createdAt: 1234567
        };

        beforeEach(done => {
            firebase.auth().signInAnonymously()
                .then(
                    user => {
                        uid = user.uid;
                        todosRef = firebaseRef.child(`users/${ uid }/todos`);

                        return todosRef.remove();
                    }
                )
                .then(
                    () => {
                        testTodoRef = todosRef.push();

                        return testTodoRef.set(testTodo);
                    }
                )
                .then(done)
                .catch(done);
        });

        afterEach(done => {
            todosRef.remove().then(done);
        });

        it('should toggle todo and dispatch UPDATE_TODO action', done => {
            const store = createMockStore({ auth: { uid } });
            const action = actions.startUpdateTodo(testTodoRef.key, false);

            const resAction = {
                type: 'UPDATE_TODO',
                id: testTodoRef.key,
                updates: { completed: true }
            };

            store.dispatch(action)
                .then(() => {
                    const mockActions = store.getActions();
                    
                    // as `completedAt` is a timestamp generated inside the action we use the `toInclude` and `toExist` methods
                    // `toInclude` ensures the returned object contains the same properties and values
                    // while `toExist` allows us to ensure `completedAt` is in the returned object even though we can't test the value
                    expect(mockActions[0]).toInclude(resAction);
                    expect(mockActions[0].updates.completedAt).toExist();

                    done();
                }, done);
        });

        it('should initialise todos from firebase and dispatch ADD_TODOS action', done => {
            const store = createMockStore({ auth: { uid } });
            const action = actions.startAddTodos();

            const resAction = {
                type: 'ADD_TODOS',
                todos: [ Object.assign({}, { id: testTodoRef.key }, testTodo) ]
            };

            store.dispatch(action)
                .then(() => {
                    const mockActions = store.getActions();

                    expect(mockActions.length).toEqual(1);
                    expect(mockActions[0]).toEqual(resAction);

                    done();
                }, done);
        });

        it('should generate todo and dispatch ADD_TODO', done => {
            const store = createMockStore({ auth: { uid } });
            const todoText = 'My todo item';

            store.dispatch(actions.startAddTodo(todoText)).then(() => {
                const actions = store.getActions();
                expect(actions[0]).toInclude({ type: 'ADD_TODO', todo: { text: todoText } });
                done();
            }).catch(done);
        });
    });

});