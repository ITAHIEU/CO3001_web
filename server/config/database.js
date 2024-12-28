const sql = require('mssql');

const config  = {
    user: 'sa',
    password: '29012004h', 
    server: 'localhost', 
    database: 'CNPM1',
    options: {
        encrypt: false,
        trustServerCertificate: true, 
    },
};

sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection Successful!");
});

module.exports = sql