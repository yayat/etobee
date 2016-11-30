/**
 * Created by Yayat on 11/29/16.
 */
var cfg = require('./config')
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var engine = require('consolidate');
var googleMapsClient = require('@google/maps');
var map = googleMapsClient.createClient({
	key: cfg.google.apikey
});
var path = require('path')

var fnStatic = require('./fn/fnStatic')
app.engine('html', engine.hogan);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public',express.static('./public'))
app.get('/', function (req, res) {
	res.send('hallo')
})

app.post('/api/:fn/:fn2?', upload.array(), fnStatic.static)


app.listen(cfg.serverPort, cfg.serverHost, function () {
	console.log('running')
})
