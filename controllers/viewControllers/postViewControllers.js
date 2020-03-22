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
        let {id} = req.body
    res.redirect(`/postView/${id}`)
    }

    postsSingleView(req, res) {
        db.serialize(function () {
            let allID = new Promise(function (resolve, reject) {
                db.all("SELECT id FROM posts", function (err, results) {
                    supportId = results
                    let id = supportId.filter(element => element.id == req.params.id)
                    db.all(`SELECT title, content, author, date FROM posts WHERE id= "${id[0].id}"`, function (err, results) {
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
}


module.exports = {
    viewCont: postViewController,
}