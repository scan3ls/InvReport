var storage = localStorage;

function changeMenu(el) {
    var error = document.querySelector(".error-message");
    switch (el.value) {
        case "1":
            var link = document.querySelector("#log-link");          
            link.click();
            break;
    
        case "2":
            var link = document.querySelector("#report-link");
            link.click();
            break;

        case "3":
            storage.clear();
            break;

        default:
            error.innerHTML = "Invalid Input";
            error.classList.remove("hidden");
            break;
    }
}

function processInput(el) {
    var link = document.querySelector("#main-link");
    if (el.value === "e") link.click();

    var hasL = el.value.startsWith("L");
    var max =  hasL ? 7 : 6;
        
    if (el.value.length === max) {
        var bin = hasL ? el.value.substring(1) : el.value;
        saveLocation(bin);
        el.value = "";
    }
}

function report() {
    var data = loadLocations();
    if (data === null) return;
    var div = document.createElement("div");
    
    if (data.length > 0) {
        var msg = document.querySelector("#none-message");
        msg.classList.add("hidden");
    }

    data.forEach(bin => {
        var p = document.createElement("p");
        p.innerText = bin;
        div.appendChild(p);
    });

    document.querySelector("#locations").innerHTML = div.innerHTML;
}

function loadLocations() {
    var data = storage.getItem("locations");
    return JSON.parse(data);
}

function saveLocation(bin) {
    var data = loadLocations();
    if (data === null) { data = []; }
    if (data.includes(bin) === false ) {
        data.push(bin);
        storage.setItem("locations", JSON.stringify(data));
    }
}
