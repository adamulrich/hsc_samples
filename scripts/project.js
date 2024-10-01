
var currentData = {};
currentData.Project = "test project";
currentData.samples = [];


// load data from local storage
function addNewSample() {
    document.getElementById("sampleFormDiv").style.display = "block";
    var v = document.getElementById("sample1-type").value;
    let currentDate = new Date().toJSON().slice(0, 10);
    document.getElementById("sample1-date").value=currentDate;
    updateAnalyses(v);
}
  
function closeForm() {
    document.getElementById("sampleFormDiv").style.display = "none";
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
    for (let i = 0;i < analysesSelect.selectedOptions.length; i++) {
        newSample.analyses.push(analysesSelect.selectedOptions[i].label)
    }

    // add object to currentData
    currentData.samples.push(newSample);

    // update localStorage

    // create new row in table.
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

    //clear data
    document.getElementById("sampleForm").reset();
    //document.getElementById("sample1-type").reset()


    document.getElementById("sampleFormDiv").style.display = "none";
  }


function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("sample-table").deleteRow(i);
    currentData.samples.splice(i-1,1);
    console.log(currentData);
}

function updateAnalyses(value) {
    var select = document.getElementById("sample1-analyses");
    select.selectedIndex = -1;
    select.style.display = "none";
    select.style.display = "block";
    for (i of select.children) {
        i.checked = false;
        if (i.className == value) {
            i.style.display = "block";
        } else {
            i.style.display = "none";
        }
    }
}

var v = document.getElementById("sample1-type").value;
updateAnalyses(v);

// example code for loading/storing data from/in localStorage

// function load_data() {

//     // read data - if no data, seed it
//     currentData = JSON.parse(window.localStorage.getItem("companyData"))
//     if (currentData == null) {
//         currentData = companyData
//         save_data(companyData)
//     }
    

//     document.getElementById("person-name").value = currentData.name
//     document.getElementById("person-email").value = currentData.email
//     document.getElementById("company-name").value = currentData.company
//     document.getElementById("company-address").value = currentData.address
//     document.getElementById("company-city").value = currentData.city
//     document.getElementById("company-state").value = currentData.state
//     document.getElementById("company-zip").value = currentData.zip
//     document.getElementById("company-phone").value = currentData.phone
    
// }

// // save data to local storage
// function save_data(data) {
//     window.localStorage.setItem("companyData",JSON.stringify(data))
// }

// function save_close() {
//     currentData = {}
//     currentData.name = document.getElementById("person-name").value 
//     currentData.email = document.getElementById("person-email").value
//     currentData.company = document.getElementById("company-name").value
//     currentData.address = document.getElementById("company-address").value
//     currentData.city = document.getElementById("company-city").value
//     currentData.state = document.getElementById("company-state").value
//     currentData.zip = document.getElementById("company-zip").value
//     currentData.phone = document.getElementById("company-phone").value 

//     save_data(currentData)
//     window.location = "index.html"
// }

// function addSample() {
//     sampleDiv = document.getElementById("samples")
//     sampleDiv

//     // create template
//     const html_template = ``
    
//     var html = html_template.replaceAll("<#number#>",(playerCount+1).toString());

//     // create a new node and set the innerHTML, then append
//     var node = document.createElement("div");
//     node.innerHTML = html;
//     document.getElementById("card-container").appendChild(node);

//     // increment count
//     playerCount +=1;
    
// }