'use strict';

import firebase, { firebaseRef, githubProvider } from 'app/firebase';
import moment from 'moment';

export const setSearchText = searchText => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

export const toggleShowCompleted = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    };
};

export const addTodo = todo => {
    return {
        type: 'ADD_TODO',
        todo
    };
};

export const startAddTodo = text => {
    return (dispatch, getState) => {
        const todo = {
            text,
            completed: false,
            createdAt: moment().unix(),
            completedAt: null
        };
        const uid = getState().auth.uid;

        const todoRef = firebaseRef.child(`users/${ uid }/todos`).push(todo);

        return todoRef.then(() => {
            dispatch(addTodo(Object.assign({}, todo, { id: todoRef.key })));
        }, err => console.log('Error adding todo to firebase', err));
    };
};

export const addTodos = todos => {
    return {
        type: 'ADD_TODOS',
        todos
    };
};

export const startAddTodos = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const todoRef = firebaseRef.child(`users/${ uid }/todos`).once('value');

        return todoRef.then(snapshot => {
            const todosObj = snapshot.val() || {};
            const todos = Object.keys(todosObj).map(id => Object.assign({}, { id }, todosObj[id]));

            dispatch(addTodos(todos));
        }, err => console.log('Error retrieving intial todo list', err));
    };
};

export const updateTodo = (id, updates) => {
    return {
        type: 'UPDATE_TODO',
        id,
        updates
    };
};

export const startUpdateTodo = (id, completed) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const todoRef = firebaseRef.child(`users/${ uid }/todos/${ id }`);
        const updates = {
            completed: !completed,
            completedAt: !completed ? moment().unix() : null
        };

        return todoRef.update(updates).then(
            () => dispatch(updateTodo(id, updates)),
            err => console.log('Error updating todo', err)
        );
    };
};

export const login = uid => {
    return {
        type: 'LOGIN',
        uid
    };
};

export const startLogin = () => {
    return (dispatch, getState) => {
        return firebase.auth().signInWithPopup(githubProvider)
            .then(
                result => console.log('Auth worked!', result),
                err => console.log('Unable to auth', err)
            );
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};

export const startLogout = () => {
    return (dispatch, getState) => {
        return firebase.auth().signOut()
            .then(
                () => console.log('Logged out'),
                err => console.log('Error logging out', err)
            );
    };
};