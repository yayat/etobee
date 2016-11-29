/**
 * Created by Yayat on 11/29/16.
 */
var cfg = require('./../config/config')
var googleMapsClient = require('@google/maps')
var map = googleMapsClient.createClient({
	key: cfg.google.apikey
});

var connection = require('./../libs/mysqlConnection')
module.exports = {
	static: function (req, res) {
		console.log(req.params)
		var fn = req.params
		switch (fn.fn){
			case 'read':
				map.geocode({
					address: req.body.place
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
			case 'create':
				var toSend= {
					success: true,
					params: fn.fn,
					data: null
				}
				res.send(toSend)
				break;
			case 'update':
				var toSend= {
					success: true,
					params: fn.fn,
					data: null
				}
				res.send(toSend)
				break;
			case 'delete':
				var toSend= {
					success: true,
					params: fn.fn,
					data: null
				}
				res.send(toSend)
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
