import 'regenerator-runtime/runtime';
import axios from 'axios';

const url = "http://localhost:3000/";

$(document).ready(function(){
    axios.get(url + 'users',{
    }).then(function (response){
        $.each(response.data, function (key,item){
            $('#selectU').append(
                $("<option></option>")
                    .attr("value", item.id)
                    .text(item.user)
            );
        });
    }).catch(function (error){
        alert(error);
    });
});

$("#btnSalvar").click(async function(){
    try {
        await axios.post(url + 'achievements', {
            nome: $("#selectU").val(),
            conquista: $("#conquista").val(),
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
        await axios.post(url + 'achievements', {
            nome: $("#selectU").val(""),
            conquista: $("#conquista").val(""),
        }).then(function (response){
            alert("Registo Incluído com sucesso!")
        }).catch(function (error){
            console.log(error);
        });
    } catch (errors) {
        console.error(errors);
    }
})