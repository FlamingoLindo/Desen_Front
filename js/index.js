import 'regenerator-runtime/runtime';
import axios from 'axios';

const url = "http://localhost:3000/";

$(document).ready(function(){
    axios.get(url + 'profiles',{
    }).then(function (response){
        $.each(response.data, function (key,item){
            $('#selectP').append(
                $("<option></option>")
                    .attr("value", item.id)
                    .text(item.sobre)
            );
        });
    }).catch(function (error){
        alert(error);
    });
});

$("#btnSalvar").click(async function(){
    try {
        await axios.post(url + 'users', {
            nome: $("#nome").val(),
            sobrenome: $("#sobrenome").val(),
            email: $("#email").val(),
            admin: $("#admin").val(),
            senha: $("#senha").val(),
            dataNascimento: $("#dataNascimento").val(),
            profile: $("#selectP").val()
        }).then(function (response){
            alert("Registo Incluído com sucesso!")
        }).catch(function (error){
            console.log(error);
        });
    } catch (errors) {
        console.error(errors);
    }
})

$("#btnApagar").click(async function(){
    try {
        await axios.post(url + 'users', {
            nome: $("#nome").val(""),
            sobrenome: $("#sobrenome").val(""),
            email: $("#email").val(""),
            admin: $("#admin").prop('checked',false),
            senha: $("#senha").val(""),
            dataNascimento: $("#dataNascimento").val(""),
            profile: $("#selectP").val("")
        }).then(function (response){
           
        }).catch(function (error){
            console.log(error);
        });
    } catch (errors) {
        console.error(errors);
    }
})