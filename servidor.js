const testVariable = "testVariable";
const testVariable2 = "testVariable2";

// // console.log(testVariable);
// // console.log(testVariable2);
// const http = require('http');

// const server = http.createServer();

const express = require('express');
const moment = require('moment');
const app = express();


app.get('/', (req, res)=>{
    res.send('<h1 style="color: blue">Bienvenidos al servidor express</h1>');
});

let visitas = 0;
app.get('/visitas', (req, res)=>{

    res.send(`La cantidad de visitas ${++visitas}`);
});

app.get('/fyh', (req, res)=>{
    res.send({fyh: new Date().toLocaleString()});
});

// app.post('test', (req, res)=>{
//     res.send({mensaje:"Hola Mundo es mi primer servidor"});
// });

const server = app.listen(8888, ()=>{
    console.log('servidor http en el puerto 8888');

});

server.on('error', error=>console.log(`Error en el servidor ${error}`));