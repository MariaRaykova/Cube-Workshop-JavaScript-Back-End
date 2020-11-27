const mongoose = require('mongoose');

const cubeSchema = mongoose.Schema({
    name: String, 
    description: String, 
    imageUrl: String,
    difficultyLevel: String,
    creatorId: String, // [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}], //ще е по-комплексен тип и ще сочи към таблицата с юзърс ако искаме да направим populate в някакъв случай
    accessories: [{type: mongoose.Schema.Types.ObjectId, ref: 'accessory'}]

})
module.exports = new mongoose.model('cube', cubeSchema) 