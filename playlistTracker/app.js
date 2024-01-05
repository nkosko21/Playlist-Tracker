import express from 'express';
import { login } from './src/login.js'
import querystring from 'qs';
import fs from 'fs';
import dotenv from 'dotenv';
import { get } from 'http';
var CLIENT_ID = "deb59141bd794a7cbb6acdaa7b93a8dd";
// var CLIENT_SECRET = process.env.CLIENT_SECRET;
var CLIENT_SECRET = "9e835004534e4961bea8b90cd0458ec1"
var port = 9000
var redirect_uri = `http://localhost:${port}/login`;
var app = express()

app.listen(port, () => {
  console.log(`Playlist Tracker listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: redirect_uri,
    }));
})

app.get('/error', (req, res) => {
  res.send('Error!')
})

app.get('/login', (req, res) => {
  login(req, res)
})
