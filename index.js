const express = require('express')
const app  = express()
const http = require('http');
//---------------------------------------->

//const jwt = require('jsonwebtoken');
const db = require('./dbConnection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { signupValidation, loginValidation } = require('./validation');
const { validationResult } = require('express-validator');



//------------------------------------------->

function check_authentication(req, res) {
    var flag = true;
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({
                message: "Please provide the token",
            });

        }
        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
        db.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
            if (error) throw error;
        });
        return flag
    }
    catch (error) {
        res.send('Invalid token !');
    }
}



app.listen(8080, () => {
    console.log('listening on 8080')
})
// app.get('/get', (req,res)=>{
//     res.send('Hello World!')
// })

// app.listen(3000, ()=>{
// console.log("listening port on 3000.....")})