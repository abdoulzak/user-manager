const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
var cors = require('cors');

//const uri = "mongodb+srv://zakiou2:eeEAwZPAHqje9iH@cluster0.t6gaj.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017";
const app = express();

//connexion
mongoose.connect(uri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((e) => console.log('Connexion à MongoDB échouée !'+e));

app.use(cors());
  //droit d'acces
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
/*
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });*/
    app.use(bodyParser.json());
    app.use('/auth', userRoutes);
    app.get('/', (req, res, next) => {
      res.status(200).json({ message: "ok" });
  });
  

module.exports = app;