const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "breeds",
    password: "3006",
    port: 5432,
});

module.exports = pool;