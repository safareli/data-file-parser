var fs = require('fs');
var Q = require('q');
var readFile = Q.denodeify(fs.readFile);
var writeFile = Q.denodeify(fs.writeFile);
var parse  = function(params){
    return readFile(params.in, params.encoding || 'utf8').
    then(function (data) {
        //create array where objects will be stored
        var arr = [];
        var parsedItem = params.regex.exec(data);
        var obj = params.as.split('|');
        while(parsedItem != null){
            for(var k = 0,i = 1,item = {}; k < obj.length ; k++,i++){
                item[obj[k]] = parsedItem[i];
            }
            arr.push(item);
            var parsedItem = params.regex.exec(data);
        }
        return arr;
    },function(err){
      return console.log(err);
    }).then(function (arr) {
        var data = JSON.stringify(arr, null, 4);
        if (params.var)
            data = "var "+params.var+" = "+data+";"
        writeFile(params.out,data);
        return arr; 
    });
}
exports = {
    parse:parse
};