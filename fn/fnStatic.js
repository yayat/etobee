/**
 * Created by Yayat on 11/29/16.
 */
var cfg = require('./../cfg')
var googleMapsClient = require('@google/maps')
var map = googleMapsClient.createClient({
	key: cfg.google.apikey
});
var connection = require('./../libs/mysqlConnection').connection

module.exports = {
	static: function (req, res) {
		console.log(req.params)

		var fn = req.params
		switch (fn.fn){
			case 'read':
				if(req.body.data != null || req.body.data != undefined){
					var readData = '';
					var queryURI = req.body.data;

					queryURI = new Object();
					Object.keys(req.body.data).forEach(function(items) {
						queryURI[items] = req.body.data[items];
						console.log(queryURI[items] +'='+ req.body.data[items])
					});
					// Object.keys(queryURI).forEach(function(items) {
					// 	if ((queryURI[items].length) == 0) {
					// 		delete queryURI[items];
					// 	}
					// });
					var j = 1;
					Object.keys(queryURI).forEach(function(items) {
						// if ((queryURI[items].length) > 0) {
							console.log("SSS")
							if (j == Object.keys(queryURI).length) {
								readData += items + " = '" + queryURI[items] + "'";
								console.log("query: ", items)
							} else {
								readData += items + " = '" + queryURI[items] + "' AND ";
							}
						// } else {
						// 	console.log("DDDD")
						// }
						j += 1;
					});
					var queryParameter = '',
						idParameter = '',
						filterParameter = '',
						groupParameter = '',
						groupDirParameter = '',
						sortParameter = '',
						dirParameter = '',
						limitParameter = '',
						offsetParameter = '';
					if (Object.keys(req.body.data).length > 0) {
						// * Filter Param
//											console.log("readData: ", readData.length)
						if (readData.length > 0) {
							if (idParameter == '') {
								filterParameter = " WHERE " + readData;
							} else {
								filterParameter = " AND " + readData;
							}
						}
						// * Filter query GROUP
						if (req.body.data.group != undefined) {
							// URI => /group=name_of_field
							groupParameter = " GROUP BY '" + req.body.data.group + "'";
						}
						// * Filter query GROUP DIRECTION
						if ((req.body.data.group != undefined) && (req.body.data.groupDir != undefined)) {
							groupDirParameter = " " + req.body.data.groupDir;
						}
						// * Filter query ORDERBY
						if (req.body.data.orderby != undefined) {
							sortParameter = " ORDER BY " + req.body.data.orderby;
						}
						// * Filter query ORDERTYPE
						if (req.body.data.ordertype != undefined) {
							dirParameter = " " + req.body.data.ordertype;
						}
						// * Filter query LIMIT
						if (( req.body.data.page >= 0 ) || ( req.body.data.start >= 0 ) || ( req.body.data.limit >= 0 ) || (req.body.data.offset >= 0)) {
							if (req.body.data.page != undefined) {
								req.body.data.start = (req.body.data.page - 1) * req.body.data.limit;
							}
							if (req.body.data.start == undefined) {
								req.body.data.start = 0;
							}
							if (req.body.data.offset != undefined) {
								limitParameter = " LIMIT " + req.body.data.limit + " OFFSET " + req.body.data.offset;
							} else {
								limitParameter = " LIMIT " + req.body.data.start + "," + req.body.data.limit;
							}
						}
					} else if (Object.keys(req.body.data).length == 0) {
						var qryTable = "SELECT * FROM "+req.body.table;
					}
					queryParameter = idParameter + filterParameter + groupParameter + groupDirParameter + sortParameter + dirParameter + limitParameter + offsetParameter;
					var qryTable = "SELECT * FROM " + req.body.table + queryParameter;
					console.log(qryTable)
					connection.query(qryTable, function(_err, _rows, _fields) {
						try{
							if (_err) {console.log(_err);throw _err;}
							console.log(_rows)
							var toSend= {
								success: true,
								params: fn.fn,
								data: _rows
							}
							res.send(toSend)
							console.log("aaa")
						} catch (_err) {
							console.log("tidak ada")
						}
					});
				} else {
					var qryTable = "SELECT * FROM " + req.body.table;
					connection.query(qryTable, function(_err, _rows, _fields) {
						try{
							if (_err) {console.log(_err);throw _err;}
							var toSend= {
								success: true,
								params: fn.fn,
								data: _rows
							}
							res.send(toSend)
							console.log("bbb")
						} catch (_err) {
							console.log("tidak ada")
						}
					});
				}


				break;
			case 'create':
				var qryTable = "SHOW COLUMNS FROM " + req.body.table;
				connection.query(qryTable, function(_err, _rows, _fields) {
					try {
						if (_err) {
							console.log(_err);
							throw _err;
						}
						var column_list = {column: _rows};
						var orderField = _rows[0].Field
						console.log(column_list)
						var columnInsert = new Object();
						for (var i = 0; i < column_list.column.length; i++) {
							if (i >= 0) {
								var fieldName = column_list.column[i].Field;
								columnInsert[fieldName] = req.body.data[fieldName];
								console.log(columnInsert[fieldName] = req.body.data[fieldName])
							}
						}
						connection.query("INSERT INTO " + req.body.table + " SET ?", columnInsert, function(_err, _rows, _fields) {
							try{
								if (_err) {console.log(_err);throw _err;}
								console.log("HAHAHA")
								console.log(_rows)
								var toSend= {
									success: true,
									params: fn.fn,
									data: _rows
								}
								res.send(toSend)
							} catch (_err) {
								var toSend= {
									success: false,
									params: fn.fn,
									data: null
								}
								res.send(toSend)
							}
						});
					} catch (_err) {
					}
				})

				break;
			case 'update':
				var qryPrimary = "SHOW INDEXES FROM " + req.body.table + " " +
				                 "WHERE Key_name = 'PRIMARY'";
				console.log(qryPrimary)
				connection.query(qryPrimary, function(_err, _rows, _fields) {
					try{
						if (_err) {console.log(_err);throw _err;}
						var fieldPrimary = _rows[0].Column_name;
						var updateData = ''
						var j = 1;
						Object.keys(req.body.data).forEach(function(items) {
							if (j == Object.keys(req.body.data).length) {
								updateData += items + " = '" + req.body.data[items] + "'";
							} else {
								updateData += items + " = '" + req.body.data[items] + "', ";
							}
							j += 1;
						});
						var qryAPI_CRUD = "UPDATE " + req.body.table + " SET " + updateData + " " +
						                  "WHERE " + _rows[0].Column_name + " = '" + req.body.id + "'";
						connection.query(qryAPI_CRUD, function(_err, _rows, _fields) {
							try{
								if (_err) {console.log(_err);throw _err;}
								console.log("masuk")
								var toSend= {
									success: true,
									params: fn.fn,
									data: _rows
								}
								res.send(toSend)
							} catch (_err) {
								var toSend= {
									success: false,
									params: fn.fn,
									data: null
								}
								res.send(toSend)
							}
						});
					}catch (_err) {
					}
				})

				break;
			case 'delete':
				var qryPrimary = "SHOW INDEXES FROM " + req.body.table + " " +
				                 "WHERE Key_name = 'PRIMARY'";
				connection.query(qryPrimary, function(_err, _rows, _fields) {
					try{
						if (_err) {console.log(_err);throw _err;}
						var qryAPI_CRUD = "DELETE FROM " + req.body.table + " " +
						                  "WHERE " + _rows[0].Column_name + " = '" + req.body.id + "'";
						connection.query(qryAPI_CRUD, function(_err, _rows, _fields) {
							try{
								if (_err) {console.log(_err);throw _err;}
								var toSend= {
									success: true,
									params: fn.fn,
									data: _rows
								}
								res.send(toSend)
							} catch (_err) {
								var toSend= {
									success: false,
									params: fn.fn,
									data: null
								}
								res.send(toSend)
							}
						});
					} catch (_err) {

					}
				});

				break;
			case 'map':
				switch (fn.fn2){
					case 'direction':
						console.log("direction")
						map.directions({
							origin: req.body.origin,
							destination: req.body.destination
						}, function(err, response) {
							console.log(response)
							if (!err) {
								console.log(response.json);
								var toSend= {
									success: true,
									params: fn.fn,
									data: response.json
								}
								res.send(toSend)
							}
						});
						break;
					case 'poi':
						map.places({
							query: req.body.query,
							language: req.body.language,
							location: req.body.location,
							radius: req.body.radius,
							minprice: req.body.minprice,
							maxprice: req.body.maxprice,
							opennow: req.body.opennow,
							type: req.body.type
						}, function(err, response) {
							if (!err) {
								console.log(response.json.results);
								var toSend= {
									success: true,
									params: fn.fn,
									data: response.json.results
								}
								res.send(toSend)
							}
						});
						break;
					case 'geoCode':
						map.geocode({
							address: req.body.address
						}, function(err, response) {
							if (!err) {
								console.log(response.json.results);
								var toSend= {
									success: true,
									params: fn.fn,
									data: response.json.results
								}
								res.send(toSend)
							}
						});
						break;
					default:
						break;
				}
				break;
			default:
				var toSend= {
					success: false,
					params: fn.fn,
					data: null
				}
				res.send(toSend)
				break;
		}
	}
}
