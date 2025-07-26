const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const { validationResult } = require('express-validator')
//register new user
exports.register = async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {name,email,password,role} = req.body;

        //check if user exists
        const existingUser = await User.findOne({where:{email}});
        if(existingUser) return res.status(400).json({message: 'Email already taken!'});

        //hash the password
        const hashedPassword = await bcrypt.hash(password,10);
        //create user
        const newUser = await User.create({name,email,password:hashedPassword,role});
        res.status(201).json({message: 'User registered successfully', user: { id: newUser.id, email: newUser.email, role: newUser.role }})
    }catch(err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

//login user
exports.login = async (req,res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const {email,password} = req.body;
        //check if user exists
        const user = await User.findOne({where:{email}});
        if(!user) return res.status(400).json({message: 'Invalid email or password'});

        //compare passwords
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid email or password'});

        //generate token
        const token = jwt.sign(
            {id: user.id,role: user.role},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN}
        );
        res.status(200).json({message: 'Login successful',token})
    }catch(err) {
        res.status(500).json({message: 'Internal server error!',error:err.message});
    }
};