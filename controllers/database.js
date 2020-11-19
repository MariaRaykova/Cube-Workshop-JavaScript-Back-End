const fs = require('fs');
const path = require('path');

const databaseFilePath = path.join(__dirname, '..', 'config/database.json');

const saveCube = (newCube) => {

    getCubes((cubesData)=>{

        cubesData.push(newCube); 

        fs.writeFile(databaseFilePath, JSON.stringify(cubesData), (error) => { 
            if (error) {
                throw error;
            }
        });
    })
    
}

const getCubes = (callback) => {
    
    fs.readFile(databaseFilePath, (error, dbData) => { 
        if (error) {
            throw error;
        }
        const cubesData = JSON.parse(dbData);
        callback(cubesData);
    })
}

const getCube = (id, callback) => {
getCubes(cubes=>{
   const cube =  cubes.filter(c => c.id === id)[0]; //filrer връща мас
   callback(cube);
})
}


module.exports = {
    saveCube,
    getCubes, 
    getCube
}