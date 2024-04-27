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

module.exports = router;
