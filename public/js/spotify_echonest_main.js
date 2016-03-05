// JavaScript source code
var client_id = 'c0f7afc3520542959e587d2249cda4e1'; // Your client id for spotify
var client_secret = '8f15c046151345d88cb373847dece382'; // Your client secret or spotify
var echo_nest = 'http://developer.echonest.com/api/v4/';
var echo_api_id = 'G92VW09ZBNGLUVN8C';
var datas = [];
function getEchonestTags() {
    console.log("Opening EchonestTags");
    var url = echo_nest + 'song/search';
    $.ajaxSetup({ traditional: true });
    $.getJSON(url, { 'format':'json',
    api_key: echo_api_id,
    bucket: ['id:spotify','tracks'], // this must stay the same
    mood: 'happy' //This will be changed to whatever we determine as our algorithm from clarifai
    },
    function (data) {
        numOfSongs = data.response.songs.length;
        var i;
        for (i = 0; i < numOfSongs-1; i++) {
            if (data.response.songs[i].tracks[0] != null) {
                var myJSONObject = data.response.songs[i].tracks[0].foreign_id;
                songID = myJSONObject.split(":");
                //console.log(songID[2]);
                datas.push(songID[2]);
                var spotifyCheckURL = "https://api.spotify.com/v1/tracks/" + songID[2] + "?market=US";
                $.getJSON(spotifyCheckURL,
                    function (data2) {

                        if (data2.is_playable == true) {
                            console.log(songID[2]);
                            datas.push(songID[2])
                        }
                    })
            }

        }
    });
};

function spotifyPlaylist() {
    var echonestBegin = getEchonestTags();
    if (echonestBegin == null) {
        console.log("problem calling echonest");
    }
    var playlistLink = "https://embed.spotify.com/?uri=spotify:track:PREFEREDTITLE:"
    console.log("%s\n",datas.length);
    for (var i = 0; i < datas.length-1; i++) {
        playlistLink += datas[i];
        if (i < datas.length-2) {
            playlistLink += ','
        }
    }
    console.log(playlistLink);
    var spotifyPlaylist = document.createElement('iframe');
    spotifyPlaylist.allowtransparency = "true";
    spotifyPlaylist.frameBorder = "0";
    spotifyPlaylist.src=playlistLink;

    var playLabel = document.getElementById('playSongs');
    playLabel.insertBefore(spotifyPlaylist,playLabel);

}
