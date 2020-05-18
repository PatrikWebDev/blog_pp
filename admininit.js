const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('audience.db')
function creation() {
    db.serialize(function () {
        db.run(`INSERT INTO audience (username, password, email, admin, superAdmin) VALUES ("admin2", "pass", "povpatrik@gmail.com", "true", "true")`)
    })
}

creation()