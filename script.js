mapboxgl.accessToken = 'pk.eyJ1IjoiYWRkaWVidWciLCJhIjoiY21oOXI2bjdmMTY3NjJrcHFwc3djem56bCJ9.wddhECgO0WakyNb6jKmc_w';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/addiebug/cmh9rfo8i00qg01r52xmw978p',
    center: [-122.259, 37.8719], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 14 // starting zoom
});

// Create a new ScaleControl instance
const scale = new mapboxgl.ScaleControl({
    maxWidth: 80, // Optional: set the maximum width of the scale bar
    unit: 'metric' // Optional: set the unit ('metric', 'imperial', or 'nautical')
});

map.on('load', function () {
    map.addControl(scale, 'top-right');
     map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        }),
        'top-right' // Position it next to the scale bar
    );
    map.addSource('points-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/addisonrbugas-lang/BAHA-Map/refs/heads/main/data/183data.geojson'
    });

    map.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'points-data',
        paint: {
            'circle-color': 'black',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });

    // Add click event for popups
    map.on('click', 'points-layer', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        // Create popup content using the actual data properties
        const popupContent = `
            <div>
                <h3>${properties.Landmark}</h3>
                <p><strong>Address:</strong> ${properties.Address}</p>
                <p><strong>Architect & Date:</strong> ${properties.Architect_Date}</p>
                <p><strong>Designated:</strong> ${properties.Designated}</p>
                ${properties.Link ? `<p><a href="${properties.Link}" target="_blank">More Information</a></p>` : ''}
                ${properties.Notes ? `<p><strong>Notes:</strong> ${properties.Notes}</p>` : ''}
            </div>
        `;
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });

    // Change cursor to pointer when hovering over points
    map.on('mouseenter', 'points-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change cursor back when leaving points
    map.on('mouseleave', 'points-layer', () => {
        map.getCanvas().style.cursor = 'grab';
    });

});
