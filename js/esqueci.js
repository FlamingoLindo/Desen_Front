import 'regenerator-runtime/runtime';
import axios from 'axios';

const url = "http://localhost:3000/";

$("#btnEsqueci").click(async function(){
    try{
        await axios.post(url + 'reset', {
            email: $("#email").val()
        }).then(function (response){
            alert("Email com a sua nova senha foi enviado!")
            window.location.href = "Tela_Login.html";
        }).catch(function (error){
            console.log(error);
        });
    } catch(errors) {
        console.log(errors);
    }
})