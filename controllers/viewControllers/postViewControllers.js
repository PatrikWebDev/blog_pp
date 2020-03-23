const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('BlogPosts.db')

//memoriába egetett blog komponensek
let blogTitles = [
    "Elso blog oldalam"
]

let supportId


class postViewController {
    constructor() {

    }

    postsListView(req, res) {
        db.serialize(function () {
            db.all("SELECT id, title, author, date FROM posts", function (err, results) {
                if (err != null) {
                    res.send("Missing from database")
                }
                res.render('home', { blogs: results, blogTitle: blogTitles });
            });
        });
    }

    singleViewRedirect(req, res){
        let {title} = req.body
        let slug = title.replace(/\s/g, "-")
    res.redirect(`/postView/${slug}`)
    }

    postsSingleView(req, res) {
        db.serialize(function () {
            let allSlug = new Promise(function (resolve, reject) {
                db.all("SELECT title FROM posts", function (err, results) {
                   console.log(results)
                    let supportSlug = results
                    let searchedSlug = supportSlug.filter(element => element.title.replace(/\s/g, "-") == req.params.title)
                    db.all(`SELECT title, content, author, date FROM posts WHERE title= "${searchedSlug[0].title}"`, function (err, results) {
                        if (err != null) {
                            res.send("Missing from database")
                        }
                        resolve(res.render('singleView', { post: results[0] }))
                    }
                    )
                })

            })
        })
    }

    adminPostList(req, res){
        db.serialize(function(){
            db.all("SELECT title, author, date, content FROM posts", function (err , results){
                if (err != null) {
                    res.send("Missing from database")
                }
                res.render('admin_post_list', {posts: results})
            })
        })

    }

    adminEdit(req, res){
        console.log(req.body)
        res.render('new_post_view', {posts: req.body})
    }

}


module.exports = {
    viewCont: postViewController,
}