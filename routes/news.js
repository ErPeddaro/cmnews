const express = require('express');
const router = express.Router();
const connectionPool = require("../database")


router.get('/', (req, res) => {
    connectionPool.query('SELECT * FROM news', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    })
});


router.post('/', (req, res) => {
    const { title, content, author} = req.body
    connectionPool.query(`INSERT INTO news (title, content, author) values ('${title}', '${content}', '${author}')`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    })
});

router.put('/', (req, res) => {
    const { idUtente, title, content } = req.body;

    let query = "UPDATE news SET";
    let updateValues = [];

    if (title) {
        updateValues.push(`title = '${title}'`);
    }
    if (content) {
        updateValues.push(`content = '${content}'`);
    }

    query += " " + updateValues.join(", ") + `WHERE idUtente = '${idUtente}'`; 

    connectionPool.query(query, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

module.exports = router;
