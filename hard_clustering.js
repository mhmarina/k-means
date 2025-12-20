// m is always 2
function lloyd(k){
    //initialize random centers
    centers = randoSequence(points).slice(-k).map((i) => i.value);
    it = 0
    while(it <= 20){
        clusters = []
        for(i = 0; i < k; i++){
            clusters.push([])
        }
        points.forEach(point => {
            min_dist = Number.MAX_SAFE_INTEGER
            min_center_index = -1
            centers.forEach((center, i) => {
                dist = Math.sqrt((Math.pow((center[0] - point[0]),2) + Math.pow((center[1] - point[1]),2)))
                if(dist < min_dist){
                    min_dist = dist
                    min_center_index = i
                }
            })
            clusters[min_center_index].push(point)
        }); 

        // compute new centers (of gravity) for each cluster
        // sum of dimension / order of dimension
        new_centers = []
        for(i = 0; i < k; i++){
            new_centers.push([])
        }
        clusters.forEach((cluster, i) => {
            if(cluster.length > 0){
                sum_x = 0
                sum_y = 0
                cluster.forEach(point => {
                    sum_x += point[0]
                    sum_y += point[1]
                })
                new_centers[i] = ([sum_x/cluster.length, sum_y/cluster.length])
            }
        })
        if(new_centers == centers){
            break
        }
        centers = new_centers
        it += 1
    }
    return centers
}

// console.log(lloyd(2, [[1,2], [2,3], [4,5], [3,2], [9,0], [0,0], [0,7.64], [54.6, 294.4], [49.0, 6.4]]))