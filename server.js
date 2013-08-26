var express = require('express')
  , app = express();

var https = require('https')
  , request = require('superagent')
  , cheerio = require('cheerio');

var url = "https://clusters.andrew.cmu.edu/printerstats/"
var cache = {};

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  https.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

function toJson($, row) {
  var t = {};
  t.name = $($(row).find("td")[0]).html();
  t.icon = $($(row).find("td")[1]).find("img").attr("src");
  t.message = $($(row).find("td")[2]).html();
  t.status = $($(row).find("td")[3]).html();
  t.trays = $($(row).find("td")[4]).find("font").map(function(i,e){
    return $(e).html();
  });
  t.timestring = $($(row).find("td")[5]).html();
  return t;
}

function parse(data) {
    if (data) {
      // Load data
      var $ = cheerio.load(data);

      // Find all the rows with data in them
      var t = $(".epi-rowEven, .epi-rowOdd").map(function(i,e){
        // Extract data from rows.
        return toJson($, e);
      });
      return t;
    }
    else console.log("error");  
    return null;
  }

// Test
app.get('/printers', function(req, res){

  download(url, function(data){
    var response = parse(data);
    if(response) 
      res.send(response);
    else
      res.send(500, "The request failed. You should probably let Salem know.");
  });

});



app.listen(3000);
console.log('Listening on port 3000');