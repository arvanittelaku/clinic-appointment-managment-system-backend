const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { UnauthorizedError, ForbiddenError } = require('../utils/appError');

//middleware to verify jwt and attach user to the request
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith('Bearer ')) {
        return next(new UnauthorizedError('Token missing or invalid!'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if(!user) return next(new UnauthorizedError('User not found!'));
        req.user = user;
        next();
    }catch(err){
        next(new UnauthorizedError('Invalid or expired token!'));
    }
};


//middleware to allow roles 
const allowRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ForbiddenError('You are not authorized!'))
        }
        next();
    };
};

module.exports = {authenticate,allowRoles}; 