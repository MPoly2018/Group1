var request = require('request'); // "Request" library
var querystring = require('querystring');
var DZ = require('node-deezer');
var Jamendo = require('jamendo');

var fs = require('fs');


module.exports = class AuthentificationService  {
    constructor(options = {}) {
        this.spotify_client_id = 'baa19d6c1de84c31be6ae3be5021323e'; // Your client id
        this.spotify_client_secret = 'a3798faf894c4329b20d4e32af5e1791'; // Your secret
        this.spotify_redirect_uri = 'http://localhost:5000/spotifyCallback'; // Your redirect uri
        this.stateKey = 'spotify_auth_state';
    
        //Deezer dev information
        this.appId = '277082'; // from developers.deezer.com 
        this.deezerRedirectUrl = 'http://localhost:5000/deezerCallback';
        this.deezerAppSecret = '18578f18996081af3f36f468e52febf9';
    
        this.jamendo_client_id = '8fa50966';  
	}

    //Spotify dev information

    generateRandomString(stringLength) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        for (var i = 0; i < stringLength; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    SpotifyAuthentification(req,res){

        var state = this.generateRandomString(16);
        res.cookie(this.stateKey, state);   
        res.header('Access-Control-Allow-Origin', "http://localhost:3000");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        // your application requests authorization
        var scope = 'user-read-private user-read-email user-read-playback-state';
        res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: this.spotify_client_id,
            scope: scope,
            redirect_uri: this.spotify_redirect_uri,
            state: state
        }));

        return res;
    }

    SpotifyCallback(req,res){
        var code = req.query.code || null;
        var state = req.query.state || null;
        var storedState = req.cookies ? req.cookies[this.stateKey] : null;

        if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
            error: 'state_mismatch'
            }));
        } else {
        res.clearCookie(this.stateKey);

        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
            code: code,
            redirect_uri: this.spotify_redirect_uri    ,
            grant_type: 'authorization_code'
            },
            headers: {
            'Authorization': 'Basic ' + (new Buffer(this.spotify_client_id + ':' + this.spotify_client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {  
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

            fs.writeFile('spotifyAuthentification.txt', 'access token:'+ access_token, function (err) {
                if (err) throw err;
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

    return res;
    }
    
    DeezerAuthentification(req,res){
        var deezer = new DZ();
        var loginUrl =  deezer.getLoginUrl(this.appId, this.deezerRedirectUrl)
        res.redirect(loginUrl);

    }

    DeezerCallback(req,res){
        var deezer = new DZ();
        var code = req.query['code'];
        if (code) {
          // Handle an error if one happened (see express example for more on this) 
          // we'll gloss over it here 
          var err = req.query.error_reason;
          

          deezer.createSession(this.appId, this.deezerAppSecret, code, function (err, result) {
            fs.writeFile('deezerAuthentification.txt', 'access token:'+ result.accessToken , function (err) {
                if (err) throw err;
            });

           });
           res.redirect("http://localhost:3000/#/Settings/" );
        }
    }

    JamendoAuthentification( req,res){
        var jamendo = new Jamendo({
            client_id : this.jamendo_client_id,     // Specify your client_id 
                                          // see http://developer.jamendo.com/v3.0#obtain_client_id 
            protocol  : 'http',           // HTTP protocol to use, http or https 
            version   : 'v3.0',           // Use the specified API version 
           
            debug     : false,          // Print the whole response object and body in the console 
           
            rejectUnauthorized: false     // Ignore SSL certificates issues 
                                          // see TLS options http://nodejs.org/docs/v0.7.8/api/https.html 
          });



        jamendo.authorize({client_id:this.jamendo_client_id,client_secret:'981bc8d7dc3c28aee70d5a6a149f74ad'}, function(error, login_url){
           res.redirect(login_url);
            
          });
    }

    JamendoCallback(req,res){
        var code = req.query.code || null;
        
        var jamendo = new Jamendo({
            client_id : this.jamendo_client_id,     // Specify your client_id 
            client_secret:'981bc8d7dc3c28aee70d5a6a149f74ad',                        // see http://developer.jamendo.com/v3.0#obtain_client_id 
            protocol  : 'https',           // HTTP protocol to use, http or https 
            version   : 'v3.0',           // Use the specified API version 
           
            debug     : false,          // Print the whole response object and body in the console 
           
            rejectUnauthorized: false     // Ignore SSL certificates issues 
                                          // see TLS options http://nodejs.org/docs/v0.7.8/api/https.html 
        });

        jamendo.grant({redirect_uri:'http://localhost:5000/jamendoCallback', grant_type:'authorization_code',client_id:this.jamendo_client_id,code: code }, function(error, oauth_data){     
            console.log(oauth_data);           
            fs.writeFile('jamendoAuthentification.txt', 'access token:'+ oauth_data.access_token , function (err) {
                if (err) throw err;
            });
          });
        res.redirect("http://localhost:3000/#/Settings/" );
    }

}

