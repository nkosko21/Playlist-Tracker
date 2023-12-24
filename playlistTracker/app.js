const express = require('express');
const querystring = require('qs');
var client_id = "deb59141bd794a7cbb6acdaa7b93a8dd";
var redirect_uri = "http://localhost:9000/";
var port = 9000
var app = express()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  let response
    try {
      response = req.query.code;
    } catch (Error) {
      response = req.query.error
    }
    res.send('Hello World!')
    
    // const resposne = fetch('https://accounts.spotify.com/api/token',)
  })

app.get('/login', function(req, res) {

    var scope = 'playlist-read-private';
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      }));
  });