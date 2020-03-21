
let admin = {
    username: "admin",
    password: "password"
}

let sessions = {}


class sessionController {
    constructor() { }

    cookieChecker(req, res, next) {
        const authCookie = req.cookies;
        const session = sessions.cookie={authCookie};
        if (!(sessions.cookie.authCookie.sessionId)) {
            res.redirect('/login?fail=true')
            return
        }
        req.session = session;
        next()
    }

    cookieDeleter(req,res, next){
        let {logout} = req.body;
        if (logout == 'logout'){
            res.clearCookie("sessionId")
            delete sessions.cookie
            console.log(sessions)
            res.redirect('/login')
            return
        }
        res.send('Problem while logging out')
    }
}



module.exports = {
    sessionController: sessionController,
}