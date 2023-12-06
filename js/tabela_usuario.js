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
});

$("#btnApagar").click(async function(){
    try {
        clear();
    } catch (errors) {
        console.error(errors);
    }
})

async function insert() {
    await axios.post(url + 'users', {
        nome: $("#nome").val(),
        sobrenome: $("#sobrenome").val(),
        email: $("#email").val(),
        admin: $("#admin").val(),
        senha: $("#senha").val(),
        dataNascimento: $("#dataNascimento").val(),
        profile: $("#selectP option:selected").val()
    }).then(function (response){
        alert("Registo Incluído com sucesso!");
    }).catch(function (error){
        console.log(error);
    });
}

async function clear() {
        $("#nome").val(""),
        $("#sobrenome").val(""),
        $("#email").val(""),
        $("#admin").prop('checked',false),
        $("#senha").val(""),
        $("#dataNascimento").val(""),
        $("#selectP").val("")
        refreshtable()
}

async function loadTable(){
    axios.get(url + "users",{
    }).then(function(response ){
        var table = new DataTable("#table_User",{
            data: response.data,
            columns: [
                {data: "id"},
                {data: "nome"},
                {data: "sobrenome"},
                {data: "email"},
                {data: "senha"},
                {data: "dataNascimento"},
                {data: "profile.nome"},
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
                loadUser(data.id);
            }
            else{
                deleteRecord(data.id);
            }
        })
    }).catch(function (error){
        alert(error);
    })
}

async function  loadSelect(){
    axios.get(url + 'profiles',{
    }).then(function (response){
        $('#selectP option').remove();
        $.each(response.data, function (key,item){
            $('#selectP').append(
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

async function loadUser(id){
    await axios.get(url + 'users/' + id, {       
    }).then(function (response) {
        $("#id").val(response.data.id)
        $("#nome").val(response.data.nome)
        $("#sobrenome").val(response.data.sobrenome)
        $("#email").val(response.data.email)
        if(response.data.admin){
            admin= $("#admin").prop('checked:true')
        }
        $("#dataNascimento").val(response.data.dataNascimento)
        $("#selectP").val(response.profile.id)
    }).catch(function (error) {
        console.log(error);
    });
}

async function deleteRecord(id) {
    await axios.delete(url + 'users/' + id , {
    }).then(function (response) {
        alert("Registro Excluido com Sucesso");
        clear();
    }).catch(function (error) {
        console.log(error);
    });
}

async function update() {
    await axios.put(url + 'users' , {
        id:$("#id").val(),
        nome: $("#nome").val(),
        sobrenome: $("#sobrenome").val(),
        email: $("#email").val(),
        admin: $("#admin").prop('checked'),
        senha: $("#senha").val(),
        dataNascimento: $("#dataNascimento").val(),
        profile: $("#selectP option:selected").val()
    }).then(function (response) {
        alert("Registro atualizado com sucesso!");
        refreshtable();
    }).catch(function (error) {
        console.log(error);
    });
}