function quickSort(arr) {
	if (arr.length <= 1) return arr;

	let baseIndex = Math.floor(arr.length / 2);
	let base = arr.splice(baseIndex, 1)[0];

	let left = [];
	let right = [];

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < base) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}

	return quickSort(left).concat([base], quickSort(right))
}