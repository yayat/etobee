angular.module('main', ['uiGmapgoogle-maps','nemLogging'])
	.config(function(uiGmapGoogleMapApiProvider) {
		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyA_tLqDyHCEUpNg8T7tlLwagVv-WgdF4RY'
		});
	})
	.factory('useGlobal', function () {
		var place;
		$.ajax({
			url: '/api/read',
			method: 'POST',
			data: {
				"table": "place"
			},
			success: function (item) {
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
		return place
	}).factory('dataDetail', function () {
	var place;
	$.ajax({
		url: '/api/read',
		method: 'POST',
		data: {
			"table": "place"
		},
		success: function (item) {
			place = item
		},
		error: function () {

		},
		async: false
	})
	return place
})
	.controller('mainController', function($scope,uiGmapGoogleMapApi, useGlobal) {
		$scope.map = {
			center: {
				latitude: -1.6878834,
				longitude: 113.0425407
			},
			zoom: 5
		};
		$scope.options = { scrollwheel: false };
		$scope.randomMarkers = useGlobal
		console.log($scope.randomMarkers)
		uiGmapGoogleMapApi.then(function (maps) {

		});
	})
	.controller('test', function ($scope) {
		$scope.name = {
			name: "Yayat",
			last: "Ruhiat"
		}
	})
	.controller('notes', function ($scope, dataDetail) {
		$scope.detail = dataDetail.data
	})
