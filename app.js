const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

var alert=require("alert");

const request=require("request");
const app=express();


app.set("view engine","ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

let greeting1="woww answers is right";
var greeting2="oops wrong one";



mongoose.connect("mongodb://localhost:27017/quizDB");
const QuizSchema=mongoose.Schema({
  question:String,
  answers: [
       { op1: String  ,
        op2: String  ,
        op3: String  ,
        op4: String }
     ]

});
const Quiz= mongoose.model("Quiz",QuizSchema);




 app.get("/",function(req,res){

  res.sendFile(__dirname + "/task.html");
});



app.get("/quest.ejs",function(req,res){

  Quiz.findOne({question:"1. Which animal is known as the 'Ship of the Desert ?' "},function(err,docs){
  if(!err){


    res.render("quest",{data:docs,daa:greeting2});

  }
  else {

  res.render(err);
  }
  });



});
app.post("/quest.ejs",function(req,res){
  const answer1=req.body.answer1;
  const answer2=req.body.answer2;
  const answer3=req.body.answer3;
  const answer4=req.body.answer4;

  if(req.body=answer1){
    res.redirect("/quset1.ejs");

  }else{
    res.redirect("/quset1.ejs");
  }
});

app.get("/quset1.ejs",function(req,res){
Quiz.findOne({question:" 2.Which animal is known as the king of the jungle?"},function(err,docs){

  if(!err){
    res.render("/quset2",{data:docs});
  }else{
    res.render(err);
  }
});
});
app.post("/quset1.ejs",function(req,res){
  const answer1=req.body.answer1;
  const answer2=req.body.answer2;
  const answer3=req.body.answer3;
  const answer4=req.body.answer4;

  if(req.body=answer1){
    res.redirect("/quset2.ejs");

  }else{
    res.redirect("/quset2.ejs");
  }
});

app.get("/quset2.ejs",function(req,res){
  Quiz.findOne({question:"3.Name the smallest continent?"},function(err,docs){
    if(!err){
      res.render("quset2",{data:docs});
    }else{
      res.render(err);
    }
  });
});
app.post("/quset2.ejs",function(req,res){
  const answer1=req.body.answer1;
  const answer2=req.body.answer2;
  const answer3=req.body.answer3;
  const answer4=req.body.answer4;

  if(req.body=answer1){
    res.redirect("/final.ejs");

  }else{
    res.redirect("/final.ejs");
  }
});

app.get("/final.ejs",function(req,res){
  res.render("final.ejs");
});







app.listen(3010,function(){
  console.log("server is started");
});
