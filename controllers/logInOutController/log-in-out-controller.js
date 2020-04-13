const userController = require('../userController/user-controller').UserController


// Beégetett admin felhasználó
const admin = {
    username: "admin",
    password: "password"
}

class LogInOutController {
    constructor() { }
    // =========================================
    // Bejelentkezési oldalt rendereli
    loginGet(req, res) {
        if (req.query.fail === 'true') {
            const failmessage = "Hibás felhasználónév vagy jelszó"
            res.render('login', { fail: failmessage })
        } else {
            res.render('login')
        }
    }
    // =========================================
    //Bejelentkezési adatokat ellenőrzi, bejelentkeztett
    async loginPost(req, res) {
        let allowed = []
        new userController().findAll(
            function (results) {
                results.forEach(element => {
                    let { username, userpassword } = req.body
                    if (username == element.username && userpassword == element.password) {
                        allowed.push(element)
                        return
                    }
                })

                if (allowed.length == 1) {
                    res.cookie('sessionId', `${allowed[0].username}`)
                    res.redirect('/admin')
                    return
                }

                if (username = admin.username && userpassword == admin.password) {
                    res.cookie('sessionId', 'admin')
                    res.redirect('/admin')
                    return
                } else {
                   
                    res.redirect('/login?fail=true')

                }

            }
        )
        let { username, userpassword } = req.body


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