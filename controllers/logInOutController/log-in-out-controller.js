class LogInOutController{
     constructor(repository, JWT){
        this.repository = repository,
        this.jwt = JWT
     }
// =========================================
// Bejelentkezési oldalt rendereli
     loginGet(req, res){
         if(req.query.fail=== 'true'){
            const failmessage = "Hibás felhasználónév vagy jelszó"
            res.render('login', { fail: failmessage })
        } else {
            res.render('login')
        }
    }
// =========================================
//Bejelentkezési adatokat ellenőrzi, bejelentkeztett
 async loginPost (req, res){
     try{
        const {username, userpassword} = req.body
        const results = await this.repository.checking(username, userpassword)
        res.cookie("sessionId",this.jwt.sign(...results))
        res.redirect('/admin')
    }catch(error){
        res.redirect('/login?fail=true')
     };
    }
    // =========================================
    //Kijelentkeztett
    logoutGet(res) {
        res.render('login')
    }
    // =========================================
    //Kijelentkezési adatokat fogadja
    logoutPost(res) {
        res.redirect('/logOut')
    }
    // =========================================
}

module.exports = {
    LogInOutController
}