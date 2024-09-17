companyData = {}
companyData.name = "AWP"
companyData.email = "awprince@healthandsafetyinc.com"
companyData.company = "Health and Safety Compliance"
companyData.address = "2377 Gold Meadow Way, #100"
companyData.city = "Gold River"
companyData.state = "CA"
companyData.zip = "95670"
companyData.phone = "(916) 284-6256"

// load data from local storage
function load_data() {

    // read data - if no data, seed it
    currentData = JSON.parse(window.localStorage.getItem("companyData"))
    if (currentData == null) {
        currentData = companyData
        save_data(companyData)
    }
    

    document.getElementById("person-name").value = currentData.name
    document.getElementById("person-email").value = currentData.email
    document.getElementById("company-name").value = currentData.company
    document.getElementById("company-address").value = currentData.address
    document.getElementById("company-city").value = currentData.city
    document.getElementById("company-state").value = currentData.state
    document.getElementById("company-zip").value = currentData.zip
    document.getElementById("company-phone").value = currentData.phone
    
}

// save data to local storage
function save_data(data) {
    window.localStorage.setItem("companyData",JSON.stringify(data))
}

function save_close() {
    currentData = {}
    currentData.name = document.getElementById("person-name").value 
    currentData.email = document.getElementById("person-email").value
    currentData.company = document.getElementById("company-name").value
    currentData.address = document.getElementById("company-address").value
    currentData.city = document.getElementById("company-city").value
    currentData.state = document.getElementById("company-state").value
    currentData.zip = document.getElementById("company-zip").value
    currentData.phone = document.getElementById("company-phone").value 

    save_data(currentData)
    window.location = "index.html"
}