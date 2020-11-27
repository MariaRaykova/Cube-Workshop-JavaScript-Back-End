module.exports = function (req) {

    return function cubeCreatorCheck(cube) {
        //да не забравяме, че creatorId не е създадено
        if (cube.creatorId !== req.user._id) { //trqbwa da syzdadem creatorId; _id както сме го запазили в auth middleware гледаме
            //res.redirect('/'); //ако не съвпадат да не може да достъпим страницата, можем да хвърлим грешка че не сме аутх в глобалния еррор хендлър
            //ако не искаме да редирктваме можем да каже така, защото ще го сложим в promise chain-a
            return Promise.reject(new Error('UNAUTHORIZED'));
        }
        return cube; //което автоматично ще се wrappne е промис
    }
}
