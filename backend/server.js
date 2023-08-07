/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const path = require('path')

/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');

/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const collectionsCtrl = require('./controllers/collections')

/* Create the Express app
--------------------------------------------------------------- */
const app = express();



/* Middleware (app.use)
--------------------------------------------------------------- */
// cross origin allowance
app.use(cors())
// body parser - used for POST/PUT/PATCH routes:
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


/* Mount routes
---------------------------------------------------------- */
// This tells our app to look at the `controllers/collections.js` file 
// to handle all routes that begin with `localhost:3000/list`
app.use('/api/collection', collectionsCtrl)

/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});