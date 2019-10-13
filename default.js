var express  =  require('express'); 
var cookieParser  = require('cookie-parser');  
var session  = require('express-session');  
var ejs  = require('ejs'); 
var bodyParser = require('body-parser'); 
var MongoClient = require('mongodb').MongoClient;
var URL = "mongodb+srv://nodeuser:nodeuser1234@cluster0-dj9aw.mongodb.net/admin?retryWrites=true&w=majority"
var MongoHelper = require('./utilities/MongoHelper').MongoHelper;

var app = express();  
var viewsPath = __dirname + "/views"; 

app.set('view engine', 'ejs');  
app.set("views", viewsPath); 
app.set("view options",  { layout: false });

app.use(bodyParser({extended: true}));

app.get("/", (request, response) => { 
    response.render('index');
}); 

app.get("/login", (request, response) => {
    var auth = { username: '', isInvalid: false}; 
    response.render('login', auth);
}); 

app.post("/login", (request, response) => { 
   
    var auth = request.body; 
    auth.isInvalid = false;
    if(auth.username  === "admin" && auth.password === "admin"){
        response.render('admin');  
    }
    else{ 
        auth.isInvalid = true;
        response.render('login', auth);
    }
}); 

app.get("/course", (request, response)=>{

    var course  = { 
        title: '',  
        shortDescription: '',  
        content:  ''
    };

    response.render('course', course);
})

app.post("/course", (request, response)=>{

    var course  =  JSON.parse(JSON.stringify(request.body));

    createCourse(URL, "courses", "course", course, response);
    
})

async function createCourse(URL, database, collection, course, response){
    try {
        var mongoHelper = new MongoHelper();
        var server = await mongoHelper.connect(URL);
        var result = await mongoHelper.create(server, database, collection, course);
        console.log('record inserted successfully');
        response.render('success');

      } catch (error) {
        console.log(error);
        response.render('error');
      } finally {
        if (server) {
          server.close();
        }
      }

};

app.listen(3000);