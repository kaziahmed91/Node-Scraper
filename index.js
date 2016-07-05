var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
require('console.table');

var file_output = fs.createWriteStream('images.html');

request('http://substack.net/images/', function (error, response, body) {
  $ = cheerio.load(body);
  var permission;
  var data;

  $('td:first-child code').each(function() {
    permission = $(this).html();
  });

  $('a').each(function() {
    var link = $(this);
    var text = link.text();
    var ref = link.attr("href");
    var extension = ref.match(/^.+\.(png|jpg|svg|jpeg)$/);
    if (extension) {
    var data = "Permission: "+ permission + " reference: "+ref + " File Type: " + extension[1] +"\n";
      console.log(data);
    file_output.write(data);
    }
  });
});
