// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
let bodyParser = require('body-parser')
var app = express();



app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204


app.use((req, res, next) => {
  // Assuming you want to extract language, software, and IP from request headers
  req.language = req.headers['accept-language'];
  req.software = req.headers['user-agent'];
  req.ip = req.ip || req.connection.remoteAddress;

  next();
});

app.get("/", (req, res) => {
  let { language, software, ip } = req;
  
  if (!language) {
    return res.json({ error: "Language not found" });
  }

  // Assuming you want to send the extracted information as JSON
  res.json({
    language,
    software,
    ip
  });
});


// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.get('/style', (req, res) => {
  res.sendFile(__dirname + '/public/style.css');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
