var mysql = require('mysql');
var connection = mysql.createPool({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'123',
    database:'project'
});
module.exports = connection;