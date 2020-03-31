 const blogPostService = require('../../services/blog-post-service.js')
 const sqlite3 = require('sqlite3')
 const config = require('../../config.json')
 const db = new sqlite3.Database(config.dbpath)
 // =========================================

class PostViewController {

// többször használt backward compatibility-t megoldó dátum átalakítás
    static dateChanger(dbValues){
        dbValues.forEach(element => {
            if (+(element.date)) {
                return element.date = new Date(+(element.date))
            }
            return element.date
        })

        dbValues.forEach(element => {
            if (element.date == "Invalid Date") {
                return element.date = "Before Date was found"
            }
        })
    }
// =========================================

// a fő oldalon listázza a blog bejegyzéseket az oldalon egy archívummal
    postsListView(req, res) {
            new blogPostService.BlogPostService().postListView(res)

    }
    // =========================================

    //a fő oldali listáról irányít át egy nézettre
    singleViewRedirect(req, res) {
        console.log(req.body)
        let { title } = req.body
        let slug = title.replace(/\s/g, "-")
        res.redirect(`/postView/${slug}`)
    }
    // =========================================

    // új post készítése
    newPostView(req, res) {
        res.render('new_post_view')
    }
    // =========================================

    // admin oldal nézette
    adminSite(req, res) {
        res.render('admin_site',/* {database: databases, currentDB: db.filename}*/)
    }
    // =========================================

    // fő oldalról megnyitott egy blog bejegyzés nézette
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

                    PostViewController.dateChanger(results)

                    res.render('singleView', { post: results })
                }
                )
            })
        })
    }
    // =========================================

    // admin nézetttes listázása a postoknak
    adminPostList(req, res) {
        new blogPostService.BlogPostService().adminPostList(res)
    }
    // =========================================

    // egy publikált postot az admin szerkeszteni tud
    adminEdit(req, res) {
        res.render('new_post_view', { posts: req.body })
    }
    // =========================================
}


module.exports = {
    PostViewController
}