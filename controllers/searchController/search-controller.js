const blogPostService = require('../../services/blog-post-service.js').BlogPostService
class SearchEngine {
// =========================================

// Megadott kereső szó alapján keress
    search(req, res){
        let {keyWord} = req.body
        let {keyTag} = req.body
        if(!(keyWord)){
            new blogPostService().search(res,keyTag)   
        }else{
            new blogPostService().search(res,keyWord)
        }
}
// =========================================

}

module.exports = {
    SearchEngine
}