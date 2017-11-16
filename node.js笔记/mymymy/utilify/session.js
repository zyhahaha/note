var test = {
	create_session: function(next) {
		var that = this;
		var code = utilCode.getRandnum(6) + this.uid;
		var sid = utilCoder.md5i('' + code);
		var datas = {
			sid: sid,
			uid: this.uid,
			code: code,
			status: 1,
			tim: DCS.timer(),
		};
		this.create(datas, next);
		this.id = sid;
	},
	getRandnum: function(n) {
		var re = '';
		for (var i = 0; i < n; i++) {
			//logi(i+': '+Math.floor(Math.random()*10));
			re += '' + Math.floor(Math.random() * 10) + ''; //0-9随机整数
		}
		return re;
		//return Math.round(Math.random()*n)
	},
};