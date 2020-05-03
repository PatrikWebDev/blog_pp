// IMPORTS
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser')
// ==================================================
// Controller Imports
const postView = require('./controllers/viewController/post-view-controllers.js').PostViewController
const logInOut = require('./controllers/logInOutController/log-in-out-controller.js').LogInOutController
const session = require ('./controllers/sessionController/session-controller.js').SessionController
const newPost= require('./controllers/postController/new-post-controller.js').NewPostController
const search= require ('./controllers/searchController/search-controller.js').SearchEngine
const databaseControll = require ('./controllers/databaseController/database-controller').DatabaseController
// ==================================================

const blogService = require('./services/blog-post-service.js').BlogPostService
const repository = require('./repositories/blog-post-repository.js').BlogPostRepository
const audiencerepository = require('./repositories/audience-repository').AudienceRepository
const JWT = require('./tokens/jwt.js')


const postViewController = new postView(new blogService(new repository()))
const newPostController = new newPost(new repository(),JWT)
const searchController= new search(new blogService(new repository()))
const logInOutController = new logInOut(new audiencerepository(),JWT)
const sessionController = new session(JWT)

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
app.get('/', postViewController.postsListView.bind(postViewController));
app.get('/postView/:title', postViewController.postsSingleView.bind(postViewController));
app.post('/postView', postViewController.singleViewRedirect.bind(postViewController));
// =========================================

// admin Endpointhoz kapcsolódó endpointok
app.get('/adminPostList', sessionController.cookieChecker.bind(sessionController), postViewController.adminPostList.bind(postViewController))
app.get('/admin', sessionController.cookieChecker.bind(sessionController), postViewController.adminSite.bind(postViewController))
// =========================================

// login/out Endpointhoz kapcsolódó endpointok
app.get('/login', logInOutController.loginGet.bind(logInOutController))
app.get('/logOut', logInOutController.logoutGet.bind(logInOutController))
app.post('/login', logInOutController.loginPost.bind(logInOutController))
app.post('/logout', sessionController.cookieDeleter.bind(sessionController), logInOutController.logoutPost.bind(logInOutController))
// =========================================

// newPost Endpointhoz kapcsolódó endpointok
app.post('/newPost', sessionController.cookieChecker.bind(sessionController), newPostController.publishNewPost.bind(newPostController))
app.get('/newPostView', sessionController.cookieChecker.bind(sessionController), postViewController.newPostView.bind(postViewController))
// =========================================

// editPost Endpointhoz kapcsolódó endpointok
app.post('/editPost', sessionController.cookieChecker.bind(sessionController), postViewController.adminEdit.bind(postViewController))
// =========================================

// saveDRaft Endpointhoz kapcsolódó endpointok
app.post('/saveDraft', sessionController.cookieChecker.bind(sessionController), newPostController.saveDraft.bind(newPostController))
//=======================================

// search Endpointhoz kapcsolódó endpointok
app.post('/searching', sessionController.cookieChecker.bind(sessionController), searchController.search.bind(searchController))
//=======================================

// datbase Endpointhoz kapcsolódó endpointok
app.post('/databaseChange', sessionController.cookieChecker.bind(sessionController), new databaseControll().changing)
//=======================================

app.listen(3000, ()=>{
    console.log("server started")
});