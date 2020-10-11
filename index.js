const bodyParser = require('body-parser');
const { response } = require('express');
const express = require('express');
const https = require('https')
const ejs = require('ejs')
require('dotenv').config();


const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})


app.post('/',(req,res)=>{
    let city = req.body.city;
    let units = req.body.units;
    let APIkey = process.env.APIkey;

    let URL = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=" + units + "&appid=" + APIkey;
    https.get(URL, (response) => {
        response.on('data', (data) => {
        const weatherData = JSON.parse(data);
        res.write("City searched : " + weatherData.name);
        res.write(weatherData.weather[0].description);
        res.write(weatherData.main.temp + "Degree Celcius");
        res.send();
        })
    })
})


let PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`App running locally on port ${PORT} `);
})




