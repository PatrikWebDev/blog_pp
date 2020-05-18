const sqlite3 = require ('sqlite3').verbose()
const dbPath = require('../../config.json').dbpath
let db = new sqlite3.Database(dbPath)
const fs = require('fs')


function getDB() {
    return db
}

class DatabaseController {

// changes the database
    changing(req, res){
        let {choosenDB } = req.body;
        let dbpath = {
            dbpath: choosenDB
        }
        fs.writeFileSync('config.json',JSON.stringify(dbpath))
        res.redirect('/admin')
    }
}



module.exports = {
    getDB,
    DatabaseController,
}