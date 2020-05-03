const database = require('../databaseController/database-controller.js').dbPath

class PostViewController {
    constructor(blogPostService){
        this.blogPostService = blogPostService
    }

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
async    postsListView(req, res) {
            const results = await this.blogPostService.postListView()
            res.render('home', {
                blogs: results.results,
                blogTitle: results.blogTitles,
                historyObject: results.historyObject
            })
    }
    // =========================================

    //a fő oldali listáról irányít át egy nézettre
    singleViewRedirect(req, res) {
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
        res.render('admin_site', {database: database})
    }
    // =========================================

    // fő oldalról megnyitott egy blog bejegyzés nézette
async    postsSingleView(req, res) {
    try{
        const results = await this.blogPostService.postListView()
        const supportSlug = results.results
        const searchedSlug = supportSlug.filter(element => element.title.replace(/\s/g, "-") == req.params.title)
        const searchedResult = await this.blogPostService.specificPost('title',searchedSlug[0].title)
        PostViewController.dateChanger(await searchedResult)
        res.render('singleView', { post: searchedResult })
    }catch(error){
        res.send("Missing from database")
    }
}
    // =========================================

    // admin nézetttes listázása a postoknak
async adminPostList(req, res) {
        const results = await this.blogPostService.adminPostList()
        res.render('admin_post_list', { posts: results })
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