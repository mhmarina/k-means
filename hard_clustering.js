// m is always 2
function lloyd(k){
    //initialize random centers
    let centers = randoSequence(points).slice(-k).map((i) => i.value);
    let it = 0
    let clusters = []

    while(it <= 200){
        clusters = []
        for(let i = 0; i < k; i++){
            clusters.push([])
        }

        points.forEach(point => {
            let min_dist = Number.MAX_SAFE_INTEGER
            let min_center_index = -1
            centers.forEach((center, i) => {
                let dist = Math.sqrt((Math.pow((center[0] - point[0]),2) + Math.pow((center[1] - point[1]),2)))
                if(dist < min_dist){
                    min_dist = dist
                    min_center_index = i
                }
            })
            clusters[min_center_index].push(point)
        }); 

        // compute new centers (of gravity) for each cluster
        // sum of dimension / order of dimension
        var new_centers = []
        for(let i = 0; i < k; i++){
            new_centers.push([])
        }

        clusters.forEach((cluster, i) => {
            if(cluster.length > 0){
                let sum_x = 0
                let sum_y = 0
                cluster.forEach(point => {
                    sum_x += point[0]
                    sum_y += point[1]
                })
                new_centers[i] = ([sum_x/cluster.length, sum_y/cluster.length])
            }
        })
        if(new_centers === centers){
            break
        }
        centers = new_centers
        it += 1
    }

    // calculate max distance from each center to datapoint
    // for each cluster
    let maxDists = []
    for(let i = 0; i < k; i++){
        let max = -1
        const cluster = clusters[i]
        const center = centers[i]
        for(let j = 0; j < cluster.length; j++){
            let point = cluster[j]
            let dist = Math.sqrt((Math.pow((center[0] - point[0]),2) + Math.pow((center[1] - point[1]),2)))
            if(dist > max){
                max = dist
            }
        }
        maxDists.push(max)
    }
    assignColors(clusters)
    return [centers, maxDists]
}

function assignColors(clusters){
    clusters.forEach((cluster, i) => {
        cluster.forEach(point => {
            circle = svg.getElementById(`point-${point}`)
            circle.setAttributeNS(null, 'fill', `rgba(${colors[i]})`)
        })
    })
}

// console.log(lloyd(2, [[1,2], [2,3], [4,5], [3,2], [9,0], [0,0], [0,7.64], [54.6, 294.4], [49.0, 6.4]]))