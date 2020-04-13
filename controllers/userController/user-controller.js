// Működés szükséges dolgok
const uuid = require('uuid')
const uuidv4 = uuid.v4
const repository = require('../../repositories/users-repository').UserRepository

class UserController{
    newUser(req, res){
        // const failmessage = "Mindkét mező kitöltése kötelező"
        if (req.body.username == false && req.body.password == false) {
            res.send("Hiba")
            // res.render('new_post_view', { fail: failmessage })
        }

        let userData = {
            id: `${uuidv4()}`,
            name: req.body.username,
            password: req.body.password,
        }
        new repository().insertingNewUser(userData)

        res.redirect('/admin')
    }

    findAll(controllerCallback){
        new repository().findAll(function (err, results) {
            if (err != null) {
                // controllerCallback.send(err, [])
                return
            }else{
                
                controllerCallback(results)
            }
            
        })
    }
}

module.exports={
    UserController
}