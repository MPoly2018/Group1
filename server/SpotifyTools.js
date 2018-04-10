var SpotifyWebApi = require('spotify-web-api-node');
var fs = require('fs');

module.exports = {
	
	
	generateRandomString: function(length) {
	  var text = '';
	  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	  for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	  }
	  return text;
	},
	
	SongSearch: function (searchterm) {

		var spotifyApi = new SpotifyWebApi({
		  clientId : 'ab85096602544cd1a072309a632747ff',
		  clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
		  redirectUri : 'http://localhost:8888/callback'
		});

		spotifyApi.setAccessToken('BQCCLjCac3S3I--16bv8gIADoFlX3h_BfVa2_JAMIXdPKUL2rM0o7iEuVUvIhtWwbFmc3s3lD70GRxPB5FR1iqd7AjISwdgODFDgOCpE7ya3_8mHtbqxr_jGz4UVYbUHthQi0hlppRAIOYBsAxwWFJHkE88SBAj4-v5RhaALwNrv3bt3DlI0C1EN8S3n2kqDAxGL_ZmOJfpNHtFW6-nhytHBvIninTXsTyTcmF6HGm8');
		  
		var PlaylistTestID = 'string';  
		  
		  //Dans le serveur: prendre en capture les inputs de la barre et remplacer dans le field de spotifyApi.searchTracks()
		  var SearchArr = new Array();
		  spotifyApi.searchTracks(searchterm)
		  .then(function(data) {
					for(i in data.body.tracks.items){
						SearchArr.push({
								name: data.body.tracks.items[i].name,
								uri: data.body.tracks.items[i].uri,
								supplier: 'Spotify'
							})
					}
					
			return SearchArr;		
			
		  }, function(err) {
			console.log('Something went wrong!', err);
		  });

	},
	
	Username: function () {
		
		spotifyApi.getMe()
	  .then(function(data) {
		  
		  return data.body.display_name;
				
	  }, function(err) {
		console.log('Something went wrong!', err);
	  });
			
		
	}
}
