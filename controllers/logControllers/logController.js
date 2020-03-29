// Beégetett admin felhasználó
let admin = {
    username: "admin",
    password: "password"
}

class LogController{
    constructor(){}
// =========================================
// Bejelentkezési oldalt rendereli
     loginGet(req, res){
         if(req.query.fail=== 'true'){
            const failmessage = "Hibás felhasználónév vagy jelszó"
            res.render('login',{fail: failmessage})
        }else{
            res.render('login')
        }
    }
// =========================================
//Bejelentkezési adatokat ellenőrzi, bejelentkeztett
    loginPost (req, res){
        let {username, userpassword} = req.body
        if(username = admin.username && userpassword == admin.password){
            res.cookie('sessionId', 'admin')
            res.redirect('/admin')
        }else{
            res.redirect('/login?fail=true')
        }
    }
// =========================================
//Kijelentkeztett
    logoutGet(req, res){
        res.render('login')
    }
// =========================================
//Kijelentkezési adatokat fogadja
    logoutPost(req, res){
        res.redirect('/logOut')
    }
// =========================================
}

module.exports = {
LogController: LogController,
}