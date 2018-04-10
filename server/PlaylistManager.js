var fs = require('fs');

//Classe incomplete
module.exports = {
	
	addPlaylist: function (username, nameOfPlaylist) {
	
		fs.readFile('playlistDB.json', 'utf8', function readFileCallback(err, data){
			if (err){
				console.log(err);
			} else {
			obj = JSON.parse(data);
			for (i in obj) {
				// if(obj.name == username)
				// {
					
				// }
}
			json = JSON.stringify(obj);
			fs.writeFile('playlistDB.json', json, 'utf8', callback);
		}});

	}
}