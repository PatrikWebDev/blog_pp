// Session declration
let sessions = {}


class SessionController {
    constructor() { }
    // Leellenőrzi van-e érvényes sessionja a felhasználónak
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
    // =========================================
    // törli a sessiont
    cookieDeleter(req,res, next){
        let {logout} = req.body;
        if (logout == 'logout'){
            res.clearCookie("sessionId")
            delete sessions.cookie
            res.redirect('/login')
            return
        }
        res.send('Problem while logging out')
    }
    // =========================================
}



module.exports = {
    SessionController: SessionController,
}