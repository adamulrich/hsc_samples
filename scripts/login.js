
// import Parse from "parse.min.js";

Parse.initialize("2c1IS8eo1qhrDLNUvAT07SnuTQ6YraMLJs5Oclao", "YhiJCM9Vnh9WDwRmT1D1LmqfQbE4VNjvCK2bXRj7"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";
var userName = "";

async function syncDataToCloud() {
    
    var projects_template = Parse.Object.extend("Projects");

     //get list of projects from localstorage
     var objectList = Object.keys(localStorage).map(k => localStorage.getItem(k))
     projectList = [];
 
     // walk the localstorage
     for (p of objectList) {
         try {
             result = JSON.parse(p);
             // if it contains .project, it's a project
             if (result.project != null) {
                 // put it in the list.
                 projectList.push(result);
             }
         } catch (error) {
             continue;
         }
     }
 
    try {
        var project;
        // iterate over the projects in memory
        for (project of projectList) {

            p = new projects_template();

            // if the project has an objectID, set it to update the item.
            if (project.objectId != "" ){
                p.set("objectId", project.objectId);
            }

            p.set("data",JSON.stringify(project));
            p.set("project",project.project);
            p.set("user_name",userName);
            p = await p.save();
        
        };
     
        // pull all projects from the cloud into local storage.
        const query = new Parse.Query(projects_template);
        const results = await query.find();

        // hydrate projects in localstorage from results
        for (r of results) {
            // put the objectId into the project
            var temp = JSON.parse(r.get("data"));
            temp.objectId = r.id;

            // put into localStorage
            window.localStorage.setItem(r.get("project"),JSON.stringify(temp));
            
        }
        document.getElementById("result-text").innerText = "cloud sync completed";


    } catch (error) {
        document.getElementById("result-text").innerText = "cloud sync not successful";
    }
   
}

function logIn() {
    // Create a new instance of the user class
    userName = document.getElementById("user-name").value;
    const password = document.getElementById("password").value;
    var user = Parse.User
        .logIn(userName,password).then(function(user) {
            console.log('login successful');
            document.getElementById("result-text").innerText = "login successful";
            document.getElementById("sync-data").disabled = false;

    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
        document.getElementById("result-text").innerText = "login not successful. Try again";
        document.getElementById("user-name").value = "";
        document.getElementById("user-name").innerText = "login successful";
        document.getElementById("user-name").focus(); 
    });
}

function mainMenu() {
    window.location = "index.html"
}

