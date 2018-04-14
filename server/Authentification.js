
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var authentificationService = require("./AuthentificationService");







module.exports = function(app){
    
    var stateKey = 'spotify_auth_state';

    app.post('/login', function(req, res) {
        
        var url = req.url
        var splittedUrl = url.split("provider=");

        switch(splittedUrl[1]){
            case "spotify":
               authentificationService.SpotifyAuthentification(req,res);
            case "deezer":
               authentificationService.DeezerAuthentification(req,res);
            case "jamendo":
               authentificationService.JamendoAuthentification(req,res);
        }
    });   
      
    app.get('/spotifyCallback', function(req, res) {
        authentificationService.SpotifyCallback(req,res);
    });

    app.get('/deezerCallback', function(req, res) {
        authentificationService.DeezerCallback(req,res);
    });
    app.get('/jamendoCallback', function(req, res) {
        authentificationService.JamendoCallback(req,res);
    });
      
      
    app.get('/refresh_token', function(req, res) {
        console.log("refreshtoken")
        // requesting access token from refresh token
        var refresh_token = req.query.refresh_token;
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          headers: { 'Authorization': 'Basic ' + (new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64')) },
          form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
          },
          json: true
        };
      
        request.post(authOptions, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
              'access_token': access_token
            });
          }
        });
    });
      
      
}

