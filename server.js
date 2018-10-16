const express = require('express');
const app = express();

//set port
const port = process.env.PORT || 8080
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

//routes
app.get("/", function(req,res){
    
    let apiKey = process.env.GOOGLE_CIVICS_API_KEY

    res.render("index", {apiKey: apiKey});
    
})

app.get("/show", function(req,res){
    
    let apiKey = process.env.GOOGLE_CIVICS_API_KEY

    res.render("show", {apiKey: apiKey});
})

app.listen(port,function(){
    console.log("app running!")
})