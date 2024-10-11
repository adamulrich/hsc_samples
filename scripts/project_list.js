var projectList = [];

function mainMenu() {
    window.location = "index.html"
}

function loadProjectList() {
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
                projectList.push([result.project,result.date]);
            }
        } catch (error) {
            continue;
        }
    }

    //sort the list by date
    console.log(projectList);
    projectList.sort((a,b) => new Date((b[1])- new Date(a[1])));
    console.log(projectList);
    // 
    var selectProject = document.getElementById("project-list");
    selectProject.innerHTML = '';
    projectList.forEach(p => selectProject.appendChild(new Option(p[0],p[0])))
}

function selectProject() {
    // get selected item from UI
    var selectedProject = document.getElementById("project-list").value;

    if (selectedProject != null) {
        window.location = "project.html?project=" + selectedProject;
    }
}


function filterItems(arr, query) {
    return arr.filter((el) => el[0].toLowerCase().includes(query.toLowerCase()));
  }

function filterFunction() {
    // get the filter value
    const input = document.getElementById("search-filter");
    const filter = input.value.toLowerCase();

    // filter the list
    displayList = filterItems(projectList, filter)

    // get the select list and set the values, delete the current options.
    var selectProject = document.getElementById("project-list");
    selectProject.innerHTML = '';
    displayList.forEach(p => selectProject.appendChild(new Option(p[0],p[0])))
}

function deleteProject() {
    var selectedProject = document.getElementById("project-list").value;

    if (selectedProject != null) {
        // confirm that they really want to delete
        var response = confirm("Delete. Are you Sure?");
        if (response) {
            window.localStorage.removeItem(selectedProject)
        }
    }
}