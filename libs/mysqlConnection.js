/**
 * Created by Yayat on 11/29/16.
 */
var mysql   = require('mysql'),
	cfg     = require('./../cfg');
var path = require('path');
var connection = mysql.createConnection({
	host     : cfg.mysql.dbHost,
	port     : cfg.mysql.dbPort,
	user     : cfg.mysql.dbUser,
	password : cfg.mysql.dbPass,
	database : cfg.mysql.dbName,
	insecureAuth: true
});
connection.connect(function(err) {
	if(!err) {
		console.log('# mysql | connect | Host: '+ cfg.mysql.dbHost + ' | DB: '+ cfg.mysql.dbName);
	}
});
module.exports = {
	connection: connection
}