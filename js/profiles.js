import 'regenerator-runtime/runtime';
import axios from 'axios';
import { async } from 'regenerator-runtime';

const url = "http://localhost:3000/";

$(document).ready(function(){
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
});

$("#btnApagar").click(async function(){
    try {
        clear();
    } catch (errors) {
        console.error(errors);
    }
})

async function insert(){
    await axios.post(url + 'profiles', {
        nome: $("#nome").val(),
    }).then(function (response){
        alert("Registo Incluído com sucesso!")
    }).catch(function (error){
        console.log(error);
    });
}

async function clear() {
    $("#nome").val("");
    refreshtable();
}

async function loadTable(){
    axios.get(url + "profiles",{
    }).then(function(response){
        var table = new DataTable("#table_Profile",{
            data: response.data,
            columns: [
                {data: "id"},
                {data: "nome"},
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
                loadProfile(data.id);
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

async function loadProfile(id){
    await axios.get(url + 'profiles/' + id, {       
    }).then(function (response) {
        $("#id").val(response.data.id)
        $("#nome").val(response.data.nome);
    }).catch(function (error) {
        console.log(error);
    });
}

async function deleteRecord(id) {
    await axios.delete(url + 'profiles/' + id , {
    }).then(function (response) {
        alert("Registro Excluido com Sucesso");
        clear();
    }).catch(function (error) {
        console.log(error);
    });
}

async function update() {
    await axios.put(url + 'profiles' , {
        id:$("#id").val(),
        nome: $("#nome").val(),
    }).then(function (response) {
        alert("Registro Atualizado com Sucesso");
        refreshtable();
    }).catch(function (error) {
        console.log(error);
    });
}

