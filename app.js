var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send(
      `<html>
      <body>
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/023.png" >
      </body>
      </html>`)
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
