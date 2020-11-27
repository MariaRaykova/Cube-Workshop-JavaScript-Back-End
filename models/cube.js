const mongoose = require('mongoose');

const cubeSchema = mongoose.Schema({
    name: String, 
    description: String, 
    imageUrl: String,
    difficultyLevel: String,
    creatorId: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    accessories: [{type: mongoose.Schema.Types.ObjectId, ref: 'accessory'}]
})
module.exports = new mongoose.model('cube', cubeSchema) 