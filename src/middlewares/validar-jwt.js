const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next)=>{
    const token = req.body.Authorization;
    // const token = res.cookies('Authorization');
    // console.log(token);
    if (!token){
        return res.status(401).json({
            msg: 'No hay token'
        });
    }
    
    try {
        const payload = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        req.uid = payload.uid;
        
        next();    
    } catch (error) {
        return res.status(401).json({
            msg:'Token no valido'
        });
    }
    
}

module.exports = {
    validarJWT
};