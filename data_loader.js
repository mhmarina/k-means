const toyDataPath = "data/cluster_data.csv" //https://www.kaggle.com/datasets/saquib7hussain/k-mean-cluster-dataset
const MIN_Y = 10
const MAX_Y = 550
const MIN_X = 20
const MAX_X = 1200

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
                return center([parseInt(obj[0]), parseInt(obj[1])])
        })
    return objects
}

function center(tuple){
    const x = (tuple[0] * 20 + (MAX_X / 2)) 
    const y = (tuple[1] * 20 + (MAX_Y / 2)) // multiply to spread out a bit

    return [x,y]
}

function loadData(){
    console.log("Log Data!")
}