var express  = require('express');  
var cookieParser  = require('cookie-parser');
var app = express();  

//add cookie parser to middleware  
app.use(cookieParser()); 

app.get("/", (request, response)=> { 


    //read the cookie
    if(request.cookies._manager && request.cookies._manager.cookieCreated){
        console.log('cookie : ' + request.cookies._session);
        //response.clearCookie('cookie');
    }
    //create a cookie
    else{
        console.log("pending.....");
        response.cookie('_session', '_@#$@#$%%^%', {maxAge: 10000});
        response.cookie('_manager', { cookieCreated: true});
    }
    response.send('cookie created...');
});

app.listen(3000);