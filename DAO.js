var pedidos = [];
var qtd_pizzas;
var pedido = {};

function SetModelo(){
    obj.modelo = []

    // inf = [50%, 25%, (50%|25%), 33%]
    obj.modelo.push(inf);
}

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

    // bt_step_3_4 = Botao para salvar os dados da etapa 3 (cadastro)
    var bt_step_3_4 = $("#step_3_4")
    bt_step_3_4.hide();

    // modPizza = campo modelo de pizza (porcentagem)
    var modPizza = $("#modelos");
    modPizza.hide();

    var PorcMod = $("#PorcMod");
    PorcMod.hide();

    var select_sab = $(".sabores");
    select_sab.hide();

    var listaPorcMod = $("#listaPorcMod");

    var listasabores = $(".listasabores");

    var cad_cli = $("#cad_cli");
    cad_cli.hide();

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

            qtd_sabor.click(function(){
                var valorclick2 = $(this).val();
                valorclick2 = parseInt(valorclick2);
                var conteudoPorcMod = $(this).closest(".conteudoPorcMod");
                var listasabores = conteudoPorcMod.find(".listasabores");
                listasabores.empty();

                for (var j=0;j<valorclick2;j++){
                    var clone2 = select_sab.clone();
                    clone2.show();
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
        console.log(pedido);
        exibirPorc(qtd_pizzas);
    })

    bt_step_2_3.click(function(){
        cad_cli.show();
        bt_step_3_4.show();
    })

    bt_step_3_4.click(function(){
        pedido.nome_cli = $("#nome_cli").val();
        pedido.tel_cli = $("#tel_cli").val();
        pedidos.push(pedido);
        var printapedido = $("#popupPedido");
        printapedido.html("<p> Pedido feito com sucesso:<br/>Numero de Pizzas: " + pedido.n_pizzas + "<br/>Nome do cliente: " + pedido.nome_cli + "<br/>Telefone contato: " + pedido.tel_cli + "<br/> </p>")

        console.log(pedidos);
    })

})
