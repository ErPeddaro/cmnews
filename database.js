const mysql = require("mysql2");
const connectionPool = mysql.createPool({
    host: "10.20.2.174",
    user: "tps",
    password: "ttppss",
    database: "cmnews"
}, { debug: true });

connectionPool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log("Db connected successfully - result: ", results[0].solution);
})


module.exports = connectionPool;