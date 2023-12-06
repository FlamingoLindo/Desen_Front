import 'regenerator-runtime/runtime';
import axios from 'axios';
import { async } from 'regenerator-runtime';

const url = "http://localhost:3000/";



$("#btnLogin").click(async function(){
    try{
        await axios.post(url + 'login', {
            email: $("#email").val(),
            senha: $("#senha").val()
        }).then(function (response){
            alert("Login realizado com sucesso!")
            window.location.href = "Tela_Inicial.html";
        }).catch(function (error){
            alert("Dados incorretos!")
            console.log(error);
        });
    } catch(errors) {
        console.log(errors);
    }
})