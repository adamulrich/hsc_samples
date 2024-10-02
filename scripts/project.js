var currentData = {};
currentData.project = "";
currentData.comment = "";
currentData.samples = [];




// load data from local storage
function addNewSample() {
    document.getElementById("btnAddNewSample").disabled = true;
    document.getElementById("sampleFormDiv").style.display = "block";
    var v = document.getElementById("sample1-type").value;
    let currentDate = new Date().toJSON().slice(0, 10);
    document.getElementById("sample1-date").value=currentDate;
    updateAnalyses(v);
}
  
function closeForm() {
    document.getElementById("sampleFormDiv").style.display = "none";
    document.getElementById("btnAddNewSample").disabled = false;
}

function updateSampleCollectionData() {
    
    // get data from form and put into an object.
    newSample = {}

    newSample.date = document.getElementById("sample1-date").value;
    newSample.id = document.getElementById("sample1-id").value;
    newSample.type = document.getElementById("sample1-type").value;
    newSample.serialNumber = document.getElementById("sample1-serial-number").value;
    newSample.duration = document.getElementById("sample1-duration").value;
    newSample.analyses = []

    const analysesSelect = document.getElementById("sample1-analyses");
    const analysesCount = analysesSelect.selectedOptions.length
    if (analysesCount > 0) {
        for (let i = 0;i < analysesCount; i++) {
            newSample.analyses.push(analysesSelect.selectedOptions[i].label)
        }

        // add object to currentData
        currentData.samples.push(newSample);

        // update localStorage
        saveProjectData()

        // create new row in table.
        createRow(newSample)

        //clear data
        document.getElementById("sampleForm").reset();
        //document.getElementById("sample1-type").reset()

        document.getElementById("sampleFormDiv").style.display = "none";

        document.getElementById("btnAddNewSample").disabled = false;
    }
    else {
     // we don't have any analyses selected, warn dialog
     alert("No Analyses type selected")
    }
  }

function createRow(newSample) {
    var newRow = document.getElementById("sample-table").insertRow(-1);
    var count = newRow.insertCell(0);
    count.innerText = currentData.samples.length;
    var date_id_duration = newRow.insertCell(1);
    date_id_duration.innerHTML = newSample.date + "<br>" + newSample.id + "<br>" +
        newSample.duration;
    var type_serial = newRow.insertCell(2);
    type_serial.innerHTML = newSample.type + "<br>" + newSample.serialNumber;

    var analyses = newRow.insertCell(3);
    for (let i = 0; i < newSample.analyses.length; i++ ) {
        analyses.innerHTML += newSample.analyses[i] + "<br>";
    }

    // edit/delete buttons
    var editCell = newRow.insertCell(4);
    editCell.innerHTML=`
    <input type="button" class="" value="✏️" onclick="editRow(this)">`
    var deleteCell = newRow.insertCell(5);
    deleteCell.innerHTML=`
    <input type="button" class="" value="🗑️" onclick="deleteRow(this)">`
    
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("sample-table").deleteRow(i);
    currentData.samples.splice(i-1,1);
    saveProjectData()
}

function updateAnalyses(value) {
    var select = document.getElementById("sample1-analyses");
    select.selectedIndex = -1;
    select.style.display = "none";
    select.style.display = "block";
    var count = 0;
    var currentItem;
    for (i of select.children) {
        i.checked = false;
        if (i.className == value) {
            i.style.display = "block";
            count++;
            currentItem = i;
            
        } else {
            i.style.display = "none";
        }
    }
    if (count == 1) {
        currentItem.selected = true;
    }
}

// save data to local storage
function saveProjectData() {
    window.localStorage.setItem(currentData.project,JSON.stringify(currentData))
    window.localStorage.setItem("currentProjectName",currentData.project)
}

// get project data from UI to currentData
function storeProjectData() {
    currentData.project = document.getElementById("project-name").value;
    currentData.comment = document.getElementById("project-comment").value;
    saveProjectData()
}


var v = document.getElementById("sample1-type").value;
updateAnalyses(v);

// example code for loading/storing data from/in localStorage

function loadData() {

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const load = urlParams.get("load");

    if (load == "__new__") {
        // do nothing
    } else if (load == "__current__") {

        currentProjectName = window.localStorage.getItem("currentProjectName")
        currentData = JSON.parse(window.localStorage.getItem(currentProjectName))
        if (currentData != null) {
            //put values into UI
            document.getElementById("project-name").value = currentData.project;
            document.getElementById("project-comment").value = currentData.comment;

            for (let i = 0; i < currentData.samples.length; i++ ) {
                createRow(currentData.samples[i]);
            }
        }
    }
}

function mainMenu() {
    if (currentData.project != "") {
        saveProjectData()

    }

    window.location = "index.html"
    
}
