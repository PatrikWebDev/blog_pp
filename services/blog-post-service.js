let blogTitles = [
    "Random Blog"
]

class BlogPostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

async search(keyWord) {
        const foundPosts = []
        try {
            const results = await this.postRepository.findall()

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

            results.forEach(element => {
                //UpperCase alakítsuk így mindegy hogy hogy írják be a szót és keressük titleben és contentben is
                if (((element.content).toUpperCase()).includes(keyWord.toUpperCase()) || ((element.title).toUpperCase()).includes(keyWord.toUpperCase())) {
                    foundPosts.push(element)
                }
                return
            })

            return foundPosts

        } catch (error) {
            if (error != null) {
                return (err, [])
            }
        }

    }

async postListView() {
        try {
            const results = await this.postRepository.findAll()
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

            let historyObject = {}

            results.forEach(
                element => {
                    const date = new Date(+(element.date))
                    if (date == "Invalid Date") {
                        return
                    } else {
                        const year = date.getFullYear()
                        const month = (date.getMonth()) + 1

                        if (!(year in historyObject)) {
                            historyObject[year] = {}
                        }

                        if (!(month in historyObject[year])) {
                            historyObject[year][month] = []
                        }

                        historyObject[year][month].push(element.title)

                    }
                }
            )
            const returnObject = {
                results: results,
                title: blogTitles,
                historyObject: historyObject
            }
            return returnObject
        }catch(error){
            if (error != null) {
                return 'Missing from database'
            }
        }
    }

async adminPostList() {
    try {
        const results = await this.postRepository.findAll()
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

            return results
        }catch(error){
            if (error != null) {
                return "Missing from database"
            }
        }

    }
async specificPost(searchCategory, searchKeyword){
    try {
        const results = await this.postRepository.selectSpecific(searchCategory, searchKeyword)
        return results
    } catch (error) {
        if (error != null) {
            return "Missing from database"
        }
    }
}


}

module.exports = {
    BlogPostService
}