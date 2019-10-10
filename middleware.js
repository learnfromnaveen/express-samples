var express  = require('express');  
var app = express();  


app.use((request, response, next)=>{
    console.log('middleware executed...');
    next();
});

app.get("/", (request, response) => {
    console.log("/ root path served");
    response.send('<h3>Requeset serveed at: ' + Date.now() + '</h3>');
});

app.listen(3000);
