const util = require('util');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'deh1',
    password: '1234',
    database: 'crm',
    port:3307
});

pool.getConnection((err, connection) => {
    if(err){ 
        console.error("Something went wrong connecting to the database ...")
    }
    else(connection)
        connection.release();
        console.log('Database connected')
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
