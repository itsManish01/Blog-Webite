//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
var posts = [
  { title: 'Day 1', post: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis minus, quasi mollitia dicta doloribus consequatur laborum voluptatem architecto voluptas in facere labore at ratione molestias perspiciatis, libero recusandae iste! Similique dicta officiis fuga quam magni cupiditate quisquam atque consequuntur quae provident? Repellendus aut ut facilis! Dicta laudantium nihil iste sed obcaecati doloremque labore incidunt blanditiis nesciunt fuga explicabo impedit, quo repudiandae velit? Nam cum impedit nesciunt voluptatum magni? Alias maiores earum minus placeat pariatur excepturi laudantium nostrum molestiae assumenda consectetur vel ipsam rem ex cumque nisi culpa amet nesciunt corporis harum, ducimus, esse neque blanditiis, et dolor! Ut, rem quia.'},
  { title: 'Day 2', post: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat deserunt ea, soluta, delectus ipsum laudantium id odit perspiciatis veniam tenetur corrupti cum at sapiente recusandae officiis eligendi, provident dicta voluptates.' }
];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/' ,function(req,res){
  
  res.render('home.ejs',{
    mainContent:homeStartingContent,
    postList :posts,
  });
})

app.get('/about' ,function(req,res){
  res.render('about.ejs',{
    mainContent:aboutContent,
  });
})
app.get('/contact' ,function(req,res){
  res.render('contact.ejs',{
    mainContent:contactContent,
  });
})
app.get("/compose" , function(req,res){
  res.render('compose.ejs');
})
app.post("/compose" , function(req,res){
  posts.push(req.body);
  
  res.redirect('/');
})

app.get('/posts/:post' , function(req,res){
  
  let query = _.lowerCase(req.params.post);
  let requiredPost;
  for(let i = 0 ;i<posts.length;i++ ){
    if(_.lowerCase(posts[i].title) ==  query){
      requiredPost = posts[i];
      break;
    }
  }
  
  // console.log(requiredPost);
  res.render('post.ejs',{
    title : requiredPost.title,
    postContent : requiredPost.post,
  })

})










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
