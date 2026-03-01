function expect(HM, centers, points, stiffness){
    let totals = Array.from({length: points.length}, ()=>0)
    for(let i=0; i<centers.length; i++){
        for (j=0; j<points.length; j++){
            distance =  fn_distance(points[j], centers[i])
            force = Math.pow(Math.E, -stiffness*distance)
            HM[i][j] = force
        }
    }
    for(let i=0; i<centers.length; i++){
        for(let j=0; j<points.length; j++){
            totals[j] += HM[i][j]
        }
    }

    for(i=0; i<centers.length; i++){
        for(j=0; j<points.length; j++){
            HM[i][j] /= totals[j]
        }
    }
    return HM
}

function maximize(k, points, HM){
    let newCenters = []
    for(let i=0; i<k; i++){
        newCenters.push([0,0])
    }
    for (let i=0; i<k; i++) {
        row = HM[i];      
        rowSum = row.reduce((a, b) => a + b)

        for (let j=0; j<2; j++) {
            let weighted = 0
            for (let p=0; p <points.length; p++) {
                weighted += row[p] * points[p][j]
            }
            newCenters[i][j] = (weighted / rowSum)
        }
    }
    return newCenters;
}

function soft_clustering(k, stiffness){
    let HM = Array.from({ length: k }, () =>
        Array(points.length).fill(1 / k)
    )
    let centers = initializePoints(points, k)
    let i = 0
    while(i <= 20){
        HM = expect(HM, centers, points, stiffness)
        let newCenters = maximize(k, points, HM)
        if(newCenters === centers){
            break
        }
        centers = newCenters
        i += 1
    }
    // console.log(HM)
    softAssignColors(HM, k)
    return centers
}

function softAssignColors(HM, k){
    points.forEach((point, p) => {
        circle = svg.getElementById(`point-${point}`)
        color = [0, 0, 0, 1]
        for(let i=0; i<k; i++){
            t = HM[i][p]
            color = interpolateColors(color, colors[i], t)
        }
        circle.setAttributeNS(null, 'fill', `rgb(${color[0]},${color[1]},${color[2]},${color[3]})`)
    })
}

// interpolate rgb colors
function interpolateColors(color, newColor, t){
    recolor = [0,0,0,1]
    for(let i=0; i<3; i++){
        recolor[i] = (color[i] * (1-t)) + (newColor[i] * t)
    }
    return recolor
}

// console.log(soft_clustering(3, 0.5, [[1,2], [2,3], [4,5], [3,2], [9,0], [0,0], [0,7.64], [10, 294.4], [9.0, 299.4]]))