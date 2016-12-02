angular.module('main', ['uiGmapgoogle-maps','nemLogging'])
	.config(function(uiGmapGoogleMapApiProvider) {
		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyA_tLqDyHCEUpNg8T7tlLwagVv-WgdF4RY'
		});
	})
	.controller('mainController', function($scope,uiGmapGoogleMapApi, $http) {
		var place;
		var dataDetail;
		$scope.name = {
			name: "Yayat",
			last: "Ruhiat"
		};
		var data;
		if($scope.userType == undefined) {
			data = {
				"table": "place"
			}
			$.ajax({
				url: '/api/read',
				method: 'POST',
				data: data,
				success: function (item) {
					dataDetail = item
					var toPush = []
					item.data.forEach(function (dat) {
						toPush.push({
							id: dat.id,
							latitude: dat.lat,
							longitude: dat.lang
						})
					})
					place = toPush
				},
				error: function () {

				},
				async: false
			})
			$scope.detail = dataDetail.data;
			$scope.map = {
				center: {
					latitude: -1.6878834,
					longitude: 113.0425407
				},
				zoom: 5
			};
			$scope.options = { scrollwheel: false };
			$scope.randomMarkers = place
			uiGmapGoogleMapApi.then(function (maps) {

			});
		}
		$scope.clickSearch = function () {
			if($scope.userType == ''){
				data = {
					"table": "place"
				}
			} else {
				data = {
					"table": "place",
					"data": {
						"place_name": $scope.userType
					}
				}
			}

			$.ajax({
				url: '/api/read',
				method: 'POST',
				data: data,
				success: function (item) {
					dataDetail = item
					var toPush = []
					item.data.forEach(function (dat) {
						toPush.push({
							id: dat.id,
							latitude: dat.lat,
							longitude: dat.lang
						})
					})
					place = toPush
				},
				error: function () {
				},
				async: false
			})
			console.log(dataDetail)
			$scope.detail = dataDetail.data;
			$scope.map = {
				center: {
					latitude: -1.6878834,
					longitude: 113.0425407
				},
				zoom: 5
			};
			$scope.options = { scrollwheel: false };
			$scope.randomMarkers = place
			uiGmapGoogleMapApi.then(function (maps) {
			});
		}
		$scope.clickNew = function () {
			$("#modal-legend").modal("show");
		}
		$scope.clickUpdate = function (data) {
			data = {
				"table": "place",
				"data": {
					"place_name": data
				}
			}
			$.ajax({
				url: '/api/read',
				method: 'POST',
				data: data,
				success: function (item) {
					$scope.id = item.data[0].id
					$scope.place_name = item.data[0].place_name
					$scope.lat = item.data[0].lat
					$scope.long = item.data[0].lang
				},
				error: function () {
				},
				async: false
			})
			$("#modal-legend2").modal("show");
		}
		$scope.clickDelete = function (data) {
			data = {
				"table": "place",
				"data": {
					"place_name": data
				}
			}
			$.ajax({
				url: '/api/read',
				method: 'POST',
				data: data,
				success: function (item) {
					$scope.id = item.data[0].id
					$scope.place_name = item.data[0].place_name
					$scope.lat = item.data[0].lat
					$scope.long = item.data[0].lang
				},
				error: function () {
				},
				async: false
			})
			$("#modal-legend3").modal("show");
		}
		$scope.clickSave = function () {
			var data = {
				"table": "place",
				"data": {
					"place_name": $scope.place_name,
					"lat": $scope.lat,
					"lang": $scope.long,
					"is_active": 1
				}
			}
			$.ajax({
				url: '/api/create',
				method: 'POST',
				data: data,
				success: function (ss) {
					if(ss.success == true){
						data = {
							"table": "place"
						}
						$.ajax({
							url: '/api/read',
							method: 'POST',
							data: data,
							success: function (item) {
								dataDetail = item
								var toPush = []
								item.data.forEach(function (dat) {
									toPush.push({
										id: dat.id,
										latitude: dat.lat,
										longitude: dat.lang
									})
								})
								place = toPush
							},
							error: function () {

							},
							async: false
						})
						$scope.detail = dataDetail.data;
						$scope.map = {
							center: {
								latitude: -1.6878834,
								longitude: 113.0425407
							},
							zoom: 5
						};
						$scope.options = { scrollwheel: false };
						$scope.randomMarkers = place
						uiGmapGoogleMapApi.then(function (maps) {
						});
						$("#modal-legend").modal("hide");
					}
				},
				error: function () {
				},
				async: false
			})

		}
		$scope.saveUpdate = function () {
			var data = {
				"table": "place",
				"id": $scope.id,
				"data": {
					"place_name": $scope.place_name,
					"lat": $scope.lat,
					"lang": $scope.long,
					"is_active": 1
				}
			}
			$.ajax({
				url: '/api/update',
				method: 'POST',
				data: data,
				success: function (ss) {
					if(ss.success == true){
						data = {
							"table": "place"
						}
						$.ajax({
							url: '/api/read',
							method: 'POST',
							data: data,
							success: function (item) {
								dataDetail = item
								var toPush = []
								item.data.forEach(function (dat) {
									toPush.push({
										id: dat.id,
										latitude: dat.lat,
										longitude: dat.lang
									})
								})
								place = toPush
							},
							error: function () {

							},
							async: false
						})
						$scope.detail = dataDetail.data;
						$scope.map = {
							center: {
								latitude: -1.6878834,
								longitude: 113.0425407
							},
							zoom: 5
						};
						$scope.options = { scrollwheel: false };
						$scope.randomMarkers = place
						uiGmapGoogleMapApi.then(function (maps) {
						});
						$("#modal-legend2").modal("hide");
					}
				},
				error: function () {
				},
				async: false
			})
		}
		$scope.saveDelete = function () {
			var data = {
				"table": "place",
				"id": $scope.id
			}
			$.ajax({
				url: '/api/delete',
				method: 'POST',
				data: data,
				success: function (ss) {
					if(ss.success == true){
						data = {
							"table": "place"
						}
						$.ajax({
							url: '/api/read',
							method: 'POST',
							data: data,
							success: function (item) {
								dataDetail = item
								var toPush = []
								item.data.forEach(function (dat) {
									toPush.push({
										id: dat.id,
										latitude: dat.lat,
										longitude: dat.lang
									})
								})
								place = toPush
							},
							error: function () {

							},
							async: false
						})
						$scope.detail = dataDetail.data;
						$scope.map = {
							center: {
								latitude: -1.6878834,
								longitude: 113.0425407
							},
							zoom: 5
						};
						$scope.options = { scrollwheel: false };
						$scope.randomMarkers = place
						uiGmapGoogleMapApi.then(function (maps) {
						});
						$("#modal-legend3").modal("hide");
					}
				},
				error: function () {
				},
				async: false
			})
		}


	})

