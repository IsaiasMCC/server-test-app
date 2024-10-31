const pool = require('../database/connection');


const User = async (id)=>{
    try{
       return  (await pool.query(`SELECT id,nombre, telefono, correo, direccion, genero FROM usuarios WHERE usuarios.id='${id}'`)).rows[0];
    } catch{
        return {
            msg: "Error al leer Usuario"
        }
    }
    
}

module.exports = {
    User
}