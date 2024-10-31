const pool = require('../database/connection');


const User = async (correo)=>{
    try{
       return  (await pool.query(`SELECT * FROM usuarios WHERE usuarios.correo='${correo}'`)).rows[0];
    } catch{
        return {
            msg: "Error al leer Usuario"
        }
    }
    
}

const set_User = async (register, password)=>{
    try{
        await (pool.query(`INSERT INTO usuarios (nombre, telefono, correo, direccion, genero, contrasena, confirmar_contrasena) 
    VALUES ('${register.nombre}', '${register.telefono}', '${register.correo}', '${register.direccion}', ${register.genero}, '${password}', 'undefine')`));
        return true;
    } catch{
        return false;
    }
}

const verifmail = async (correo)=>{
    try{
        return await (await ( pool.query(`SELECT * FROM usuarios WHERE usuarios.correo='${correo}'`))).rowCount;
     } catch{
         return {
             msg: 0
         }
     }
}


module.exports = {
    User,
    set_User,
    verifmail
};