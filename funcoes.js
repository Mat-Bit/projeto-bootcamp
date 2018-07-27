
var pedidos = [];
var qtd_pizzas;
var pedido = {pizzas: []};
var pizzas_qtd_sabor = [];
var pizza = [];
var sabores = [];

var map;
var infowindow;
var localAtual;

var testeJon;
var geocoder;


$(document).ready(function(){
    // btn = radio input quantidade
    var btQtd = $(".qtdinput");

    // qt_mais = input text quantidade (caso qtd > 3)
    var qt_mais = $("#qtdMais");
    qt_mais.hide();

    // bt_step_1_2 = Botao para salvar os dados da etapa 1 (qtd_pizzas) e iniciar o passo 2 (modelo e sabor de cada pizza)
    var bt_step_1_2 = $("#step_1_2")
    bt_step_1_2.hide();

    // bt_step_2_3 = Botao para salvar os dados da etapa 2 (modelo e sabor de cada pizza) e iniciar o passo 3 (cadastro cliente)
    var bt_step_2_3 = $("#step_2_3")
    bt_step_2_3.hide();

    // bt_step_3_4 = Botao para salvar os dados da etapa 3 (cadastro) e vai pra forma de pagamento
    var bt_step_3_4 = $("#step_3_4")
    bt_step_3_4.hide();

    // bt_step_4_m = Botao para salvar as informações e gerar o mapa
    var bt_step_4_m = $("#step_4_m")
    bt_step_4_m.hide();

    var bt_gerar_mapa = $("#gera_mapa");
    bt_gerar_mapa.hide();

    var confirmar = $("#confirmar");
    confirmar.hide();

    // modPizza = campo modelo de pizza (porcentagem)
    var modPizza = $("#modelos");
    modPizza.hide();

    var PorcMod = $("#PorcMod");
    PorcMod.hide();

    var select_sab = $(".sabores");
    select_sab.hide();

    var listaPorcMod = $("#listaPorcMod");

    var listasabores = $(".listasabores");

    // cad_cli = campo cadastro cliente
    var cad_cli = $("#cad_cli");
    cad_cli.hide();

    var campo_pag = $("#tela_pagam");
    campo_pag.hide();

    function exibirPorc(n){
        //console.log(PorcMod);
        listaPorcMod.hide();
        listaPorcMod.empty();
        for (var i=0; i<n; i++){
            var clone = PorcMod.clone();
            clone.show();
            listaPorcMod.append(clone);
            var qtd_sabor = clone.find(".qntsabor");
            qtd_sabor.attr("name","mod_"+i);
            qtdSabor = qtd_sabor;
            qtd_sabor.click(function(){
                var valorclick2 = $(this).val();
                valorclick2 = parseInt(valorclick2);
                pizzas_qtd_sabor.push(valorclick2);
                var conteudoPorcMod = $(this).closest(".conteudoPorcMod");
                var listasabores = conteudoPorcMod.find(".listasabores");
                listasabores.empty();

                for (var j=0;j<valorclick2;j++){
                    var clone2 = select_sab.clone();
                    clone2.show();
                    sabores.push(clone2.val());

                    listasabores.append(clone2);
                }
            })
        }
        console.log(listaPorcMod);
        console.log(listasabores);
        listaPorcMod.show();
    }

    btQtd.click(function(){
        bt_step_1_2.show();
        var aux = $(this).val();
        if (aux == 'Mais'){
            qt_mais.show();
        }
        else{
            qt_mais.hide();
        }
    })

    bt_step_1_2.click(function(){
        modPizza.show();
        bt_step_2_3.show();

        var aux = $('input[name=qtd]:checked').val();
        if (aux == 'Mais'){
            aux = $("#qtdMais").val();
        }
        qtd_pizzas = parseInt(aux);
        pedido.n_pizzas = qtd_pizzas;
        exibirPorc(qtd_pizzas);
    })

    bt_step_2_3.click(function(){
        var valid = true;
        listaPorcMod.find(".listasabores .sabores").each(function(){
            var select = $(this);
            if (select.find("option:selected").val() == ""){
                valid = false;
            }
        })
        if (valid == true){
            var i = 0;
            var j = 0;
            sabores = [];
            listaPorcMod.find(".listasabores .sabores").each(function(){
                if (j == pizzas_qtd_sabor[i]){
                    j = 0;
                    i++;
                    pizza.push(sabores);
                    sabores = [];
                }
                var select = $(this);
                sabores.push(select.find("option:selected").val());
                j++;
            })
            pizza.push(sabores);
            // console.log(pizza);
            cad_cli.show();
            bt_step_3_4.show();
        }
        for (var i = 0; i < pizzas_qtd_sabor.length; i++) {
            pizzas_qtd_sabor[i]
            var str_piz = "Pizza " + (i+1) + ": ";
            for (var j = 0; j < pizzas_qtd_sabor[i]; j++) {
                str_piz += pizza[i][j];
                if (j+1 < pizzas_qtd_sabor[i]){
                    str_piz += ", ";
                }
            }
            str_piz += ".";
            pedido.pizzas.push(str_piz);
        }
    })

    bt_step_3_4.click(function(){
        campo_pag.show();
        bt_step_4_m.show();

        pedido.nome_cli = $("#nome_cli").val();
        pedido.tel_cli = $("#tel_cli").val();
    })

    bt_step_4_m.click(function(){
        bt_gerar_mapa.show();

        var aux = $(".pagamento:checked").val();
        if (aux == 1) pedido.forma_pgto = "Crédito";
        if (aux == 2) pedido.forma_pgto = "Débito";
        if (aux == 3) pedido.forma_pgto = "Dinheiro";
    })

    bt_gerar_mapa.click(function(){
        initializeMap();
        confirmar.show();
    })

    confirmar.click(function(){
        var printapedido = $("#popupPedido");
        var pizzas_html = "";

        for (var i = 0; i < pedido.n_pizzas; i++) {
            pizzas_html += pedido.pizzas[i] + "<br/>";
        }

        printapedido.html("<h3><p> <b> Pedido feito com sucesso!<br/>Numero de Pizzas: " +
        pedido.n_pizzas + "<br/>" + pizzas_html + "Nome do cliente: " + pedido.nome_cli + "<br/>Telefone contato: " +
        pedido.tel_cli + "<br/>Forma de pagamento: " + pedido.forma_pgto + "<br/>Nome da pizzaria: " +
        pedido.nomePizzaria + "<br/>Telefone pizzaria: " + pedido.tel_piz + " </b> </p></h3>");
})

})

