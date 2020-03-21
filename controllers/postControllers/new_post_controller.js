const uuid = require('uuid')
const uuidv4 = uuid.v4
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('BlogPosts.db')

function publishNewPost(req, res){
    const failmessage = "Mindkét mező kitöltése kötelező"
    if(req.body.title == false && req.body.content == false){
        res.render('new_post_view', {fail: failmessage})
    }

    let currentdate = new Date(); 
    let datetime = "Last Sync: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    let {sessionId} = req.cookies

let blogPost = {
    id: `${uuidv4()}`,
    title: req.body.title,
    content: req.body.content,
    author: sessionId,
    created_at: datetime
}

db.serialize(function () {
        
    db.run(`INSERT INTO posts ( id, title, content, author, date) VALUES ("${blogPost.id}", "${blogPost.title}", "${blogPost.content}", "${blogPost.author}", "${blogPost.created_at}")`)

})
res.redirect('/admin')
}

module.exports = {
    publishNewPost: publishNewPost,
}