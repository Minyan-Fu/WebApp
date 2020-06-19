angular.module('showBotton', ['ngMaterial'])
	.controller('SaveCtrl', function ($scope, $http, $filter, $window) {

		$scope.show = function () {
			var routineId = localStorage.getItem("routineId");
			var UserId = localStorage.getItem("userId");
			var deviceId = localStorage.getItem("nowId");

			var getData = "?routineId=" + routineId;
			var url = "http://192.168.137.1:8080/DBCon/chooseTimeServlet" + getData;
			$http.get(url).then(function success(response) {
				var string = response.data.replace("[{startTime:", "").replace("}]", "").replace(" endTime:", "");
				var array = string.split(",");
				startTime1 = array[0];
				endTime1 = array[1];
				startTime = $filter("date")(startTime1, "yyyy-MM-dd HH:mm:ss");
				endTime = $filter("date")(endTime1, "yyyy-MM-dd HH:mm:ss");

				var getData = "?startTime=" + startTime + "&" + "endTime=" + endTime + "&deviceId=" + deviceId;
				var url = "http://192.168.137.1:8080/DBCon/showRoutineServlet" + getData;
				$http.get(url).then(function success(response) {
					var string = response.data.replace("[", "").replace("]", "");
					var array = string.split(",");
					var array3 = [];
					for (var i = 0; i < array.length; i = i + 1) {
						var string2 = array[i].toString();
						var array2 = string2.replace(" Point:POINT(", "").replace("Point:POINT(", "").replace(")", "").split(" ");
						array3.push(array2);
						localStorage.setItem('coordinates', JSON.stringify(array3));
					}
				}, function error(response) {
					console.log("error");
				});

				var getData = "?routineId=" + routineId;
				var url = "http://192.168.137.1:8080/DBCon/showPointsServlet" + getData;
				$http.get(url).then(function success(response) {
					var string = response.data;
					var resultarray = string.split("&&");
					var arraypoint = resultarray[0].toString().replace("[", "").replace("]", "").split(",");
					var arraycontent = resultarray[1].toString().replace("[", "").replace("]", "").split(",");

					var arraypoint2 = []
					for (var i = 0; i < arraypoint.length; i = i + 1) {
						var pointString2 = arraypoint[i].toString();
						var elements = pointString2.replace(" Point:POINT(", "").replace("Point:POINT(", "").replace(")", "").split(" ");
						arraypoint2.push(elements);
					}

					var arraycontent2 = []
					for (var i = 0; i < arraycontent.length; i = i + 1) {
						var pointContentString2 = arraycontent[i].toString();
						var elements2 = pointContentString2.replace(" PointContent:", "").replace("PointContent:", "");
						arraycontent2.push(elements2);
					}

					var test = [];
					for (var j = 0; j < arraypoint2.length; j = j + 1) {
						test.push(JSON.parse('{"type":"Feature", "properties":{"description":"' + arraycontent2[j] + '"},"geometry":{"type":"Point", "coordinates":[' + arraypoint2[j] + ']}}'));
					}
					localStorage.setItem('pointsfeatures', JSON.stringify(test));
					$window.location.reload();
				}, function error(response) {
					console.log("error");
				});

			});
		};





		mapboxgl.accessToken = 'pk.eyJ1IjoibWlueWFuZnUiLCJhIjoiY2s3MHF6bGx1MDAwODNsdWc4NWpwOGk3ZiJ9.-JNfNcvmZrtGg7MWh0F4fw';
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-122.486052, 37.830348],
			zoom: 15
		});

		map.on('load', function () {
			var pointsfeatures = JSON.parse(localStorage.getItem('pointsfeatures'));
			console.log(pointsfeatures);


			map.addSource(
				'points', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': pointsfeatures
				}
			});

		map.loadImage(
			'../pictures/Marker.png',
		function(error, image) {
		if (error) throw error;
		map.addImage('orange', image);


			map.addLayer({
				'id': 'points',
				'type': 'symbol',
				'source': 'points',
				'layout': {
					'icon-image': 'orange',
					'icon-size':0.8,
					'icon-anchor':'bottom'
				}
			});

			map.on('click', 'points', function (e) {
				var coordinates = e.features[0].geometry.coordinates.slice();
				var description = e.features[0].properties.description;

				
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}

				new mapboxgl.Popup()
					.setLngLat(coordinates)
					.setHTML(description)
					.addTo(map);
			});

			map.on('mouseenter', 'points', function () {
				map.getCanvas().style.cursor = 'pointer';
			});

			map.on('mouseleave', 'points', function () {
				map.getCanvas().style.cursor = '';
			});//delete

			var read = JSON.parse(localStorage.getItem('coordinates'));
			console.log(read);
			console.log(read[0]);
			map.flyTo({
				center: read[0],
				essential: true // this animation is considered essential with respect to prefers-reduced-motion
			});
			map.addSource('route', {
				'type': 'geojson',
				'data': {
					'type': 'Feature',
					'properties': {},
					'geometry': {
						'type': 'LineString',
						'coordinates': read
					}
				}
			},
			);

			map.addLayer({
				'id': 'route',
				'type': 'line',
				'source': 'route',
				'layout': {
					'line-join': 'round',
					'line-cap': 'round'
				},
				'paint': {
					'line-color': '#888',
					'line-width': 2
				}
			}
			);

			$scope.add = function () {
				var read = JSON.parse(localStorage.getItem('coordinates'));
				var marker = new mapboxgl.Marker({
					draggable: true
				})
					.setLngLat(read[0])
					.addTo(map);

				function onDragEnd() {
					var lngLat = marker.getLngLat();
					Longitude = lngLat.lng;
					Latitude = lngLat.lat;
					localStorage.setItem("nowLongitude", Longitude);
					localStorage.setItem("nowLatitude", Latitude);
				}

				marker.on('dragend', onDragEnd);
			};

		}
		);

		});
	})
	.config(function ($mdThemingProvider) {
		$mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
		$mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
		$mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
		$mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
	});