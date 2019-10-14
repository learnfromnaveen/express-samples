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

app.use("/styles",express.static('styles'))
// app.use(express.static('files'))

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

    //var course  =  JSON.parse(JSON.stringify(request.body));

    //createCourse(URL, "courses", "course", course, response);
    response.render('shared/success', { data: {
        message: 'Course was created successfully...'
     }
 });
    
})

async function createCourse(URL, database, collection, course, response){
    try {
        var mongoHelper = new MongoHelper();
        var server = await mongoHelper.connect(URL);
        var result = await mongoHelper.create(server, database, collection, course);
        console.log('record inserted successfully');
        response.render('shared/success');

      } catch (error) {
        console.log(error);
        response.render('error');
      } finally {
        if (server) {
          server.close();
        }
      }

};

var pageData = { 
    navLinks : [
        { id: 1, text: 'Home', path: '/home'}, 
        { id: 2, text: 'About', path: '/about'}, 
        { id: 3, text: 'Contact', path: '/contactus'}, 
        { id: 4, text: 'Login', path: '/secured/login'}, 

    ]
};


app.get("/bootstrap", (request, response)=>{
  
    response.render('bootstrap-demo/home', pageData);
})

app.get("/secured/login", (request, response)=>{
  
    response.render('bootstrap-demo/login', pageData);
})

app.listen(3000);