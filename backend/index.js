

const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const { locationSchema } = require('./type'); 

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.json()); 


app.get('/', (req,res)=> {
  res.send('welcome to weather-app-backend')
})
app.get('/weather', async (req, res) => {
  try {
    const { success } = locationSchema.safeParse(req.query);

    if (!success) {
      return res.status(411).json({
        message: 'Incorrect inputs',
      });
    }

    const {city } = req.query;
    console.log(city);
const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
    const response = await axios.get(weatherUrl);

    res.json(response.data);
  }catch(error) {
    console.log('error fetching forecast data:',error.message);
    res.status(500).json({
      msg:"internal serrver error"
    })
  }
});

app.get('/forecast', async(req,res)=> {
  try {
    const {success} = locationSchema.safeParse(req.query);
    if(!success) return res.status(411).json({
      msg:"incorrect input"
    })

    const {city} = await req.query;
const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}`;
const response = await axios.get(forecastUrl);
res.json(response.data);

  }catch(error) {
    console.log('error fetching forecast data:',error.message);
    res.status(500).json({
      msg:"internal serrver error"
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;