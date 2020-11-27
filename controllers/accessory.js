const accessoryModel = require('../models/accessory');
const cubeModel = require('../models/cube');
module.exports = {

  postCreateAccessory(req, res, next) {
    const { name, description, imageUrl } = req.body;
    accessoryModel.create({ name, description, imageUrl })
      .then(() => res.redirect('/'))
      .catch(next);
  },
  getCreateAccessory(_, res) { //Долната черта означава променлива, която няма да се използва
   res.render('create-accessory', { title: 'Cube Workshop' }); //тук е името на hbs файла 
  },

  postAttachAccessory(req, res, next) {
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory; //взехме го от attache-accessory.hbs name-a - accessory
    Promise.all([
      accessoryModel.update({_id: accessoryId}, { $push: { cubes: cubeId } }),
      cubeModel.update({ _id: cubeId }, { $push: { accessories: accessoryId } }) //$push ot mongoose, slagame sled accessory novata stojnost koqto iskame da e vutre
    ]).then(res.redirect('/details/' + cubeId))//ako vs e uspeshno da redirektnem
      .catch(next);
  },

  getAttachAccessory(req, res, next) { //когато имаме render next не ни трябва, защото ако рендер фейлне пак ще влезе в нашия ерор хендлър. 

    const cubeId = req.params.id;

    Promise.all([
      cubeModel.findById(cubeId),
      accessoryModel.find({ cubes: { $nin: cubeId}}) //$nin - Not in, искаме да покажем само несвързаните аксесоари
    ]).then(([cube, accessories]) => {
      res.render('attach-accessory', { title: 'Cube Workshop', cube, accessories, noAvailableAccessories: accessories.length === 0 }); //подаваме към нашия темплейт cube i accessories
    }).catch(next)
  }


}

