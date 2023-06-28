const express = require("express");
const server = express();
const cors = require('cors');

server.use(cors("*"));
server.use(express.json());

server.use(function (req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

const UsuarioRoute = require("./routes/UsuarioRoute");


server.use('/user' , UsuarioRoute); 

var localhost = "SEU_IP";
var port = 8082;

server.listen(port, () => {
  console.log(`Host: http://${localhost}:${port}`);
});


module.exports = server;