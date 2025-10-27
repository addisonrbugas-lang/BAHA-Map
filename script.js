mapboxgl.accessToken = 'pk.eyJ1IjoiYWRkaWVidWciLCJhIjoiY21oOXI2bjdmMTY3NjJrcHFwc3djem56bCJ9.wddhECgO0WakyNb6jKmc_w';

const map = new mapboxgl.Map({
  container: 'map', // this is the container ID that we set in the HTML
  style: 'mapbox://styles/addiebug/cmh9rfo8i00qg01r52xmw978p', // Your Style URL goes here
  center: [-122.27, 37.8], // starting position [lng, lat]. Note that lat must be set between -90 and 90. You can choose what you'd like.
  zoom: 9 // starting zoom, again you can choose the level you'd like.
    });