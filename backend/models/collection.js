const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema (
    {
        name: {type: String, required: true},
        word: {type: String, required: true}
    }
);

//Export the schema to be accessed in 'models/index.js'
module.exports = mongoose.model('Collection', collectionSchema);