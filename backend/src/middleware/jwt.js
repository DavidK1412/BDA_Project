const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const tokenData = {
        id: user.id,
        role: user.role,
        employeeCode: user.employeeCode,
        branchId: user.branchId
    };

    console.log(tokenData);

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: '1h'
    });

    return token;
};

const verifyToken = (token) => {
    if (!token || token === '' || token === null) {
        return false;
    }

    if(token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (typeof token !== 'undefined'){
        try{
            if(jwt.verify(token, process.env.SECRET_KEY)) return true;
        } catch(err){
            console.log(err);
        }
    }
    return false;
};

const decodeToken = (token) => {
    if (!token || token === '' || token === null) {
        return false;
    }

    if(token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (typeof token !== 'undefined'){
        try{
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            return decodedToken;
        } catch(err){
            console.log(err);
        }
    }
    return false;
};


module.exports = {
    generateToken,
    verifyToken,
    decodeToken
};