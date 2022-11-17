const Users = require('../models/users.model.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userAuth = (req, res, next) => {

    try{

        const {authorization} = req.headers;
        const token = authorization.split(" ")[1];
    
        const userData = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = userData.user_id;

        next();

    }catch(error){

        res.status(500).json({error});

    }

}

module.exports = userAuth;