const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//memoriába egetett blog komponensek
let blogTitles = [
    "Elso blog oldalam"
]
let blogPosts = [
    {
        author: "jani",
        date: "2020.02.10",
        title: "How to kung fu",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut orci sed justo iaculis gravida. Fusce congue sollicitudin leo et ullamcorper. Nunc finibus metus eu condimentum consequat. Sed ut nulla dolor. Vivamus blandit venenatis sollicitudin. Donec ac porta risus, id suscipit quam. In ut turpis ipsum."
    }, 
    {
        author: "Tibi",
        date: "2020.02.13",
        title: "Mechanics",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut orci sed justo iaculis gravida. Fusce congue sollicitudin leo et ullamcorper. Nunc finibus metus eu condimentum consequat. Sed ut nulla dolor. Vivamus blandit venenatis sollicitudin. Donec ac porta risus, id suscipit quam. In ut turpis ipsum."
    },
    {
        author: "krisz",
        date: "2020.02.28",
        title: "Main chemicals",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut orci sed justo iaculis gravida. Fusce congue sollicitudin leo et ullamcorper. Nunc finibus metus eu condimentum consequat. Sed ut nulla dolor. Vivamus blandit venenatis sollicitudin. Donec ac porta risus, id suscipit quam. In ut turpis ipsum."
    }
]






app.get('/', function (req, res) {
    res.render('home', {blogs: blogPosts, blogTitle: blogTitles});
});

app.listen(3000);