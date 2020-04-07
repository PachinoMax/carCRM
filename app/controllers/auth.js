const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authHelper = require('../helpers/authHelper');
const User = require('../models/user');
const Token = require('../models/token');
const { secret } = require('../../config/app').jwt;

const updateTokens = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const accessToken = authHelper.generateAccessToken(userId);
            const refreshToken = authHelper.generateRefreshToken();

            await authHelper.replaceDbRefreshToken(refreshToken.id, userId);

            let result = {
                accessToken,
                refreshToken: refreshToken.token
            };

            resolve(result);
        } catch (e) {
            reject(e);
        }
    })
};

const signIn = async (req, res) => {
    try {
        let { name, password } = req.body;
        let user = await User.findOne({ name }).exec();
        if (!user) return res.status(401).json({ message: 'Пользователь не найден' });
        let isValid = bCrypt.compareSync(password, user.password);

        if (!isValid) return res.status(401).json({ message: 'Неккоретные данные для входа' })

        let tokens = await updateTokens(user._id);
        await res.json(tokens);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

const refreshTokens = async (req, res) => {
        let { refreshToken } = req.body;
        let payload;
        try {
        payload = await jwt.verify(refreshToken, secret);
            if (payload.type !== 'refresh') {
            res.status(400).json({ message: 'Неверный токен!' });
            return;
        }
        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
            res.status(400).json({ message: 'Токен истек!' });
            return;
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(400).json({ message: 'Неверный токен!' });
            return;
        }
        }
        try {
        let token = await Token.findOne({ tokenId: payload.id });
        if(token === null){
            throw new Error('Токен не найден!');
        }
        let tokens = await updateTokens(token.userId);
        await res.json(tokens);
        } catch (e) {
        res.status(400).json({ message: e.message });
        }
};

module.exports = {
    signIn, refreshTokens
}