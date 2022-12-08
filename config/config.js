require("dotenv").config();

module.exports = {
    "development": {
        "username": "postgres",
        "password": "1234",
        "database": "finalProjectTiga",
        "host": "127.0.0.1",
        "port":8080,
        "dialect": "postgres"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.PGUSER,
        "password": process.env.PGPASSWORD,
        "database": process.env.PGDATABASE,
        "host": process.env.PGHOST,
        "host": process.env.PGPORT,
        "dialect": "postgres"
    }

}