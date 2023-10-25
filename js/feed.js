import 'regenerator-runtime/runtime';
import axios from 'axios';

const url = "http://localhost:3000/";

$("#btnSalvar").click(async function(){
    try {
        await axios.post(url + 'feed', {
            nome: $("#artigoBem").val(),
            sobrenome: $("#artigoProd").val(),
            email: $("#conquistaUsuario").val(),
            admin: $("#conquistaAmigo").val(),
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
        await axios.post(url + 'feed', {
            nome: $("#artigoBem").val(""),
            sobrenome: $("#artigoProd").val(""),
            email: $("#conquistaUsuario").val(""),
            admin: $("#conquistaAmigo").val(""),
        }).then(function (response){
            
        }).catch(function (error){
            console.log(error);
        });
    } catch (errors) {
        console.error(errors);
    }
})