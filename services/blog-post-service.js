const repository = require('../repositories/blog-post-repository').BlogPostRepository
const css = require ('../theme.json').path
let blogTitles = [
    "Elso blog oldalam"
]
class BlogPostService {
    search(controllerCallback, keyWord) {
        console.log(keyWord)
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
             if(((element.content).toUpperCase()).includes(keyWord.toUpperCase()) || ((element.title).toUpperCase()).includes(keyWord.toUpperCase()) || ((element.tags).toUpperCase()).includes(keyWord.toUpperCase())){
                foundPosts.push(element)   
            }
            return
            })

            controllerCallback.render('results', {foundPosts, css: `/themes/${css}.css`})

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

            let tags = []

            results.forEach(
                element =>{
                    (element.tags.split(',')).forEach(
                        mostInnerArr=>{
                            console.log(mostInnerArr)
                            if (!(tags.includes(mostInnerArr))) {
                               tags.push(mostInnerArr)
                            }
                        }
                    )
                }
            )
                console.log(tags)
            controllerCallback.render('home', { blogs: results, blogTitle: blogTitles, smth, tags, css: `/themes/${css}.css`})
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

            controllerCallback.render('admin_post_list', { posts: results, css: `/themes/${css}.css`})
        }
        )
    }



}

module.exports={
    BlogPostService
}