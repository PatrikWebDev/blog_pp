const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('BlogPosts.db')

class ArchiveCont{
    constructor(){}

    createArchive(){
        db.serialize(function(){
            db.all("SELECT id, title, date FROM posts", function(err, results){
                console.log(results)
            })
        })
    }
}

let foo = new ArchiveCont()

foo.createArchive()