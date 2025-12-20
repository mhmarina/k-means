# soft clustering
import math
import random

# K-means clustering (soft) via Expectation-Maximization (EM) algorithm
# soft assignment based on what each data point’s responsibility for each cluster
# given n data points (Data1 . . . Datan) and k centers (x1 . . . xk), we need to construct a k × n 

# centers to clusters
def expect(HM, centers, points, stiffness, m):
    totals = [0 for _ in range(len(points))]
    # expectation
    # calculate force for each point and center
    for i in range(len(centers)):
        for j in range(len(points)):
            distance =  math.sqrt(sum((centers[i][k] - points[j][k])**2 for k in range(m)))
            force = math.pow(math.e, -stiffness*distance)
            HM[i][j] = force
    # get sum force for each point
    for i in range(len(centers)):
        for j in range(len(points)):
            totals[j] += HM[i][j]
    # divide HM values by sum
    for i in range(len(centers)):
        for j in range(len(points)):
            HM[i][j] /= totals[j]

# clusters to centers
def maximize(k, points, HM, m):
    # x i,j = Hidden Matrix i dot Data j / Hidden Matrix i dot 1 (aka sum of row i)
    # x i,j where i is the center and j is the datapoint, and HM[i] is the row vector
    # pythonic dot product: sum(i*j for (i, j) in zip(list1, list2)) or a = A @ B yay !
    new_centers = [[0 for _ in range(m)] for _ in range(k)]
    for i in range(k):
        for j in range(m):
            new_centers[i][j] = round(sum(a*b for (a, b) in zip(HM[i], [point[j] for point in points])) / sum(HM[i]),3)
    return new_centers

def soft_clustering(k, m , stiffness, points):
    # expect
    HM = [[1/k for _ in range(len(points))] for _ in range(k)] # H[i][j] = responsibiliy of center i on point j
                                                            # HM = Forcei,j / Sum of all center's forces
                                                             # Forcei,j = e^(-stiffness*distance(dataj, centeri))
    # centers = points[:k]
    centers = random.sample(points, k)
    i = 0
    while i <= 20:
        expect(HM, centers, points, stiffness, m)
        new_centers = maximize(k, points, HM, m)
        if new_centers == centers:
            break
        centers = new_centers
        i += 1
    # for row in HM:
    #     print(row)
    return centers

# centers = soft_clustering(3, 2, 0.5,[[1,2], [2,3], [4,5], [3,2], [9,0], [0,0], [0,7.64], [10, 294.4], [9.0, 299.4]])
# for center in centers:
#     print(center)