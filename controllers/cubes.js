const fs = require('fs');
const path = require('path');


const { getCubes } = require('../controllers/database'); 
const getAllCubes = (callback)=>{
        getCubes((cubesData)=>{
         callback(cubesData);
        });
}

module.exports = {
        getAllCubes
}
