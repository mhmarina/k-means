function expect(HM, centers, points, stiffness){
    let totals = Array.from({length: points.length}, ()=>0)
    for(let i=0; i<centers.length; i++){
        for (j=0; j<points.length; j++){
            distance =  Math.sqrt((Math.pow((centers[i][0] - points[j][0]),2) + Math.pow((centers[i][1] - points[j][1]),2)))
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
            weighted = 0
            for (let p=0; p <points.length; p++) {
                weighted += row[p] * points[p][j]
            }
            newCenters[i][j] = (weighted / rowSum)
        }
    }
    return newCenters;
}

function soft_clustering(k, stiffness, points){
    let HM = Array.from({ length: k }, () =>
        Array(points.length).fill(1 / k)
    )
    let centers = randoSequence(points).slice(-k).map((i) => i.value);
    let i = 0
    while(i <= 20){
        HM = expect(HM, centers, points, stiffness)
        let newCenters = maximize(k, points, HM)
        if(newCenters == centers){
            break
        }
        centers = newCenters
        i += 1
    }
    // console.log(HM)
    return centers
}

// console.log(soft_clustering(3, 0.5, [[1,2], [2,3], [4,5], [3,2], [9,0], [0,0], [0,7.64], [10, 294.4], [9.0, 299.4]]))