import express from 'express';
import { login } from './login.js'
import querystring from 'qs';
import fs from 'fs';
import dotenv from 'dotenv';
var CLIENT_ID = "deb59141bd794a7cbb6acdaa7b93a8dd";
// var CLIENT_SECRET = process.env.CLIENT_SECRET;
var port = 9000
var redirect_uri = `http://localhost:${port}/login`;
var app = express()

const LBM_ID = "3vfeQizQm0ah4ZXatQ1SRq"
const HBM_ID = "137owd2lyOGYdv3Pq4zsit"
const FT_ID = "08JPUQuXLNWmDvcXoVZvAe"
const JF_ID = "3plVHCHSChDYfJNaQMkFWy"

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/login', (req, res) => {
  res.send('Hello World!')
  login(req, res)
})

app.get('/', function(req, res) {


  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: redirect_uri,
    }));
});