
const express = require('express');
class Server{
    
    constructor(){
        this.app = express();       
        this.port = process.env.PORT || 8081;

        //middlewares
        this.middlewares();

        //routes
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true}));
        // Configurar cabeceras y cors
        this.app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
        });
    }

    routes(){
        this.app.use('/', require('../routes/home'));
        this.app.use('/api/users', require('../routes/users'));
        this.app.use('/auth', require('../routes/auth'));
        this.app.use('/api/permissions', require('../routes/permission'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`);
        })
    }

}

module.exports = Server;