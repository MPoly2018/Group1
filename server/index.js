const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');


var SearchService = require('./Services/SearchService');
var PlaylistService = require('./Services/PlaylistService');






// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.      
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});

require('./Authentification')(app);

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(bodyParser.json());

app.post('/playlist', function(req, res) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  var playlistService = new PlaylistService();
 
  var playlists = playlistService.addPlaylist(req.body.name);

  console.log(playlists);

  res.send(JSON.stringify(playlists));	
});

app.get('/playlist', function(req, res) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  var playlistService = new PlaylistService(); 
  var playlists = playlistService.getPlaylist();

  res.send(JSON.stringify(playlists));	
});

app.post('/playlist-content', function(req, res) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  console.log(req.body.playlistName);
  var playlistService = new PlaylistService();
 
  var content = playlistService.getPlaylistContent(req.body.playlistName);  

  res.send(JSON.stringify(content));	
});

app.post('/playlist-content-add', function(req, res) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  var playlistService = new PlaylistService();
  console.log(req.body.playlistName);
  console.log(req.body.songName);
  var content = playlistService.addSongToPlaylist(req.body.songName,req.body.playlistName);  

  res.send(JSON.stringify(content));	
});


 
app.post('/search', async function (req, res) {

  var searchService = new SearchService();
  try{
    var songs =  await searchService.searchSong(req.body.name)

  }catch(e){
    console.log(e)
  }

  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(songs));	  
});  

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
