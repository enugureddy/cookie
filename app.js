//express, cookie-parser
const express = require("express")
const cookierParser = require("cookie-parser")
var port = process.env.Post||4910

//simple cookie
/*var user1 = {
    name : "Yash",
    age : 25
}

var user2 = {
    name : "Ashwath",
    age : 24
}*/

//multiple information
var students = { "students" : [
    {"name" : "johnny galecki", "age" : 46},
    {"name" : "kaley couco", "age" : 36},
    {"name" : "jim parsons", "age" : 48},
    {"name" : "simon helberg", "age" : 41},
    {"name" : "kunal nayyar", "age" : 40},
]}
var staff = { "staff" : [
    {"name" : "chuck lorre", "mail" :"chuckl@gmail.com"},
    {"name" : "bill prady", "mail" :"billp@gmail.com"},
]}

var subject = {
    name : "Liberal Arts",
    maxMarks : 100
}

var exam = "semester-exams"

//creting server
var app = express()

//mounting
app.use(cookierParser())

//route
app.get("/", function(req, res){
    res.send("Welcome to cookie management")
})

app.get("/add", function(req, res){
    //we are going to cookie to the browser
    res.cookie("studata", students) //cookieName, cookieValue
    res.cookie("stfdata", staff) //cookieName, cookieValue
    res.cookie("subdata", subject) //cookieName, cookieValue
    res.cookie("examdata", exam) //cookieName, cookieValue
    res.send("Cookie created")
})

app.get("/display", function(req, res){
    //reading the cookies information from the browser
 
    res.send(req.cookies)

})

app.get("/view/:name", function(req, res){ 
    var name = req.params.name   
    res.send(req.cookies[name])
})

app.get("/delete/:name", function(req, res){
    //delete the cookies from browser
  var name=  req.params.name
    res.clearCookie(name)
    res.send("cookie cleared")
})
app.get("/deleteAll", function (req,res) {
    res.clearCookie("studata")
    res.clearCookie("stfdata")
    res.clearCookie("subdata")
    res.clearCookie("examdata")
    res.send("All cookies destroyed!")
})

app.listen(port, function(err){
    if(err)
    {
        console.log("Err in starting the server")
        return
    }
    console.log("server started at port : ", port)
})