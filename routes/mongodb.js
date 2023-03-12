var express = require('express');
var router = express.Router();

const {MongoClient} = require('mongodb')
const url = 'mongodb://xxx:xxx@localhost:27017/?authMechanism=DEFAULT';
const client = new MongoClient(url);
const dbName = "bdge"

/* Connect to MongoDB. */
router.get('/test', async function(req, res, next) {
    await client.connect(dbName);
    const db = client.db(dbName)
    collection = db.collection('geo')
    res.status(200).json({result: 'OK', data: 'Se realizado la conexión'});
    await client.close();
});

/* GET MongoDB data. */
router.get('/', async function(req, res, next) {
    await client.connect(dbName);
    const db = client.db(dbName)
    collection = db.collection('geo')
    const result = await collection.find(req.query).toArray();
    res.status(200).send(result);
    await client.close();
  });

/* GET MongoDB data by country. */
router.get('/:country',  async function(req, res, next) {
    await client.connect(dbName);
    const db = client.db(dbName)
    collection = db.collection('geo')
    const result = await collection.findOne({country: req.params.country});
    res.status(200).send(result);
    await client.close();
});

/* POST MongoDB data. */
router.post('/', async function(req, res, next) {
    await client.connect(dbName);
    const db = client.db(dbName)
    collection = db.collection('geo')
    const result = await collection.insertOne(req.body)
    res.status(201).send(result);
    await client.close();
  });
  
module.exports = router;
