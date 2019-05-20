function bubbleSort(list_data) {
	let sign = true;
	for (let index = 0; index < list_data.length - 1; index++) {
		let i, j;
		if (list_data[index] > list_data[index + 1]) {
			i = list_data[index];
			j = list_data[index + 1];
			list_data[index] = j;
			list_data[index + 1] = i;
			sign = false;
		}
	}
	if (!sign) bubbleSort(list_data);
}