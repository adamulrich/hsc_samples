function loadAdmin() {
    window.location = "admin.html";
}

function createNewProject() {
    window.location = "project.html?load=__new__";
}

function loadCurrentProject() {
    window.location = "project.html?load=__current__"
    
}

function loadProject() {
    window.location = "project_list.html";
}

function loadLogin() {
    window.location = "login.html";
}


const currentProjectName = window.localStorage.getItem("currentProjectName")
if ( currentProjectName!= null) {
    var btn = document.getElementById("loadProjectBtn");
    btn.disabled = false;
    btn.innerText = "Load " + currentProjectName + " Project"
}

if (window.localStorage.getItem("companyData") == null) {
    companyData = {}
    companyData.name = "AWP"
    companyData.email = "awprince@healthandsafetyinc.com"
    companyData.company = "Health and Safety Compliance"
    companyData.address = "2377 Gold Meadow Way, #100"
    companyData.city = "Gold River"
    companyData.state = "CA"
    companyData.zip = "95670"
    companyData.phone = "(916) 284-6256"
    window.localStorage.setItem("companyData",JSON.stringify(companyData));
}

var VERSION = "0.21"
document.getElementById('version-string').innerText = VERSION;
