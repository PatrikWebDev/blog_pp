class SearchEngine {
// =========================================
    constructor(blogPostService){
        this.BlogPostService = blogPostService
    }
// Megadott kereső szó alapján keress
    search(req, res){
        const {keyWord} = req.body
        const results = this.BlogPostService.search(keyWord)
        res.render('results', {results})
}
// =========================================

}

module.exports = {
    SearchEngine
}