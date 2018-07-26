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
    var bt_qtd = $(".qtdinput");
    // qt_mais = input text quantidade (caso qtd > 3)
    var qt_mais = $("#qtdMais");
    qt_mais.hide();
    // modPizza = campo modelo de pizza (porcentagem)
    var modPizza = $("#modelos");
    modPizza.hide();

    var PorcMod = $("#PorcMod");
    PorcMod.hide();

    var listaPorcMod = $("#listaPorcMod");

    var bt_step_1_2 = $("#step_1_2")
    bt_step_1_2.hide();

    var txt_porc = $("#piz_mod_txt");

    var cad_cli = $("#cad_cli");
    cad_cli.hide();

    function exibirPorc(n){
        //console.log(PorcMod);
        listaPorcMod.hide();
        listaPorcMod.empty();
        for (var i= 0;i<n;i++){
            // var clone_txt = txt_porc.clone();
            // clone_txt.html("Pizza " + n);
            // clone_txt.show();
            // listaPorcMod.append(clone_txt);
            txt_porc.html("Pizza" + n);
            listaPorcMod.append(txt_porc);
            var clone_porc = PorcMod.clone();
            console.log(clone_porc);
            //console.log(clone_porc[name="piz_mod_txt"]);
            //clone_porc[name="piz_mod_txt"].html("Pizza " + n)
            clone_porc.show();
            listaPorcMod.append(clone_porc);
        }
        //console.log(listaPorcMod);
        listaPorcMod.show();
    }

    bt_qtd.click(function(){
        bt_step_1_2.show();
        var aux = $(this).val();
        console.log(aux);
        if (aux == 'Mais'){
            qt_mais.show();
        }
        else{
            qt_mais.hide();
        }

    })

    bt_step_1_2.click(function(){
        modPizza.show();
        cad_cli.show();
        var aux2 = $('input[name=qtd]:checked').val();
        console.log(aux2);
        if (aux2 == 'Mais'){
            aux2 = $("#qtdMais").val();
            console.log(aux2);
        }
        qtd_pizzas = parseInt(aux2);
        console.log(qtd_pizzas);
        exibirPorc(qtd_pizzas);
        var pedido = new PedidoObj(qtd_pizzas);
        console.log(pedido);
    })



})
