const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('audience.db')
function creation() {
    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS audience ( username VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, admin VARCHAR(100), superAdmin VARCHAR(100))")
    })
}

creation()