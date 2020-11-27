const accessoryModel = require('../models/accessory');
const cubeModel = require('../models/cube');
module.exports = {

  postCreateAccessory(req, res, next) {
    const { name, description, imageUrl } = req.body;
    accessoryModel.create({ name, description, imageUrl })
      .then(() => res.redirect('/'))
      .catch(next);
  },

  getCreateAccessory(_, res) { 
   res.render('create-accessory', { title: 'Cube Workshop' }); 
  },

  postAttachAccessory(req, res, next) {
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory; 
    Promise.all([
      accessoryModel.update({_id: accessoryId}, { $push: { cubes: cubeId } }),
      cubeModel.update({ _id: cubeId }, { $push: { accessories: accessoryId } }) 
    ]).then(res.redirect('/details/' + cubeId))
      .catch(next);
  },

  getAttachAccessory(req, res, next) { 
    const cubeId = req.params.id;
    Promise.all([
      cubeModel.findById(cubeId),
      accessoryModel.find({ cubes: { $nin: cubeId}}) 
    ]).then(([cube, accessories]) => {
      res.render('attach-accessory', { title: 'Cube Workshop', cube, accessories, noAvailableAccessories: accessories.length === 0 }); //подаваме към нашия темплейт cube i accessories
    }).catch(next)
  }
}

