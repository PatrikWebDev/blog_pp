// Működés szükséges dolgok
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('BlogPosts.db')
// =========================================

class SearchEngine {
    constructor(){}
// =========================================

// Megadott kereső szó alapján keress
    search(req, res){
        let {keyWord} = req.body
        let foundPosts = []
        db.serialize(function(){
            db.all("SELECT id, title, content, author, date FROM posts", function (err, results) {
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

                results.forEach(element=>{
                    //UpperCase alakítsuk így mindegy hogy hogy írják be a szót és keressük titleben és contentben is
                 if(((element.content).toUpperCase()).includes(keyWord.toUpperCase()) || ((element.title).toUpperCase()).includes(keyWord.toUpperCase())){
                    foundPosts.push(element)   
                }
                return
                })

                res.render('results', {foundPosts})
        })
    })
}
// =========================================

}

module.exports = {
    SearchEngine: SearchEngine
}