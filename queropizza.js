// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

/*pizza = {
  qtdSabor = [],
  sabores  = ["frango", "queijo", "calabresa", "portuguesa", "bacon"]
};*/

pizzaria = {
  nomePizzaria : "",
  nomeCliente  : "",
  telefone     : "",
  endereco     : "",
  //qtdPizza     : [],
  //pizza        : [pizza]
};

var map;
var infowindow;
var endereco;
var testeJon;
var localAtual;
var geocoder;

var pizzas = [{sabores:"Frango"},{sabores:"Queijo"},{sabores:"Calabresa"}];


function initialize() {
  
  navigator.geolocation.getCurrentPosition(function(position) {
    localAtual = { 
      lat: position.coords.latitude, lng: position.coords.longitude 
    };

    map = new google.maps.Map(document.getElementById('map'), {
      center: localAtual,
      zoom: 15
    });

    geocoder = new google.maps.Geocoder;
    infowindow = new google.maps.InfoWindow();
    var request = {
      location: localAtual,
      radius: '500',
      query: 'pizzaria'
    };

    service = new google.maps.places.PlacesService(map);
    / * Mostrar as pizzarias de acordo com a localização atual * /
    service.textSearch(request, callback);

    / * Chamar endereço da localização atual * /
    geocodeLatLng(geocoder, map, infowindow, localAtual);
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
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function () {
    if(String(place.formatted_phone_number)     == 'undefined'){
      if(place.name.indexOf("Pizzaria") != -1) {
        pizzaria.telefone = "554799403016";
      }
      else{
        pizzaria.telefone = "554797455379";
      }
      console.log("TESTE: " + pizzaria.telefone);
    }
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
    'Número Telefone: ' + place.formatted_phone_number + '<br>' +
    place.formatted_address + '</div>');
    pizzaria.nomePizzaria = new String(place.name);
    infowindow.open(map, this);
  });
}

function getLocation(){
  if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition,showError);
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
}

function geocodeLatLng(geocoder, map, infowindow, localAtual) {
  var latlng = localAtual;
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title:"Você está Aqui!"
        });
        pizzaria.endereco = new String(results[0].formatted_address);
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

function exibirTexto(){

  pizzaria.nomeCliente = "Jonathan Cruz";

  console.log(pizzaria.nomePizzaria);

  var queroPizza = "_____________________________________________QUERO PIZZA_________________________________________________ ";
  var nomePizzaria = pizzaria.nomePizzaria + "________________________________________________________________________________________________";
  var nomeCliente = pizzaria.nomeCliente + "___________________________________________________________________________________________________________";
  var quantidade = "Quantidade de Pizzas: " + pizzaria.quantidade + "___________________________________________________________________________________________________________";
  //var sabores    = " Sabores: " + pizzaria.sabor + "___________________________________________________________________________________________________________";
  //var tipoPizza  = " Pizza 1 _____________________________________________________________________________________________________________";
  console.log(endereco);
  //var endereco = ender;
  var string = "https://wa.me/"+ pizzaria.telefone + "?text=HAHAHA%0ADeu%20certo" + queroPizza + nomePizzaria + nomeCliente + quantidade + /*+ sabores +*/ pizzaria.endereco;
  console.log(string);
  return string;
}

function testeFinal(teste){
  console.log("Conseguiiiiiiii: " + teste);
  pizzaria.quantidade = teste;
}