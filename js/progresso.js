import 'regenerator-runtime/runtime';
import axios from 'axios';
import { async } from 'regenerator-runtime';

const url = "http://localhost:3000/";

$(document).ready(function(){
    loadSelect();
    loadTable();
});

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
        await axios.post(url + 'progress', {
            nome: $("#selectU").val(""),
            nome: $("#historico").val(""),
        }).then(function (response){
            
        }).catch(function (error){
            console.log(error);
        });
    } catch (errors) {
        console.error(errors);
    }
})

async function insert(){
    await axios.post(url + 'progress', {
        user: $("#selectU option:selected").val(),
        historico: $("#historico").val(),
    }).then(function (response){
        alert("Registo Incluído com sucesso!")
    }).catch(function (error){
        console.log(error);
    });
}

async function clear(){
     $("#selectU").val(),
     $("#historico").val(""),
    refreshtable();
}

async function loadTable(){
    axios.get(url + 'progress', {
    }).then(function (response) {
        var table = new DataTable("#table_Progress", {
            data: response.data,
            columns: [
                {data: "id"},
                {data: "historico"},
                {data: "user.nome"},
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
                loadProgress(data.id);
            }
            else{
                deleteRecord(data.id);
            }
        })
    }).catch(function(error){
        alert(error);
    })
}

async function loadSelect(){
    axios.get(url + 'users',{
    }).then(function (response){
        $('#selectU option').remove();
        $.each(response.data, function (key,item){
            $('#selectU').append(
                $("<option></option>")
                    .attr("value", item.id)
                    .text(item.nome)
            );
        });
    }).catch(function (error){
        alert(error);
    });
}

async function refreshtable(){
    window.location.reload(true);
}

async function loadProgress(id){
    await axios.get(url + 'progress/' + id, {       
    }).then(function (response) {
     $("#id").val( response.data.id)
     $("#selectU").val(response.data.nome)
     $("#historico").val(response.data.historico)
    }).catch(function (error) {
        console.log(error);
    });
}


async function deleteRecord(id){
    await axios.delete(url + 'progress/' + id , {
    }).then(function (response) {
        alert("Registro excluido com sucesso!");
        clear();
    }).catch(function (error) {
        console.log(error);
    });
}

async function update(){
    await axios.put(url + 'progress', {
        id:$("#id").val(),
        user: $("#selectU option:selected").val(),
        historico: $("#historico").val(),
    }).then(function (response){
        alert("Registro atualizado com sucesso!");
        refreshtable();
    }).catch(function(error){
        console.log(error);
    });
}




