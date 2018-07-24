
function setQtd() {
    var buttons_qtd = document.getElementsByName("qtd");
    var qtd = buttons_qtd.target.value;
    if (qtd == 'Mais'){
        var qtd_mais = document.getElementsByName("qtdMais");
        qtd_mais.addEventListener("input", function(){
            qtd = qtd_mais.value;
        })
    }
    var p = document.createElement("p");
    var res = document.createTextNode(qtd.toString());
    p.appendChild(res);
    return Number(res);
}

function PedidoObj(qtd){
    this.n_pizzas = qtd;
}

function SetModelo(obj, inf){
    // inf = [50%, 25%, (50%|25%), 33%]
    obj.modelo = inf;
}

var pedidos = [];
var qtd_pizzas = setQtd();
// var buttons_qtd_mais = document.getElementsByName("qtdMais");

var pedido = new PedidoObj(qtd_pizzas); // 2 = qtd
var i;

for (i=1; i<=pedido.n_pizzas; i++){

}
