var mysql = require('mysql2');
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Vineet@123',
    database: 'assignment',
    connectionLimit: 15,
});
module.exports = connection;