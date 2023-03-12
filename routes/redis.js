var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient({host: 'localhost', port: 6379}); 

/* Connect to Redis */
router.get('/test',  async function(req, res, next) {
  await client.connect();
  await client.disconnect();
  res.status(200).json({result: 'OK', data: 'Se realizado la conexión'});
});

/* GET Redis data. */
router.get('/:key',  async function(req, res, next) {
  await client.connect();
  const value = await client.get(req.params.key);
  await client.disconnect();
  res.status(200).json({result: 'OK', data: value});
});

/* POST Redis data. */
router.post('/', async function(req, res, next) {
  await client.connect();
  const value = await client.set(req.body.key, req.body.value );
  await client.disconnect();
  res.status(201).send({result: value});
});

/* Redirect to test */
router.get('/', function(req, res, next) {
    res.redirect('redis/test')
})

module.exports = router;
