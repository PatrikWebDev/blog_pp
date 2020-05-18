class BlogPostRepository {
    findAll() {
        const sqlite3 = require('sqlite3')
         function path(){
            const config = require('../config.json').dbpath
            return config
        }
        const db = new sqlite3.Database(path())
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

    selectSpecific(searchCategory, searchWord){
        return new Promise((resolve,reject)=>{
            db.serialize(function(){
                db.all(`SELECT title, content, author, date FROM posts WHERE ${searchCategory}= "${searchWord}"`, (err, result)=>{
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
            db.run(`INSERT INTO posts ( id, title, slug ,content, author, date, tags) VALUES ("${blogPost.id}", "${blogPost.title}", "${blogPost.slug}", "${blogPost.content}", "${blogPost.author}", "${blogPost.created_at}", "${blogPost.tags}")`)
        })
    }

    inserintDraftedPosts(blogPost){
        db.serialize(function () {
            db.run(`INSERT INTO drafts ( id, title, slug ,content, author, date, tags) VALUES ("${blogPost.id}", "${blogPost.title}", "${blogPost.slug}", "${blogPost.content}", "${blogPost.author}", "${blogPost.created_at}", "${blogPost.tags}")`)
        })
    }

}

module.exports={
    BlogPostRepository
}