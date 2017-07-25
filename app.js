var express = require('express'),
	app = express(),
	isProd = typeof(process) !== 'undefined' && process && process.env && process.env.PORT,
	port = isProd ? process.env.PORT : 3000, // Heroku should pass process.env.PORT
	rootFolder = `${__dirname}/www/${isProd ? 'release' : 'src'}`;

var mailer = require('./middleware/mailer'),
    bodyParser = require('body-parser')

app.use(express.static(rootFolder));

app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use(bodyParser.json({limit: '1mb'}));

app.post('/mail', mailer);

app.get('/', function(req, res){
	res.sendFile(`${rootFolder}/Index.html`);
});

app.get('*', function (req, res) {
	res.redirect('/');
});

app.listen(port, function () {
  console.log(`New express server started listening on port ${port}`);
});