const repository = require('../repositories/blog-post-repository').BlogPostRepository
let blogTitles = [
    "Elso blog oldalam"
]
class BlogPostService {
    search(controllerCallback, keyWord) {
        let foundPosts = []
        new repository().findAll(function (err, results) {
            if (err != null) {
                controllerCallback.send(err, [])
                return
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

            controllerCallback.render('results', {foundPosts})

        })
    }

    postListView(controllerCallback){
       new repository().findAll(function (err, results) {
            if (err != null) {
                controllerCallback.send('Missing from database')
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
            
            let smth = {}

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
            controllerCallback.render('home', { blogs: results, blogTitle: blogTitles, smth })
        })

    }

    adminPostList(controllerCallback){
        new repository().findAll(function (err, results) {
            if (err != null) {
                controllerCallback.send("Missing from database")
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

            controllerCallback.render('admin_post_list', { posts: results })
        }
        )

    }



}

module.exports={
    BlogPostService
}