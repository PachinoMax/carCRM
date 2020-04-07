module.exports ={
    jwt:{
        secret: 'Матвей авто из Японии',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '2m',
            },
            refresh: {
                type: 'refresh',
                expiresIn: '3m',
            }
        }
    }
};