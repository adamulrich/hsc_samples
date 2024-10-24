
// current data is the current project data (whether new or loaded from localStorage)
var currentData = {};
currentData.project = "";
currentData.comment = "";
currentData.date = new Date().valueOf()
currentData.samples = [];

// addEditSampleMode controls whether we are adding a new sample, or editing an existing sample
var addEditSampleMode = "";

// tableRowEditIndex is used to handle where in the sample table we are doing an edit. It gets set in the
// editRow function, and used in the 
var tableRowEditIndex = 0;

// load data from local storage
function addNewSample(data = null) {
    document.getElementById("btnAddNewSample").disabled = true;
    document.getElementById("sampleFormDiv").style.display = "block";
    var v = document.getElementById("sample1-type").value;
    let currentDate = new Date().toJSON().slice(0, 10);
    document.getElementById("sample1-date").value=currentDate;
    updateAnalyses(v);

    document.getElementById("sample1-id").focus();

    // set values if data is passed in
    if(data) {
        addEditSampleMode = "edit";

        document.getElementById("create-update-btn").textContent = "Update";
        document.getElementById("sample1-date").value = data.date;
        document.getElementById("sample1-id").value = data.id;
        document.getElementById("sample1-type").value = data.type;
        document.getElementById("sample1-serial-number").value = data.serialNumber;
        document.getElementById("sample1-duration").value = data.duration;
        
        updateAnalyses(data.type);
        // select analyses options.
        const analysesSelect = document.getElementById("sample1-analyses");
        for (option of analysesSelect.children)  {
            if (data.analyses.includes(option.value)) {
                option.selected = true;
            }
        }
        // make the correct analyses visible.

    // it now data, then we are in new mode.
    } else {
        addEditSampleMode = "new";
        document.getElementById("create-update-btn").textContent = "Create";
    }
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
        if (addEditSampleMode == "new") {

            currentData.samples.push(newSample);
            createUpdateRow(newSample)

        } else 
        if (addEditSampleMode == "edit") {
            currentData.samples[tableRowEditIndex] = newSample;

            // tableRowEditIndex for array is 0 based, for UI is 1 based, so +1
            createUpdateRow(newSample, tableRowEditIndex + 1)
        }

        // update localStorage
        saveProjectData()

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


// creates or updates a row in the sample table
// if default location, it gets created at the end
function createUpdateRow(newSample, location = -1) {
    if (location == -1) {
        var newRow = document.getElementById("sample-table").insertRow(location);
    } else
    {  
        // if we are in edit mode, delete the current row before insertion.
        if (addEditSampleMode == "edit") {
            document.getElementById("sample-table").deleteRow(location);
        }
        
        var newRow = document.getElementById("sample-table").insertRow(location);
     }
    var count = newRow.insertCell(0);
    
    // calculate sample #
    if (location == -1) {
        count.innerText = currentData.samples.length;
    } else {
        count.innerText = location;
    }

    // create cells and populate data
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
    <input type="button" class="edit-btn" value="✏️" onclick="editRow(this)">
    <br>
    <input type="button" class="edit-btn" value="🗑️" onclick="deleteRow(this)">`
    // var deleteCell = newRow.insertCell(5);
    // deleteCell.innerHTML=`
    
}

function editRow(r) {
    tableRowEditIndex = r.parentNode.parentNode.rowIndex -1 ;
    addNewSample(currentData.samples[tableRowEditIndex]);
    scrollToMyRef("sample1-id");
}

function deleteRow(r) {
    // confirm delete
    var response = confirm("Delete?");
    if (response) {
        var i = r.parentNode.parentNode.rowIndex;
        document.getElementById("sample-table").deleteRow(i);
        currentData.samples.splice(i-1,1);
        saveProjectData()
    }
}

function updateAnalyses(value) {
    var select = document.getElementById("sample1-analyses");
    select.selectedIndex = -1;
    select.style.display = "none";
    select.style.display = "block";
    var count = 0;
    for (i of select.children) {
        i.checked = false;
        if (i.className == value) {
            i.style.display = "block";
            count++;
            
        } else {
            i.style.display = "none";
        }
    }
    setDefaultValues()
}


function setDefaultValues() {

    const badgeListDefaults = {
        "581-571-Aldehyde":[
            "Formaldehyde (50-0-0)"
        ],
        "574A-Halogenated-Gases": [
            "Sevoflurane – (28523-86-6)",
            "Isoflurane – (26675-46-7)",
            "Desflurane – (57041-67-5)"
        ],
        "546-Organic-Vapor": [
            "Acetone",
            "Xylene",
            "Methanol",
            "Ethanol"
        ],
        "543A-Acetic-Acid": [
            "Acetic Acid - (64-19-7)"
        ],
        "587-Hydrogen-Peroxide": [
            "Hydrogen Peroxide - (7722-84-1)"
        ],
        "575D-Nitrous-Oxide": [
            "Nitrous Oxide – (10024-97-2)"
        ]
    }

    // get current badge type
    currentBadge = document.getElementById("sample1-type").value;
    const analysesSelect = document.getElementById("sample1-analyses");

    // set default values
    for (i of analysesSelect.children) {
        if (badgeListDefaults[currentBadge].includes(i.value)) {
            i.selected = true;
        }
    }

}

// save data to local storage
function saveProjectData() {
    // update the date
    currentData.date = new Date().valueOf();

    // save to local storage
    window.localStorage.setItem(currentData.project,JSON.stringify(currentData))
    window.localStorage.setItem("currentProjectName",currentData.project)
}

// get project data from UI to currentData
function storeProjectData() {
    // get data from UI and put into currentData
    currentData.project = document.getElementById("project-name").value;
    currentData.comment = document.getElementById("project-comment").value;

    // save to local storage
    saveProjectData()
}

var v = document.getElementById("sample1-type").value;
updateAnalyses(v);

function loadData() {

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const load = urlParams.get("load");
    const projectName = urlParams.get("project");

    if (load == "__new__") {
        // do nothing
    } else if (load == "__current__") {

        currentProjectName = window.localStorage.getItem("currentProjectName")
        currentData = JSON.parse(window.localStorage.getItem(currentProjectName))
        putDataInUI(currentData);
    }

    else if (projectName != null) {
        currentData = JSON.parse(window.localStorage.getItem(projectName))
        putDataInUI(currentData);
    }
}

function putDataInUI(currentData) {
    if (currentData != null) {
        //put values into UI
        document.getElementById("project-name").value = currentData.project;
        document.getElementById("project-comment").value = currentData.comment;

        for (let i = 0; i < currentData.samples.length; i++ ) {
            createUpdateRow(currentData.samples[i], i + 1);
        }
    }

}

function mainMenu() {
    if (currentData.project != "") {
        saveProjectData()

    }
    window.location = "index.html"    
}


var html5QrcodeScanner;

function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    document.getElementById("sample1-serial-number").value = decodedText;
    html5QrcodeScanner.clear();
    html5QrcodeScanner = null;
    document.getElementById('qr-reader').innerHTML = '';
  }
  
  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:

  }
   
function scanQRCode() {
    document.getElementById("reader-div").scrollIntoView();
    html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, 
            qrbox: {width: 250, height: 250}, 
            videoConstraints: {
            facingMode: "environment"
            }, 
        },
        /* verbose= */ false);

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
}

function createReport() {
     window.location = "report.html?project=" + currentData.project;
}

scrollToMyRef = (id) => {
    var ref = document.getElementById(id);
    setTimeout(function () {
         ref.scrollIntoView({
             behavior: "smooth",
             block: "start",
         });
    }, 100);
};