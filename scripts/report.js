function addRowsAndPrint() {
    var mainTable = document.getElementById('report-table');
    var tbody = mainTable.children[0]; // or to use HTMLTableElement, mainTable.tBodies[0]

    for(i=0;i<20;i++) {
        tbody.insertBefore(mainTable.rows[7].cloneNode(true), mainTable.rows[7]);
    }
    window.print();
}

function loadData() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectName = urlParams.get("project");

    currentData = JSON.parse(window.localStorage.getItem(projectName))
    companyData = JSON.parse(window.localStorage.getItem("companyData"))
        
}
