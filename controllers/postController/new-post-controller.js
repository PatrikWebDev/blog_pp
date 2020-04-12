// Működés szükséges dolgok
const uuid = require('uuid')
const uuidv4 = uuid.v4
const repository = require('../../repositories/blog-post-repository.js').BlogPostRepository
// =========================================

class NewPostController {
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
        console.log(req.body.tags.split(','))
        let blogPost = {
            id: `${uuidv4()}`,
            title: req.body.title,
            content: req.body.content,
            author: sessionId,
            created_at: +(new Date()),
            tags: req.body.tags.split(',')
        }
        console.log(blogPost.tags)
        new repository().insertingPublishedPosts(blogPost)

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
            tags: req.body.tags
        }

        new repository().inserintDraftedPosts(blogPost)
        res.redirect('/admin')
    }
// =========================================
}


module.exports = {
    NewPostController
}