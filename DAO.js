var pedidos = [];
var qtd_pizzas;

function PedidoObj(qtd){
    this.n_pizzas = qtd;
}

function SetModelo(){
    obj.modelo = []

    // inf = [50%, 25%, (50%|25%), 33%]
    obj.modelo.push(inf);
}


$(document).ready(function(){
    // btn = radio input quantidade
    var btn = $(".qtdinput");
    // qt_mais = input text quantidade (caso qtd > 3)
    var qt_mais = $("#qtdMais");
    qt_mais.hide();
    // modPizza = campo modelo de pizza (porcentagem)
    var modPizza = $("#modelos");
    modPizza.hide();

    var PorcMod = $("#PorcMod");
    PorcMod.hide();

    var listaPorcMod = $("#listaPorcMod");

    var bt_qtd_mais = $("#bt_qtd")
    bt_qtd_mais.hide();

    //var txt_porc = $("#piz_mod_txt");

    function exibirPorc(n){
        //console.log(PorcMod);
        listaPorcMod.hide();
        listaPorcMod.empty();
        for (var i= 0;i<n;i++){
            // var clone_txt = txt_porc.clone();
            // clone_txt.html("Pizza " + n);
            // clone_txt.show();
            // listaPorcMod.append(clone_txt);
            var clone_porc = PorcMod.clone();
            console.log(clone_porc);
            console.log(clone_porc[name="piz_mod_txt"]);
            //clone_porc[name="piz_mod_txt"].html("Pizza " + n)
            clone_porc.show();
            listaPorcMod.append(clone_porc);
        }
        //console.log(listaPorcMod);
        listaPorcMod.show();
    }

    btn.click(function(){
        modPizza.show();
        var valorclick = $(this).val();
        //console.log(valorclick);
        if (valorclick == 'Mais'){
            qt_mais.show();
            bt_qtd_mais.show();
            //console.log(qt_mais);
            //console.log(bt_qtd_mais);
            bt_qtd_mais.click(function(){
                var aux = $("#qtdMais").val();
                valorclick = parseInt(aux);
                //console.log(valorclick);
                exibirPorc(valorclick);
            })
        }
        else{
            valorclick = parseInt(valorclick);
            exibirPorc(valorclick);
        }
        var pedido = new PedidoObj(valorclick);
        console.log(pedido);
    })

})
