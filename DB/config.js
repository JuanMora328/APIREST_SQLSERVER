const sql = require('mssql');
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
}

const dbConnection = async () => {

    try {
        const pool = sql.connect(config);
        return pool;
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    dbConnection
}