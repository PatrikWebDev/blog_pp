const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('UserDb.db')
function creation() {
    db.serialize(function () {
        
        db.run("CREATE TABLE IF NOT EXISTS users ( id VARCHAR(100) NOT NULL, username VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL)")
    

    })
}

creation()