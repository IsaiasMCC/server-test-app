const { request, response } = require('express');
const { User } = require('../models/user');


const perfil =  async (req, res)=>{
    const id = req.uid;

        const user = await ( User(id));
        res.json({
            user
        });
    
}

module.exports = {
    perfil
}