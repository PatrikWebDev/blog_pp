const sessionControl = require ('../sessionController/sessionController.js')
const cookieChecker = new sessionControl.sessionController()
let admin = {
    username: "admin",
    password: "password"
}

const sessions = {}


class logController{
    constructor(){

    }

     loginGet(req, res){
         if(req.query.fail=== 'true'){
            const failmessage = "Hibás felhasználónév vagy jelszó"
            res.render('login',{fail: failmessage})
        }else{
            res.render('login')
        }
    }
    
    loginPost (req, res){
        let {username, userpassword} = req.body
        if(username = admin.username && userpassword == admin.password){
            res.cookie('sessionId', 'admin')
            res.redirect('/admin')
        }else{
            res.redirect('/login?fail=true')
        }
    
    }

    logoutPost(req, res){
        
    }
}



module.exports = {
logController: logController,
}