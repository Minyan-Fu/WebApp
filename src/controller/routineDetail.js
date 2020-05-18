mapboxgl.accessToken = 'pk.eyJ1IjoibWlueWFuZnUiLCJhIjoiY2s3MHF6bGx1MDAwODNsdWc4NWpwOGk3ZiJ9.-JNfNcvmZrtGg7MWh0F4fw';
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-122.486052, 37.830348],
	zoom: 15
});

map.on('load', function () {
	map.addSource('route', {
		'type': 'geojson',
		'data': {
			'type': 'Feature',
			'properties': {},
			'geometry': {
				'type': 'LineString',
				'coordinates': [
					[-122.48369693756104, 37.83381888486939],
					[-122.48348236083984, 37.83317489144141],
					[-122.48339653015138, 37.83270036637107],
					[-122.48356819152832, 37.832056363179625],
					[-122.48404026031496, 37.83114119107971],
					[-122.48404026031496, 37.83049717427869],
					[-122.48348236083984, 37.829920943955045],
					[-122.48356819152832, 37.82954808664175],
					[-122.48507022857666, 37.82944639795659],
					[-122.48610019683838, 37.82880236636284],
					[-122.48695850372314, 37.82931081282506],
					[-122.48700141906738, 37.83080223556934],
					[-122.48751640319824, 37.83168351665737],
					[-122.48803138732912, 37.832158048267786],
					[-122.48888969421387, 37.83297152392784],
					[-122.48987674713133, 37.83263257682617],
					[-122.49043464660643, 37.832937629287755],
					[-122.49125003814696, 37.832429207817725],
					[-122.49163627624512, 37.832564787218985],
					[-122.49223709106445, 37.83337825839438],
					[-122.49378204345702, 37.83368330777276]
				]
			}
		}
	});
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
			'line-width': 8
		}
	});

	map.addSource('places', {
		'type': 'geojson',
		'data': {
			'type': 'FeatureCollection',
			'features': [
				{
					'type': 'Feature',
					'properties': {
						'description':
							'<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
						'icon': 'theatre'
					},
					'geometry': {
						'type': 'Point',
						'coordinates': [-122.48404026031496, 37.83114119107971]
					}
				},
			
														
				{
					'type': 'Feature',
					'properties': {
						'description':
							'<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
						'icon': 'music'
					},
					'geometry': {
						'type': 'Point',
						'coordinates': [-122.49043464660643, 37.832937629287755]
					}
				}
			]
		}
	});
	// Add a layer showing the places.
	map.addLayer({
		'id': 'places',
		'type': 'symbol',
		'source': 'places',
		'layout': {
			'icon-image': '{icon}-15',
			'icon-allow-overlap': true
		}
	});

	// When a click event occurs on a feature in the places layer, open a popup at the
	// location of the feature, with description HTML from its properties.
	map.on('click', 'places', function (e) {
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description = e.features[0].properties.description;

		// Ensure that if the map is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(description)
			.addTo(map);
	});

	// Change the cursor to a pointer when the mouse is over the places layer.
	map.on('mouseenter', 'places', function () {
		map.getCanvas().style.cursor = 'pointer';
	});

	// Change it back to a pointer when it leaves.
	map.on('mouseleave', 'places', function () {
		map.getCanvas().style.cursor = '';
	});
});