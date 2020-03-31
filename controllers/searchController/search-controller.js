const blogPostService = require('../../services/blog-post-service.js').BlogPostService
class SearchEngine {
// =========================================

// Megadott kereső szó alapján keress
    search(req, res){
        let {keyWord} = req.body
        new blogPostService().search(res,keyWord)
}
// =========================================

}

module.exports = {
    SearchEngine
}