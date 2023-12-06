import 'regenerator-runtime/runtime';
import axios from 'axios';

const url = "http://localhost:3000/";

$(document).ready(function(){
    loadTable();
})

$("#btnSalvar").click(async function(){
    try {
        if($("#id").val()==""){
            await insert();
        }
        else{
            await update();
        }
        clear();
    } catch (errors) {
        console.error(errors);
    }
})

$("#btnApagar").click(async function(){
    try {
        clear();
    } catch (errors) {
        console.error(errors);
    }
})

async function insert(){
    await axios.post(url + 'feed', {
        artigoDeBemEstar: $("#artigoBem").val(),
        artigoDeProdutividade: $("#artigoProd").val(),
        conquistaUsuario: $("#conquistaUsuario").val(),
        conquistaAmigos: $("#conquistaAmigo").val(),
    }).then(function (response){
        alert("Registro imcluído com sucesso!")
    }).catch(function (error){
        console.log(error);
    });
}

async function clear(){
     $("#artigoBem").val(""),
     $("#artigoProd").val(""),
     $("#conquistaUsuario").val(""),
     $("#conquistaAmigo").val(""),
    refreshtable();
}

function loadTable(){
    axios.get(url + 'feed', {
    }).then(function (response){
        var table = new DataTable("#table_Feed", {
            data: response.data,
            columns: [
                {data: "id"},
                {data: "artigoDeProdutividade"},
                {data: "artigoDeBemEstar"},
                {data: "conquistaAmigos"},
                {data: "conquistaUsuario"},
                {
                    data: null,
                    defaultContent: '<button id="edit">✏</button><button id="delete">🗑</button>',
                    targets: -1
                },
            ]
        });
        table.on("click", 'button', function (e){
            var data = table.row($(this).parents('tr')).data();
            alert(data.id);
            if(this.id==='edit'){
                loadFeed(data.id);
            }
            else{
                deleteRecord(data.id);
            }
        })
    }).catch(function(error){
        alert(error);
    })
}

async function refreshtable(){
    window.location.reload(true);
}

async function loadFeed(id){
    await axios.get(url + 'feed/' + id, {       
    }).then(function (response) {
     $("#id").val(response.data.id)
     $("#artigoBem").val(response.data.artigoDeBemEstar)
     $("#artigoProd").val(response.data.artigoDeProdutividade)
     $("#conquistaUsuario").val(response.data.conquistaUsuario)
     $("#conquistaAmigo").val(response.data.conquistaAmigos)
    }).catch(function (error) {
        console.log(error);
    });
}

async function deleteRecord(id){
    await axios.delete(url + 'feed/' + id , {
    }).then(function (response) {
        alert("Registro excluido com sucesso!");
        clear();
    }).catch(function (error) {
        console.log(error);
    });
}

async function update(){
    await axios.put(url + 'feed', {
        id:$("#id").val(),
        artigoDeBemEstar: $("#artigoBem").val(),
        artigoDeProdutividade: $("#artigoProd").val(),
        conquistaUsuario: $("#conquistaUsuario").val(),
        conquistaAmigos: $("#conquistaAmigo").val(),
    }).then(function (response){
        alert("Registro atualizado com sucesso!");
        refreshtable();
    }).catch(function(error){
        console.log(error);
    });
}