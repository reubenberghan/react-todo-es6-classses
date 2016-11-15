'use strict';

const express = require('express');

// create our app
const app = express();
const PORT = process.env.PORT || 3000;

// set the port
app.set('port', PORT);

// custom middleware to check all incoming requests
// if `https` then redirect as `http` else fine and call `next`
app.use(function httpsRedirect (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

// set our folder to serve static files from
app.use(express.static('public'));

// start our server
app.listen(app.get('port'), () => console.log(`Express server is up on port ${ app.get('port') }`))