//body-parser is a third party package you have install it 
// npm install --save-dev body-parser  

var express  = require('express');  
var bodyParser = require('body-parser');  

var app = express();  


//converts the posted form paramters to json 
app.use(bodyParser.json());
//include the encoded url 
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (request, response) => {
    console.log("/ root path served");
    response.send('<h3>Requeset serveed at: ' + Date.now() + '</h3>');
});


// POST http://localhost:8080/api/users
// parameters sent with 
app.post('/api/users', function(request, response) {
    var user_id = request.body.id;
    var token = request.body.token;
    var geo = request.body.geo;

    response.send(user_id + ' ' + token + ' ' + geo);
});

app.listen(3000);
