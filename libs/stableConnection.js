/**
 * Created by Yayat on 11/29/16.
 */
var connection = require('./mysqlConnection')
var con = connection.connection

function stableConnection(){
	console.log('start stable connection')
	setInterval(function(){
		var qry = 'select * from place order by id limit 0,1'
		con.query(qry, function(err, rows, field){
			//console.log(rows)
		})
	}, 18000000)
}

stableConnection()

