const {validationResult } = require('express-validator');
const { User }  = require('../models/auth');

const validarCampos = (user, req, res, next)=>{
   const errores = validationResult(req);
   if(!errores.isEmpty()){
       return res.status(400).json(errores);
   }
}

module.exports = {
    validarCampos
}