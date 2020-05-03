// Működés szükséges dolgok
const uuid = require('uuid')
const uuidv4 = uuid.v4
// =========================================

class NewPostController {
    constructor(repository){
        this.repository = repository
    }
// egy function ami létrehozza a dátumot több helyen használható
    static creatingDate() {

        let currentdate = new Date();
        let datetime = "Posted : " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        return datetime
    }
// =========================================

// új blog postnak a publisholássa
    publishNewPost(req, res) {
        const failmessage = "Mindkét mező kitöltése kötelező"
        if (req.body.title == false && req.body.content == false) {
            res.render('new_post_view', { fail: failmessage })
        }

        let { sessionId } = req.cookies

        let blogPost = {
            id: `${uuidv4()}`,
            title: req.body.title,
            content: req.body.content,
            author: sessionId,
            created_at: +(new Date()),
        }

        this.repository.insertingPublishedPosts(blogPost)

        res.redirect('/admin')
    }
// =========================================

// a blog bejegyzés piszkozatként való elmentése
    saveDraft(req, res) {
        let blogPost = {
            id: `${uuidv4()}`,
            title: req.body.title,
            content: req.body.content,
            author: sessionId,
            created_at:  +(new Date()),
        }

        this.repository.inserintDraftedPosts(blogPost)
        res.redirect('/admin')
    }
// =========================================
}


module.exports = {
    NewPostController
}