var api = {

	load: function(){

	},

	parse: function(entry,opt,next){
		if(entry && this['parse_' + entry]) this['parse_' + entry](opt,next);
		this.parse_test(opt,next);
	},

	parse_test: function(opt,next){
		var that = this;
		// this.import('test/model').test();
		var queryMysql = function(opt){
			return new Promise(function(resolve, reject){
				that.db.query('SELECT * FROM test WHERE id = ' + opt.id, function(error, result, fields){
					resolve(result);
				});
			});
		};
		queryMysql({id: 1}).then(function(res){
			console.log(res);
			return queryMysql({id: 2});
		})
		.then(function(res){
			console.log(res);
			return queryMysql({id: 3});
		})
		.then(function(res){
			console.log(res);
			next(res);
		});
	},

	parse_query: function(opt,next){
		var that = this;
		var query = {
			table: 'test',
			fields: 'name,mobile',
			data: {
				id: 7
			}
		};
		that.db.query(query, function(error, result, fields){
			next(result);
		});
	},

	parse_insert: function(opt,next){
		var that = this;
		var datas = {
			table: 'test',
			data: {
				name: 'zzzz',
				mobile: '18300000000'
			}
		};
		that.db.insert(datas, function(error, result, fields){
			next(result);
		});
	},

	parse_inserts: function(opt,next){
		var that = this;
		var datas = {
			table: 'test',
			fields: 'name,mobile',
			data: {
				'1': {
					name: 'bbbb',
					mobile: '18200000000'
				},
				'2': {
					name: 'bbbb',
					mobile: '18200000000'
				},
				'3': {
					name: 'bbbb',
					mobile: '18200000000'
				}
			}
		};
		that.db.insert(datas, function(error, result, fields){
			next(result);
		});
	},

	parse_update: function(opt,next){
		var that = this;
		var query = {
			id: 5
		};
		var datas = {
			table: 'test',
			data: {
				name: 'yyyy',
				mobile: '18311111111'
			}
		};
		that.db.update(query, datas, function(error, result, fields){
			next(result);
		});
	},

	parse_delete: function(opt,next){
		var that = this;
		var query = {
			table: 'test',
			data: {
				id: 4
			}
		};
		that.db.delete(query, function(error, result, fields){
			next(result);
		});
	},
	
};

exports = module.exports = api;