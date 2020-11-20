const BaseModel = require('./base');
const path = require('path');

class CubeModel extends BaseModel {

    constructor() {

        const filePath = path.join(global.__basedir, '/config/database.json');
        super(filePath);
    }

    insert(name, description, imageUrl, difficultyLevel) {

        return super.insert({ name, description, imageUrl, difficultyLevel }); //инсъртваме към ид-то и др неща. това ще върне промис
    }

    getAll(data) {

        const { name, from, to } = data;

        if (!data) {
            return super.getAll();
        }

        return super.queryBy(function (entry) {
            return (name ? entry.name.includes(name) : true) &&  //ако има въведено найм проведи дали има съвпадение ако няма въведено върни true, за да продължи с другите филтри
                (from ? entry.difficultyLevel >= from : true) &&
                (to ? entry.difficultyLevel <= to : true);
        })
    }
}
module.exports = new CubeModel();