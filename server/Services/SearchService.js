var fileHelper = require('../Helpers/FileHelper');
var AuthentificationService = require('./AuthentificationService');
var SpotifyWebApi = require('spotify-web-api-node');
var DZ = require('node-deezer');
var request = require('sync-request');


module.exports =  class SearchService{
    constructor(options = {}) {
      this.songs = [],
      this.spotifyToken = fileHelper.GetAccessToken('./spotifyAuthentification.txt');
      this.deezerToken = fileHelper.GetAccessToken('./deezerAuthentification.txt');
      this.jamendoToken = fileHelper.GetAccessToken('./jamendoAuthentification.txt');
      var authService = new AuthentificationService();
      this.jamendo_client_id =  authService.jamendo_client_id; 
      this.spotifyApi = new SpotifyWebApi({
        accessToken : this.spotifyToken
      });
    }
    

     async searchSong(songName){

        var songList = [];
        var self = this;
        if(this.spotifyToken){

           var spotifySongs = await self.searchSpotify(songName);
           Array.prototype.push.apply(songList, this.parseData(spotifySongs));
    
        }
   
        if(this.deezerToken){   
            var deezerSongs = self.searchDeezer(songName);
           Array.prototype.push.apply(songList, deezerSongs);
            
        }

        if(this.jamendoToken){
            var jamendoSongs = self.searchJamendo(songName);
            console.log(jamendoSongs);
            Array.prototype.push.apply(songList, jamendoSongs);

        }    
        return songList;
    }


     async searchSpotify(songName){
        return await this.spotifyApi.searchTracks("track:"+songName);
    }
    
    parseData(data){
        var self = this;
        var songs = [];
        
        data.body.tracks.items.forEach(function(element){
            songs.push({
                Name: element.name,
                Id : element.id,
                Supplier: "spotify",    
                Artist: element.artists[0].name
            });
        });
        return songs;
    }
     
    searchJamendo(songName  ){
        var req = request('GET','https://api.jamendo.com/v3.0/tracks/?client_id='+this.jamendo_client_id+'&format=jsonpretty&limit=10&name='+songName+'&include=musicinfo');
        return this.parseJamendoData(req.getBody('utf8'));     
    }  

    searchDeezer(songName){   
        var deezer = new DZ();
        var req = request('GET','https://api.deezer.com/3.0/search/track/?q='+songName+'&index=0&limit=10&output=json');
       
        return this.parseDeezerData(req.getBody('utf8'));     
    }

    parseDeezerData(result){
        var songs  = [];
        JSON.parse(result).data.forEach(function(el){
            songs.push({
                Name: el.title,
                Id: el.id,
                Supplier: "deezer",
                Artist: el.artist.name
            });
        });
        return songs;
    }

    parseJamendoData(data){
        var songs  = [];
        JSON.parse(data).results.forEach(function(el){
            songs.push({
                Name: el.name,
                Id: el.id,
                Supplier: "jamendo",
                Artist: el.artist_name
            });
        });
        return songs;
    }
}