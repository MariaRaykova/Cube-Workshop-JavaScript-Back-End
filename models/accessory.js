const mongoose = require('mongoose');

const accessorySchema = mongoose.Schema({
    name: String, 
    description: String, 
    imageUrl: String,
    cubes: [{type: mongoose.Schema.Types.ObjectId, ref: 'accessory' }]
})
module.exports = new mongoose.model('accessory', accessorySchema) 