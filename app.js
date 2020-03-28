//TODO: refactor newPost = NewPostController


// EXPORTS
const express = require('express');
const exphbs = require('express-handlebars');
const logControllerexport = require('./controllers/logControllers/logController.js')
const cookieParser = require('cookie-parser');
const postViewCont = require('./controllers/viewControllers/postViewControllers.js')
const sessionControl = require ('./controllers/sessionController/sessionController.js')
const newPostCont= require('./controllers/postControllers/new_post_controller')
const cors = require('cors')
const bodyParser = require('body-parser')
// ==================================================

// Példányosított Controllerek
const logController = new logControllerexport.logController();
const newPost = new newPostCont.postHandling();
const cookieChecker =new sessionControl.sessionController()
const viewCont = new postViewCont.viewCont();
// ====================================================

// Egyéb működés szükséges dolgok
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(cors())
// =========================================

// View Controlls
    // GET
    app.get('/', viewCont.postsListView);
    app.get('/postView/:title', viewCont.postsSingleView);
    app.get('/adminPostList', cookieChecker.cookieChecker, viewCont.adminPostList)
    app.get('/admin', cookieChecker.cookieChecker , viewCont.adminSite)
    app.get('/newPostView',cookieChecker.cookieChecker, viewCont.newPostView)
    // POST
    app.post('/postView', viewCont.singleViewRedirect);
    app.post('/editPost', cookieChecker.cookieChecker, viewCont.adminEdit)
//=======================================
    
// LOG IN/OUT Controlls
    // GET
    app.get('/login', logController.loginGet)
    app.get('/logOut',  logController.logoutGet)
    // POST
    app.post('/login', logController.loginPost)
    app.post('/logout', cookieChecker.cookieDeleter, logController.logoutPost)
    // ================================================
    
    // NewPost Controlls
    // GET
    // POST
    app.post('/newPost',cookieChecker.cookieChecker, newPost.publishNewPost)
    app.post('/saveDraft', cookieChecker.cookieChecker, newPost.saveDraft)
// =============================================

app.listen(3000);