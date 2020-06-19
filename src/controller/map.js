angular.module('homeButtons', ['ngMaterial'])
	.controller('AppCtrl', function ($scope, $http, $filter) {
		var arraypoint = [];
		var arraytimestamp = [];

		$scope.start = function () {
			alert("start recording");
			//delete
			d3.json(
				'https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson',
				function (err, data) {
					if (err) throw err;
					var coordinates = data.features[0].geometry.coordinates;
					data.features[0].geometry.coordinates = [coordinates[0]];
					var i = localStorage.getItem("nowValue");
					var timer = window.setInterval(function () {
					if (i < coordinates.length) {
							data.features[0].geometry.coordinates.push(
								coordinates[i]
							);
							var timestamp = (new Date()).valueOf();
							arraypoint.push(coordinates[i]);
							arraytimestamp.push(timestamp);
							i++;
						} else {
							window.clearInterval(timer);
						}
					}, 100);
					}
			);
			//delete



			$scope.end = function () {
				console.log(arraypoint, arraytimestamp);
				for (var i = 0; i < arraypoint.length; i++) {
					var deviceId = localStorage.getItem("nowId");
					console.log(deviceId);
					geturl = null;
					timestamp = $filter("date")(arraytimestamp[i], "yyyy-MM-dd HH:mm:ss");
					geturl = "?timestamp=" + timestamp + "&point=POINT(" + arraypoint[i] + ")&deviceId=" + deviceId;
					console.log(geturl);
					var url = "http://192.168.137.1:8080/DBCon/addRecordServlet" + geturl;
					console.log(url);
					$http.get(url).then(function success(response) {
						console.log(response.data);
						if (response.data == "insert successfully") {
							console.log("insert a new record.");
						}
						else {
							console.log("try again");
						}
					}, function error(response) {
						console.log("error");
					});
				}
				alert("insert " + arraypoint.length + " records into database");
				window.location.href = "hello.html";
			};
		};

		mapboxgl.accessToken = 'pk.eyJ1IjoibWlueWFuZnUiLCJhIjoiY2s3MHF6bGx1MDAwODNsdWc4NWpwOGk3ZiJ9.-JNfNcvmZrtGg7MWh0F4fw';
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			zoom: 0
		});

		map.on('load', function () {
			// We use D3 to fetch the JSON here so that we can parse and use it separately
			// from GL JS's use in the added source. You can use any request method (library
			// or otherwise) that you want.
			d3.json(
				'https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson',
				function (err, data) {
					if (err) throw err;

					// save full coordinate list for later
					var coordinates = data.features[0].geometry.coordinates;

					// start by showing just the first coordinate
					data.features[0].geometry.coordinates = [coordinates[0]];

					// add it to the map
					map.addSource('trace', { type: 'geojson', data: data });
					map.addLayer({
						'id': 'trace',
						'type': 'line',
						'source': 'trace',
						'paint': {
							'line-color': 'yellow',
							'line-opacity': 0.75,
							'line-width': 5
						}
					});

					// setup the viewport
					map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });
					map.setPitch(30);

					// on a regular basis, add more coordinates from the saved list and update the map
					var i = 0;
					var timer = window.setInterval(function () {
						if (i < coordinates.length) {
							data.features[0].geometry.coordinates.push(
								coordinates[i]
							);
							map.getSource('trace').setData(data);
							map.panTo(coordinates[i]);
							localStorage.setItem("nowValue",i);
							i++;
						} else {
							window.clearInterval(timer);
						}
					}, 100);
				}
			);
		});
	})
