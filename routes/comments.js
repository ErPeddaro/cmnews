const express = require('express');
const router = express.Router();
const connectionPool = require("../database")


router.get('/', (req, res) => {
    try {
        const results = connectionPool.query('SELECT * FROM comment', function (error, results, fields) {
            res.json(results);
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


router.post('/', (req, res) => {
    const { idNews, idUser, idFather, content } = req.body;

    const query = `INSERT INTO comment (idNews, idUser, idFather, content) VALUES (?, ?, ?)`;

    try {
        const results = connectionPool.query(query, [idNews, idUser, idFather, content]);
        res.json({
            "data": results.values
        });
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error');
    }
});

router.put('/', (req, res) => {
    const { idNews, idUser, idFather, content } = req.body;

    let query = "UPDATE comment SET";
    let updateValues = [];

    if (idNews) {
        updateValues.push(`idNews = '${idNews}'`);
    }
    if (idUser) {
        updateValues.push(`idUser = '${idUser}'`);
    }
    if (idFather) {
        updateValues.push(`idFather = '${idFather}'`);
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

    let query = `DELETE FROM comment WHERE id = ${id}`;
    try {
        connectionPool.query(query, function (error, results, fields) {
            res.json({ message: 'Comment item deleted successfully', affectedRows: results.affectedRows });
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
