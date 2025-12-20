var svgns = "http://www.w3.org/2000/svg"
var points = []
// support 5 colors for 5 clusters
var colors = [[255, 0, 166, 1], [0, 145, 255, 1], [246, 255, 0, 1], [255, 0, 17, 1], [0, 255, 55, 1]]
var svg

window.onload = function() {
  svg = document.getElementById("main-svg");
  svg.addEventListener("click", drawPoint)
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
    }
    soft_clustering(2, 0.2)
    // lloyd(5)
}