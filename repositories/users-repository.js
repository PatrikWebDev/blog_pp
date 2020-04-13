const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('UserDb.db')

class UserRepository {
    findAll(serviceCallback) {
        db.serialize(function(){
            db.all("SELECT id, username, password FROM users", serviceCallback)
        })
    }

    insertingNewUser(userData){
        db.serialize(function () {
            db.run(`INSERT INTO users ( id, username, password) VALUES ("${userData.id}", "${userData.name}", "${userData.password}")`)
        })
    }
}

module.exports={
    UserRepository
}