class UserController{
    constructor(userRepository){
        this.userRepository = userRepository
    }
 newUser(req, res){
        // const failmessage = "Mindkét mező kitöltése kötelező"
        if (req.body.username == false && req.body.password == false) {
            res.send("Hiba")
        }
        try {
            let userData = {
                name: req.body.username,
                password: req.body.password,
                email: req.body.email
            }
    
            if(req.body.auth == "user"){
                userData.admin = 'false'
                userData.superAdmin = 'false'
            }else if(req.body.auth == "admin"){
                userData.admin = 'true'
                userData.superAdmin = 'false'
            }else{
                userData.admin = 'true'
                userData.superAdmin = 'true'
            }
            
         this.userRepository.newUser(userData)
    
            res.redirect('/admin')   
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports={
    UserController
}