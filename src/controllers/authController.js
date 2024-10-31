const { request, response, query} = require('express');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { User, set_User, verifmail } = require('../models/auth');



const login = async (req, res = response)=>{
    const {correo, contrasena} = req.body;
    
    // verficar que el email exista
    const verificarMail = await(verifmail(correo));  
    if (verificarMail === 0){
        return res.status(400).json({
            msg: 'Usuario: El correo no es Valido'
        });
    }


    // verificar que el usuario este activo
    const user = await (User(correo));

    //verificar la contraseña
    const password = user.contrasena;
    const validarPassword = bcryptjs.compareSync(contrasena, password);
    if (!validarPassword){
        return res.status(400).json({
            msg: `Usuario : Contraseña no es valida`
        });
    }
    //generar el JWT
    const id = user.id;
    const { nombre, telefono, direccion, genero } = user;
    const token = await generarJWT(id);
    res.json({
       user: {
        id,
        nombre,
        telefono,
        direccion,
        correo,
        genero
       },
       token
    });
};

const sign_up = async (req, res)=>{
    const register = req.body;
    //verificar que el correo sea unico 
    const verifcorreo = await(verifmail(register.correo));
    if(verifcorreo !== 0){
        res.status(400).json({
            msg: `Error Correo ya existe`
        })
        return;
    }
    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    const password = bcryptjs.hashSync(register.contrasena, salt);

    //guardar en db
     const verifUser = await(set_User(register, password));
     console.log(verifUser);
    if (!verifUser){
        res.json({
            msg: `Error al insertar Usuario`
        });
    } else{
    res.json({
        msg: `Usuario registrado!`
    });
    }   
}

module.exports = {
    login,
    sign_up
};