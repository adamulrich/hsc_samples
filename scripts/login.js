
// import Parse from "parse.min.js";

Parse.initialize("2c1IS8eo1qhrDLNUvAT07SnuTQ6YraMLJs5Oclao", "YhiJCM9Vnh9WDwRmT1D1LmqfQbE4VNjvCK2bXRj7"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";


async function get_analysis_requests() {

    // Assume ParseObject myPost was previously created.
    const requests = Parse.Object.extend("Analysis_Requests");
    const query = new Parse.Query(requests);
    
    const count = await query.find();
    for (x of count) {
        const main = document.getElementById("main");
        main.innerText += x.get("Analysis_Type")
    }

}

async function sync() {
    
    var project_template = Parse.Object.extend("Project");

    

    p = new project_template();

    p.set('Name',project.id);
    p.set('Date', project.date);
    p.set('data', project);
    p = await p.save();

}

function read_project() {
    var project_template = Parse.Object.extend("Project");
    query = new Parse.Query(project_template);
    query.equalTo("Name","KDMC 2025");
    query.first().then(function(p) {
        if(p) {
            current_project = p.get('data');
            console.log(current_project);
            console.log(current_project.samples);
        }
    })
    
}


async function create_user() {
    // Creates a new Parse "User" object, which is created by default in your Parse app
    let user = new Parse.User();
    // Set the input values to the new "User" object
    user.set("username", "awp");
    user.set("email", "adamulrich@hotmail.com");
    user.set("password", 'hsc_samples');
    // Call the save method, which returns the saved object if successful
    user = await user.save();

}

function logIn() {
    // Create a new instance of the user class
    const userName = document.getElementById("user-name").value;
    const password = document.getElementById("password").value;
    var user = Parse.User
        .logIn(userName,password).then(function(user) {
            console.log('login successful');
            document.getElementById("result-text").innerText = "login successful";
            document.getElementById("sync-data").disabled = false;
            document.getElementById("read-data").disabled = false;

    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
        document.getElementById("result-text").innerText = "login not successful. Try again";
        document.getElementById("user-name").value = "";
        document.getElementById("user-name").innerText = "login successful";
        document.getElementById("user-name").focus(); 
    });
}

