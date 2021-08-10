const { promisify } = require('util')
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_NAME
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused')
        }
    }

    if (connection) {
        connection.release()
        console.log('DB is Connected')
    }
})

pool.query = promisify(pool.query)

module.exports = pool