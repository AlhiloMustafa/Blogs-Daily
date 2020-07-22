
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express(); // create express object 

 // After the view engine is set, you don’t have to specify the engine or load the template engine module in your app;
 // Express loads the module internally
app.set('view engine', 'ejs'); //view engine, the template engine to use

// next line : 
//Returns middleware that only parses {urlencoded} bodies and only looks at requests where the Content-Type header matches the type option.
// This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
//A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). 
//This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public")); // Tho create the public directory
myposts=[] // JS object to store the title and the the post it self

var about = "Some contects about me...."
var contactme="My Contacts info..."

// Home Route  
app.get("/",function(req,res){
  res.render("home",{posts:myposts});
});

app.get("/posts/:anything",function(req,res){
  var titleFromPath = _.lowerCase(req.params.anything)
  myposts.forEach(function(post){
    var postTitle = _.lowerCase(post.title)
    if (postTitle === titleFromPath ){
      res.render("post",{post:post})
    }
  });
});

app.get("/about",function(req,res){
  res.render("about",{aboutCont:about})
});

app.get("/contact",function(req,res){
  res.render("contact",{contactCont:contactme})
});

app.get("/compose",function(req,res){
  res.render("compose")
});

app.post("/compose",function(req,res){
  var mypost={title:req.body.title , postitself:req.body.thePost} // empty object to save the current post 
  myposts.push(mypost) // add the current object to my list objects and pass it to the home route
  res.redirect("/")
});

// app listing to port 3000 
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
