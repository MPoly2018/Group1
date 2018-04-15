
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var AuthentificationService = require("./Services/AuthentificationService");

module.exports = function(app){
    
    var stateKey = 'spotify_auth_state';

    app.post('/login', function(req, res) {
        
        var url = req.url
        var splittedUrl = url.split("provider=");
        var authService = new AuthentificationService();
        switch(splittedUrl[1]){
            case "spotify":
                authService.SpotifyAuthentification(req,res);
            case "deezer":
                authService.DeezerAuthentification(req,res);
            case "jamendo":
                authService.JamendoAuthentification(req,res);
        }
    });   
      
    app.get('/spotifyCallback', function(req, res) {
        var authService = new AuthentificationService();
        authService.SpotifyCallback(req,res);
    });

    app.get('/deezerCallback', function(req, res) {
        var authService = new AuthentificationService();        
        authService.DeezerCallback(req,res);
    });
    app.get('/jamendoCallback', function(req, res) {
        var authService = new AuthentificationService();        
        authService.JamendoCallback(req,res);
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

