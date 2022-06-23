// const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
// const assert = require('assert');
const fs = require('fs');
require('dotenv').config()
  

// const script = require('./script')
const auth =require('./router/auth')
// const API = require('../server/router/auth');
const { default: axios } = require('axios');
const app = express();
app.use(express.static('public'))



app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/auth', auth); //please note this***
// app.use('/script', script)
// app.get('/', (req, res)=> res.send({age: 2}))

const PORT = process.env.PORT || 2050;

app.listen(PORT, function () {
    console.log(`App started on port ${PORT}`)
});