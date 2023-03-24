const mapsKey = "AIzaSyCdi64dltyurMzy_QJWr_kwBGOvZ1-ShK4"
// ESDN Primary Color
const esdn_color = "#9842f5";

// ECU General Information
const ecu_info = {
  name: "East Carolina University", 
  loc: { lat: 35.605124, lng:  -77.365271 },
}

const radius_ends = [
  //{lat: 35.60855615619757, lng: -77.4544474813303},
  //{lat: 35.668163669922414, lng: -77.36070306157437},
  //N 
  {lat: 35.68643944745839, lng: -77.35795948476202},
  //{lat: 35.62540094340262, lng: -77.27106859443909},
  //NW
  {lat: 35.63482160147676, lng: -77.4471634724791},
  //{lat: 35.63331262555025, lng: -77.44332525325625},
  //SW
  {lat: 35.53863844538339, lng: -77.42810816736338},
  //{lat: 35.54472424916784, lng: -77.32327496142294},
  //{lat: 35.545720762111294, lng:  -77.41129709612821}
]
// Implementation Status (0-3)
// 0. Planned
// 1. Planned (Switch to In-progress when color is identified)
// 2. Active
// 3. Archived
const states = [
  {
    text: "Planned",
    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    color: "#FED01A",
  },
  {
    text: "Planned",
    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    color: "#0096FD"
  },
  {
    text: "Active",
    icon: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
    color: esdn_color,
  },
  {
    text: "Archived",
    icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    color: "FD0000",
  }
]


// ESDN Map Location Dictionary
const esdn_map_full = {
    scitech: { 
      name: "East Carolina University - Science and Technology Bldg",
      loc:  { lat: 35.605124, lng:  -77.365271 },
      coverage_area: 8046.72,
      status: 2,
    },
    brody: {
      name: "East Carolina University - Brody School of Medicine",
      loc: { lat: 35.609626, lng:  -77.402157 },
      coverage_area: 8046.72,
      status: 2,
    },
    seagull: {
      name: "YMCA - Camp Seagull & Camp Seafarer",
      loc:  { lat: 34.994108, lng: -76.854844 },
      coverage_area: 8046.72,
      status: 2,
    },
    mattamuskeet: {
      name: "Lake Mattamuskeet",
      loc:  { lat: 35.451608, lng: -76.176196 },
      coverage_area: 8046.72,
      status: 1,
    },
    csi: {
      name: "East Carolina University - Costal Studies Institute",
      loc:  { lat: 35.873228, lng: -75.661204 },
      coverage_area: 23335.49,
      status: 2,
    },
    wrc: {
      name: "East Carolina University - West Research Campus",
      loc:  { lat: 35.632030, lng: -77.493024 },
      coverage_area: 8046.72,
      status: 1,
    },
    cope1: {
      name: "Greenville Water Treatment",
      loc:  { lat: 35.609643, lng: -77.305522 },
      coverage_area: 8046.72,
      status: 1,
    },
    cope2: {
      name: "Grimesland",
      loc:  { lat: 35.563930, lng: -77.180505 },
      coverage_area: 8046.72,
      status: 1,
    },
    cope3: {
      name: "Goose Creek State Park",
      loc:  { lat: 35.473107, lng: -76.907259 },
      coverage_area: 8046.72,
      status: 1,
    },
    cope4: {
      name: "Washington",
      loc:  { lat: 35.540211574992895, lng: -77.05438510962685},
      coverage_area: 8046.72,
      status: 2,
    },
    cope5: {
      name: "Bath",
      loc:  { lat: 35.428098, lng: -76.740445 },
      coverage_area: 8046.72,
      status: 1,
    },
    cope6: {
      name: "Swan Quarter",
      loc:  { lat: 35.405544, lng: -76.329505},
      coverage_area: 8046.72,
      status: 1,
    },

};

// ESDN Map Location Dictionary
const esdn_map = {
    scitech: { 
      name: "East Carolina University - Science and Technology Bldg",
      loc:  { lat: 35.605124, lng:  -77.365271 },
      coverage_area: 8046.72,
      status: 2,
    },
    mattamuskeet: {
      name: "Lake Mattamuskeet",
      loc:  { lat: 35.47417436374148, lng: -76.01706861720092},
      coverage_area: 8046.72,
      status: 2,
    },
};

