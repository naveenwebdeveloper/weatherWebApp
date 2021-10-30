//use pakeges
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('cross-fetch');
const dotenv = require('dotenv');


dotenv.config({ path: './config.env' });


//run in localhost in port no. 4000
const app = express();
const PORT = process.env.PORT || 5000;

//use for connection with clint
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
//allow to json 
app.use(express.json());

// api.openweathermap.org/data/2.5/weather?q=Pune&appid=26499c109fe300dd840ac74865b79486

//req from client with city data and send responce fetching api data
app.post('/api', async(req, res) => {
    const city = req.body.cityIs;
    const apiRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=26499c109fe300dd840ac74865b79486`)
    const weatherData = await apiRes.json();
    res.json(weatherData);
});

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'));
    })
}

//create server with express js
app.listen(PORT, () => {
    console.log('connection successfull in backend');
})