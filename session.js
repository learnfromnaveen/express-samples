var express  = require('express');  
var cookieParser  = require('cookie-parser')
var session  =  require('express-session');

var app  = express();  

app.use(cookieParser());  
app.use(session({ secret: 'secret'}));  

app.get("/", (request, response) =>{
    if(request.session.page_views){
        request.session.page_views++;
        response.send("You access this page for the " + request.session.page_views  + " times!!!");
    }
    else{ 
        request.session.page_views = 1;
        response.send("You access this page for the first time!!");
    }
});

app.listen(3000);