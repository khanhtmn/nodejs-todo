//dependencies required for the app
var express = require("express"); // require just the installed express app
var bodyParser = require("body-parser");
var app = express(); // then we call express 

// ???????????
app.use(bodyParser.urlencoded({ extended: true })); 
app.set("view engine", "ejs"); // set up the template engine
app.use(express.static("public")); //render css files

//placeholders for added task
var task = ["buy socks", "practise with nodejs"];
//placeholders for removed task
var complete = ["finish jquery"];

//post route for adding new task 
app.post("/addtask", function(req, res) {
    // ????attribute of the req object????
    var newTask = req.body.newtask; 
    //add the new task from the post route
    task.push(newTask);
    // after adding to the array, go back to the root route
    res.redirect("/"); 
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //check if the completed task already exits in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

// ????What's this for????
// send the equivalent HTML to the client
//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
});

//set app to listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});