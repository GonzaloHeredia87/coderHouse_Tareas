const testVariable = "testVariable";
const testVariable2 = "testVariable2";

// // console.log(testVariable);
// // console.log(testVariable2);
// const http = require('http');

// const server = http.createServer();

const express = require('express');
const moment = require('moment');
const Contenedor = require('./Contenedor.js');
const app = express();
const probando = new Contenedor('producto.txt');
data_inser1 = {
    title: "Notebook Azus Gr1233",
    price: 1000.0,
    thumbnail: "www.azus.com" 
}

data_inser2 = {
    title: "Notebook Razer Pro, 17 inch",
    price: 15000.0,
    thumbnail: "www.razer.com" 
}
data_inser3 = {
    title: "Notebook OEM XR123, Pro 15 inch",
    price: 1500.12,
    thumbnail: "www.oem.com"
}
// probando.save(data_inser1);
// probando.save(data_inser2);
// probando.save(data_inser3);
const resultado = probando.getAll();
function getAleatorio(resultado){
    return parseInt(Math.random()*resultado.length) +1;
}
app.get('/productos', (req, res)=>{
    //console.log(resultado)
    res.send(resultado);
});

app.get('/productoRandome', (req, res)=>{
    let index = getAleatorio(resultado);
    res.send(resultado[index]);
});

// let visitas = 0;
// app.get('/visitas', (req, res)=>{

//     res.send(`La cantidad de visitas ${++visitas}`);
// });

// app.get('/fyh', (req, res)=>{
//     res.send({fyh: new Date().toLocaleString()});
// });

// app.post('test', (req, res)=>{
//     res.send({mensaje:"Hola Mundo es mi primer servidor"});
// });

const server = app.listen(8888, ()=>{
    console.log('servidor http en el puerto 8888');

});

server.on('error', error=>console.log(`Error en el servidor ${error}`));