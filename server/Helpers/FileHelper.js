var fs = require('fs'); 

module.exports = {

    GetAccessToken : function(fileName){
        return  fs.readFileSync(fileName,'utf8').split(':')[1];
    },  

}