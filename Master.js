var express=require('express')
var cors= require('cors')
var app=express()
const {ObjectId}= require('mongodb');
app.use(cors());
app.use(express.json());
// le digo al servidor que escuchar
var MongoClient=require('mongodb').MongoClient;
var url= "mongodb://172.22.40.52/";
const collectionName = 'rtu-data'


let Modbus = require('jsmodbus');
let net = require('net');
let socket = new net.Socket();
let client = new Modbus.client.TCP(socket);
let options = {
'host' : '172.22.40.52',
'port' : 3333,
'debug': true
}

socket.on('connect', function () {
  setInterval(() => {
    client.readHoldingRegisters(0, 2)
      .then(function (resp) {
        console.log("READ response: ", resp.response._body.valuesAsArray)
        //hacer funcion DATOS desde aca
        const fecha = new Date();
        const numero = resp.response._body.valuesAsArray[0]
        const data = {
          fecha: fecha,
          numero: numero
        };
        MongoClient.connect(url, function(err,db){
          if (err) throw err;
          // Accedo a la base de datos previamente creada
          var dbo= db.db("mydb");

          // Accedo a la collection e inserto un elemento
          dbo.collection(collectionName).insertOne(data, function(err,response){
            db.close()
            if (err){
              console.log (err);
            }
            else {
              console.log("1 document inserted")
            }
          });
        });
        //Hasta aca
      }).catch(function (err) {

        console.error(err)
        socket.end()
      })

  }, 3000);
});

socket.on('error', (err) => console.error(err))
socket.connect(options)
