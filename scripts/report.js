function addRowsAndPrint() {
    document.title = document.getElementById("project-name").innerText;
    window.print();
}

document.addEventListener('DOMContentLoaded', loadData())

function loadData() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectName = urlParams.get("project");

    currentData = JSON.parse(window.localStorage.getItem(projectName))
    companyData = JSON.parse(window.localStorage.getItem("companyData"))

    // fill out top of form
    document.getElementById("project-name").innerText = currentData.project;
    document.getElementById("companydata-name").innerText = companyData.name;
    document.getElementById("companydata-email").innerText = companyData.email;
    document.getElementById("companydata-company").innerText = companyData.company;
    document.getElementById("companydata-phone").innerText = companyData.phone;
    document.getElementById("companydata-address").innerText = companyData.address;
    document.getElementById("companydata-city-state-zip").innerText = companyData.city + "," + companyData.state + " " + companyData.zip;



    var mainTable = document.getElementById('report-table');
    var tbody = mainTable.children[0]; // or to use HTMLTableElement, mainTable.tBodies[0]
    var insertedRow;
    const templateRow = 15;
    var i = templateRow;

    // add each row
    currentData.samples.forEach(sample => {
        i++;
        insertedRow = tbody.insertBefore(mainTable.rows[templateRow].cloneNode(true), mainTable.rows[i]);
        insertedRow.querySelector("#sample-id").innerText = sample.id;
        insertedRow.querySelector("#sample-media-type").innerText = sample.type + " / ";
        insertedRow.querySelector("#sample-serial-number").innerText = sample.serialNumber;
        insertedRow.querySelector("#sample-date").innerText = sample.date;
        insertedRow.querySelector("#sample-total-time").innerText = sample.duration;

        // add analyses
        sample.analyses.forEach(test => {
            insertedRow.querySelector("#sample-tests").innerHTML +='<p class="table-data" id="sample-test-1"> ' + test + ' /</p>'
        })    
    });

    mainTable.deleteRow(templateRow);
}

function createExcel() {
    TableToExcel.convert(document.getElementById("report-table"), {
        name: currentData.project + ".xlsx",
        sheet: {
          name: "Sheet 1"
        }
        
      });
      console.log(JSON.stringify(currentData));
      console.log(JSON.stringify(companyData));
}

