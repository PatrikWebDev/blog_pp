const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('BlogPostsB.db')
function creation() {
    db.serialize(function () {
        
        db.run("CREATE TABLE IF NOT EXISTS posts ( id VARCHAR(100) NOT NULL, title VARCHAR(100) NOT NULL, content VARCHAR(100) NOT NULL, author VARCHAR(100) NOT NULL, date VARCHAR(100) NOT NULL, tags VARCHAR(100) NOT NULL)")
    
        db.run("CREATE TABLE IF NOT EXISTS drafts ( id VARCHAR(100) NOT NULL, title VARCHAR(100) NOT NULL, content VARCHAR(100) NOT NULL, author VARCHAR(100) NOT NULL, date VARCHAR(100) NOT NULL, tags VARCHAR(100) NOT NULL)")

    })
}

creation()
