let admin = {
    username: "admin",
    password: "password"
}


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
            res.redirect('/admin')
        }else{
            res.redirect('/login?fail=true')
        }
    
    }
}



module.exports = {
logController: logController,
}