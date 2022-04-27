var apiRoutes = require('express').Router();
var DbRouter = require("./../helper/dbconnection.js");
var response = require('./../helper/response.js');
var jwt = require('jsonwebtoken');

function genrateToken(data) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 90);
    return jwt.sign({
        emailID: data.emailID,
        expiry: parseInt(expiry.getTime() / 1000),
    }, 'dfxgchfsdghsegrdh');
}

function checkPassword(pass, dbpass){
    var decrypPass = response.decryptData(dbpass);
    if(pass == decrypPass)
    return true
    else
    return false
}

apiRoutes.post('/', function (req, res, next) {
    var query = 'SELECT * FROM login_table where emailId = ?;'
    DbRouter.getConnection(function (err, connection) {
        if (err) {
            console.log(err)
            res.send({
                code: 201,
                message: 'Error'
            })
        } else {
            connection.query(query, [req.body.username], function (err, rows, fields) {
                if (err) {
                    res.send({
                        code: 201,
                        message: 'Error'
                    })
                } else {
                    var checkPass = checkPassword(JSON.stringify(req.body.password), rows[0].password); 
                    if(checkPass){
                        var token = genrateToken({
                            emailID: req.body.username
                        })
                        res.send({
                            code: 200,
                            token: token,
                            data: 'Success'
                        })
                    }else{
                        res.send({
                            code: 201,
                            message: 'Invalid creds'
                        })
                    }
                }
            })
        }
    })
})


module.exports = apiRoutes;