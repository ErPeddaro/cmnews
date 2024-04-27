const express = require('express');
const router = express.Router();
const connectionPool = require("../database")


router.get('/', (req, res) => {
    connectionPool.query('SELECT * FROM news', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    })
});

module.exports = router;
