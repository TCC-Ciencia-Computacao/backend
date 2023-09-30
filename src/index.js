const express = require("express");
const server = express();
const cors = require('cors');
const connection = require("./config");
const bcrypt = require("bcrypt");

const saltRounds = 10;
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

server.post("/register", (req, res) => {
  const con = connection.connection('local');
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const smartphone = req.body.smartphone;
  const date = req.body.date;
  const cep = req.body.cep;
  const city = req.body.city;
  const uf = req.body.uf;
  const password = req.body.password;

  con.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erro de conexão com banco de dados.' });
      }

      if (result.length === 0) {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            con.query("INSERT INTO usuarios (nome, sobrenome, email,celular, dataNascimento, cep, cidade, uf, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, lastName, email,smartphone,date,cep,city,uf, hash], (err, result) => {
              if (err) {
                  console.error(err);
                  return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
              }
              return res.status(201).json({ msg: "Cadastrado com sucesso." });
          });
          })
         
      } else {
          return res.status(400).json({ error: 'Usuário já cadastrado.' });
      }
  });


});

server.post("/", (req, res) => {
  const con = connection.connection('local');
  const email = req.body.email;
  const password = req.body.password;

  con.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao verificar usuário.' });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].senha, (error, response) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Erro ao verificar senha.' });
        }

        if (response) {
          return res.status(200).json({ msg: "Usuário logado" });
        } else {
          return res.status(401).json({ error: "Senha incorreta" });
        }
      });
    } else {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
  });
});


server.get("/users", (req, res) => {
  const con = connection.connection('local');

  con.query("SELECT * FROM usuarios", (err, data) => {
    if(err) {
      return res.status(500).json({ msg: "Não foi possivel obter os dados." });
    }
    return res.status(200).json({ msg: "Dados obtidos com sucesso.", data});
  });
});

server.put("/users", (req, res) => {
  const con = connection.connection('local');
  const name = req.body.name
  const lastName = req.body.lastName
  const email = req.body.email
  

  con.query("UPDATE usuarios SET `nome` = ? , `sobrenome` = ?, `email` = ? WHERE `id` = ?", [name, lastName, email, req.params.id], (err) => {
    if(err){
      return res.status(500).json({ msg: "Não foi possivel alterar os dados." });
    }
    return res.status(200).json({ msg: "Usuário atualizado com sucesso."});
  });
});

server.delete("/users", (req, res) => {
  const con = connection.connection('local');
  con.query("DELETE FROM usuarios WHERE `id` = ?",[req.params.id], (err) => {
    if(err){
      return res.status(500).json({ msg: "Não foi possivel deletar o usuário." });
    }
    return res.status(200).json({ msg: "Usuário deletado com sucesso."});
  })
});

var localhost = "localhost";
var port = 3000;

server.listen(port, () => {
  console.log(`Host: http://${localhost}:${port}`);
});


module.exports = server;