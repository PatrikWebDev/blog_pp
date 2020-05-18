const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('audience.db')

class AudienceRepository{
    all(){
        return new Promise((resolve,reject)=>{
            db.serialize(function(){
                db.all("SELECT ALL FROM audience", (err,result)=>{
                    if(err){
                        reject(err);
                        return
                    }
                    resolve(result)
                })
            })
        })
    }

    checking(userName, password){
        return new Promise((resolve,reject)=>{
            db.serialize(function(){
                db.all(`SELECT username, admin, superAdmin FROM audience WHERE username = "${userName}" AND password = "${password}"`, (err,result)=>{
                    if(err){
                        reject(err);
                        return
                    }
                    resolve(result)
                })
            })
        })
    }

    newUser(userData){
        db.serialize(function () {
            db.run(`INSERT INTO audience ( username, password, email, admin, superAdmin) VALUES ("${userData.name}", "${userData.password}", "${userData.email}", "${userData.admin}", "${userData.superAdmin}")`)
        })
    }
}

module.exports={
    AudienceRepository
}