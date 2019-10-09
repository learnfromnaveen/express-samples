var express =  require('express');  
var router  = express.Router();  

router.get("/", (request, response)=>{
    response.send("<h3>Admin root</h3>");
});

router.get("/:id", (request, response)=>{
    response.send("<h3>Admin root: " + request.params.id+ "</h3>");
});

module.exports = router;

router.get("/create", (request, response)=>{
    response.send("<h3>admin/create</h3>");
});