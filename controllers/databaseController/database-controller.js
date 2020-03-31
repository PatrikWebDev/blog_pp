const sqlite3 = require ('sqlite3').verbose()
const databases = ['BlogPosts.db', 'BlogPosts2.db'];
let db = new sqlite3.Database('BlogPostsArr.db')
const fs = require('fs')

function changer(req, res){
    let {choosenDB } = req.body;
    db.filename= `${choosenDB}`
    return db
}

function getDB() {
    return db
}

class DatabaseController {

// changes the database
    changing(req, res){
        let {choosenDB } = req.body;
        fs.readFileSync()
        db = new sqlite3.Database(choosenDB)
        if(choosenDB == databases[0]){
            db.serialize(function(){
                db.run(`ATTACH DATABASE ${db1} AS "temp"; DETACH DATABASE ${db2}`)
                }
            ) 
        }
        db.serialize(function(){
            db.run(`ATTACH DATABASE ${db2} AS db1; DETACH DATABASE ${db1}`)
            }
        )

        res.redirect('/admin')
    }
}



module.exports = {
    getDB,
    DatabaseControll,
}