const { Pool } = require('pg');

const pgClient = new Pool({
    user: "DavidK1412",
    host: "ep-lingering-silence-460483.us-east-2.aws.neon.tech",
    database: "buenautodb",
    port: "5432",
    password: "jU5WLrcCkXP8",
    ssl: true
});

module.exports = pgClient;
