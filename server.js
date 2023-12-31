/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Mustafa Toygar Baykal Student ID: 112398227 Date: October 11, 2023
*
*  Published URL: https://rich-cyan-gecko-toga.cyclic.app/
*
********************************************************************************/




const legoData = require("./modules/legoSets");
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public')); // set static folder

const HTTP_PORT = process.env.PORT || 8080; // set port

// get "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

// get "/"
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

// get "/lego/sets" to return all sets
app.get('/lego/sets', (req, res) => {
  const theme = req.query.theme;

  if (theme) {
    legoData.getSetsByTheme(theme).then((data) => {
      res.json(data);
    }).catch((err) => {
      res.status(404).send(`404 - ${err}`)
    });
  } else {
    legoData.getAllSets().then((data) => {
      res.json(data);
    }).catch((err) => {
      res.status(404).send(`404 - ${err}`)
    });
  }
});

// get "/lego/sets/:id" to return a set by setNum
app.get('/lego/sets/:id', (req, res) => {
  const setNum = req.params.id;

  legoData.getSetByNum(setNum).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(404).send(`404 - ${err}`)
  });
});

// 404 error
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

// call initialize function in legoData module
legoData.initialize().then(() => {
  app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
}).catch((err) => {
  console.log(err);
});