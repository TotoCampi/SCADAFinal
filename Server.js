//Crea la Collection de la base de datos
var express=require('express')
var cors= require('cors')
var app=express()
const {ObjectId}= require('mongoDb');
app.use(cors());
app.use(express.json());
// le digo al servidor que escuchar
var MongoClient=require('mongodb').MongoClient;
var url= "mongodb://172.22.40.52/";
const collectionName = 'rtu-data'
let net = require('net');
let socket = new net.Socket();
// Crear la base de datos y una collection
MongoClient.connect(url, function(err,db){
  if (err) {
    console.log('Error!',err)
  }

  var dbObject= db.db("mydb")
  dbObject.createCollection(collectionName, function(err, response){
    if (err) {
      console.log("Error!");
    }
    else console.log("Collection created!")
    // db.close() cierra la conexion
    db.close();
  });
});

app.get('/list', function(req,res){
  MongoClient.connect(url, function(err,db){

    if (err) throw err;

    var dbo= db.db("mydb")

    findDocuments(dbo, function(docs){
      db.close()
      res.json(docs)
    })
  })
});

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection(collectionName);
  // Find some documents
  collection.find({}).toArray(function(err, docs) {

    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

app.listen(3000,function(){
  console.log('Example app listening on port 3000!');
});
