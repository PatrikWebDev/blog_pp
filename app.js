// IMPORTS
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser')
// ==================================================
// Controller Imports
const postViewController = require('./controllers/viewController/post-view-controllers.js').PostViewController
const logInOutController = require('./controllers/logInOutController/log-in-out-controller.js').LogInOutController
const sessionController = require ('./controllers/sessionController/session-controller.js').SessionController
const newPostController = require('./controllers/postController/new-post-controller.js').NewPostController
const searchEngine = require ('./controllers/searchController/search-controller.js').SearchEngine
const databaseControll = require ('./controllers/databaseController/database-controller').DatabaseController
const appearanceController = require ('./controllers/viewController/appearance-controller').AppearanceController
const userController = require ('./controllers/userController/user-controller').UserController
// ==================================================


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
app.get('/', new postViewController().postsListView);
 app.get('/postView/:title', new postViewController().postsSingleView);
app.post('/postView', new postViewController().singleViewRedirect);
// =========================================

// admin Endpointhoz kapcsolódó endpointok
app.get('/adminPostList', new sessionController().cookieChecker, new postViewController().adminPostList)
app.get('/admin', new sessionController().cookieChecker , new postViewController().adminSite)
// =========================================

// login/out Endpointhoz kapcsolódó endpointok
app.get('/login', new logInOutController().loginGet)
app.get('/logOut',  new logInOutController().logoutGet)
app.post('/login', new logInOutController().loginPost)
app.post('/logout', new sessionController().cookieDeleter, new logInOutController().logoutPost)
// =========================================

// newPost Endpointhoz kapcsolódó endpointok
app.post('/newPost',new sessionController().cookieChecker, new newPostController().publishNewPost)
app.get('/newPostView',new sessionController().cookieChecker, new postViewController().newPostView)
// =========================================

// archivumAppearanceChange Endpointhoz kapcsolódó endpointok
app.post('/archivumAppearanceChange',new sessionController().cookieChecker, new newPostController().publishNewPost)
// =========================================

// editPost Endpointhoz kapcsolódó endpointok
app.post('/editPost', new sessionController().cookieChecker, new postViewController().adminEdit)
// =========================================

// saveDRaft Endpointhoz kapcsolódó endpointok
app.post('/saveDraft', new sessionController().cookieChecker, new newPostController().saveDraft)
//=======================================

// search Endpointhoz kapcsolódó endpointok
app.post('/searching', new sessionController().cookieChecker, new searchEngine().search)
//=======================================

// datbase Endpointhoz kapcsolódó endpointok
app.post('/databaseChange', new sessionController().cookieChecker, new databaseControll().changing)
//=======================================

// theme Endpointhoz kapcsolódó endpointok
app.post('/themeChanger', new sessionController().cookieChecker, new appearanceController().themeChanger)
//=======================================

// newUser Endpointhoz kapcsolódó endpointok
app.post('/newUser', new sessionController().cookieChecker, new userController().newUser)
//=======================================

app.listen(3000, ()=>{
    console.log("server started")
});