//Database connection data. Docker and local will use different hosts.
//db.js and controller.js will consult this file

require('dotenv').config();
const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.PG_USER,
    /*DOCKER*/ host: process.env.DOCKER_PG_HOST,
    //LOCAL host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

module.exports = pool;