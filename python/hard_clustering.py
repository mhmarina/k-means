# hard clustering
import sys
import random
import math

'''
return: 
k centers obtained from running Lloyd algorithm – k lines (one for each center), each 
containing m coordinate values for the center
'''
def lloyd(k, m, points):
    # initialize random centers
    centers = random.sample(points, k)
    # centers = points[:k]
    it = 0
    while it <= 20:
        clusters  = [[] for _ in range(k)]
        # for each point in point, find closest center
        for point in points:
            min_dist = sys.maxsize
            min_center_index = -1
            for i, center in enumerate(centers):
                # compute distance between point and center
                dist = math.sqrt(sum((center[j] - point[j])**2 for j in range(m)))
                if dist < min_dist:
                    min_dist = dist
                    min_center_index = i
            clusters[min_center_index].append(point)

        # compute new centers (of gravity) for each cluster
        # sum of dimension / order of dimension
        new_centers = [[] for _ in range(k)]
        for i, cluster in enumerate(clusters):
            # compute new center of gravity
            if len(cluster) > 0:
                new_centers[i] = ([round(sum(point[j] for point in cluster)/len(cluster),3) for j in range(m)]) # this is the new center of gravity

        # converge if centers havent changed
        if new_centers == centers:
            break
        centers = new_centers
        it += 1

    # for center in centers:
    #     for i in range(m):
    #         center[i] = round(center[i], 3)
    return centers

# centers = lloyd(2, 2, [[1,2], [2,3], [4,5], [3,2], [9,0], [0,0], [0,7.64], [54.6, 294.4], [49.0, 6.4]])
# for center in centers:
#     print(center)