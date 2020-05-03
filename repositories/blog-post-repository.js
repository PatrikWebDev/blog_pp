const sqlite3 = require('sqlite3')
const config = require('../config.json')
const path = config.dbpath
const db = new sqlite3.Database(path)

class BlogPostRepository {
    findAll() {
        return new Promise((resolve, reject)=>{
            db.serialize(function(){
                db.all("SELECT id, title, content, author, date FROM posts",(err, result)=>{
                    if(err){
                        reject(err);
                        return
                    }
                    resolve(result)
                })
            })
        })
    }

    insertingPublishedPosts(blogPost){
        db.serialize(function () {
            db.run(`INSERT INTO posts ( id, title, content, author, date) VALUES ("${blogPost.id}", "${blogPost.title}", "${blogPost.content}", "${blogPost.author}", "${blogPost.created_at}")`)
        })
    }

    inserintDraftedPosts(blogPost){
        db.serialize(function () {
            db.run(`INSERT INTO drafts ( id, title, content, author, date) VALUES ("${blogPost.id}", "${blogPost.title}", "${blogPost.content}", "${blogPost.author}", "${blogPost.created_at}")`)
        })
    }

}

module.exports={
    BlogPostRepository
}