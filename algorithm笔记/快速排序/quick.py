import math
def quickSort(arr):
	length = len(arr)
	if length <= 1:
		return arr
	baseIndex = math.floor(length / 2)
	base = arr[baseIndex : baseIndex + 1][0]
	left = []
	right = []
	for index in range(length):
		if arr[index] < base:
			left.append(arr[index])
		else:
			right.append(arr[index])
	return quickSort(left) + [base] + quickSort(right)