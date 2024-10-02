function loadAdmin() {
    window.location = "admin.html";
}

function createNewProject() {
    window.location = "project.html?load=__new__";
}

function loadCurrentProject() {
    window.location = "project.html?load=__current__"
    
}
const currentProjectName = window.localStorage.getItem("currentProjectName")
if ( currentProjectName!= "") {
    var btn = document.getElementById("loadProjectBtn");
    btn.disabled = false;
    btn.innerText = "Load " + currentProjectName + " Project"
}