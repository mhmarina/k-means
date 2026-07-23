const toyDataPath = "data/cluster_data.csv" //https://www.kaggle.com/datasets/saquib7hussain/k-mean-cluster-dataset

window.addEventListener('load', () => {
    const clearBtn = document.getElementById("btn-clear")
    const loadToyBtn = document.getElementById("btn-load-toy")
    const loadDataBtn = document.getElementById("btn-load-file")

    clearBtn.addEventListener("click", clearData)
    loadToyBtn.addEventListener("click", loadToyData)
    loadDataBtn.addEventListener("click", loadData)
})

function clearData(){
    clearPoints()
}

function loadToyData(){
    clearData()
}

function loadData(){
    console.log("Log Data!")
}