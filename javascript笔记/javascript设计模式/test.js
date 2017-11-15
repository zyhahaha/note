var a = add(2)(3)(4);

function add(num) {
	function _add(args) {
		num += args;

		return arguments.callee;
	}

	_add.toString = _add.valueOf = function () {
		return num;
	};
	return _add;
}