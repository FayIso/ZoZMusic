const mysql = require("mysql2");

/*const dataBase = new mysql.createPool({
    host: "localhost",
    password: "2Chanelle1501**",
    user: "enzo",
    database: "zoz"
});*/

const dataBase = new mysql.createPool({
    host: "localhost",
    password: "",
    user: "root",
    database: "zoz"
});

module.exports = {
    mysql: mysql,
    dataBase: dataBase,
}

