const express = require('express');
const exphbs = require('express-handlebars');
const logControllerexport = require('./controllers/logControllers/logController.js')
const newPostCont= require('./controllers/postControllers/new_post_controller')
const newPost = new newPostCont.postHandling();
const cookieParser = require('cookie-parser');
const logController = new logControllerexport.logController();
const postViewCont = require('./controllers/viewControllers/postViewControllers.js')
const viewCont = new postViewCont.viewCont();
const sessionControl = require ('./controllers/sessionController/sessionController.js')
const cookieChecker =new sessionControl.sessionController()
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('BlogPosts.db')
const app = express();
const cors = require('cors')


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(cors())



let admin = {
    username: "admin",
    password: "password"
}

app.get('/', viewCont.postsListView);

app.post('/postView', viewCont.singleViewRedirect);

app.get('/postView/:title', viewCont.postsSingleView);

app.get('/login', logController.loginGet)

app.post('/login', logController.loginPost)

app.get('/admin', cookieChecker.cookieChecker ,function(req, res){
    
    res.render('admin_site')
})

app.get('/newPostView',cookieChecker.cookieChecker,function(req, res){
    res.render('new_post_view')
})

app.post('/newPost',cookieChecker.cookieChecker, newPost.publishNewPost)

app.post('/saveDraft', cookieChecker.cookieChecker, newPost.saveDraft)

app.post('/logout', cookieChecker.cookieDeleter, function(req, res){
    res.redirect('/logOut')
})

app.get('/logOut',  function(req,res){
    res.render('login')
})

app.listen(3000);