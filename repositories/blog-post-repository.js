const sqlite3 = require('sqlite3')
const config = require('../config.json')
const path = config.dbpath
const db = new sqlite3.Database(path)

class BlogPostRepository {
    findAll(serviceCallback) {
        db.serialize(function(){
            db.all("SELECT id, title, content, author, date, tags FROM posts", serviceCallback)
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