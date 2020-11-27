const cubeModel = require('../models/cube');

module.exports = {

  getCubes(req, res, next) {

    const { from, search, to } = req.query;
    let query = {}; //правим го, за да не променяме структурата на обекта
    if (search) { query.name = new RegExp(search, 'i'); }; //'i'-то в скобите май го правим case insensitive ->ако сърч съществува нейм ще е равно на сърча и така с другите,
    if (from) {
   //тук не правим проверка защото знаем че като имаме from ще влезе в query и ще създадем обект 
   //а ако горе e false и не си създадем обект ще искаме тук да си го създадем..не разбрах защо
       query.difficultyLevel = { $gte: +from }
      };
    if (to) { 
      query.difficultyLevel = query.difficultyLevel  || {};
      query.difficultyLevel.$lte = +to;
    };
   
    cubeModel.find(query).populate('accessories') //за да може в details.hbs където #each-ваме cube.accessories да можем да ги рендерираме
    .then((cubes) => { //ползваме функциите от Mongoose
      console.log(JSON.stringify(cubes, null, 2));
      res.render('index', { title: 'Cube Workshop', cubes, search, from, to });
    }).catch(next);
  },
  getCube(req, res, next) {

    const id = req.params.id;

    cubeModel.findById(id).populate('accessories')
    .then(cube => {
      res.render('details', { title: 'Cube Workshop', cube })
    }).catch(next);
  },
  postCreateCube(req, res, next) {

    const { name, description, imageUrl, difficultyLevel } = req.body;

    cubeModel.create({ name, description, imageUrl, difficultyLevel: +difficultyLevel })
      .then(() => res.redirect('/'))
      .catch(next);
  },
  getCreateCube(req, res) {

    res.render('create', { title: 'Cube Workshop' });
  },
  getEditCube(req, res, next) {
    const id = req.params.id;
    cubeModel.findById(id)
    .then(cube=> res.render('edit',  cube,  { title: 'Edit | Cube Workshop'}))
    .catch(next);
  },
  postEditCube(req, res, next) {
    const id = req.params.id; 
    const { name, description, imageUrl, difficultyLevel } = req.body;
    cubeModel.update({ _id: id }, { name, description, imageUrl, difficultyLevel: +difficultyLevel }) //разликата от create, pri update горе добавихме ид и тук също
      .then(() => res.redirect('/'))
      .catch(next);
  },
  getDeleteCube(req, res, next) {
    const id = req.params.id;
    cubeModel.findById(id)
    .then(cube=> res.render('delete', cube, { title: 'Delete | Cube Workshop'}))
    .catch(next);
  },
  postDeleteCube(req, res, next) {
    const id = req.params.id;
    cubeModel.deleteOne({ _id: id }) //ot mongoose deleteOne
      .then(() => res.redirect('/'))
      .catch(next)
  }

}
