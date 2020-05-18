const themePath = require('../../theme.json').path
const fs = require('fs')

function getTheme() {
    return themePath
}

class AppearanceController {
    themeChanger(req, res){
        let {theme} = req.body
        let path = {
            path: theme
        }
        console.log("itt")
        new Promise((resolve,reject)=>{
          let a =  fs.writeFileSync('theme.json', JSON.stringify(path))
            fs.readFileSync('theme.json', (err, data)=>console.log("itt"))

            resolve(a)
        }).then(
            res.redirect('/admin')
        ) 
    }
}

module.exports = {
    getTheme,
    AppearanceController
}