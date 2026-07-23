window.onload = function(){
    const clearBtn = document.getElementById("btn-clear")
    const loadToyBtn = document.getElementById("btn-load-toy")
    const loadDataBtn = document.getElementById("btn-load-file")

    clearBtn.addEventListener("click", clearData)
    loadToyBtn.addEventListener("click", loadToyData)
    loadDataBtn.addEventListener("click", loadData)
}

function clearData(){
    console.log("Clear!")
}

function loadToyData(){
    console.log("Log Toy Data!")
}

function loadData(){
    console.log("Load Data!")
}