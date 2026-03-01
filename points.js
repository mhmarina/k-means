var svgns = "http://www.w3.org/2000/svg"
var points = []
// support 5 colors for 5 clusters
var colors = [[255, 0, 166, 1], [0, 145, 255, 1], [246, 255, 0, 1], [255, 0, 17, 1], [0, 255, 55, 1]]
var svg
var clusterType = "hard"
var k = 2
var stiffness = 0.2
var centers = []

window.onload = function() {
    svg = document.getElementById("main-svg");
    svg.addEventListener("click", drawPoint)
    clusterTypeRadios = this.document.getElementsByName("cluster-type")
    clusterTypeRadios.forEach(button => {button.addEventListener("click", () => {
        clusterType = button.id
        cluster()
    })})
    kSlider = this.document.getElementById("k")
    kSlider.addEventListener("change", () => {
        k = kSlider.value
        this.document.getElementById("k-label").textContent = `k: ${k}`
        cluster()
    })
    stiffnessSlider = this.document.getElementById("stiffness")
    stiffnessSlider.addEventListener("change", () => {
        stiffness = stiffnessSlider.value
        this.document.getElementById("stiffness-label").textContent = `stiffness: ${stiffness}`
        cluster()
    })
}

function addPoint(point){
    let len = points.length
    points.push(point)
    points = points.filter((p, i) =>
            i === points.findIndex(q => q[0] === p[0] && q[1] === p[1])
            );
    return len !== points.length
}

function drawPoint(event){
    let coords = [event.pageX, event.pageY]
    if(addPoint(coords)){
        let circle = document.createElementNS(svgns, 'circle');
        circle.setAttributeNS(null, 'cx', coords[0]);
        circle.setAttributeNS(null, 'cy', coords[1]);
        circle.setAttributeNS(null, 'r', 5);
        circle.setAttributeNS(null, 'fill', colors[0])
        circle.setAttributeNS(null, 'id', `point-${coords}`)
        svg.appendChild(circle);

        // call clustering algorithm
        cluster()
    }
}

function drawCenters(centers, radii){
    const existingCenters = document.getElementsByClassName('center')
    Array.from(existingCenters).forEach((c) => c.remove())
    centers.forEach((c, i) => {
        if(c.length > 0){
            const center = document.createElementNS(svgns, 'rect')
            center.setAttributeNS(null, 'class', 'center')
            center.setAttributeNS(null, 'x', c[0])
            center.setAttributeNS(null, 'y', c[1])
            center.setAttributeNS(null, 'width', 5)
            center.setAttributeNS(null, 'height', 5)
            center.setAttributeNS(null, 'fill', 'white')            
            svg.appendChild(center)
            // draw radii   
            if(radii !== null){
                const rangeCirlce = document.createElementNS(svgns, 'circle')
                let color = colors[i].slice()
                color[3] = 0.1
                rangeCirlce.setAttributeNS(null, 'class', 'center')
                rangeCirlce.setAttributeNS(null, 'cx', c[0]);
                rangeCirlce.setAttributeNS(null, 'cy', c[1]);
                rangeCirlce.setAttributeNS(null, 'r', radii[i]);
                rangeCirlce.setAttributeNS(null, 'fill', `rgba(${color})`)
                svg.appendChild(rangeCirlce);                
            }
        }
    })
}


function cluster(){
    if(clusterType == "hard"){
        ret = lloyd(k)
        centers = ret[0]
        radii = ret[1]
    }
    else{
        centers = soft_clustering(k, stiffness)
        radii = null
    }
    drawCenters(centers, radii)
}