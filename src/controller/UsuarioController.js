

class UsuarioController {
    
    async login (req, res){
        // var token = req.headers['x-access-token'];
        var connection = require("../config");
        let con = connection.connection('local');
        // if (!token) return res.status(401).send({ auth: false, message: 'Nenhum token informado.' });
        if(req.params.user != "" && req.params.pass){
        con.query('SELECT * FROM usuario', (error, results, fields) => {
            if (error) throw error;
                return res.status(200).json(results[0]);
          });
        }else{
            return res.status(500).json({'Erro 500' : 'Erro de conexão com banco de dados!'});            
        }
    }

}

module.exports = new UsuarioController();