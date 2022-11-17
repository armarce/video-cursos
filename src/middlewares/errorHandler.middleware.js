require('dotenv').config();
const errorCodes = require('../utils/errorCodes.js');

const errorHandler = (error, req, res, next) => {

    let errorData = {};

    if(typeof error === 'string'){

        errorData = errorCodes[error];
        
    }else{

        errorData = errorCodes[error.errorCode];

    }

    let result = {
        success: false,
        message: errorData.message
    };
    
    if(process.env.MODE === 'dev'){

        result.error = error?.error;

    }

    res.status(errorData.status).json(result);

}

module.exports = errorHandler;