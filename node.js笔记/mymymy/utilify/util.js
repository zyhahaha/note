var util = {
	APPPATH: '',
	utilSteper: function(){
		return new require('./steper')();
	},

	utilCacher: require('./util_cacher'),
	
	md5: function(str){
		return require('./util_coder').md5i(str);
	},
};

exports = module.exports = util;