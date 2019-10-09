var express = require('express');
var adminRoutes = require('./admin.js');
var app = express();  
const PORT_NUMBER = 3000

app.use("/admin", adminRoutes);
//http://localhost:3000/

app.get("/", (request, response) => { 

    var message = '<h2>Welcome to expressjs....!!!</h2>';
    message += '<br/><span>Date : 09-10-2019</span>';
    response.send(message);
});


/*
    http://localhost:3000/1
*/
app.get("/:id", (request, response) => { 

    var message = '<h2>ID requested ' + request.params.id + '</h2>';
    response.send(message);
});

/*
    http://localhost:3000/smith/1
*/
app.get("/:name/:id", (request, response) => { 

    var message = '<h2>ID requested ' + request.params.id + '</h2>';
    message += "<h3> Name: " +  request.params.name+"</h3>";
    response.send(message);
});

app.post("/", (request, response) => { 
    var message = '<h2>Post message from the expressjs</h2>';
    response.send(message);
});


//start the app to listen at port no - PORT_NO 
app.listen(PORT_NUMBER);