// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;

function initialize() {

  navigator.geolocation.getCurrentPosition(function(position) {
    var localAtual = {
      lat: position.coords.latitude, lng: position.coords.longitude
    };

    map = new google.maps.Map(document.getElementById('map'), {
      center: localAtual,
      zoom: 15
    });


    infowindow = new google.maps.InfoWindow();
    var request = {
      location: localAtual,
      radius: '500',
      query: 'pizzaria',
      key: AIzaSyCXNwUDnv1rcZ1OL8InO-Oj6jWJTP0uGOM,

      //key : AIzaSyDf76I70TGeWADf33Eq0FVpGv-t3WarZtU,

    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

    var marker=new google.maps.Marker({position:localAtual,map:map,title:"Você está Aqui!"});

  });
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function getLocation(){
  if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition,showError);
      //return;
  }
  x.innerHTML="Geolocalização não é suportada nesse browser.";
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  latlon = new google.maps.LatLng(lat, lon)
  mapholder = document.getElementById('map')
  mapholder.style.height = '250px';
  mapholder.style.width = '500px';

  var myOptions = {
    center: latlon, zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
  };
  var map = new google.maps.Map(document.getElementById("map"), myOptions);
  var marker = new google.maps.Marker({ position: latlon, map: map, title: "Você está Aqui!" });

}
