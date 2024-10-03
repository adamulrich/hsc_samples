
function mainMenu() {
    window.location = "index.html"
}

function loadProjectList() {
    //get list of projects from localstorage
    var objectList = Object.keys(localStorage).map(k => localStorage.getItem(k))
    var projectList = [];
    for (p of objectList) {
        try {
            result = JSON.parse(p);
            if (result.project != null) {
                projectList.push(result.project);
            }
        } catch (error) {
            continue;
        }
    }
    var selectProject = document.getElementById("project-list");
    projectList.forEach(p => selectProject.appendChild(new Option(p,p)))

}

function selectProject() {
    // get selected item from UI
    var selectedProject = document.getElementById("project-list").value;

    if (selectedProject != null) {
        window.location = "project.html?project=" + selectedProject;
    }
}