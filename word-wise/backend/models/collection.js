const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema (
    {
        collection: {String, required: true},
        word: {Object, required: true}
    }
);

//Export the schema to be accessed in 'models/index.js'
module.exports = mongoose.model('Collection', collectionSchema);