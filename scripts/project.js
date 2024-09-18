
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

function addSample() {
    sampleDiv = document.getElementById("samples")
    sampleDiv

    // create template
    const html_template = `
    <div class="card">
    <label class="label label-default">Player <#number#> Name</label>
    <input type="text" name="PlayerName">
    <div class="player-correct-checkbox">
        <input type="checkbox" class="checkbox correct-checkbox" name="correct?" id="player<#number#>_correct" onchange="calculateScore()">
        <label class="checkbox-label" style="background-color: #258a1d;color: aliceblue" for="player<#number#>_correct">correct?</label>
    </div>

    <label class="label">Player <#number#> Color</label>
    <select class="player_color_selection" name="player1_color" id="player<#number#>_color" onchange="setColor()" style="background-color:#00f2ff">
        <option default value="unknown" style="background-color:#00f2ff ;color:black;" >unknown</option>
        <option value="pink" style="background-color: #f697c8;color: aliceblue;">pink</option>
        <option value="red" style="background-color: #b90202;color: aliceblue;">red</option>
        <option value="brown" style="background-color: #bd5700;color: aliceblue;">brown</option>
        <option value="orange" style="background-color: #e99303;color: aliceblue;">orange</option>
        <option value="yellow" style="background-color: #fff703;color: black;">yellow</option>
        <option value="green" style="background-color: #b1b801;color: aliceblue;" >green</option>
        <option value="blue" style="background-color: #0053a5;color: aliceblue;">blue</option>
        <option value="purple" style="background-color: #5b157c;color: aliceblue;">purple</option>
        <option value="gray" style="background-color: #bdbab4;color: aliceblue">gray</option>
        <option value="white" style="background-color: white;color: black;">white</option>
        
    </select>
    <!-- pink -->
    <div class="card-checkbox">
        <input type="checkbox" name="player_pink" id="pink<#number#>" onclick="updatePlayerColorElimination(this)">
        <label class= "checkbox-label" style="background-color: #f697c8;color: aliceblue;" for="pink<#number#>">pink</label>
    </div>
    <!-- red -->
    <div class="card-checkbox">
        <input type="checkbox" name="player_red" id="red<#number#>" onclick="updatePlayerColorElimination(this)">
        <label class= "checkbox-label" style="background-color: #b90202;color: aliceblue;" for="red<#number#>">red</label>
    </div>
    <!-- brown -->
    <div class="card-checkbox">
        <input type="checkbox" name="player_brown" id="brown<#number#>" onclick="updatePlayerColorElimination(this)">
        <label class= "checkbox-label" style="background-color: #bd5700;color: aliceblue;" for="brown<#number#>">brown</label>
    </div>
    <!-- orange -->
    <div class="card-checkbox">
        <input type="checkbox" name="player_orange" id="orange<#number#>" onclick="updatePlayerColorElimination(this)">
        <label class= "checkbox-label" style="background-color: #e99303;color: aliceblue;" for="orange<#number#>">orange</label>
    </div>
    <!-- yellow -->
    <div class="card-checkbox">
        <input type="checkbox" name="player_yellow" id="yellow<#number#>" onclick="updatePlayerColorElimination(this)">
        <label class= "checkbox-label" style="background-color: #fff703;color: black;" for="yellow<#number#>">yellow</label>
    </div>
    <!-- green -->
    <div class="card-checkbox">
        <input type="checkbox" name="player_green" id="green<#number#>" onclick="updatePlayerColorElimination(this)">
        <label class= "checkbox-label" style="background-color: #b1b801;color: aliceblue;" for="green<#number#>">green</label>
    </div>
    <!-- blue -->
    <div class="card-checkbox">
        <input type="checkbox" name="player_blue" id="blue<#number#>" onclick="updatePlayerColorElimination(this)">
        <label class= "checkbox-label" style="background-color: #0053a5;color: aliceblue;" for="blue<#number#>">blue</label>
    </div>
    <!-- puple -->
    <div class="card-checkbox">
        <input type="checkbox" name="player_purple" id="purple<#number#>" onclick="updatePlayerColorElimination(this)">
        <label  class= "checkbox-label" style="background-color: #5b157c;color: aliceblue;" for="purple<#number#>">purple</label>
    </div>
    <!-- gray -->
    <div class="card-checkbox">
        <input type="checkbox" name="player_gray" id="gray<#number#>" onclick="updatePlayerColorElimination(this)">
        <label class="checkbox-label" style="background-color: #bdbab4;color: aliceblue" for="gray<#number#>">gray</label>
    </div>
    <!-- white -->
    <div class="card-checkbox">
        <input type="checkbox" name="player_white" id="white<#number#>" onclick="updatePlayerColorElimination(this)">
        <label class= "checkbox-label" style="background-color: white;color: black;" for="white<#number#>">white</label>
    </div>
    
    </div>`

    var html = html_template.replaceAll("<#number#>",(playerCount+1).toString());

    // create a new node and set the innerHTML, then append
    var node = document.createElement("div");
    node.innerHTML = html;
    document.getElementById("card-container").appendChild(node);

    // increment count
    playerCount +=1;
    
}