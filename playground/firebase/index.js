'use strict';

// import firebase from 'firebase';

// // Initialize Firebase
// const config = {
//     apiKey: "AIzaSyAx96coTGVkRxKLQBnZ4ZNV7PWCY_ldx3o",
//     authDomain: "berghan-todo-app.firebaseapp.com",
//     databaseURL: "https://berghan-todo-app.firebaseio.com",
//     storageBucket: "berghan-todo-app.appspot.com",
//     messagingSenderId: "744290091139"
// };
// firebase.initializeApp(config);

// const firebaseRef = firebase.database().ref();

// firebaseRef.set({
//     app: {
//         name: 'Todo App',
//         version: '0.0.1'
//     },
//     isRunning: true,
//     user: {
//         name: 'Reuben',
//         age: 30
//     }
// }).then(() => console.log('Set worked'), err => console.log('Set failed'));

// firebase.set({
//     appName: 'Todo Application'
// });

// firebaseRef.child('app').set({
//     name: 'Berghan Todo App'
// });

// firebaseRef.update({
//     isRunning: false,
//     'app/name': 'Todo Application'
// });

// firebaseRef.child('app').update({
//     name: 'Todo Application'
// }).then(() => console.log('Update worked'), err => console.log('Update failed'));

// firebaseRef.update({
//     'app/name': 'Todo Application',
//     'user/name': 'Mike'
// });

// firebaseRef.child('app').update({
//     name: 'Berghan Todo Application'
// });

// firebaseRef.child('user').update({
//     name: 'R Berghan'
// });

// firebaseRef.remove();

// firebaseRef.child('app/name').remove();

// firebaseRef.child('app').update({
//     version: '2.0',
//     name: null
// });

// firebaseRef.update({
//     isRunning: null
// });

// firebaseRef.child('user/age').remove();

// firebaseRef.child('app').once('value')
//     .then(snapshot => console.log('Got entire database', snapshot.key, snapshot.val()),
//     err => console.log('Unable to fetch value', e));

// const logData = snapshot => console.log('Got value', snapshot.val());

// firebaseRef.on('value', logData);

// firebaseRef.off(logData);

// firebaseRef.update({ isRunning: false });

// firebaseRef.child('user').on('value', logData);

// firebaseRef.child('user').update({ name: 'Mike' });

// firebaseRef.child('app').update({ name: 'Todo Application' });

// const notesRef = firebaseRef.child('notes');

// notesRef.on('child_added', snapshot => console.log('child_added', snapshot.key, snapshot.val()));

// notesRef.on('child_changed', snapshot => console.log('child_changed', snapshot.key, snapshot.val()));

// notesRef.on('child_removed', snapshot => console.log('child_removed', snapshot.key, snapshot.val()));

// const newNoteRef = notesRef.push();
// newNoteRef.set({ text: 'Walk the dog' });

// const newNoteRef = notesRef.push({ text: 'Walk the dog!' });
// console.log('New note key', newNoteRef.key);

// const todosRef = firebaseRef.child('todos');

// todosRef.on('child_added', snapshot => console.log('child_added', snapshot.key, snapshot.val()));

// todosRef.push({ text: 'Brush teeth' });
// todosRef.push({ text: 'Wash dishes' });