const express = require('express');
const router = express.Router();
const connectionPool = require("../database")


router.get('/', (req, res) => {
    try {
        const results = connectionPool.query('SELECT * FROM user', function (error, results, fields) {
            res.json(results);
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


router.post('/', (req, res) => {
    const { username, password, mail } = req.body;

    const query = `INSERT INTO user (username, password, mail) VALUES (?, ?, ?)`;

    try {
        const results = connectionPool.query(query, [username, password, mail]);
        res.json({
            "data": results.values});
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error');
    }
});

router.put('/', (req, res) => {
    const { idUser, username, password, mail } = req.body;

    let query = "UPDATE user SET";
    let updateValues = [];

    if (username) {
        updateValues.push(`username = '${username}'`);
    }
    if (password) {
        updateValues.push(`password = '${password}'`);
    }

    query += " " + updateValues.join(", ") + ` WHERE idUser = ${idUser}`;
    try {
    connectionPool.query(query, function (error, results, fields) {
        res.json(results);
    });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/', (req, res) => {
    const { idUser } = req.body;

    if (!idUser) {
        return res.status(400).json({ error: 'ID is required' });
    }

    let query = `DELETE FROM user WHERE id = ${idUser}`;
    try { connectionPool.query(query, function (error, results, fields) {
        res.json({ message: 'News item deleted successfully'});
    });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
