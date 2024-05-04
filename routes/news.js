const express = require('express');
const router = express.Router();
const connectionPool = require("../database")


router.get('/', (req, res) => {
    try {
        const results = connectionPool.query('SELECT * FROM news', function (error, results, fields) {
            res.json(results);
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


router.post('/', (req, res) => {
    const { title, content, author } = req.body;

    const query = `INSERT INTO news (title, content, author) VALUES (?, ?, ?)`;

    try {
        const results = connectionPool.query(sql, [title, content, author]);
        res.json(results);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.put('/', (req, res) => {
    const { id, title, content } = req.body;

    let query = "UPDATE news SET";
    let updateValues = [];

    if (title) {
        updateValues.push(`title = '${title}'`);
    }
    if (content) {
        updateValues.push(`content = '${content}'`);
    }

    query += " " + updateValues.join(", ") + ` WHERE id = ${id}`;
    try {
    connectionPool.query(query, function (error, results, fields) {
        res.json(results);
    });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    let query = `DELETE FROM news WHERE id = ${id}`;
    try { connectionPool.query(query, function (error, results, fields) {
        res.json({ message: 'News item deleted successfully', affectedRows: results.affectedRows });
    });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
