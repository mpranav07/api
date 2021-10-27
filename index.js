// Create the app
const express = require('express');
const app = express();

// External library
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const AuthRoutes = require('./routes/auth.route');
const CategoryRoutes = require('./routes/category.route');

// Added body parser
app.use(bodyParser.json());

// Added CORS setting
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Register routes
app.use('/auth', AuthRoutes);
app.use('/category', CategoryRoutes);

// Handle error in the aplication
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

let port = process.env.port || 9595;

mongoose.connect(
    'mongodb://localhost:27017/api_assignment'
)
.then(result => {
    app.listen(port, function() {
        console.log(`Server started at http://localhost:${port}/`);
    });
})
.catch(err => console.log(err));
