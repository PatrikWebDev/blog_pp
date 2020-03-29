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
const logController = new logControllerexport.LogController();
const newPost = new newPostCont.NewPostCont();
const cookieChecker =new sessionControl.SessionController()
const viewCont = new postViewCont.PostViewController();
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

// postView Endpointhoz kapcsolódó endpointok
app.get('/', viewCont.postsListView);
app.get('/postView/:title', viewCont.postsSingleView);
app.post('/postView', viewCont.singleViewRedirect);
// =========================================

// admin Endpointhoz kapcsolódó endpointok
app.get('/adminPostList', cookieChecker.cookieChecker, viewCont.adminPostList)
app.get('/admin', cookieChecker.cookieChecker , viewCont.adminSite)
// =========================================

// login/out Endpointhoz kapcsolódó endpointok
app.get('/login', logController.loginGet)
app.get('/logOut',  logController.logoutGet)
app.post('/login', logController.loginPost)
app.post('/logout', cookieChecker.cookieDeleter, logController.logoutPost)
// =========================================

// newPost Endpointhoz kapcsolódó endpointok
app.post('/newPost',cookieChecker.cookieChecker, newPost.publishNewPost)
app.get('/newPostView',cookieChecker.cookieChecker, viewCont.newPostView)
// =========================================

// editPost Endpointhoz kapcsolódó endpointok
app.post('/editPost', cookieChecker.cookieChecker, viewCont.adminEdit)
// =========================================

// saveDRaft Endpointhoz kapcsolódó endpointok
app.post('/saveDraft', cookieChecker.cookieChecker, newPost.saveDraft)
//=======================================

app.listen(3000, ()=>{
    console.log("server started")
});