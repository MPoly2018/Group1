
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var fs = require('fs');

var client_id = 'baa19d6c1de84c31be6ae3be5021323e'; // Your client id
var client_secret = 'a3798faf894c4329b20d4e32af5e1791'; // Your secret
var redirect_uri = 'http://localhost:5000/callback/'; // Your redirect uri

/** 
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };



module.exports = function(app){
    
    var stateKey = 'spotify_auth_state';

    



    app.get('/login', function(req, res) {
        
        var state = generateRandomString(16);
        res.cookie(stateKey, state);
        res.header('Access-Control-Allow-Origin', "http://localhost:3000");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        // your application requests authorization
        var scope = 'user-read-private user-read-email user-read-playback-state';
        res.redirect('https://accounts.spotify.com/authorize?' +
          querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
          }));
          console.log("login")
      });
      
      app.get('/callback', function(req, res) {
        // your application requests refresh and access tokens
        // after checking the state parameter

        var code = req.query.code || null;
        var state = req.query.state || null;
        var storedState = req.cookies ? req.cookies[stateKey] : null;
        console.log(state);
        console.log(storedState);
        if (state === null) {
          res.redirect('/#' +
            querystring.stringify({
              error: 'state_mismatch'
            }));
        } else {
          res.clearCookie(stateKey);
          var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
              code: code,
              redirect_uri: redirect_uri,
              grant_type: 'authorization_code'
            },
            headers: {
              'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
          };
          request.post(authOptions, function(error, response, body) {
              console.log(response.statusCode)
              console.log(response.body     )
            if (!error && response.statusCode === 200) {
      
              var access_token = body.access_token,
                  refresh_token = body.refresh_token;
      
              var options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
              };
      
              // use the access token to access the Spotify Web API
              request.get(options, function(error, response, body) {
                console.log(body);
              });

              fs.writeFile('spotifyAuthentification.txt', 'access token:'+ access_token+",refresh token:"+ refresh_token, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });

              // we can also pass the token to the browser to make requests from there
              res.redirect("http://localhost:3000/#/Settings/" );
            } else {
              res.redirect('/#' +
                querystring.stringify({
                  error: 'invalid_token'
                }));
            }
          });
        }
      });
      
      app.get('/refresh_token', function(req, res) {
        console.log("refreshtoken")
        // requesting access token from refresh token
        var refresh_token = req.query.refresh_token;
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
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