function popUpAviso(){
    varPopUp = window.open ('popup.html', 'popup', "width=380 height=210, top=100, left=110, scrollbars=no ");
}

function initializeMap() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var localAtual = {
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
            radius: '1000',
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
        if( String(place.formatted_phone_number) == 'undefined'){
            if(place.name.indexOf("Pizzaria") != -1) {
                pedido.tel_piz = "554799403016";
            }
            else{
                pedido.tel_piz = "554797455379";
            }
        }
        console.log("TESTE: " + pedido.tel_piz);
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Número Telefone: ' + place.formatted_phone_number + '<br>' +
        place.formatted_address + '</div>');
        pedido.nomePizzaria = new String(place.name);
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
                pedido.end_cli = new String(results[0].formatted_address);
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
    var pizzas_url = "";
    for (var i = 0; i < pedido.n_pizzas; i++) {
        pizzas_url += pedido.pizzas[i] + " ";
    }
    var stringMsg = "https://wa.me/"+ pedido.tel_piz + "?text=*QUERO PIZZA!* Pedido para: " + pedido.nomePizzaria + "; Quantidade: " + pedido.n_pizzas + "; " + pizzas_url + " Nome cliente: " + pedido.nome_cli + "; Telefone contato: " + pedido.tel_cli + "; Forma de pagamento: " + pedido.forma_pgto + "; Endereço Cliente: " + pedido.end_cli;
    console.log(stringMsg);

    pedidos.push(pedido);

    return stringMsg;
}
