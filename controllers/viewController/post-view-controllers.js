const blogPostService = require('../../services/blog-post-service.js')
const sqlite3 = require('sqlite3')
const config = require('../../config.json')
const db = new sqlite3.Database(config.dbpath)
const css = require('../../theme.json').path
// =========================================

class PostViewController {

    // többször használt backward compatibility-t megoldó dátum átalakítás
    static dateChanger(dbValues) {
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
        let { title } = req.body
        let slug = title.replace(/\s/g, "-")
        res.redirect(`/postView/${slug}`, { css: `/themes/${css}.css` })
    }
    // =========================================

    // új post készítése
    newPostView(req, res) {
        res.render('new_post_view', { css: `/themes/${css}.css` })
    }
    // =========================================

    // admin oldal nézette
    adminSite(req, res) {
        res.render('admin_site', { css: `/themes/${css}.css` })
    }
    // =========================================

    // fő oldalról megnyitott egy blog bejegyzés nézette
    postsSingleView(req, res) {
        db.serialize(function () {
            db.all(`SELECT title from SLUG WHERE slug = ${req.params.title}`, function (err, results) {
                db.all(`SELECT title, content, author, date FROM posts WHERE title= "${results.title[0]}"`, function (err, results) {
                    if (err != null) {
                        res.send("Missing from database")
                    }

                    PostViewController.dateChanger(results)

                    res.render('singleView', { post: results, css: `/themes/${css}.css` })
                })
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
        res.render('new_post_view', { posts: req.body, css: `/themes/${css}.css` })
    }
    // =========================================
}


module.exports = {
    PostViewController
}