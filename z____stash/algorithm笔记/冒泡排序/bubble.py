def bubbleSort(list_data):
	length = len(list_data)
	sign = True
	index = 0
	while index < length - 1:
		if(list_data[index] > list_data[index + 1]):
			i = list_data[index]
			j = list_data[index + 1]
			list_data[index] = j
			list_data[index + 1] = i
			sign = False
		index += 1
	if sign == False:
		return bubbleSort(list_data)