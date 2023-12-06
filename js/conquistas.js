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
    await axios.post(url + 'achievements', {
        user: $("#selectU option:selected").val(),
        conquista: $("#conquista").val(),
    }).then(function (response){
        alert("Registo Incluído com sucesso!")
    }).catch(function (error){
        console.log(error);
    });
}

async function clear(){
    $("selectU").val(""),
    $("conquista").val(""),
    refreshtable();
}

async function loadTable(){
    axios.get(url + 'achievements', {
    }).then(function (response){
        var table = new DataTable("#table_Achievements", {
            data: response.data,
            columns: [
                {data:"id"},
                {data:"user.nome"},
                {data:"conquista"},
                {
                    data: null,
                    defaultContent: '<button id="edit">✏</button><button id="delete">🗑</button>',
                    targets: -1
                },
            ]
        });
        table.on("click", 'button', function(e){
            var data = table.row($(this).parents('tr')).data();
            alert(data.id);
            if(this.id==='edit'){
                loadAchievements(data.id);
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

async function loadAchievements(id){
    await axios.get(url + 'achievements/' + id, {
    }).then(function(response){
        $("#id").val(response.data.id)
        $("#selectU").val(response.user.nome)
        $("#conquista").val(response.data.conquista)
    }).catch(function (error) {
        console.log(error);
    });
}

async function deleteRecord(id){
    await axios.delete(url + 'achievements/' + id, {
    }).then(function (response){
        alert("Registro excluido com sucesso!");
        clear();
    }).catch(function (error){
        console.log(error);
    });
}

async function update(){
    await axios.put(url + 'achievements', {
        id:$("#id").val(),
        user: $("#selectU option:selected").val(),
        conquista: $("#conquista").val(),
    }).then(function (response){
        alert("Registro atualizado com sucesso!");
        refreshtable();
    }).catch(function(error){
        console.log(error);
    })
}