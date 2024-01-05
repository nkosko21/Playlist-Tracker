var CLIENT_ID = "deb59141bd794a7cbb6acdaa7b93a8dd";
// var CLIENT_SECRET = process.env.CLIENT_SECRET;
var CLIENT_SECRET = "9e835004534e4961bea8b90cd0458ec1"
var redirect_uri = `http://localhost:9000/login`;

var LBM_ID = "3vfeQizQm0ah4ZXatQ1SRq"
var HBM_ID = "137owd2lyOGYdv3Pq4zsit"
var FT_ID = "08JPUQuXLNWmDvcXoVZvAe"
var JF_ID = "3plVHCHSChDYfJNaQMkFWy"

export async function get_playlist_info(req, res, access_token) {
  const playlists = [LBM_ID, HBM_ID, FT_ID, JF_ID];
  var full_tracklist = []
  
  await Promise.all(
    playlists.map(async (playlist_id) => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${playlist_id}`,
          {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + access_token,
            },
          }
        );

        if (response.ok) {
          let data = await response.json();
          const allTracks = await get_all_tracks(data["tracks"], access_token)
          var simpleTracks = simplify_track_data(allTracks)
          full_tracklist.push(simpleTracks)
        } else {
          console.error('Error:', response.status, response.statusText);
          return null; 
        }
      } catch (error) {
        console.error('Error:', error.message);
        return null; 
      }
    })
  )
  return full_tracklist
}

// gets all of the items in a playlist
async function get_all_tracks(playlistObj, access_token) {
  try {
    if (playlistObj["next"]) { // if there are more items in the playlist
      let response = await fetch( // gets the next 100 or so tracks if there are more
        playlistObj["next"],
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + access_token,
          },
        }
      )
      let jsonResponse = await response.json()
      return [...playlistObj["items"], ...await get_all_tracks(jsonResponse, access_token)]
    } else {
      return playlistObj["items"]
    }
  } catch (Error) {
    return []
  }
}

function msToMinSec(ms) {
  const seconds = Math.floor(ms / 1000) 
  const minutes = Math.floor(seconds/ 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds}`
}

function simplify_track_data(long_tracklist) {
  var simple_tracklist = []

  long_tracklist.map((item) => {
    console.log(item["track"]["album"]["images"])
    simple_tracklist.push({
      name: item["track"]["name"], 
      duration: msToMinSec(item["track"]["duration_ms"]), 
      album_name: item["track"]["album"]["name"],
      album_image: item["track"]["album"]["images"][1]["url"] // 0: 640 x 640, 1: 300 x 300, 2: 64 x 64
    })
  })
  return simple_tracklist
}