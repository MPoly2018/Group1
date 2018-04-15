var fs = require('fs');

//Classe incomplete
module.exports =  class PlaylistService {

	constructor(options = {}) {
	}
	
	addPlaylist(name) {
		var content = [];
		try{
		content = JSON.parse(fs.readFileSync('./Playlist.json', "utf8"));
		 
		}
		catch(e){
			console.log(e);

		}
		console.log(typeof content);
		content.push({
			Name: name,
			Songs: []
		});

		fs.writeFileSync('./Playlist.json', JSON.stringify(content));

		return this.getPlaylist();
	}

	getPlaylist(){
		var content;
		try{
	     content = JSON.parse(fs.readFileSync('./Playlist.json', "utf8"));
		}
		catch(e){
			console.log(e);
			content = [];
		}

		var playlistNames = [];
		content.forEach(function(element){
			playlistNames.push({Name:element.Name});
		});

		return playlistNames;
	}	


	getPlaylistContent(playlistName){

		var content;
		try{
	     content = JSON.parse(fs.readFileSync('./Playlist.json', "utf8"));
		}
		catch(e){
			console.log(e);
			content = [];
		}

		var playListContent = [];

		content.forEach(function(element){
			if(element.Name === playlistName){
				element.Songs.forEach(function(el){
					playListContent.push({Name:el.Name});
				})
				
			}
		});

		return playListContent;
	}	


	addSongToPlaylist(song,playlist){
		var content = [];

		try{
		content = JSON.parse(fs.readFileSync('./Playlist.json', "utf8"));	 
		}
		catch(e){
			console.log(e);
		}

		content.forEach(function(element){
			if(element.Name === playlist){
				element.Songs.push({Name:song});
			}
		});

		fs.writeFileSync('./Playlist.json', JSON.stringify(content));

	}
}