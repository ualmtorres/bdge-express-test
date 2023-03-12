var express = require('express');
var router = express.Router();
const helloController = require('../controllers/hello')

router.get('/', function(req, res, next) {
  res.status(200).json(helloController.getCurrentDate())
});

router.get('/people', function(req, res, next) {
  res.status(200).json(helloController.getPeople())
});

router.get('/people/:name', function(req, res, next) {
  res.status(200).json(helloController.getPeopleByName(req.params.name))
});

module.exports = router;
