var _lib_crypto = require('crypto');

var utilCoder = {
	_crypto_: _lib_crypto,


	hashcode: function() {
		return this.md5i(new Date().getTime() + utilCode.getRand(12));
	},


	md5: function(str, type, encoding, charset) {
		if (!str) return '';
		var re = this._crypto_
			.createHash('md5')
			.update(str, charset || 'utf8')
			.digest(encoding || 'hex');
		if (type == 'short') re = re.substring(8, 24);
		return re;
	},
	md5i: function(re) {
		if (re && re.length == 16) return re;
		re = this.md5(re, 'short');
		return re;
	},
	md5secret: function(re, secret) {
		secret = secret ? secret : (APP_SECRET ? APP_SECRET : '');
		return this.md5i(secret + re);
	},


	base64Encode: function() {
		return this.base64.apply(this, arguments);
	},
	base64: function(re, encoding) {
		return new Buffer(re, encoding).toString('base64');
	},
	base64Decode: function() {
		return this.base64de.apply(this, arguments);
	},
	base64de: function(re) {
		return new Buffer(re, 'base64').toString();
	},

	basecode: function(re) {
		return new Buffer(re, 'binary').toString('base64');
	},
	baseEncode: function(re) {
		return this.basecode(re);
	},
	baseDecode: function(re) {
		return new Buffer(re, 'base64').toString('binary');
	},


	sha1: function(str, key) {
		if (key) {
			return this.hash_hmac('sha1', key, str);
		} else {
			var obj = this._crypto_.createHash('sha1');
			return str ? obj.update(str).digest('hex') : obj;
		}
	},


	hashes: function() {
		return this._crypto_.getHashes();
	},
	hashType: function(hash) {
		var re = 'RSA-SHA1'; //'sha1WithRSAEncryption'
		switch (hash) {
			case 'SHA1WithRSA':
				re = 'sha1WithRSAEncryption';
				break;
		}
		return re;
	},
	hash: function(opt, str) {
		opt = iso(opt) ? opt : {
			type: opt
		};
		var obj = opt.secret ? this._crypto_.createHmac(type, opt.secret) : this._crypto_.createHash(opt.type);
		if (!str) return obj;
		obj.update(str, opt.charset || 'utf8');
		return obj.digest(opt.encoding || 'hex');
	},
	hash_hmac: function(hash, key, data) {
		var algorithm = this.hashType(hash);
		key = utilString.trimBlank(key);
		var obj = this._crypto_.createHmac(algorithm, key);
		return data ? obj.update(data).digest().toString('base64') : obj;
	},

	hash_sign: function(hash, key, data) {
		var algorithm = this.hashType(hash);
		try {
			var obj = this._crypto_.createSign(algorithm);
			if (!data) return obj;
			key = utilCrypto.formatCert(key);
			// debugx('key',key);
			obj.update(data);
			return obj.sign(key).toString('base64');
		} catch (err) {
			if (vdcs.ISDEV) debugx('err', err);
			return 'err:' + err.message;
		}
	},


	test_hmac: function(data, key) {
		var that = this;
		var reo = {};
		key = utilString.trimBlank(key);
		var hashes = this._crypto_.getHashes();
		eacha(hashes, function(hash) {
			var obj = that._crypto_.createHmac(hash, key);
			obj.update(data);
			// var value=obj.digest().toString('base64');
			var value = obj.digest('hex');
			reo[hash] = value;
		});
		return reo;
	},


	iconv: function() {
		this._iconv = this._iconv || vdcs.requirer('iconv-lite'); // support/
		return this._iconv;
	},
	iconvEncode: function(re, charset) {
		charset = charset || CHARSET;
		return this.iconv().encode(re, charset).toString();
	},
	iconvDecode: function(re, charset) {
		charset = charset || CHARSET;
		return this.iconv().decode(re, charset).toString();
	},

	toGB2312: function(re) {
		return this.iconvEncode(re, 'gbk');
	},

	/*
	function AsciiToUnicode(text){var result='';for(var i=0;i<text.length;i++){result+='&#'+text.charCodeAt(i)+';';}
	return result;}
	function UnicodeToAscii(text){var code=text.match(/&#(\d+);/g);if(code==null){return null;}
	var result='';for(var i=0;i<code.length;i++){result+=String.fromCharCode(code[i].replace(/[&#;]/g,''));}
	return result;}
	*/

	quote111: function(string) {
		var escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		var meta = { // table of character substitutions
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"': '\\"',
			'\\': '\\\\'
		};
		var escapable_replace = function(a) {
			return a
			var c = meta[a];
			return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		};
		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' + string.replace(escapable, escapable_replace) + '"' : '"' + string + '"';
	},
};

exports = module.exports = utilCoder;

/*
crypto.getHashes                   	[ 'DSA',
	'DSA-SHA',
	'DSA-SHA1',
	'DSA-SHA1-old',
	'RSA-MD4',
	'RSA-MD5',
	'RSA-MDC2',
	'RSA-RIPEMD160',
	'RSA-SHA',
	'RSA-SHA1',
	'RSA-SHA1-2',
	'RSA-SHA224',
	'RSA-SHA256',
	'RSA-SHA384',
	'RSA-SHA512',
	'dsaEncryption',
	'dsaWithSHA',
	'dsaWithSHA1',
	'dss1',
	'ecdsa-with-SHA1',
	'md4',
	'md4WithRSAEncryption',
	'md5',
	'md5WithRSAEncryption',
	'mdc2',
	'mdc2WithRSA',
	'ripemd',
	'ripemd160',
	'ripemd160WithRSA',
	'rmd160',
	'sha',
	'sha1',
	'sha1WithRSAEncryption',
	'sha224',
	'sha224WithRSAEncryption',
	'sha256',
	'sha256WithRSAEncryption',
	'sha384',
	'sha384WithRSAEncryption',
	'sha512',
	'sha512WithRSAEncryption',
	'shaWithRSAEncryption',
	'ssl2-md5',
	'ssl3-md5',
	'ssl3-sha1',
	'whirlpool' ]
*/