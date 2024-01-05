import { fstat } from "fs";

var CLIENT_ID = "deb59141bd794a7cbb6acdaa7b93a8dd";
// var CLIENT_SECRET = process.env.CLIENT_SECRET;
var CLIENT_SECRET = "9e835004534e4961bea8b90cd0458ec1"

export function track_playlist_info(tracklist) {
    const files = ["LBM.json", "HBM.json", "FT.json", "JF.json"]

    files.map((filename, index) => {
        fs.write(`previous_tracks/${filename}`, JSON.stringify(tracklist[index], null, 2))
    })
}