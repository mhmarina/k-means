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
    toyDataFile = fetch(toyDataPath)
                .then((res) => res.text())
                .then((text) => {
                    objects = parseCSV(text)
                    objects.forEach((e) =>{
                        drawPoint(e)
                    })
                })
}

function parseCSV(text){
    const objects = text.replace(/[\r\t]+/g, "").split("\n")
                .map((e) => {
                let obj = e.split(",")
                return [parseInt(obj[0]), parseInt(obj[1])]
        })
    return objects
}

function loadData(){
    console.log("Log Data!")
}