function placeMarkerAndPanTo(latLng, map) {
  // Default InfoWindow for each Marker
  var info = new google.maps.InfoWindow({
    content: "Location:" + latLng,
    disableAutoPan: true,
  });
 
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });

  map.panTo(latLng);
  info.open(map, marker );
}


// Initialize and add the map
function initMap() {

  // Map Definition
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: esdn_map.scitech.loc,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    
  });

  // Default InfoWindow for each Marker
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  // Marker Array for Batch control
  var markers = [];

  // Marker creation for entire dictionary
  for (let point in esdn_map) {
    
    // Define Marker
    const marker = new google.maps.Marker({
        position: esdn_map[point].loc,
        icon: states[esdn_map[point].status].icon,
        map: map,
    });
    
    // Define Mouseover Event
    marker.addListener("mouseover", () =>{
      const content =  '<strong><u>' + esdn_map[point].name + '</strong></u>' + '<br>Status: '+ states[esdn_map[point].status].text + '<br>Latitude: ' + esdn_map[point].loc.lat + '<br>Longitude: ' + esdn_map[point].loc.lng ;
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
      window.setTimeout(function() {infoWindow.close(map, marker);},10000);
    });

    // Define Click Event
    marker.addListener('click',function() {
      var pos = map.getZoom();
      map.setZoom(12);
      map.setCenter(marker.getPosition());
      window.setTimeout(function() {map.setZoom(pos);},10000);
    });

    // Define Coverage Circle
    const coverage_circle5 = new google.maps.Circle({
        strokeColor: states[esdn_map[point].status].color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: states[esdn_map[point].status].color,
        fillOpacity: 0.05,
        map,
        center: esdn_map[point].loc,
        radius: esdn_map[point].coverage_area
    });

    // Define Coverage Circle
    const coverage_circle4 = new google.maps.Circle({
        strokeColor:  "#f59042",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#f59042",
        fillOpacity: 0.05,
        map,
        center: esdn_map[point].loc,
        radius: 6437.38
    });

    // Define Coverage Circle
    const coverage_circle3 = new google.maps.Circle({
        strokeColor: "#36ad0a",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#36ad0a",
        fillOpacity: 0.05,
        map,
        center: esdn_map[point].loc,
        radius: 4828.03
    });

    // Define Coverage Circle
    const coverage_circle2 = new google.maps.Circle({
        strokeColor: "#0aa0ad",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0aa0ad",
        fillOpacity: 0.05,
        map,
        center: esdn_map[point].loc,
        radius: 3218.69
    });

   // Define Coverage Circle
   const coverage_circle1 = new google.maps.Circle({
    strokeColor: "#0a0dad",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#0a0dad",
    fillOpacity: 0.05,
    map,
    center: esdn_map[point].loc,
    radius: 1609.34
});

   // Define Coverage Circle
   const coverage_circle = new google.maps.Circle({
    strokeColor: "#ad0a1d",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#ad0a1d",
    fillOpacity: 0.05,
    map,
    center: esdn_map[point].loc,
    radius: 804.672
});

    coverage_circle5.addListener("mouseover", () =>{
      const content =  '<strong><u>' + esdn_map[point].name + '</strong></u>' + '<br>Status: '+ states[esdn_map[point].status].text + '<br>Latitude: ' + esdn_map[point].loc.lat + '<br>Longitude: ' + esdn_map[point].loc.lng ;
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
      window.setTimeout(function() {infoWindow.close(map, marker);},10000);
    });

    // Define Click Event
    coverage_circle.addListener('click',function() {
      var pos = map.getZoom();
      map.setZoom(12);
      map.setCenter(marker.getPosition());
      window.setTimeout(function() {map.setZoom(pos);},10000);
    });

    // Add Marker to Markers array
    markers.push(marker);
  };
  
  for(let x = 0; x < radius_ends.length; x++){
    const radiusLine = new google.maps.Polyline({
        path:[esdn_map['scitech'].loc, radius_ends[x]],
        geodesic: true,
        strokeColor: "#000205",
        strokeOpacity: 0.75,
        strokeWeight: 2
    });

    radiusLine.setMap(map);
  }
  // Batch Marker manager
  new MarkerClusterer({markers,map})
}


// Display Map
window.initMap = initMap;