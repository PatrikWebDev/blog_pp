const themePath = require('../../theme.json').path
const fs = require('fs')

function getTheme() {
    return themePath
}

class AppearanceController {

   async themeChanger(req, res){
        let {theme} = req.body
        let path = {
            path: theme
        }
       await fs.writeFileSync('theme.json',JSON.stringify(path))
        fs.readFileSync('theme.json', (err, data)=>{
            console.log(data)
        })
        res.redirect('/')

    }
}

module.exports = {
    getTheme,
    AppearanceController
}