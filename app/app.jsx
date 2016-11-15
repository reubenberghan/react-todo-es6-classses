'use strict';

// external modules
const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
// using es6s destructuring feature to pull out all the required constiables from the `react-route` module
const { hashHistory } = require('react-router');

import firebase from 'app/firebase/';
import router from 'app/router/';

// redux components
const actions = require('actions');
const store = require('configureStore').configure();

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch(actions.login(user.uid));
        
        store.dispatch(actions.startAddTodos());
        
        hashHistory.push('/todos')
    } else {
        store.dispatch(actions.logout());
        
        hashHistory.push('/');
    }
});

// load foundation
$(document).foundation();

// custom app css
require('style!css!sass!applicationStyles');

// the `IndexRoute` component lets `react` know which component is our default (index) route to render
// we then nest further `Route` components to define the components we want rendered at which route
ReactDOM.render(
    <Provider store={ store }>
        { router }
    </Provider>,
    document.getElementById('app')
);