const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');


var SearchService = require('./SearchService');

var SearchTool = require('./SpotifyTools');
var playlists = require('./PlaylistService');

var client_id = 'baa19d6c1de84c31be6ae3be5021323e'; // Your client id
var client_secret = 'a3798faf894c4329b20d4e32af5e1791'; // Your secret



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



var stateKey = 'spotify_auth_state';

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(bodyParser.json());

   //LOGIN
app.post('/Login', function(req, res) {
  console.log("hello");
	res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  var Spotify = require('./SpotifyPlayer')
  var spotifyPlayer = new Spotify("SpotifyPlayer");
  spotifyPlayer.init();
  spotifyPlayer.login();

  console.log(spotifyPlayer.accessToken);
}); 

app.post('/addPlaylist', function(req, res) {
	res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.set('Content-Type', 'application/json');
	//On ajoute la playlist a la BD et en retour on renvoi la nouvelle BD pour un update live.
	var currentUser = SearchTool.Username;
    var newList = SearchTool.AddPlaylist(currentUser,req.body.Name);
    res.send(answer);
});

// only for test purpose

app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
  res.send(JSON.stringify([
    {Supplier:"Spotify",Name:"Staying Alive"},
    {Supplier:"Spotify",Name:"La Bamba"}
  ]
  ));
});	  

app.post('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
  res.send(JSON.stringify([
    {Supplier:"Spotify",Name:"Staying Alive"},
    {Supplier:"Spotify",Name:"La Bamba"}
  ]
  ));	  
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
