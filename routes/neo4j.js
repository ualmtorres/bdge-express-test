var express = require('express');
var router = express.Router();

const neo4j = require('neo4j-driver')
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('', ''))

/* Connect to Neo4j */
router.get('/test', async function(req, res, next) {
    const session = driver.session()
    res.status(200).json({result: 'OK', data: 'Se realizado la conexión'});
    await session.close()
});

/* GET Neo4j data. */
router.get('/', async function(req, res, next) {
    const session = driver.session()
    const query = 'MATCH ()-[:ACTED_IN]->(m) RETURN m.title'
    const result = await session.run(query);
    res.status(200).send(result);
    await session.close()
});

/* GET Neo4j data by ID. */
/*
router.get('/:movieId', async function(req, res, next) {
    const session = driver.session()
    const query = `MATCH (m: Movie) WHERE ID(m) = ${req.params.movieId} RETURN m`
    const result = await session.run(query);
    res.status(200).send(result);
    await session.close()
});
*/

/* GET Neo4j data by title. */
router.get('/movie', async function(req, res, next) {
    const session = driver.session()
    let query = `MATCH (m: Movie) RETURN m`

    if (title = req.query.title)
        query = `MATCH (m: Movie) WHERE m.title = "${title}" RETURN m`;
    
    const result = await session.run(query);
    res.status(200).send(result);
    await session.close()
});

/* POST MongoDB data. */
router.post('/', async function(req, res, next) {
    const session = driver.session()
    const query = `CREATE (m: Movie {title: "${req.body.title}",
        released: ${req.body.released}, 
        tagline: "${req.body.tagline}"
    })`
    
    const result = await session.run(query);
    res.status(201).send(result);
    await session.close()
});

module.exports = router;