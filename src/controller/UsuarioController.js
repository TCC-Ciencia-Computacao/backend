const connection = require("../config");

class UsuarioController {
    
    async login(req, res) {
        // Verifica se os parâmetros de usuário e senha foram fornecidos
        if (!req.params.user || !req.params.pass) {
            return res.status(400).json({ error: 'Parâmetros inválidos.' });
        }

        const con = connection.connection('local');

        con.query('SELECT * FROM usuario', (error, results, fields) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Erro de conexão com banco de dados.' });
            }

            // Verifique se há resultados (usuários) na consulta
            if (results.length > 0) {
                // Aqui, você pode adicionar lógica para verificar as credenciais do usuário
                // e retornar uma resposta de sucesso ou erro com base nisso.
                // Por exemplo, você pode comparar as credenciais com os resultados da consulta.
                return res.status(200).json(results[0]);
            } else {
                return res.status(401).json({ error: 'Usuário não encontrado.' });
            }
        });
    }
}

module.exports = new UsuarioController();
