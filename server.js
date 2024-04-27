const express = require('express');
const bodyParser = require('body-parser');
const connectionPool = require("./database")

const app = express();
const port = 5000;

const newsRoute = require('./routes/news');


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use("/news", newsRoute)

app.get('/', (req, res) => {
    res.send('Server working');
});

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
