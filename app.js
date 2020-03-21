const express = require('express');
const exphbs = require('express-handlebars');
const logControllerexport = require('./controllers/logControllers/logController.js')
const newPost= require('./controllers/postControllers/new_post_controller')
const cookieParser = require('cookie-parser');
const logController = new logControllerexport.logController();
const sessionControl = require ('./controllers/sessionController/sessionController.js')
const cookieChecker =new sessionControl.sessionController()
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('BlogPosts.db')
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.urlencoded())



//memoriába egetett blog komponensek
let blogTitles = [
    "Elso blog oldalam"
]
let blogPosts = [
    {
        author: "jani",
        date: "2020.02.10",
        title: "How to kung fu",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut orci sed justo iaculis gravida. Fusce congue sollicitudin leo et ullamcorper. Nunc finibus metus eu condimentum consequat. Sed ut nulla dolor. Vivamus blandit venenatis sollicitudin. Donec ac porta risus, id suscipit quam. In ut turpis ipsum."
    }, 
    {
        author: "Tibi",
        date: "2020.02.13",
        title: "Mechanics",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut orci sed justo iaculis gravida. Fusce congue sollicitudin leo et ullamcorper. Nunc finibus metus eu condimentum consequat. Sed ut nulla dolor. Vivamus blandit venenatis sollicitudin. Donec ac porta risus, id suscipit quam. In ut turpis ipsum."
    },
    {
        author: "krisz",
        date: "2020.02.28",
        title: "Main chemicals",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut orci sed justo iaculis gravida. Fusce congue sollicitudin leo et ullamcorper. Nunc finibus metus eu condimentum consequat. Sed ut nulla dolor. Vivamus blandit venenatis sollicitudin. Donec ac porta risus, id suscipit quam. In ut turpis ipsum."
    }
]



let admin = {
    username: "admin",
    password: "password"
}

app.get('/', function (req, res) {

    db.serialize(function () {
        db.all("SELECT title, content, author, date FROM posts", function (err, results) {
            if (err != null) {
                res.send("Missing from database")
            }
            res.render('home', {blogs: results, blogTitle: blogTitles});
        });
    });

});

app.get('/login', logController.loginGet)

app.post('/login', logController.loginPost)

app.get('/admin', cookieChecker.cookieChecker ,function(req, res){
    
    res.render('admin_site')
})

app.get('/newPostView',cookieChecker.cookieChecker,function(req, res){
    res.render('new_post_view')
})

app.post('/newPost',cookieChecker.cookieChecker, newPost.publishNewPost)

app.post('/logout', cookieChecker.cookieDeleter, function(req, res){
    res.redirect('/logOut')
})

app.get('/logOut',  function(req,res){
    res.render('login')
})

app.listen(3000);