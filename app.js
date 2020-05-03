// IMPORTS
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser')
// ==================================================
// Controller Imports
const postView = require('./controllers/viewController/post-view-controllers.js').PostViewController
const logInOutController = require('./controllers/logInOutController/log-in-out-controller.js').LogInOutController
const sessionController = require ('./controllers/sessionController/session-controller.js').SessionController
const newPost= require('./controllers/postController/new-post-controller.js').NewPostController
const search= require ('./controllers/searchController/search-controller.js').SearchEngine
const databaseControll = require ('./controllers/databaseController/database-controller').DatabaseController
// ==================================================

const blogService = require('./services/blog-post-service.js').BlogPostService
const repository = require('./repositories/blog-post-repository.js').BlogPostRepository

const postViewController = new postView(new blogService(new repository()))
const newPostController = new newPost(new repository())
const searchController= new search(new blogService(new repository()))


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
app.get('/adminPostList', new sessionController().cookieChecker, postViewController.adminPostList.bind(postViewController))
app.get('/admin', new sessionController().cookieChecker , postViewController.adminSite.bind(postViewController))
// =========================================

// login/out Endpointhoz kapcsolódó endpointok
app.get('/login', new logInOutController().loginGet)
app.get('/logOut',  new logInOutController().logoutGet)
app.post('/login', new logInOutController().loginPost)
app.post('/logout', new sessionController().cookieDeleter, new logInOutController().logoutPost)
// =========================================

// newPost Endpointhoz kapcsolódó endpointok
app.post('/newPost',new sessionController().cookieChecker, newPostController.publishNewPost.bind(newPostController))
app.get('/newPostView',new sessionController().cookieChecker, postViewController.newPostView.bind(postViewController))
// =========================================

// editPost Endpointhoz kapcsolódó endpointok
app.post('/editPost', new sessionController().cookieChecker, postViewController.adminEdit.bind(postViewController))
// =========================================

// saveDRaft Endpointhoz kapcsolódó endpointok
app.post('/saveDraft', new sessionController().cookieChecker, newPostController.saveDraft.bind(newPostController))
//=======================================

// search Endpointhoz kapcsolódó endpointok
app.post('/searching', new sessionController().cookieChecker, searchController.search.bind(searchController))
//=======================================

// datbase Endpointhoz kapcsolódó endpointok
app.post('/databaseChange', new sessionController().cookieChecker, new databaseControll().changing)
//=======================================

app.listen(3000, ()=>{
    console.log("server started")
});