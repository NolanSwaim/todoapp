var express = require('express');
const {Query} = require("pg/lib/native");
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const {sequelize} = require("../models/index");
  const {QueryTypes} = require("sequelize");

  let toDoItems = await sequelize.query('select * from todo', {type: QueryTypes.SELECT})
  res.render('index', {toDoItems});
});
router.get("/add", function (req, res){
  res.render('create_todo');
})
router.post('/add', async function(req, res){
  const {sequelize} = require("../models/index");
  const{QueryTypes} = require("sequelize");
  await sequelize.query('inster into todo(description) values (:description)', {
    type: QueryTypes.INSERT,
    replacement:{
      description: req.body.description
    }
  });
  res.redirect('/');
});
module.exports = router;
