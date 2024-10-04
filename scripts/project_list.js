
function mainMenu() {
    window.location = "index.html"
}

function loadProjectList() {
    //get list of projects from localstorage
    var objectList = Object.keys(localStorage).map(k => localStorage.getItem(k))
    var projectList = [];

    // walk the localstorage
    for (p of objectList) {
        try {
            result = JSON.parse(p);
            // if it contains .project, it's a project
            if (result.project != null) {
                // put it in the list.
                projectList.push([result.project,result.date]);
            }
        } catch (error) {
            continue;
        }
    }

    //sort the list by date
    projectList.sort((a,b) => a[1] - b[1]);

    // 
    var selectProject = document.getElementById("project-list");
    projectList.forEach(p => selectProject.appendChild(new Option(p[0],p[0])))
}

function selectProject() {
    // get selected item from UI
    var selectedProject = document.getElementById("project-list").value;

    if (selectedProject != null) {
        window.location = "project.html?project=" + selectedProject;
    }
}