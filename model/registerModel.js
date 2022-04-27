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

//API setup signup data.

apiRoutes.post('/', function (req, res, next) {
    var query = 'SELECT * FROM user_info_table where emailId = ?;'
    var insertQuery = 'INSERT INTO login_table (emailId, password) VALUES (?, ?);'
    var updateQuery = 'UPDATE user_info_table SET status = 1 WHERE emailId = ?'
    DbRouter.getConnection(function (err, connection) {
        if (err) {
            console.log(err)
            res.send({
                code: 201,
                message: 'Error'
            })
        } else {
            connection.query(query, [req.body.username], function (err, rows, fields) {
                if (!err) {
                    if (rows.length == 0) {
                        res.send({
                            code: 200,
                            data: 'Invalid User'
                        })
                    } else {
                        if (rows[0].status == 1) {
                            res.send({
                                code: 200,
                                data: 'Already register'
                            })
                        } else {
                            var passTemp = response.encryptData(JSON.stringify(req.body.password)).toString();
                            connection.query(insertQuery, [req.body.username, passTemp], function (err1, rows1, fields1) {
                                if (err1) {
                                    res.send({
                                        code: 201,
                                        message: 'Error'
                                    })
                                } else {
                                    connection.query(updateQuery, [req.body.username], function (err2, rows2, fields2) {
                                        connection.destroy();
                                        if (err2) {
                                            res.send({
                                                code: 201,
                                                message: 'Error'
                                            })
                                        } else {
                                            var token = genrateToken({
                                                emailID: req.body.username
                                            })
                                            res.send({
                                                code: 200,
                                                token: token,
                                                data: 'Success'
                                            })

                                        }
                                    })
                                }
                            })
                        }

                    }

                } else {
                    res.send({
                        code: 201,
                        message: 'Invaild'
                    })
                }
            })
        }
    })
})


module.exports = apiRoutes;