// init centers to maximize distance
function initializePoints(points, k){
    centers = [points[Math.floor(points.length/2)]]
    for(let i=0; i<k-1; i++){
        max_mean = 0
        new_center = [-1,-1]
        distances = []
        for(let j=0; j < points.length; j++){
            point = points[j]
            if(!centers.includes(point)){
                centers.forEach((c)=>{
                    distance = fn_distance(c,point)
                    distances.push(distance)
                })
                let sum = 0
                distances.forEach((d)=>{sum += d})
                mean = sum/distances.length
                if(mean > max_mean){
                    max_mean = mean
                    new_center = point
                }
            }
        }
        centers.push(new_center)
    } 
    return centers
}

function fn_distance(p1, p2){
    return Math.sqrt((Math.pow((p1[0] - p2[0]),2) + Math.pow((p1[1] - p2[1]),2)))
}