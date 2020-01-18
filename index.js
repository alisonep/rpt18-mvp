const express = require('express');
const bodyParser = require('body-parser');
const dbHelpers = require('./db/dbHelper.js');
const app = express();

// app.use(express.static('client/dist'));
app.use('/', express.static('client/dist', {index: "index.html"}));
app.use(express.static('client/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000);

app.post('/profile', function(req, res) {
  dbHelpers.Fast(req.body.profile, req.body.start, req.body.length, function(err, data){
    if (err) {
      throw new Error(err);
      res.send();
    } else {
      res.send(data.toString());
    }
  });
});