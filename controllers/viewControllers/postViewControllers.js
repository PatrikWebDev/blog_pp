const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('BlogPosts.db')

//memoriába egetett blog komponensek
let blogTitles = [
    "Elso blog oldalam"
]

class postViewController {
    constructor() {

    }

    postsListView(req, res) {
        db.serialize(function () {
            db.all("SELECT id, title, author, date FROM posts", function (err, results) {
                if (err != null) {
                    res.send("Missing from database")
                }

                let smth = {
                }

                results.forEach(element => {
                    if (+(element.date)) {
                        return element.date = new Date(+(element.date))
                    }
                    return element.date
                })

                results.forEach(element => {
                    if (element.date == "Invalid Date") {
                        return element.date = "Before Date was found"
                    }
                })

                results.forEach(
                    element => {
                        const a = new Date(+(element.date))
                        if (a == "Invalid Date") {
                            return
                        } else {
                            const year = a.getFullYear()
                            const month = (a.getMonth()) + 1
                            
                            if (!(year in smth)) {
                                smth[year] = {}
                            }

                            if (!(month in smth[year])) {
                                smth[year][month] = []
                            }

                            smth[year][month].push(element.title)

                        }
                    }



                )
                res.render('home', { blogs: results, blogTitle: blogTitles, smth });
            });
        });
    }

    singleViewRedirect(req, res) {
        console.log(req.body)
        let { title } = req.body
        let slug = title.replace(/\s/g, "-")
        res.redirect(`/postView/${slug}`)
    }


    newPostView(req, res) {
        res.render('new_post_view')
    }

    adminSite(req, res) {
        res.render('admin_site')
    }

    postsSingleView(req, res) {
        db.serialize(function () {
            db.all("SELECT title FROM posts", function (err, results) {
                console.log(results)
                let supportSlug = results
                let searchedSlug = supportSlug.filter(element => element.title.replace(/\s/g, "-") == req.params.title)
                db.all(`SELECT title, content, author, date FROM posts WHERE title= "${searchedSlug[0].title}"`, function (err, results) {
                    if (err != null) {
                        res.send("Missing from database")
                    }

                    results.forEach(element => {
                        if (+(element.date)) {
                            return element.date = new Date(+(element.date))
                        }
                        return element.date
                    })

                    results.forEach(element => {
                        if (element.date == "Invalid Date") {
                            return element.date = "Before Date was found"
                        }
                    })

                    res.render('singleView', { post: results })
                }
                )
            })
        })
    }

    adminPostList(req, res) {
        db.serialize(function () {
            db.all("SELECT title, author, date, content FROM posts", function (err, results) {
                if (err != null) {
                    res.send("Missing from database")
                }
                res.render('admin_post_list', { posts: results })
            })
        })

    }

    adminEdit(req, res) {
        console.log(req.body)
        res.render('new_post_view', { posts: req.body })
    }

}


module.exports = {
    viewCont: postViewController,
}