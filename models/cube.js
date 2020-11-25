const mongoose = require('mongoose');

const cubeSchema = mongoose.Schema({
    
    name: String, 
    description: String, 
    imageUrl: String,
    difficultyLevel: String,
    accessories: [{type: mongoose.Schema.Types.ObjectId, ref: 'accessory'}]
})
module.exports = new mongoose.model('cube', cubeSchema); 
