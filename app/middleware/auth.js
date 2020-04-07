const jwt = require('jsonwebtoken');
const {secret} = require('../../config/app').jwt;

module.exports = (req, res, next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        res.status(401).json({message: 'Без токена нельзя!'});
    }

    const token = authHeader.replace('Bearer ', '');
    try {
        const payload = jwt.verify(token, secret);
        if(payload.type !== 'access'){
            res.status(401).json({message: 'Неверный токен!'});
            return;
        }
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            res.status(401).json({message: 'Токен истек!'});
            return;
        }
        if( error instanceof jwt.JsonWebTokenError){
            res.status(401).json({message: 'Токен не совпадает!'});
            return;
        }
    }

    next();
};