var apiRoutes = require('express').Router();

var response = require('./../helper/response.js')

apiRoutes.use(function (req, res, next) {
    try {
        if (req.body && req.body.encryHD) {
            var tempObj = response.decryptData(req.body.encryHD);
            req.body = JSON.parse(tempObj);
            next();
        }
        else {
            next();
        }
    } catch (err) {
        console.log(err);
        res.status(401).send({
            message: 'Server Error. Access not authorized in decrypt middleware.'
        });
    }

});

apiRoutes.use('/register',require('./../model/registerModel.js'));
apiRoutes.use('/login',require('./../model/loginModel.js'));

module.exports = apiRoutes;