var CLIENT_ID = "deb59141bd794a7cbb6acdaa7b93a8dd";
// var CLIENT_SECRET = process.env.CLIENT_SECRET;
var port = 9000
var redirect_uri = `http://localhost:${port}/login`;

export function login(req, res){
  let code
  try {
    code = req.query.code;
  } catch (Error) {
    code = req.query.error
  }
  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    }),
  };
  
  fetch('https://accounts.spotify.com/api/token', authOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      var access_token = data.access_token
      var refresh_token = data.refresh_token
    })
    .catch(error => {
      console.error('Error getting access token:', error);
    })  
}