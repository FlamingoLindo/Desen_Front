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
        clear();
    } catch (errors) {
        console.error(errors);
    }
})

async function insert(){
    await axios.post(url + 'task', {
        user: $("#selectU option:selected").val(),
        nomeTarefa: $("#nomeTarefa").val(),
        descricaoTarefa: $("#descricaoTarefa").val(),
        iconeTarefa: $("#iconeTarefa").val(),
        corTarefa: $("#corTarefa").val(),
        reptirTarefa: $("#reptirTarefa").prop('checked'),
        frequenciaTarefa: $("#frequenciaTarefa").val(),
        dataEncerramento: $("#dataEncerramento").val(),
        lembrete: $("#lembreteTarefa").val(),
    }).then(function (response){
        alert("Registo Incluído com sucesso!")
    }).catch(function (error){
        console.log(error);
    });
}

async function clear() {
     $("#selectU").val();
     $("#nomeTarefa").val("");
     $("#descricaoTarefa").val("");
     $("#iconeTarefa").val("");
     $("#corTarefa").val("");
     $("#reptirTarefa").prop('checked', false);
     $("#frequenciaTarefa").val("");
     $("#dataEncerramento").val("");
     $("#lembreteTarefa").val("");
    refreshtable();
}

async function loadTable(){
    axios.get(url + 'task', {
    }).then(function (response) {
        var table = new DataTable("#table_Task", {
            data: response.data,
            columns: [
                { data: "id" },
                { data: "nomeTarefa" },
                { data: "descricaoTarefa" },
                { data: "iconeTarefa" },
                { data: "corTarefa" },
                { data: "reptirTarefa" },
                { data: "frequenciaTarefa" },
                { data: "dataEncerramento" },
                { data: "lembrete" },
                { data: "user.nome" },
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
            console.log("Botão de editar FOI!!!!!")
            if(this.id==='edit'){
                loadTask(data.id);
            }
            else{
                deleteRecord(data.id);
            }
        })
    }).catch(function(error){
        alert(error);
    })
}

async function  loadSelect(){
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

async function loadTask(id){
    await axios.get(url + 'task/' + id, {       
    }).then(function (response) {
     $("#id").val(response.data.id)
     $("#selectU").val(response.users.id)
     $("#nomeTarefa").val(response.data.nomeTarefa)
     $("#descricaoTarefa").val(response.data.descricaoTarefa)
     $("#iconeTarefa").val(response.data.iconeTarefa)
     $("#corTarefa").val(response.data.corTarefa)
     if(response.data.reptirTarefa){
        reptirTarefa = $("#reptirTarefa").prop('checked:true')
     }
     $("#frequenciaTarefa").val(response.data.frequenciaTarefa)
     $("#dataEncerramento").val(response.data.dataEncerramento)
     $("#lembreteTarefa").val(response.data.lembrete)
    }).catch(function (error) {
        console.log(error);
    });
}

async function deleteRecord(id){
    await axios.delete(url + 'task/' + id , {
    }).then(function (response) {
        alert("Registro excluido com sucesso!");
        clear();
    }).catch(function (error) {
        console.log(error);
    });
}

async function update() {
    await axios.put(url + 'task', {
        id:$("#id").val(),
        user: $("#selectU option:selected").val(),
        nomeTarefa: $("#nomeTarefa").val(),
        descricaoTarefa: $("#descricaoTarefa").val(),
        iconeTarefa: $("#iconeTarefa").val(),
        corTarefa: $("#corTarefa").val(),
        reptirTarefa: $("#reptirTarefa").prop('checked'),
        frequenciaTarefa: $("#frequenciaTarefa").val(),
        dataEncerramento: $("#dataEncerramento").val(),
        lembrete: $("#lembreteTarefa").val(),
    }).then(function (response){
        alert("Registro atualizado com sucesso!");
        refreshtable();
    }).catch(function(error){
        console.log(error);
    });
}