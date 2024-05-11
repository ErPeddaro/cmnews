const express = require('express');
const bodyParser = require('body-parser');
const connectionPool = require("./database")

const app = express();
const port = 5000;

const newsRoute = require('./routes/news');
const userRoute = require('./routes/user');


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use("/news", newsRoute)
app.use("/user", userRoute)

app.get('/', (req, res) => {
    res.send('Server working');
});

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
