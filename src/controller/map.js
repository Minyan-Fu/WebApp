mapboxgl.accessToken = 'pk.eyJ1IjoibWlueWFuZnUiLCJhIjoiY2s3MHF6bGx1MDAwODNsdWc4NWpwOGk3ZiJ9.-JNfNcvmZrtGg7MWh0F4fw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-122.486052, 37.830348],
zoom: 15
});
 
var radius = 0.01;
 
function pointOnCircle(angle) {
return {
'type': 'Point',
'coordinates': [Math.cos(angle) * radius-122.486052, Math.sin(angle) * radius+37.830348]
};
}
 
map.on('load', function() {
// Add a source and layer displaying a point which will be animated in a circle.
map.addSource('point', {
'type': 'geojson',
'data': pointOnCircle(0)
});
 
map.addLayer({
'id': 'point',
'source': 'point',
'type': 'circle',
'paint': {
'circle-radius': 5,
'circle-color': '#007cbf'
}
});
 
function animateMarker(timestamp) {
// Update the data to a new position based on the animation timestamp. The
// divisor in the expression `timestamp / 1000` controls the animation speed.
map.getSource('point').setData(pointOnCircle(timestamp / 1000));
 
// Request the next frame of the animation.
requestAnimationFrame(animateMarker);
}
 
// Start the animation.
animateMarker(0);
});