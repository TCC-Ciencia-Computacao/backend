
const mysql = require('mysql');
class config {

    connection(envirement) {

        if(envirement == ""){
            return "empty";
        }

        switch(envirement)
        {
            case "local":
                //local
                const connection = mysql.createConnection({
                    host     : 'localhost',
                    port     : 3306,
                    user     : 'root',
                    password : 'cont10rol',
                    database : 'tcc'
                });

                return connection;
        }
    }
}

module.exports = new config();