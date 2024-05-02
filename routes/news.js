const express = require('express');
const router = express.Router();
const connectionPool = require("../database")


router.get('/', async (req, res) => {
    try {
        const results = await connectionPool.query('SELECT * FROM news');
        res.json(results);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


router.post('/', async (req, res) => {
    const { title, content, author } = req.body;

    const sql = `INSERT INTO news (title, content, author) VALUES (?, ?, ?)`;

    try {
        const results = await connectionPool.query(sql, [title, content, author]);
        res.json(results);
    } catch (error) {
        console.error("Database query error:", error);
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

    connectionPool.query(query, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.delete('/', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    let query = `DELETE FROM news WHERE id = ${id}`;

    connectionPool.query(query, function (error, results, fields) {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'News item deleted successfully', affectedRows: results.affectedRows });
    });
});


module.exports = router;
