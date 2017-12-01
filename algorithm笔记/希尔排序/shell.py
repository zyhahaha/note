import math
def shellSort(arr):
	length = len(arr)
	gap = 1
	while gap < length / 5:
		gap = gap * 5 + 1
	while gap > 0:
		i = gap
		while i < length:
			temp = arr[i]
			j = i - gap
			while j >= 0 and arr[j] > temp:
				arr[j + gap] = arr[j]
				j -= gap
			arr[j + gap] = temp
			i += 1
		gap = math.floor(gap / 5)
	return arr