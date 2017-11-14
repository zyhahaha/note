/*
Version:	VDCS.js 2.0
			in zepto or jQuery
Support:	http://vdcs.cn/js
Uodated:	2016-11-18
*/

var VDCS = {},
	vdcs = {
		vers: {
			bulid: '0.0.1',
			d: '20160123'
		}
	},
	DCS = dcs = {};
var global = window;

// variable
var BR = NEWLINE = EOL = "\n";


// function
objString = Object.prototype.toString;
isn = function(s) {
	return (s == null || s == undefined) ? true : false
};
isun = function(v) {
	return (typeof(v) == undefined || typeof(v) == 'undefined') ? true : false
};
ise = function(s) {
	return (s == null || s.length < 1) ? true : false
};
isb = function(s) {
	return typeof(s) === 'boolean'
};
iss = function(s) {
	return typeof(s) === 'string'
};
isd = function(o) {
	return objString.call(o) == '[object Date]'
};
isa = function(o) {
	return objString.call(o) == '[object Array]'
};
iso = function(o) {
	return objString.call(o) == '[object Object]'
};
isoo = function(o) {
	return typeof(s) === 'object'
};
isf = function(o) {
	return o instanceof Function || typeof(o) == 'function'
};
tn = function(o) {
	return typeof(o).toString()
};


isint = isInt = function(s) {
	return parseInt(s) == s
};
isnum = isNum = function(s) {
	return parseFloat(s) == s
};
isInte = function(s) {
	return /^[0-9]*[1-9][0-9]*$/.exec(s) ? true : false
};
isNume = isNumber = function(s, t, v) {
	var vars = (t == 1) ? '0123456789.' : '0123456789',
		ar = new Array(1);
	if (ise(v)) {
		ar[0] = false;
		ar[1] = true
	} else {
		ar[0] = 0;
		ar[1] = s
	}
	if (ise(s)) return ar[0];
	for (var i = 0; i < s.length; i++) {
		if (vars.indexOf(s.charAt(i)) == -1) return ar[0]
	}
	return ar[1]
};

tob = function(s) {
	return (s == true || s == 1 || s == 'True' || s == 'true' || s == '1')
};
toi = function(s, b) {
	return isInt(s) ? parseInt(s, b || 10) : 0
};
ton = function(s) {
	return isNum(s, 1) ? parseFloat(s) : 0
};

t = function(s) {
	return iss(s) ? s.trim() : s
};
len = function(s) {
	return s.replace(/[^\x00-\xff]/g, 'aa').length
};
r = function(s, s1, s2) {
	if (!s || ise(s1)) return s;
	var n = 0;
	while (s.indexOf(s1) > -1 && n < 100) {
		s = s.replace(s1, s2);
		n++
	};
	return s
};
rv = function(s, s1, s2) {
	return r(s, '{' + s1 + '}', s2)
};
rd = function(s, s1, s2) {
	return r(s, '{$' + s1 + '}', s2)
};
rs = function(s, s1, s2, ic) {
	if (!RegExp.prototype.isPrototypeOf(s1)) {
		return s.replace(new RegExp(s1, (ic ? 'g' : 'gi')), s2)
	} else {
		return s.replace(s1, s2)
	}
};

substr = function(s, n, n2) {
	return s ? s.substr(n - 1, n2 - 1) : s
};
split = function(s, p) {
	return s ? s.split(p) : []
};
strl = left = function(s, n) {
	return s ? s.substr(0, n) : s
};
strr = right = function(s, n) {
	return s ? s.substr(s.length - n) : s
};
ins = function(s, c) {
	return s == undefined ? -1 : s.indexOf(c)
};
inp = function(s, v, p) {
	p = p || ',';
	return s == undefined ? -1 : ((p + s + p).indexOf(p + v + p) + 1)
};
inps = function(s, v, p) {
	p = p || ',';
	v = v.split(',');
	var re = 0;
	for (var a = 0; a < v.length; a++) {
		re = (p + s + p).indexOf(p + v[a] + p) + 1;
		if (re > 0) break
	}
	return re
};
ina = function(ary, v) {
	return $.inArray(v, ary) + 1
};
ino = function(obj, k) {
	return obj.hasOwnProperty(k)
};

vv = function(s, v) {
	return isn(s) ? v : s
};
upper1 = function(s) {
	return s ? (s.substring(0, 1).toUpperCase() + s.substring(1, s.length)) : s
};

eacha = function(a, fn) {
	for (var n in a) {
		fn(a[n], n + 1)
	}
};
eacho = function(o, fn) {
	var n = 0;
	for (var k in o) {
		if (o.hasOwnProperty(k)) {
			fn(k, o[k], n + 1);
			n++
		}
	}
};
eachx = function(o, fn) {
	return $.each(o, fn)
};


cloner = function(o) {
	return vdcs.cloner(o)
};
extendx = ox = function(o, a, b, c, d, e) {
	return Object.assign({}, o, a, b, c, d, e)
};
extendo = function(o, a, b, c, d, e) {
	return Object.assign(o, a, b, c, d, e)
};

iscfg = isopt = function(o) {
	return (o instanceof Object || o instanceof Array)
};
oxx = function(o, a, b, c, d, e) {
	return Object.assign(true, {}, o, a, b, c, d, e)
};


$jo = function(o) {
	o = $(o);
	if (!o.length) o = null;
	return o
};


o2s = function(o, p1, p2, f) {
	return utilString.toString(o, p1, p2, f)
};
s2o = function(s, p1, p2, f) {
	return utilString.toObject(s, p1, p2, f)
};
json2o = json_decode = function(s) {
	return utilJSON.toObject(s)
};
o2json = json_encode = function(o) {
	return utilJSON.toString(o)
};
url_decode = function(o) {
	return $url.de(o)
};
url_encode = function(o) {
	return $url.en(o)
};


islocal = isLocal = function() {
	return vdcs.isLocal()
};
isMobile = function() {
	return vdcs.isMobile()
};


query = function(k) {
	return dcs.query(k)
};

refresh = function() {
	return dcs.refresh()
};
go = function(url) {
	return dcs.go(url)
};
goback = function() {
	return dcs.goback()
};
gox = function(url) {
	return dcs.gox(url)
};
goi = function(url) {
	return dcs.goi(url)
};


// vdcs
extendo(vdcs, {
	CHARSET: 'utf-8',
	is_local: false,
	device: '',

	basedir: '/',
	unit: {
		coin: '元',
		price: '元',
		money: '元',
		emoney: '金币',
		points: '分',
		exp: '点',
		strength: '点',
		prestige: '点'
	},


	ready: function(fn) {
		$(fn);
		return this
	},

	initer: function() {
		this.DEBUGV = this.query('debug');
		if (this.browser) return dbg.t('vdcs.init already!');
		this.browser = this.prober();
		this.ISDEV = this.isLocal();
	},
	serveURL: function(v) {
		return $serve.url(v)
	},


	isDebug: function(v) {
		return this.isdebug(v)
	},
	isdebug: function(v) {
		var r = this.DEBUGV;
		if (typeof v == 'undefined' && r) return true;
		return v == r
	},
	isLocal: function() {
		return this.is_local
	},
	islocal: function() {
		return this.is_local
	},
	isMobile: function() {
		return this.device == 'mobile'
	},
	isWX: function() {
		if (typeof $wx != 'undefined') {
			return $wx.is()
		} else {
			return (this.agent.match(/MicroMessenger/i) == 'micromessenger') ? true : false
		}
	},


	caller: function(func, args, n, that) { // arguments
		return func.apply(that || null, Array.prototype.slice.call(args, n || 0));
	},
	args_unpop: function(args, n) { //,args_slice
		if (n === undefined) n = 1;
		return Array.prototype.slice.call(args, n)
	},
	args_unpush: function(args, value) { //,args_unshift
		if (!isa(value)) value = [value];
		var argv = Array.prototype.slice.call(args, 0);
		var re = value.concat(argv);
		return re
	},

	cloner: function(obj) {
		var reo;
		if (!obj || typeof(obj) === undefined) return obj;
		if (obj.constructor == Object) reo = new obj.constructor();
		else if (obj.constructor == Function) reo = new obj.constructor();
		else if (obj.constructor == Array) reo = [];
		else reo = new obj.constructor(obj.valueOf()); //obj.valueOf()
		for (var key in obj) {
			if (key && reo[key] != obj[key]) {
				if (typeof(obj[key]) == 'object') reo[key] = cloner(obj[key]);
				else reo[key] = obj[key];
			}
		}
		//reo.toString=obj.toString;reo.valueOf=obj.valueOf;
		return reo
	},


	vert: function(t, real) {
		var re = (this.is_local || real) ? Date.d() : dcs.vers.d;
		return t ? ('_t=' + re) : re
	},

	opter: function(thos) {
		if (!thos || !thos.opt) {
			var _opt = ox({}, thos);
			thos = newEvent();
			thos.opt = _opt;
		}
		return thos
	},


	nav: navigator,
	agent: navigator.userAgent.toLowerCase(),
	ver: navigator.appVersion,
	prober: function() {
		var w = window,
			d = document;
		var re = {
			agent: this.agent,
			version: this.ver.split(' ')[0],
			msie: /msie/.test(this.agent),
			chrome: /chrome/.test(this.agent),
			mozilla: /firefox/.test(this.agent),
			webkit: /webkit/.test(this.agent),
			safari: /safari/.test(this.agent),
			opera: !!w.opera,
			w3c: (d.compatMode == 'CSS1Compat')
		};
		re.v = Math.floor(re.version);
		re.firefox = re.gecko = re.mozilla;
		re.chrome = isf(w.MessageEvent);
		re.safari = isf(w.openDatabase);
		if (re.msie) {
			var vers = this.ver.match(/MSIE ([\d]+)\.([\d]+);/);
			re.ie = true;
			re.iev = re.MajorVer = vers[1];
			re.MinorVer = vers[2];
			re.ieo = re.iev < 9;
			re.ie6 = (re.iev == 6);
			re.ie7 = (re.iev == 7);
			re.ie8 = (re.iev == 8);
		}
		return re
	},

	urler: function() {
		if (this.init_url) return;
		this.init_url = true;
		var au = {};
		var wl = window.location;
		au['title'] = document.title;
		au['referrer'] = au['referer'] = wl.referrer || document.referrer;
		au['uri'] = au['href'] = wl.toString(); /*d.URL*/
		au['protocol'] = wl.protocol.substr(0, wl.protocol.length - 1);
		au['port'] = wl.port;
		au['domain'] = wl.hostname;
		au['path'] = wl.pathname;
		au['paths'] = au['path'] + wl.search;
		au['query_string'] = wl.search ? wl.search.substr(1) : '';
		au['hash'] = wl.hash ? wl.hash.substr(1) : '';
		au['url'] = au['urlbase'] = wl.origin + '/';
		au['urls'] = au['urlbase'] + au['path'].substr(1);
		au['channel'] = '';
		au['dirn'] = 0;
		for (var a = 0; a < 5; a++) {
			au['dir' + (a + 1)] = ''
		};
		var ary = au['path'].split('/');
		if (ary.length > 2) {
			au['channel'] = ary[1];
			au['dirn'] = ary.length - 2;
			for (var a = 2; a < (ary.length - 1); a++) {
				au['dir' + (a - 1)] = ary[a]
			}
			au['script'] = ary[ary.length - 1];
		} else {
			au['script'] = ary[1]
		}
		var il = au['script'].lastIndexOf('.');
		au['page'] = il > 0 ? au['script'].substr(0, il) : au['script'];
		au['ext'] = il > 0 ? au['script'].substr(il + 1) : '';
		this._url = au;
	},
	urls: function() {
		this.urler();
		return this._url
	},
	url: function(k) {
		this.urler();
		return this._url[k || 'uri']
	},

	// query
	urlHash: function(opt) {
		var hasha = this.url('hash').split('@');
		var hash = hasha[hasha.length - 1],
			token = '';
		if (hasha.length == 2) token = hasha[0];
		return {
			hash: hash,
			token: token
		}
	},

	query: function(k) {
		return $.query.get(k)
	},

	// cookie
	cookie: function(k, v, epr) {
		return isn(v) ? this.cookieSet(k, v, epr) : cookieGet(k)
	},
	cookieSet: function(k, v, epr) {
		var _day = 0;
		switch (epr) {
			case 'day':
				_day = 1;
				break;
			case 'week':
				_day = 7;
				break;
			case 'month':
				_day = 30;
				break;
			case 'year':
				_day = 365;
				break;
			case 'yes':
				_day = 3650;
				break;
		}
		if (_day > 0) {
			var d = new Date();
			d.setTime(d.getTime() + (_day * 24 * 60 * 60 * 1000));
			var _expires = '; expires=' + d.toGMTString();
			d.cookie = k + '=' + v + _expires + '; path=' + this.basedir;
		}
		// dbg.t(v);
		return v
	},
	cookieGet: function(k) {
		var re = '',
			rRE = new RegExp(escape(k) + "=([^;]+)");
		if (rRE.test(d.cookie + ';')) {
			rRE.exec(d.cookie + ';');
			re = unescape(RegExp.$1);
		}
		return re
	},

	// other
	append: function(type, value, opt) {
		return $.append(type, value, opt)
	},
	open: function(u, n, wid, hei, scroll, cont) {
		var l = (screen.width) ? (screen.width - wid) / 2 : 0,
			t = (screen.height) ? (screen.Height - hei) / 2 : 0;
		var o = window.open(u, n, 'width=' + wid + ',height=' + hei + ',left=' + l + ',top=' + t + ',toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=' + scroll + ',resizable=no');
		if (cont) {
			o.document.write(cont)
		}
		return o
	},

	timeout: function(n, f) {
		return setTimeout(f, n * 1000)
	},
	timeoutClear: function(t) {
		return clearTimeout(t)
	},
	interval: function(n, f) {
		return setInterval(f, n * 1000)
	},
	intervalClear: function(t) {
		return clearInterval(t)
	}
});
$(function() {
	vdcs.initer()
});


global.newEvent = function() {
	return new VDCS.utilEvent()
};
global.newMap = function() {
	return new VDCS.utilMap()
};
global.newTable = function() {
	return new VDCS.utilTable()
};
global.isTable = function(o) {
	return isot(o, 'VDCS.utilTable')
};

global.util = $util = {
	PATTERN_PRE: /\{\@([^{\@}]*)}/gi,
	PATTERN_VAR: /\{\$([^{\$}]*)}/gi,
	PATTERN_LEBEL_FLAGS: "<{flag}:([^<>!]*)(!([\w-\.][^!]+?))?>",
	PATTERN_LEBEL_ITEM: /\[item:([\w-\.]*)\]/gi,
	PATTERN_LEBEL_ITEMS: /\[item:([\w-\.]*)(!([\w-\.][^!]+?))?(!([\w-\.][^!]+?))?\]/gi,
	toRegex: function(ptn) {
		return iss(ptn) ? new RegExp(ptn, 'gi') : ptn
	},
	replaceRegex: function(ptn, re, values, fn) {
		fn = fn || function(s, k) {
			return values[k]
		};
		return re.replace(this.toRegex(ptn), fn)
	},
	replacePre: function(re, values) {
		return this.replaceRegex(this.PATTERN_PRE, re, values)
	},
	replaceVar: function(re, values) {
		return this.replaceRegex(this.PATTERN_PRE, re, values)
	},
	replaceFilter: function(re, values, ptn, fn) {
		if (!re) return '';
		return re.replace(ptn || this.PATTERN_LEBEL_ITEMS, function(s, field, s2, fmt, s4, s5) {
			return util.filterValue(values[field], fmt, s5, fn)
		})
	},
	filterValue: function(re, fmt, p2) {
		if (fmt) {
			var fnm;
			if ($filter && $filter[fnm = fmt]) re = $filter[fnm](re, p2);
			else if ($code[fnm = 'filter_' + fmt]) re = $code[fnm](re, p2);
			else if ($code[fnm = 'to_' + fmt]) re = $code[fnm](re, p2);
			else dbg.t('filterValue', 'unkown filter(' + fmt + ') format!');
		}
		return re
	},

	toMap: function(o) {
		return (iso(o) && o.TYPENAME == 'utilMap') ? o : utilJSON.toMap(o)
	}
};

VDCS.Error = function() {
	var _n = 0;
	_dat = [];
	this.is = function() {
		return (_n > 0) ? false : true
	};
	this.add = function(s) {
		_n++;
		_dat[_n] = s
	};
	this.toString = function() {
		var rea = [];
		for (var i = 1; i <= _n; i++) {
			rea.push(_dat[i])
		};
		return rea.join("\n")
	};
	this.pop = function() {
		if (_n > 0) alert(this.toString())
	};
};


VDCS.utilVar = function() {
	this.__vars_ = {};
	this.set = function(k, v) {
		this.__vars_[k] = v;
		return this
	};
	this.get = function(k) {
		return this.__vars_[k]
	}
};

VDCS.utilEvent = function() {
	this.__events_ = {};
	this.is = function(a) {
		return this.isEvent(a)
	};
	this.isEvent = function(action) {
		return !!this.__events_[action]
	};
	this.getEvent = function(action) {
		return this.__events_[action]
	};
	this.on = function(action, fn) {
		this.__events_[action] = fn;
		return this
	};
	this.off = function(action) {
		delete this.__events_[action];
		return this
	};
	this.emit = function(action) {
		var re = null;
		var ea = this.__events_[action];
		if (ea) {
			re = vdcs.caller(ea, arguments, 1, this);
			if (isn(re)) re = true;
		}
		return re
	};
	this.emit_sub = function(head, arg) {
		this.emit.apply(this, vdcs.args_unpush(arg, head));
	};
	this.autorun = function() {
		if (this.opt && this.opt.autor) {
			var that = this;
			if (this.run) vdcs.timeout(0.1, function() {
				that.run()
			});
			else dbg.log('Event.autorun', 'Function [run] on exist!');
		}
	};
};


global.newDate = function(d) {
	return new VDCS.utilDate(d)
};

VDCS.utilDate = function(d) {
	this.fmt_def = 'yyyy-mm-dd hh:ii:ss';
	this.d = d || new Date();
	if (iso(d)) this.d = d;
	else if (isint(d)) this.d = new Date(d * 1000);
	else {
		this.d = new Date();
		if (d) this.d.setTime(Date.parse(d.replace(/-/gi, "/")));
	}

	this.timer = function() {
		return Math.round(this.d.getTime() / 1000)
	};
	this.num = function() {
		var re = Date.parse(this.d) / 1000;
		if (re < 1) re = 0;
		return re
	};
	this.now = function() {
		return this.format('time')
	};

	this.format = function(type, real) {
		var re = this.fmt_def;
		switch (type || 'time') {
			case 'time':
				re = 'yyyy-mm-dd hh:ii:ss';
				break;
			case 'timec':
				re = 'yyyy-mm-dd hh:ii';
				break;
			case 'timei':
				re = 'yy-mm-dd hh:ii';
				break;
			case 'his':
				re = 'hh:ii:ss';
				break;
			case 'ymd':
			case 'day':
			case 'date':
				re = 'yyyy-mm-dd';
				break;
			case 'datei':
				re = 'mm-dd hh:ii';
				break;
			case 'dates':
				re = 'yyyy-mm-dd hh:ii';
				break;
			default:
				re = type;
				break;
		}
		this.fmt_value = re;
		return real ? this.toString() : this
	};
	this.toString = function() {
		var re = this.fmt_value || this.fmt_def;
		var _year = this.d.getFullYear().toString(),
			_month = this.d.getMonth() + 1;
		re = r(re, 'yyyy', _year);
		re = r(re, 'yy', _year.substr(2));
		re = r(re, 'mm', this.v2(_month));
		re = r(re, 'm', _month);
		re = r(re, 'dd', this.v2(this.d.getDate()));
		re = r(re, 'd', this.d.getDate());
		re = r(re, 'hh', this.v2(this.d.getHours()));
		re = r(re, 'h', this.d.getHours());
		re = r(re, 'ii', this.v2(this.d.getMinutes()));
		re = r(re, 'i', this.d.getMinutes());
		re = r(re, 'ss', this.v2(this.d.getSeconds()));
		re = r(re, 's', this.d.getSeconds());
		return re
	};

	this.distances = ['@', '$1秒前', '$1分钟前', '$1小时前', '$1天前'];
	this.distance = function() {
		var n = this.num(),
			re = [0, '', -1];
		if (n > 86400) {
			re[0] = 4;
			re[2] = parseInt(n / 86400)
		} else if (n > 3600) {
			re[0] = 3;
			re[2] = parseInt(n / 3600)
		} else if (n > 60) {
			re[0] = 2;
			re[2] = parseInt(n / 60)
		} else if (n > 0) {
			re[0] = 1;
			re[2] = n
		}
		if (re[0] > 0) {
			if (re[2] < 1) re[2] = 1
			re[1] = r(this.distances[re[0]], '$1', re[2]);
		}
		return re
	};

	this.v2 = function(s) {
		if (s.toString().length < 2) s = '0' + s;
		return s
	};
};


global.utilString = VDCS.utilString = {

	toString: function(o, p1, p2, f) {
		p1 = p1 || ';';
		p2 = p2 || '=';
		f = f || function(v) {
			return v
		};
		var a = [];
		eacho(o, function(k, v) {
			a.push(k + p2 + f(v))
		});
		return a.join(p1)
	},
	toObject: function(s, p1, p2, f) {
		s = s || '';
		p1 = p1 || ';';
		p2 = p2 || '=';
		f = f || function(v) {
			return v
		};
		var re = {},
			ar, ars = s.split(p1),
			alen = ars.length;
		for (var i = 0; i < alen; i++) {
			ar = ars[i].split(p2);
			if (ar.length == 2 && t(ar[0]) != '') re[t(ar[0])] = f(t(ar[1]))
		}
		return re
	},

};


global.utilURL = VDCS.utilURL = {

	base: function(url, baseurl) {
		if (ins(url, '://') > 0) return url;
		if (url.substr(0, 1) == '/') url = url.substr(1);
		return baseurl + url
	},

};


global.utilJSON = VDCS.utilJSON = {

	toString: function(o) {
		return this.encode(o)
	},
	toObject: function(s, b) {
		var o = b ? {} : null;
		return this.decode(s) || o
	},

	encode: function(o, r) {
		try {
			return iso(o) ? JSON.stringify(o) : o
		} catch (e) {
			return r ? '{}' : null
		}
	},
	decode: function(s, r) {
		try {
			return iss(s) ? JSON.parse(s) : s
		} catch (e) {
			return r ? {} : null
		}
	},

	getFilter: function(json, px, px2, pxx) {
		px2 = px2 || '';
		pxx = pxx || '';
		var reo = {};
		var len = px.length;
		eacho(json, function(key, value) {
			if (key.substr(0, len) == px) {
				reo[px2 + key.substr(len) + pxx] = value;
			}
		});
		return reo
	},
	extract: function(json, fields) {
		var that = this;
		var fielda = (fields || '').split(',');
		eacha(fielda, function(field) {
			if (field) that.extracti(json, that.toObject(json(field)), field + '.');
		});
		return json
	},
	extracti: function(root, jsono, px) {
		for (var node in jsono) {
			if (typeof(jsono[node]) == 'object') this.extracti(jsono[node], px + node + '.');
			else root[px + node] = jsono[node];
		}
	},


	toTable: function(json) {
		var table = newTable();
		if (!json) return table;
		eacha(json, function(row, index) {
			table.add(row);
		});
		return table
	},
	toMap: function(results) {
		var maps = newMap();
		var json = iso(results) ? results : this.toObject(results, true);
		var jsono = cloner(json);
		var data = cloner(json.data) || {};
		delete json.data;
		var head = json,
			lists;
		if (data.lists) {
			lists = cloner(data.lists);
			delete data.lists;
		}
		maps.setObject(jsono.data);
		maps.add('results', results);
		maps.add('json', jsono);
		maps.add('head', head);
		maps.add('var', data);
		if (lists) maps.add('lists', this.toTable(lists));
		return maps
	},

	result: function(jo, json) {
		jo.css({
			'textAlign': 'left',
			'whiteSpace': 'pre',
			'fontFamily': 'monospace'
		});
		if (!iso(json)) json = JSON.parse(json);
		jo.html(JSON.stringify(json, null, 4));
	},
};

vBasic.fn.extend({
	resultJSON: function(json) {
		return utilJSON.result(this, json)
	}
});


global.newTable = function(v) {
	return new VDCS.utilTable(v);
};
global.isTable = function(obj) {
	return obj && obj.TYPENAME == 'utilTable'
};

global.utilTable =
	VDCS.utilTable = function(ary) {
		this.TYPENAME = 'utilTable',
			this._data = [],

			this.each = function(fn) {
				return this.eachObject(fn)
			};
		this.eachJSON = function(fn) {
			return this.eachObject(fn)
		};
		this.eachRow = function(fn) {
			return this.eachObject(fn)
		};
		this.eachObject = function(fn) {
			var len = this._data.length;
			for (var n = 0; n < len; n++) {
				var re = fn(this._data[n], n + 1);
				if (re === false) break;
			}
			return this
		};

		this.isEmpty = function() {
			return this._data.length == 0
		};
		this.getCount = this.total = this.count = this.getRow = this.row =
			this.rows = function() {
				return this._data.length
			};


		/*
		########################################
		########################################
		*/
		this.getItem = this.get = function(index) {
			return this._data[index]
		};
		this.setItem = this.set = function(index, obj) {
			this._data[index] = obj;
			return this
		};
		this.addItem = this.add = function(obj) {
			if (!obj) return this;
			this._data[this._data.length] = obj.toObject ? obj.toObject() : obj;
			return this
		};
		this.delItem = this.remove = this.del = function(index) {
			delete this._data[index];
			return this
		};


		/*
		########################################
		########################################
		*/
		this.getFields = function() {
			return this.getFielda().join(',')
		};
		this.getFielda = function() {
			if (this.isEmpty()) return [];
			return Object.keys(this._data[0]);
		};

		this.getValues = function(field, smb) {
			return this.getValuea(field, smb).join(',')
		};
		this.getValuea = function(field, smb) {
			var rea = [];
			smb = smb || '';
			this.eachObject(function(row) {
				rea.push(smb + row[field] + smb);
			});
			return rea
		};

		this.appendFields = function(fields, px) {
			return this.appendFielda(fields.split(','), px)
		};
		this.appendFielda = function(fielda, px) {
			if (this.isEmpty()) return false;
			px = px || '';
			var that = this;
			fora(fielda, function(field) {
				that._data[0][px + field] = null;
				// that._data[0].push(px+field);
			})
			return true
		};

		this.appendTable = function(table2, opt) {
			opt = ox({
				by: '', // 当前表关联字段
				field: 'id',
				px: '',
				filter_row: null,
			}, opt);
			var items = {};
			var filter_row = opt.filter_row || function(row) {
				return row
			};
			var filter_item = opt.px ? function(json) {
				return utilJSON.objextPX(json, opt.px)
			} : function(json) {
				return json
			};
			var relate_id = opt.by || opt.field;
			table2.eachJSON(function(json) {
				items[json[relate_id]] = filter_row(filter_item(json));
			});
			this.eachObject(function(row, n) {
				eacho(items[row[opt.field]], function(key, value) {
					row[key] = value;
				});
			});
		};


		/*
		########################################
		########################################
		*/
		this.setArray = function(obj) {
			this._data = vdcs.cloner(obj);
			return this
		};
		this.toArray = function() {
			return vdcs.cloner(this._data)
		};

		this.setResults = function(results) {
			var that = this;
			// return this.setArray(results)
			eacha(results, function(row) {
				that.add(utilJSON.result2o(row));
			});
			return this
		};
		this.toResults = function() {
			return this.toArray()
		};

		this.setJSON = function(json) {
			return this.setArray(json)
		};
		this.toJSON = function() {
			return this.toArray()
		};

		this.toString = function() {
			return o2json(this.toJSON())
		};

		this.render = function(opt) {
			return ui.render.tableReplace(this, opt)
		};

		if (ary) this.setArray(ary);
	};


VDCS.utilMap = function(obj) {
	this._obj = {};
	this._dat = {};
	this.def_var = 'var';
	this.def_table = 'lists';
	this.TYPENAME = 'utilMap';

	this.setObject = function(obj) {
		this._obj = cloner(obj) || {};
		return this
	};
	this.setObject(obj);

	this.isEmpty = function() {
		return this._dat.length > 0 ? false : true
	};

	this.is = function(k) {
		return !isun(this._dat[k])
	};
	this.add = function(k, o) {
		this._dat[k] = o;
		return this
	};
	this.set = function(k, o) {
		this._dat[k] = o;
		return this
	};
	this.get = function(k, o) {
		return this._dat[k]
	};

	this.heads = function() {
		return this.get('head')
	};
	this.vars = function() {
		return this.get('var')
	};
	this.lists = function(k) {
		return this.getJSON(k)
	};
	this.getVar = this.var = function(k) {
		this.ovar = this.ovar || this.getJSON(this.def_var);
		return this.ovar[k]
	};

	this.getItemJSON = this.getJSON = function(k) {
		k = k || this.def_table;
		var reo = {};
		if (iso(this._dat[k])) reo = this._dat[k];
		return reo
	};
	this.getItemTable = this.getTable = function(k) {
		k = k || this.def_table;
		var reo = newTable();
		var obj = this._dat[k] || this._obj[k];
		if (isTable(obj)) reo = obj;
		else if (isa(obj)) reo.setArray(obj);
		return reo
	};
};


VDCS.baseServe = function() {
	// options
	this.filterOpt = function(o) {
		return o
	};
	this.filterSelector = function(o) {
		return o
	};

	// serve
	this.isServePost = function() {
		return this.opt.serve_method == 'post'
	};
	this.serveVars = function(k, v) {
		this.opt.serveVar.vars[k] = v;
		return this
	};
	this.serveVarFilter = function(vars) {
		return vars
	};
	this.serveURL = function() {
		return this.opt.serveURL || vdcs.serveURL(this.serveVarFilter(this.opt.serveVar))
	};
};

VDCS.serve = function(vars) {
	this._var = vars || {
		entry: 'entry',
		api: 'status',
		x: 'json',
		action: ''
	};
	this._uri = '/{entry}/';
	this._urlx = '{api}.{x}?action={action}';
	this._mode = 'channel';
	this.uri = function(v) {
		return this._uri = v;
		return this
	};
	this.serve = function(v) {
		return this._var.x = v;
		return this
	};
	this.isJSONP = function() {
		return this._var.x == 'jsonp'
	};
	this.setVar = function(vs, v) {
		if (!vs) return this;
		if (iss(vs)) {
			var k = vs;
			vs = {};
			vs[k] = v;
		}
		this._var = ox(this._var, vs);
		return this
	};
	this.setChannel = this.setEntry = function(v) {
		return this.setVar('entry', v)
	};
	this.setMode = function(mode) {
		this._mode = mode;
		return this
	};
	this.modeURL = function(mode, v) {
		var url = this._uri;
		switch (mode) {
			case 'api':
				url = '/api/{entry}/';
				break;
			case 'define':
				url = this._uri;
				break;
		}
		return url
	};
	this.filterURL = function(url) {
		for (var i = 0; i < 3; i++) {
			url = r(url, '/.', '.')
		}
		return url
	};
	this.getURL = this.url = function(opt) {
		if (iss(opt)) return opt;
		opt = oxx(this._var, opt);
		var url = opt.url;
		if (url) return url;
		url = this.modeURL(opt['@'] || this._mode) + this._urlx;
		url = rv(url, 'api', r(opt['api'], '.', '/'));
		eacho(opt, function(key, value) {
			if (!iso(value)) url = rv(url, key, value);
		});
		url = this.filterURL(url);
		url = $url.link(url, ox(opt.parami, opt.params));
		if (this._var.vars) url = util.replaceVar(url, this._var.vars);
		return url
	};
	this.ox = function(serve2) {
		if (!serve2) return this;
		if (!serve2._var) serve2 = new VDCS.serve(serve2);
		this._var = oxx(this._var, serve2._var);
		return this
	};
	this.xparami = function(ps) {
		this._var.parami = ox(this._var.parami, ps);
		return this
	};
	this.xparams = function(ps) {
		this._var.params = ox(this._var.params, ps);
		return this
	};
	this.xvars = function(ps) {
		this._var.vars = ox(this._var.vars, ps);
		return this
	};
};

global.$serve = new VDCS.serve();


// request
global.$request = function() {
	return util.request.apply(util, arguments)
};

extendo(util, {
	request: function(serveVar, opt, fn) {
		var that = this;
		if (!iso(serveVar)) serveVar = {
			api: serveVar
		};
		if (!fn) {
			fn = opt;
			opt = {}
		}
		opt = ox({
			format: 'map',
			succeed: 'succeed'
		}, opt);
		if (opt.action) serveVar.action = opt.action;
		var url = opt.url || $serve.getURL(serveVar);
		var ajax = $ajax({
				progress: opt.progress,
				url: url,
				send: opt.post || opt.send,
				format: opt.format
			})
			.on('ready', function(result) {
				that.request_parser(result, opt, fn, this)
			});
		return ajax
	},
	request_parser: function(result, opt, fn, ajax) {
		if (opt.format == 'results') return fn(result);
		var maps = util.toMap(result);
		var heads = maps.get('head');
		if (inp(opt.succeed, heads.status) < 1) {
			var msg = heads.message || $form.statusString(heads.status);
			if (!ajax.isEvent('error')) {
				ajax.on('error', opt.error || function(status, msg, heads) {
					ui.tips('failed', msg);
				});
			}
			return ajax.emit('error', heads.status, msg, heads, maps, result);
		}
		if (!ajax.isEvent('succeed') && fn) ajax.on('succeed', fn);
		ajax.emit('succeed', maps.get('var'), maps, result);
	},
});


vdcs.storager = {
	driver: function(driver) {
		var obj = null;
		switch (driver) {
			case 'session':
				obj = this.session();
				break;
			case 'cache':
				obj = this.cache();
				break;
			default:
				obj = this.local();
				break;
		}
		return obj
	},

	local: function() {
		this.olocal = this.olocal || new utilStorage('local');
		return this.olocal
	},

	session: function() {
		this.osession = this.osession || new utilStorage('session');
		return this.osession
	},

	cache: function() {
		this.ocache = this.ocache || new utilStorage('cache');
		return this.ocache
	},
};

global.utilStorage = function(container) {
	this.opt = {};
	this.opt.container = container;
	this.initer(container);
};
utilStorage.prototype = {
	initer: function(container) {
		switch (container || this.opt.container) {
			case 'session':
				this._cache = window.sessionStorage;
				break;
			case 'cache':
				this._cache = window.cacheStorage;
				break;
			case 'local':
			default:
				this._cache = window.localStorage;
				break;
		}
	},


	exist: function(key) {
		return !!this._cache[key]
	},
	count: function() {
		return this.clear.length
	},
	remove: function(key) {
		this._cache.removeItem(key);
		return this
	},
	clear: function() {
		this._cache.clear();
		return this
	},
	getValue: function(key) {
		return this._cache.getItem(key)
	},
	setValue: function(key, value) {
		this._cache.removeItem(key);
		if (!iss(value)) value = utilJSON.toString(value);
		this._cache.setItem(key, value);
		return this
	},
	getObject: function(key) {
		return utilJSON.toObject(this.getValue(key))
	},


	info: function(key) {
		return this.getValue(key)
	},
	is: function(key) {
		var obj = this.getObject(key);
		if (obj) {
			if (!obj.expires || obj.expires > DCS.timer()) return true;
		}
		return false
	},
	get: function(key) {
		var obj = this.getObject(key);
		if (obj) {
			if (!obj.expires || obj.expires > DCS.timer()) return obj.value;
		}
		return null
	},
	set: function(key, value, expirein) {
		if (!key || !value) return this;
		var obj = {
			value: value,
		};
		if (expirein) {
			expirein = toi(expirein);
			obj['expire_in'] = expirein;
			obj['expires'] = DCS.timer() + expirein;
		}
		this.setValue(key, obj);
		return this
	},
	exp: function(key, expirein) {
		var obj = this.getObject(key);
		if (obj && expirein) {
			expirein = toi(expirein);
			obj['expire_in'] = expirein;
			obj['expires'] = DCS.timer() + expirein;
			this.setValue(key, obj);
		}
		return this
	},


	hashGets: function(key) {
		return this.get(key)
	},
	hashGet: function(key, field) {
		var obj = this.get(key) || {};
		return obj[field]
	},
	hashSet: function(key, field, value, exps) {
		var obj = this.get(key) || {};
		obj[field] = value;
		return this.set(key, obj, exps)
	},
	hashDel: function(key, field, value) {
		var obj = this.get(key) || {};
		delete obj[field];
		return this.set(key, obj)
	},


	getKeys: function() {
		return this.getKeyAry().join(',')
	},
	getKeyAry: function() {
		var ary = [];
		eacho(this._cache, function(key, data) {
			ary.push(key);
		});
		return ary
	},


	getTable: function() {
		return this.toTable()
	},
	toTable: function() {
		var table = new utilTable();
		eacho(this._cache, function(key, data) {
			var item = {};
			item['key'] = key;
			item['value'] = data.value;
			item['expire_in'] = data.expire_in || 0;
			item['expires'] = data.expires || 0;
			table.add(item);
		});
		return table
	}
};


global.utilSession = function(node) {
	this.opt = {
		node: node,
		drive: 'local'
	};
};
utilSession.prototype = {
	setTemp: function() {
		this.opt.drive = 'session';
		return this
	},
	driver: function() {
		this.odriver = this.odriver || vdcs.storager.driver(this.opt.drive);
		return this.odriver
	},
	get: function(key) {
		var re = this.driver().hashGet(this.opt.node, key);
		if (isun(re)) re = '';
		return re
	},
	set: function(key, value) {
		this.driver().hashSet(this.opt.node, key, value);
		return this
	},
	remove: function(key) {
		this.driver().hashDel(this.opt.node, key);
		return this
	},
};


VDCS.SocketIOClient = function() {
	VDCS.utilVar.call(this);
	VDCS.utilEvent.call(this);
	this.debug = function(bool) {
		this.set('debug', bool);
		return this
	};
	this.server = function(url) {
		this.set('url', url);
		return this
	};
	this.token = function(token) {
		this.set('token', token);
		return this
	};
	this.connect = function(url) {
		var that = this;
		url = url || this.get('url');
		if (this.get('debug')) dbg.t('connect.url', url);
		var sock = io.connect(url);
		sock
			.on('connect', function() {
				that.emit_sub('base.connect', arguments);
				that.emit_sub('filter.connect', arguments)
			})
			.on('disconnect', function() {
				that.emit_sub('base.disconnect', arguments);
				that.emit_sub('filter.disconnect', arguments)
			})
			.on('auth', function() {
				that.emit_sub('base.auth', arguments);
				that.emit_sub('filter.auth', arguments)
			})
			.on('data', function() {
				that.emit_sub('base.data', arguments);
				that.emit_sub('filter.data', arguments)
			})
			.on('status', function() {
				that.emit_sub('base.status', arguments);
				that.emit_sub('filter.status', arguments)
			})
			.on('error', function() {
				that.emit_sub('base.error', arguments);
				that.emit_sub('filter.error', arguments)
			});
		this.sock = sock;
		return this
	};
	this.disconnect = function() {
		this.sock.disconnect();
		return this
	};
	this.driver = function() {
		return this.sock
	};
	this.loader = function() {

		return this
	};
	this.initer = function() {
		this.loader();
		return this
	};
};


// structure
Date.d = Date.now || function() {
	return new Date().getTime()
};
String.prototype.r = function(a, b) {
	return r(this, a, b)
};
String.prototype.toJSON = function() {
	return utilJSON.toObject(this.toString())
};
String.prototype.toObject = function(p1, p2) {
	return utilString.toObject(this, p1, p2)
};
String.prototype.url = function(b) {
	return dcs.url(this, b)
};


DCS = dcs = {
	today: function() {},
	now: function() {},
	timem: function(d) {
		return (d || new Date()).getTime()
	},

	query: function(k) {
		return vdcs.query(k)
	},
	queryi: function(k) {
		return toi(vdcs.query(k))
	},

	url: function(s, b) {
		return utilURL.base(s, b || this.BROWSE_HOST || vdcs.url('urlbase'))
	},

	refresh: function() {
		location.reload()
	},
	go: function(s) {
		location.href = s
	},
	goback: function() {
		return w.history.back()
	},
	gox: function(s) {
		if (vdcs.isdebug()) {
			dbg.t('url', s)
		} else {
			go(s)
		}
	},
	goi: function(s) {
		if (vdcs.isLocal() || vdcs.isdebug()) {
			dbg.t('url', s)
		} else {
			go(s)
		}
	}
};


// dbg debug
global.dbg = {
	o: function(o, fn) {
		isa(o) ? this.ary(o, fn) : this.obj(o, fn)
	},
	obj: function(obj, fn, n) {
		fn = fn || function(a) {
			alert(a.join(EOL))
		}, n = n || 30;
		var rea = [],
			t = 0;
		eacho(obj, function(k, v) {
			rea.push(k + ' = ' + (isf(v) ? '[Function]' : v));
			t++;
			if (rea.length > n) {
				fn(rea);
				rea = []
			}
		});
		if (rea.length) fn(rea);
		if (!t) fn(['debug.obj is empty']);
	},
	ary: function(obj, fn, n) {
		fn = fn || function(a) {
			alert(a.join(EOL))
		}, n = n || 30;
		var rea = [],
			t = 0;
		eacha(obj, function(v, n) {
			rea.push('[' + n + '] ' + v);
			t++;
			if (rea.length > n) {
				fn(rea);
				rea = []
			}
		});
		if (rea.length) fn(rea);
		if (!t) fn(['debug.ary is empty']);
	},
	url: function(s) {
		this.t('url', s)
	},
	hold: function(s) {
		this.t('HOLD', s)
	},
	t: function(t, s) {
		var v1 = '',
			v2 = '';
		t = t.toString();
		if (isn(s)) {
			v2 = t
		} else {
			v1 = '<t>' + t + '</t>';
			v2 = s;
			if (inp('url,ajax,api', t.split(':')[0]) > 0) v2 = '<a href="' + s + '" target="_blank">' + s + '</a>';
		}
		var that = this;
		this.jin = this.jin || this.box().find('in');
		var _in = function(v) {
			return that.jin.prepend('<p>' + v1 + v + '</p>')
		};
		if (iso(v2)) eacho(v2, function(k, v, n) {
			_in('[' + n + '] ' + k + ' = ' + v)
		});
		else if (isa(v2)) eacha(v2, function(v, n) {
			_in('[' + n + '] ' + v)
		});
		else _in(v2);
	},
	box: function(opt) {
		opt = ox({
			id: 'test-box',
			place: 'left',
			zIndex: 999
		}, opt);
		var id = opt.id,
			o = $('#' + id);
		if (!o.length) {
			o = $('<div></div>').attr('id', id).appendTo('body')
		}
		o.initi(function() {
			var css = '#' + id + ' in{display:block;padding-right:20px;max-height:75vh;overflow:hidden;overflow-y:auto;}';
			css += '#' + id + ' t{color:#00A185;font-weight:bold;margin-right:5px;}';
			css += '#' + id + ' a{color:#000;}';
			vdcs.append('css', css);
			$('<in></in>').appendTo(o);
			var space = dbg.space();
			var csso = {
				maxHeight: '80%',
				padding: '6px 10px',
				color: 'rgba(0,0,0,.7)',
				'text-align': 'left',
				'line-height': 1.5,
				backgroundColor: 'rgba(255,255,255,.7)',
				'border-radius': 5,
				position: 'fixed',
				bottom: $('#footbar_holder').height() || space,
				zIndex: opt.zIndex
			};
			csso[opt.place] = space;
			o.css(csso).show();
		});
		this.jbox = o;
		return this.jbox
	},
	space: function() {
		return vdcs.isMobile() ? 10 : 20
	},
	logi: function(s) {
		if (isdebug('log')) this.log(s)
	},
	loga: function(s) {
		if (isdebug('log')) this.loga(s)
	},
	log: function() {
		console.log.call(console, vdcs.args_unpush(arguments, 'DEBUG'))
	}
};
global.isdebug = function(v) {
	return vdcs.isdebug(v)
};

if (!global.console) global.console = {
	log: function() {},
	assert: function() {}
};


// url
global.$url = {
	is: function(s) {
		return this.isValid(s)
	},
	isValid: function(s) {
		return (s.indexOf('://') != -1 || s.substring(0, 1) == '/') ? true : false
	},
	isSafe: function(s) {
		return regEx.exec(new RegExp("^(http(s?)|ftp)://", "i"))
	},
	querys: function(a) {
		return iss(a) ? a : o2s(a, '&', '=', function(v) {
			return $url.en(v)
		})
	},
	link: function(re, apd) {
		re = re || '';
		if (isopt(apd)) apd = this.querys(apd);
		if (apd) {
			if (re.indexOf('?') == -1) re += '?';
			else if (re.substring(re.indexOf('?') + 1).length > 0) re += '&';
			re += apd
		}
		return re
	},
	linkr: function(s, v, k) {
		k = k || '_r';
		v = v || Math.random();
		return this.link(s, k + '=' + v)
	},
	hlink: function(url, tit, ps) {
		ps = ox({
			txt: ''
		}, ps);
		var re = ps.txt;
		if (url != '' && url != 'http://') {
			re = '<a href="' + url + '"';
			if (ps.target) re += ' target="_blank"';
			if (ps.title) re += ' title="' + ps.title + '"';
			if (ps.attrs) re += ' ' + ps.attrs;
			re += '>' + tit + '</a>';
		}
		return re
	},
	en: function(s) {
		return encodeURIComponent(s)
	},
	encode: function(s) {
		return this.en(s)
	},
	encodei: function(s) {
		return encodeURI(s)
	},
	de: function(s) {
		return decodeURIComponent(s)
	},
	decode: function(s) {
		return this.de(s)
	},
	decodei: function(s) {
		return decodeURI(s)
	}
};


// code & filter
global.$code = global.$filter = {
	bit: function(re, p) {
		return re ? '1' : '0'
	},
	bool: function() {
		return re ? 'true' : 'false'
	},


	// string
	toHTML: function(re, t, c, syb) {
		if (!re) return '';
		if (t == 2) {
			re = re.replace(/<(.*)>.*.<\/\1>/ig, '');
			re = re.replace(/<[\/]?([a-zA-Z0-9]+)[^>^<]*>/ig, '');
			re = re.replace(/\[[\/]?([a-zA-Z0-9]+)[^]^[]*]/ig, '');
			re = re.replace(/(\r\n)/ig, '');
			re = re.replace(/&lt;[\/]?([a-zA-Z0-9]+)[^&^;]*&gt;/ig, '');
		}
		// re=r(re,"&", "&amp;");
		re = r(re, "\"", "&quot;");
		re = r(re, "'", "&#39;");
		re = r(re, "<", "&lt;");
		re = r(re, ">", "&gt;");
		re = r(re, "\t", '&nbsp; &nbsp; &nbsp; &nbsp; '); //制表符
		re = r(re, "\n", '<br>'); //换行
		re = r(re, "\r", ''); //回车
		if (c) re = this.cuted(re, c, syb);
		return re
	},

	cut: function(str, len) {
		var l = str.length,
			rel = [],
			tl = 0;
		for (var i = 0; i < l && tl < len; i++) {
			rel[i] = str[i];
			if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) {
				tl += 2
			} else {
				tl++
			}
		}
		return rel.join('')
	},
	cuted: function(str, len, syb) {
		var re = '';
		if (syb == null) syb = '..';
		syb = syb || '';
		var pcn = /[^\x00-\xff]/g,
			slen = str.replace(pcn, '**').length,
			len2 = 0,
			strc = '';
		for (var i = 0; i < slen; i++) {
			strc = str.charAt(i).toString();
			if (strc.match(pcn) != null) len2 += 2;
			else len2++;
			if (len2 > len) break;
			re += strc
		}
		if (slen > len) re += syb;
		return re
	},

	len: function(str) {
		return str.replace(/[^\u0000-\u00ff]/g, 'aa').length
	},
	txt: function(re) {
		return re = re.replace(/<[^>]*>/g, '')
	},
	xml: function(s) {
		return s.replace(['&', '"', "'", '<', '>', '’'], ['&amp;', '&quot;', '&apos;', '&lt;', '&gt;', '&apos;'])
	},
	text: function(s, p2) {
		return this.toHTML(s, 1, p2)
	},
	html: function(s, p2) {
		return this.toHTML(s, 1, p2)
	},
	message: function(s, p2) {
		return this.toHTML(s, 2, p2)
	},
	explain: function(s, p2) {
		return this.toHTML(s, 2, p2)
	},
	summary: function(s, p2) {
		return this.toHTML(s, 2, p2)
	},
	remark: function(s, p2) {
		return this.toHTML(s, 0, p2)
	},


	md5: function(s) {
		return $.md5 ? $.md5(s) : s
	},
	md5i: function(s) {
		return this.md5(s).substr(8, 16)
	},


	// number
	toNumber: function(s, n) {
		var re = '',
			s = '' + s + '',
			len = s.length,
			dotp = s.indexOf('.', 0);
		if (dotp == -1) {
			re = s + '.';
			for (i = 0; i < n; i++) {
				re += '0'
			}
		} else {
			if ((len - dotp - 1) >= n) {
				var len2 = 1;
				for (j = 0; j < n; j++) {
					len2 = len2 * 10
				}
				re = Math.round(parseFloat(s) * len2) / len2;
				re = re + '';
				dotp = re.indexOf('.', 0);
				if (dotp == -1) {
					re += '.';
					dotp = re.indexOf('.', 0);
				}
				len = re.length;
				//dbg.t('i='+(n-(len-dotp-1)));
				for (i = 0; i < (n - (len - dotp - 1)); i++) {
					re += '0'
				}
			} else {
				re = s;
				for (i = 0; i < (n - len + dotp + 1); i++) {
					re += '0'
				}
			}
		}
		return re
	},
	amount: function(s) {
		return this.toNumber((isNum(s) ? s : ''), 2)
	},
	price: function(s) {
		return this.amount(s)
	},
	money: function(s) {
		return this.amount(s)
	},
	emoney: function(s) {
		return this.toNumber((isNum(s) ? s : ''), 1)
	},
	commak: function(str) {
		var rgx = /(\d+)(\d{3})/,
			x = str.split('.'),
			x1 = x[0],
			x2 = x.length > 1 ? '.' + x[1] : '';
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2')
		}
		return x1 + x2
	},


	// time
	date: function(s) {
		return newDate(s).format('date', true)
	},
	datei: function(s) {
		return newDate(s).format('datei', true)
	},
	dates: function(s) {
		return newDate(s).format('dates', true)
	},
	time: function(s, p1) {
		return newDate(s).format(p1 || 'time', true)
	},
	timec: function(s) {
		return newDate(s).format('timec', true)
	},
	timei: function(s) {
		return newDate(s).format('timei', true)
	},
	time_dist: function(s) {
		var d = newDate(s),
			dist = d.distance();
		var re = (dist[0] < 3) ? dist[1] : d.format('datei', true);
		if (!re) re = '刚刚';
		return re
	},


	filesize: function(re, p) {
		var rev = re + 'B';
		if (re > 1000) {
			re = re / 1000;
			rev = re + 'K';
			if (re > 1000) {
				re = re / 1000;
				rev = re + 'M';
				if (re > 1000) {
					re = re / 1000;
					rev = re + 'G';
				}
			}
		}
		return rev
	},


	// ua
	avatar: function(re, p) {
		if (!re) re = '/images/ua/avatar.png';
		return re
	},
	ulink: function(re, p) {
		return rd(app.uu_link, 'uid', re)
	},


	// upload
	upload: function(re, p) {
		// data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7
		if (!re) re = '/images/upload/no_pic.png';
		re = this.uploadx(re, p);
		return re
	},
	upthumb: function(re, p) {
		return this.upload(re, p || 'thumb')
	},
	upthumbm: function(re, p) {
		return this.upload(re, p || 'thumbm')
	},
	uploadx: function(filepath, type) {
		if (!filepath) return '';
		if (!type) type = 'load';
		var re = filepath;
		if (left(filepath, 8) == '/upload/') {
			re = '/up' + type + '/' + filepath.substr(8);
		} else if (ins(filepath, '://') > 0) {
			var domain = window.location.hostname;
			if (domain.substr(0, 4) == 'www.') domain = domain.substr(4);
			if (ins(filepath, domain + '/') < 1) {
				re = '/up' + type + '/' + $url.toEncode(filepath);
			}
		}
		if (isdebug('filter.upload')) dbg.t('url', re);
		return re
	},


	getRandNum: function(n) {
		return Math.round(Math.random() * n)
	},
	getRandom: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}
};


// ajax
global.$ajax = function(op_, fn, op2) {
	if (fn) op_ = ox({
		url: op_,
		ready: fn
	}, op2);
	var opt = ox({
		realtime: true,
		method: '',
		url: '',
		post: '',
		progress: false
	}, op_);
	opt.ready = opt.ready || opt.succeed;
	var url = opt.url;
	if (!url) return dbg.log('ajax url is empty.');
	if (!iss(url)) url = $serve.url(url);
	opt.post = opt.post || opt.send;
	var posts = $url.querys(opt.post);
	opt.method = (opt.method || (opt.post ? 'POST' : 'GET')).toUpperCase();
	if (opt.realtime) url = $url.link(url, vdcs.vert(1, true));

	if (isdebug('ajax')) dbg.t('ajax', url);

	var ev = newEvent();
	ev.opt = opt;
	ev.url = url;
	if (opt.ready) ev.on('ready', opt.ready);
	if (opt.error) ev.on('err', isf(opt.error) ? opt.error : $ajax.on_error);

	var uip = opt.progress ? ui.progressi : null;
	if (uip) uip.istart(opt.progress);

	var format = opt.format || opt.value || 'results';
	var options = {
		type: opt.method,
		url: url,
		data: posts,
		dataType: 'text',
		// contentType:'application/x-www-form-urlencoded',
		success: function(data) {
			if (uip) uip.idone(opt.progress);
			ev.results = data;
			ev.emit('respond', data);
			ev.emit('ready', format == 'map' ? util.toMap(data) : data)
		},
		error: function(xhr, type, err) {
			if (uip) uip.idone(opt.progress);
			ev.emit('respond', null, err);
			if (!ev.emit('err', err, xhr, type)) $ajax.on_error(err, xhr, type);
		}
	};
	if (opt.jsonp) {
		options.dataType = 'jsonp';
		options.jsonp = iss(opt.jsonp) ? opt.jsonp : 'jsonp';
	}
	if (opt.contentType) options.contentType = opt.contentType;
	$.ajax(options);
	return ev
};
$ajax.on_error = function(err, xhr, type) {
	// alert('Ajax Error: '+err);
};


vBasic.fn.extend({
	xform: function(opt, selector) {
		var jwrap = $(this);
		var xform = new VDCS.forms();
		xform.initer(ox({
			jwrap: jwrap
		}, opt), selector);
		return xform
	}
});

global.$form = extendo(newEvent(), {
	selector: 'input,textarea,select,radio,checkbox',

	ajaxAsync: function(maps, opt, ev) {
		if (isf(opt)) opt = {
			succeed: opt
		};
		opt = ox({
			autor: true
		}, opt);
		ev = ev || newEvent();
		ev.opt = opt;
		ev.maps = util.toMap(maps);
		ev.run = function() {
			if (!this.is_init || this.is_run) return this;
			this.is_run = true;
			$form.ajaxParser(this);
			return this
		};
		if (opt.succeed) ev.on('succeed', opt.succeed);
		if (opt.failed) ev.on('failed', opt.failed);
		ev.autorun();
		return ev
	},
	ajaxParser: function(thos, maps, opt) {
		thos.maps = thos.maps || util.toMap(maps);
		thos.heads = thos.maps.get('head');
		thos.status = thos.heads.status;
		if ($form.isSucceed(thos.heads, opt || thos.opt)) {
			thos.vars = thos.maps.get('var');
			if (!thos.emit('succeed', thos.vars, thos.maps, maps)) {
				$form.logi('ajaxAsync', 'succeed empty!');
			}
		} else {
			if (!thos.emit('failed', thos.status, thos.heads)) {
				$form.statusParser(thos.heads);
			}
		}
	},


	formCheck: function(that) {
		if (!that) that = this;
		var ischeck = true,
			checkv = false,
			_data = {};
		that.err = new VDCS.Error(), that.jformitem = null;
		if (typeof VCheck != 'undefined') {
			VCheck.resete();
			checkv = true
		}
		//:text,input,select,textarea
		that.jform.find('input,select,textarea').each(function(i) {
			var jfield = $(this),
				_name = jfield.attr('name');
			var name = (_name && _name.substr(-2) == '[]') ? _name.substr(0, _name.length - 2) : _name;
			if (name && typeof(_data[name]) == 'undefined' && !jfield.attr('ignore-val')) {
				var _value = jfield.vals();
				_data[name] = _value;
				if (checkv && !VCheck.elementv(jfield)) ischeck = false;
				if (!checkv) {
					var min = toi(jfield.attr('vmin') || jfield.attr('min') || jfield.attr('minlength'));
					if (min > 0 && !jfield.val().length) ischeck = false;
				}
				if (!ischeck && !that.jformitem) that.jformitem = jfield
			}
		});
		that.jform.find('input[type="radio"]:checked').each(function() {
			var name = $(this).attr('name'),
				value = $(this).val();
			if (name) _data[name] = value
		});
		if (that.opt && that.opt.encrypt) {
			var _timer = that.opt.encrypt_timer ? $tim.timer() : '';
			_data['_encrypt_timer_'] = _timer;
			var fielda = (that.opt.encrypt_field || '').split(','),
				_field;
			for (var a in fielda) {
				_field = fielda[a];
				if (_data[_field]) {
					_data[_field] = $.md5(_data[_field]);
					if (_timer) _data[_field] = $.md5(_data[_field] + ',' + _timer);
				}
			}
		}
		that.form_data = _data;
		if (that.formVerify) that.formVerify(that.form_data);
		if (isdebug('data')) dbg.o(that.form_data);
		if (ischeck && that.err) ischeck = that.err.is();
		if (!ischeck && that.tips && that.err) that.tips('error', that.err.toString(), true);
		//if(ischeck && that.tips) that.tips('hide');
		//ischeck=false;
		return ischeck
	},


	verify_login: true,
	isLogin: function() {
		return this.verify_login ? ua.isLogin(true) : true
	},
	send: function() {
		if (!this.isLogin()) return;
		var that = this;
		if (!this.formCheck()) return;
		if (this.issend) return;
		this.issend = true;
		var url = this.getURL('send'),
			_send = this.form_data;
		if (!url) return ui.tips('info', '$form.send URL Required!', true);
		$ajax({
			url: url,
			send: _send,
			ready: function(o) {
				that.sendAsync(o)
			},
			error: true
		})
	},
	sendAsync: function(result) {
		this.maps = util.toMap(result), this.heads = this.maps.get('head'), this.vars = this.maps.get('var');
		if (this.statusSucceed(this.heads)) {
			var msg = this.statusMessage(this.heads, '提交成功！');
			ui.tips('succeed', msg);
			if (this.reset) this.reset();
			if (this.refresh) this.refresh();
			this.sendSucceed()
		}
		this.issend = false
	},
	sendSucceed: function() {},

	statusOpt: function(opt) {
		opt = ox({
			tips: 'tips',
			already: false
		}, opt);
		return opt
	},
	isSucceed: function(val, opt) {
		opt = this.statusOpt(opt);
		var re = false;
		var status = iss(val) ? val : val.status;
		if (status == 'succeed' || (opt.already && status == 'already')) re = true;
		return re
	},
	statusSucceed: function(heads, opt) {
		if (this.isSucceed(heads, opt)) return true;
		this.statusParser(heads, opt)
	},
	statusMessage: function(heads, err, real) {
		var msg = heads.message || heads['message.string'] || '';
		if (!msg && err) msg = iss(err) ? err : (err.message || err.error_message);
		if (!msg && real) msg = this.statusString(heads.status);
		return msg
	},
	statusParser: function(heads, opt) {
		heads = iss(heads) ? {
			status: heads
		} : heads;
		opt = this.statusOpt(opt);
		var status = opt.status || heads.status,
			msg = this.statusMessage(heads) || opt['message_' + status] || this.statusString(status);
		var tips_status = opt['tips_status_' + status] || 'info';
		// dbg.t('tips_status',tips_status);dbg.t('msg',msg);
		if (opt.tips) {
			switch (opt.tips) {
				case 'mini':
					ui.mini.show(msg);
					break;
				default:
					ui.tips(tips_status, msg);
					break;
			}
		}
		if (opt.callback) opt.callback.call(this, status, msg);
		return {
			status: status,
			message: msg
		}
	},
	statusString: function(status) {
		var re = '';
		switch (status) {
			case 'init':
				re = '请求初始化！';
				break;
			case 'parser':
				re = '无效的请求解析！';
				break;
			case 'already':
				re = '请求已处理！';
				break;
			case 'processed':
				re = '请求已处理！';
				break;
			case 'auth':
				re = '身份验证失败！';
				break;
			case 'expired':
				re = '请求已过期！';
				break;
			case 'module':
				re = '无效的模块！';
				break;
			case 'father':
			case 'root':
				re = '无效的模块数据！';
				break;
			case 'params':
				re = '缺少必要的参数！';
				break;
			case 'data':
				re = '缺少必要的数据！';
				break;
			case 'nodata':
				re = '无效的数据请求！';
				break;
			case 'record':
			case 'exist':
				re = '记录已存在！';
				break;
			case 'norecord':
			case 'noexist':
				re = '记录不存在！';
				break;
			case 'power':
			case 'popedom':
			case 'nopermission':
				re = '权限不足！';
				break;
			case 'noown':
				re = '所有者不匹配！';
				break;
			case 'own':
				re = '对象不能为自己';
				break;
			case 'locked':
				re = '已锁定记录！';
				break;
			case 'system':
				re = '系统记录！';
				break;
			case 'error':
				re = '请求异常！';
				break;
			case 'failed':
				re = '请求失败！';
				break;
			case 'succeed':
				re = '请求成功！';
				break;
			default:
				re = '未知状态[' + status + ']';
				break;
		}
		return re
	}
});


global.$forms = {
	// $forms.succeed=function(vars,maps,results){};
};

VDCS.forms = function(opt, selector) {
	VDCS.utilEvent.call(this);
	this.opt = ox({
		frm: 'frm_post',
		names: '处理',
		actions: '',
		message_serve: '未知的{$names}请求！',
		message_formcheck: '请填写必要的{$names}信息！',
		message_error_unknown: '未知错误',
		message_parser: '{$actions}中..',
		message_succeed: '{$actions}成功！',
		message_back: '{$actions}跳转中..',
		submit_status: true,
		submit_ing: '{$actions}中..',
		submit_succeed: '{$actions}成功！',
		submit_repeat: false,
		status_succeed: 'succeed',
		tips_speed: 300,
		tips_timer: 5,
		tips_cover: true,
		tips_is: true,
		tips_succeed: true,
		tips_failed: true,
		serve_method: 'post',
		serveVar: null,
		serveURL: null,
		jsonp: 'auto',
		method: null,
		goback: true,
		progress: true,
		auto_enter: true,
		autor: true
	}, opt);
	this.selector = ox({
		submit: '[href="#submit"],[el="submit"]',
		tips: '.tips:last',
		tips_type: 'hint', //tips
		tips_msg: 'span'
	}, selector);

	VDCS.baseServe.call(this);

	this.initer = function(opt, selector) {
		this._initer(opt, selector);
		if (isdebug('forms.init')) dbg.o(this.opt);
		this.autorun();
		return this
	};
	this.done = this.run = function() {
		if (!this.is_init || this.is_run) return this;
		this.is_run = true;
		this.submitInit();
		return this
	};
	this._initer = function(opt, selector) {
		if (this.is_inite) return;
		this.is_inite = true;

		this.opt = ox(this.opt, opt);
		this.opt = this.filterOpt(this.opt);
		this.selector = ox(this.selector, selector);
		this.selector = this.filterSelector(this.selector);
		// dbg.o(this.opt);

		this.jwrap = $jo(this.jwrap || this.opt.jwrap || this.opt.wrap);
		if (!this.jwrap) {
			this.jform = $jo(this.jform || this.opt.jform || ('form[name="' + this.opt.frm + '"]'));
			if (this.jform) this.jwrap = this.jform.parent();
		}
		if (!this.jwrap) return dbg.log('forms.initer', 'Required jwrap!');
		if (!this.jform) this.jform = this.jwrap.finder('form') || this.jwrap.finder('.forms');
		if (!this.jform) return dbg.log('forms.initer', 'Required jform!');

		var serveVar = {
			api: this.jform.attrd('serve-api') || '',
			action: this.jform.attrd('serve-action') || ''
		};
		this.opt.serveVar = ox(serveVar, opt.serveVar);
		//dbg.o(this.opt.serveVar);

		this.opt = ox(this.opt, this.jwrap.data());
		this.opt.backurl = this.opt.backurl || this.opt.url_back;
		if (isdebug('forms.opt')) dbg.o(this.opt);
		this.jsubmit = this.opt.jsubmit || this.jwrap.finder(this.selector.submit);
		this.jtips = this.selector.jtips || this.jwrap.finder(this.selector.tips);
		this.is_init = true
	};


	// message
	this.getMessage = function(key) {
		return this.filterMessage(this.opt['message_' + key] || '[' + key + ']')
	};
	this.filterMessage = function(value) {
		value = rd(value, 'names', this.opt.names);
		value = rd(value, 'actions', this.opt.actions || this.opt.names);
		return value
	};


	this.getValues = function() {
		return this.jform.formJSON()
	};
	this.setValues = function(values) {
		this.jform.formValues(values);
		return this
	};
	this.autoEnter = function() {
		var that = this;
		this.jform.find('input').onenter(function() {
			return that.parser()
		})
		return this
	};
	this.urlBack = function(url) {
		if (url) this.opt.backurl = url;
		return this.opt.backurl || vdcs.url('root')
	};

	this.formCheck = function() {
		return $form.formCheck(this)
	};
	this.formHide = function() {
		if (!this.is_init) return;
		this.jwrap.hide()
	};


	// submit
	this.submit = function() {
		var that = this;
		if (this.jform.attr('submiting')) return false;
		var ret = that.emit('submit');
		if (vv(ret, true)) that.parser();
		return false
	};
	this.submitInit = function(opt) {
		var that = this;
		this.jform.submit(function() {
			return false
		});
		if (this.opt.auto_enter) this.autoEnter();
		var _submit = function() {
			that.submit();
			return false
		};
		this.jform.on('click', this.selector.submit, _submit);
	};
	this.submitSet = function(status, msg) {
		if (!this.jsubmit) return;
		this.submit_status = status;
		var _value = msg;
		if (!this.opt.submit_value) this.opt.submit_value = this.jsubmit.text();

		if (status == 'ing') ui.progressi.istart(this.opt.progress);
		else ui.progressi.idone(this.opt.progress);

		switch (status) {
			case 'ing':
			case 'off':
				this.jform.attr('submiting', 'ing'); //this.jsubmit.disabled(true);
				if (!_value) _value = this.opt.submit_ing;
				break;
			case 'succeed':
				this.jform.attr('submiting', 'ing'); //this.jsubmit.disabled(true);
				if (!_value) _value = this.opt.submit_succeed;
				break;
			case 'on':
			default:
				this.jform.attr('submiting', ''); //this.jsubmit.disabled(false);
				if (!_value) _value = this.opt.submit_value;
				break;
		}
		if (this.opt.submit_status && _value) this.jsubmit.ihtml(this.filterMessage(_value))
	};
	this.submitLock = function() {
		return this.submit_status && this.submit_status != 'on'
	};
	this.submitOn = function() {
		this.submitSet('on')
	};
	this.reset = function(form) {
		if (!isun(form)) from = true;
		if (form) this.jform.each(function() {
			this.reset()
		});
		this.submitOn()
	};


	// xform
	this.check = function() {
		if (!this.formCheck()) {
			var msg = this.getMessage('check');
			if (this.jformitem) {
				var _name = this.jformitem.attr('names') || this.jformitem.attr('placeholder') || this.jformitem.attr('name');
				msg = '请输入 ' + _name + '！';
				this.jformitem.addClass('error');
				this.jformitem.blur(function() {
					var jo = $(this);
					if (jo.val()) jo.removeClass('error')
				});
				this.jformitem.focus()
			} else {
				var emsg = this.err ? this.err.toString() : '';
				if (emsg) msg = emsg;
			}
			this.tips('error', msg);
			this.emit('check.error', this.jformitem);
			return false
		}
		return true
	};
	this.parser = function() {
		if (this.submitLock()) return this.emit('submit.lock');
		if (!this.check()) return;
		this.emit('parser');
		this.tips('load', this.getMessage('parser'));
		this.submitSet('ing');
		var that = this;
		var url = this.serveURL(),
			post = null;
		if (!url) {
			this.tips('info', this.getMessage('serve'));
			this.submitOn();
			return
		}
		if (this.isEvent('data.filter')) this.form_data = this.emit('data.filter', this.form_data);
		if (this.isServePost()) post = this.form_data;
		else url = $url.link(url, this.form_data);
		this.ajax = $ajax({
				jsonp: this.opt.jsonp == 'auto' ? $serve.isJSONP() : (!!this.opt.jsonp),
				method: this.opt.method,
				url: url,
				post: post,
				ready: function(o) {
					that.parserAsync(o)
				}
			})
			.on('error', function(err) {
				that.emit('error', err)
			});
		return this
	};
	this.parserAsync = function(result) {
		if (isdebug('forms.result')) {
			alert(result);
			this.submitOn();
			return
		}
		var that = this;
		this.emit('results', result);
		this.emit('result', result);
		this.result = result;
		this.maps = util.toMap(result), this.heads = this.maps.get('head'), this.vars = this.maps.get('var'), this.status = this.heads.status;
		if (inp(this.opt.status_succeed, this.status) > 0) {
			this.submitSet('succeed');
			if (this.opt.submit_repeat) this.submitOn();
			var url = this.vars.backurl || this.vars.url_back;
			if (url) this.urlBack(url);
			if (this.isTips('succeed')) this.parser_tips('succeed');
			this.parser_succeed()
		} else {
			this.submitOn();
			if (this.isTips('failed')) this.tips(this.status, $form.statusMessage(this.heads, null, true), true);
			this.parser_failed();
		}
	};
	this.parser_succeed = function() {
			this.emit('succeed', this.vars, this.maps, this.result);
			return this
		},
		this.parser_failed = function() {
			this.emit('failed', this.status, this.vars, this.maps, this.result);
			return this
		},
		this.parser_tips = function(status, opt) {
			var that = this;
			opt = ox({
				message: this.getMessage(status)
			}, opt);
			var next = status == 'succeed' ? function() {
				if (that.emit('tips.succeed')) return;
				if (that.opt.goback) {
					ui.goi(that.urlBack(), that.getMessage('back'))
				}
			} : null;
			this.tips(status, opt.message, next, this.opt.tips_timer ? 1 : 0);
			return this
		};

	this.isTips = function(status) {
		return this.opt.tips_is && this.opt['tips_' + status]
	};
	this.tipsMessage = function(msg) {
		this.otips.ihtml(msg)
	};
	this.otips = null;
	this.tips = function(status, message, fn, timer) {
		timer = timer || this.opt.tips_timer;
		if (isdebug('forms.tips')) dbg.t('forms.tips', status + ',' + message + ',' + timer);
		var _status = ui.popup.status(status, 'error');
		if (this.isEvent('tips')) {
			this.emit('tips', _status, message, fn, timer);
		} else {
			if (status == 'hide') this.otips = ui.hint(this.jtips, 'hide');
			else this.otips = ui.hint(this.jtips, message, {
				status: _status,
				callback: fn,
				tip: '.itip',
				tip_class: 'itip',
				speed: this.opt.tips_speed,
				timer: timer,
				cover: this.opt.tips_cover
			});
		}
		return this
	};
};


vBasic.fn.extend({
	ilist: function(opt) {
		var jwrap = $(this);
		opt = ox({
			aclick: true
		}, opt);
		opt = ox(opt, jwrap.data());
		opt.jwrap = jwrap;
		var et = vdcs.opter(opt);
		$request(opt.serveVar, opt, function(vars, maps, heads) {
			var table = maps.getTable(opt.lists);
			ui.render.tableReplace(table, et);
		});
		return et
	}
});

vBasic.fn.extend({
	xlist: function(opt, selector) {
		var jwrap = $(this);
		var xlist = new VDCS.list();
		xlist.initer(ox({
			jwrap: $(this)
		}, opt));
		return xlist
	}
});

VDCS.list = function(opt) {
	VDCS.utilEvent.call(this);

	this.opt = ox({
		node_table: 'lists',
		ele_item: null,
		serveVar: {
			parami: {},
			params: {}
		},
		templater: true,
		swiper: false,
		swiper_power: false,
		progress: true,
		autor: true
	}, opt);

	VDCS.baseServe.call(this);

	this.page = 1;
	this.getURL = function() {
		return $url.link(this.serveURL(), {
			page: this.page
		})
	};

	this.initer = function(opt) {
		var that = this;
		this.opt = ox(this.opt, opt);
		if (isdebug('list.opt')) dbg.o(this.opt);
		this.jwrap = this.jwrap || $jo(this.opt.jwrap || this.opt.wrap);
		if (!this.jwrap) return dbg.log('list.initer', 'Required wrap!');
		this.jcont = this.jcont || $jo(this.opt.jcont || this.opt.cont) || this.jwrap.finde('cont', true);
		this.jactions = $jo(this.opt.jactions || this.opt.actions) || this.jwrap.finde('actions', true);
		this.jloader = $jo(this.opt.jloader || this.opt.loader) || this.jwrap.finde('loader', true) || this.jwrap.finder('.loader');

		if (!this.jcont) return dbg.log('list.initer', 'Required cont & xmp!');
		this.is_init = true;

		if (this.opt.swiper && ui.swiper) {
			this.opt.swiper_power = true;
			ui.swiper.up(function(e) {
				that.emit('swipe.up', e)
			});
		}

		this.jcont.aclick({}, this);

		// this.on('parsing',this.parsing);
		this.on('page', this.clickPage);
		this.on('swipe.up', this.refreshNext);

		this.autorun();
	};

	this.done = this.run = function() {
		if (!this.is_init || this.is_run) return this;
		this.is_run = true;
		this.emit('ready', this.jwrap);
		this.parser();
		return this
	};

	this.render = function(jo) {
		ui.render(jo)
	};
	this.clear = function() {
		this.jcont.htmlClear()
	};
	this.reset = function() {
		this.clear()
	};
	this.refresh = function() {
		this.parser()
	};
	this.refreshNext = function() {
		this.clickPage(this.page + 1)
	};

	this.clickPage = function(page) {
		this.page = page;
		this.parser()
	};

	this.parser = function() {
		if (!this.is_init) return dbg.log('list.parser', 'no init!');
		if (this.is_parser) return;
		this.is_parser = true;
		if (!this.loadon()) return dbg.log('list.parser', 'no loadon');
		if (!this.is_parse_first) {
			this.clear();
			this.is_parse_first = true;
		}
		var that = this;
		//this.action='query';
		this.ajax = $ajax({
				url: this.getURL(),
				ready: function(o) {
					that.parseAsync(o)
				}
			})
			.on('error', function(err) {
				that.emit('error', err)
			});
		return this
	};
	this.parseAsync = function(result) {
		var that = this;
		this.maps = util.toMap(result), this.heads = this.maps.get('head'), this.vars = this.maps.get('var'), this.status = this.heads.status;
		this.tableList = this.maps.getTable(this.opt.node_table);
		this.loadoff();
		if (this.status == 'succeed') {
			if (!this.opt.swiper_power) this.clear();
			ui.render.tableReplace(this.tableList, this);
		} else {
			var msg = this.heads.message || $form.statusString(this.status || '!RESULT');
			ui.popup('info', msg);
		}
		this.is_parser = false
	};



	this.is_parsing_on = false;
	this.parsing = function(jcont) {
		jcont = jcont || this.jcont;
		var that = this;
		if (this.actionFilter) {
			jcont.find('a[href^="#"]:not([action-click])').each(function() {
				that.actionFilter(that.actionParams($(this)))
			});
		}
		if (this.is_parsing_on) return;
		this.is_parsing_on = true;
		jcont.on('clicker', 'a[href^="#"]', function() {
			var ret = that.actionClickTrigger(that.actionParams($(this)));
			if (!ret) return false
		});
		jcont.on('click', '[data-confirm]', function() {
			var ret = that.actionClickConfirm(that.actionParams($(this)));
			return false
		});
		jcont.on('click', 'a[href^="#"]', function() {
			if (!$(this).attr('data-confirm')) $(this).trigger('clicker');
			return false
		});
	};
	//this.actionFilter=function(args){};
	this.actionClickConfirm = function(args) {
		var that = this;
		var ja = args.jo;
		if (!ja.attrd('confirm-init')) {
			ui.confirm(ja.attrd('confirm'), function() {
				ja.attrd('confirm-init', 'yes');
				ja.trigger('clicker');
				ja.attrd('confirm-init', '');
				//if(ja.attr('href')) go(ja.attr('href'));
			}, {
				mode: ja.attrd('confirm-mode')
			})
		}
	};
	this.actionClickTrigger = function(args) {
		var func = 'actionClick' + upper1(args.action);
		if (this[func]) this[func](args);
		else {
			var rec = this.jwrap.actionTriggerCustom(args.action, function(ret, action) {
				ret.callback.call(this, args.jo, action);
			}, true);
			if (!rec) {
				dbg.log('VDCS.list.actionClickTrigger: ' + args.action + ',' + func);
				this.actionClick(args)
			}
		}
	};
	this.actionClick = function(args) {};

	this.loadon = function() {
		if (this.jactions) this.jactions.hide();

		this.jloader = this.jloader || ui.render.loaderFiller(this.jwrap, {
			jcont: this.jcont,
			progress: this.opt.progress
		});

		if (!this.opt.swiper_power) this.clear();

		return isdebug('load') ? false : true
	};
	this.loadoff = function() {
		ui.progressi.idone(this.opt.progress);
		if (!this.opt.swiper_power) this.clear();
		if (this.jloader) this.jloader.hide();
	};
};


global.ui = {
	speed: 500,
	effect: {},
	show: function(jo, real) {
		return jo.ishow(real)
	},
	hide: function(jo, real) {
		return jo.ihide(real)
	},
	float: function(jo, opt) {
		return jo.floato(opt)
	},
	floatBox: function(jo, opt) {
		if (!iso(jo)) jo = $(jo).appendTo('body');
		return jo.floatBox(opt)
	},

	_dat: [],
	data: function(type, status, msg) {
		if (isun(msg)) {
			msg = status;
			status = '';
		}
		this._dat.push({
			type: type,
			status: status,
			message: msg
		});
		return this
	},
	dataRender: function(next) {
		next = next || function(dat) {
			console.table(dat)
		};
		next(this._dat);
	},

	lock: {
		items: {},
		k: function(k) {
			return k || '_def_'
		},
		is: function(k, set) {
			var re = this.items[this.k(k)];
			if (set) this.en(k);
			return re
		},
		en: function(k) {
			this.items[this.k(k)] = true
		},
		un: function(k) {
			this.items[this.k(k)] = false
		}
	},

	resized: function(fn) {
		$.resized(fn)
	},
	resizer: function(fn) {
		$.resizer(fn)
	},
	scrolled: function(fn) {
		$.scrolled(fn)
	},
	scroller: function(fn) {
		$.scroller(fn)
	},

	initer: function() {
		ui.swiper = $.toucher;
	},

	initor: function(node) {
		if (this[node] && this[node].initer) this[node].initer()
	},
	render: function(jo, destory) {
		if (typeof destory != undefined && !destory) {
			if (ui.form) ui.form.destory(jo);
		}
		// this.tooltip(jo);
		if (ui.form) ui.form.init(jo);
	}
};
extendo(ui, newEvent());
$(function() {
	ui.initer();
});

extendo(ui, {
	go: function(url, msg) {
		ui.mini.show(msg || '载入中..');
		go(url)
	},
	gox: function(url, msg) {
		ui.mini.show(msg || '载入中..');
		gox(url)
	},
	goi: function(url, msg) {
		ui.mini.show(msg || '载入中..');
		goi(url)
	},
	refresh: function(msg) {
		ui.mini.show(msg || '正在刷新..');
		refresh()
	},
	include: function(url, msg) {
		ui.mini.show(msg || '加载中..');
		util.include(url)
	},

	// cover
	cover: {
		_id_: '_ui_cover_',
		resize: function(sizes) {
			if (!this._show) return;
			sizes = sizes || $.sizes();
			this.jo.width(sizes.width).height(sizes.height)
		},
		show: function(opt) {
			opt = ox({
				real: false
			}, opt);
			if (this._show && !opt.real) return;
			this._show = true;
			this.real = opt.real;
			var that = this;
			var _resize = function(sizes) {
				if (!that._show) return;
				that.jo.width(sizes.width).height(sizes.height)
			};
			if (!this._init) {
				this.jo = $('<div></div>').attr('id', this._id_).addClass('ui_cover')
					.css({
						zIndex: 900,
						position: 'fixed',
						top: 0,
						left: 0,
						backgroundColor: 'rgba(0,0,0,.8)',
						display: 'none'
					})
					.appendTo('body');
				this._init = true
			}
			this.jo.show(ui.speed);
			$.resized(_resize);
			return this.jo
		},
		hide: function() {
			if (!this._show) return;
			this.jo.hide(ui.speed);
			this._show = false;
			this.real = false
		},
		hidei: function() {
			if (!this.real) this.hide()
		}
	},

	// ani
	ani: {
		replay: function(jwrap) {
			var that = this;
			this.reset(jwrap);
			vdcs.timeout(0.1, function() {
				that.play(jwrap)
			})
		},
		play: function(jwrap) {
			jwrap.find('[ui-anim]').each(function() {
				var jo = $(this);
				var _play = function(jo) {
					jo.addClass('animater').addClass('ani-' + jo.attr('ui-anim')).show();
				};
				vdcs.timeout(jo.attr('anim-timeout') || 1, function() {
					_play(jo)
				});
			});
			if ($.fn.shuffler) jwrap.find('[data-shuffler]').shuffler();
		},
		reset: function(jwrap) {
			jwrap.find('[ui-anim]').each(function() {
				var jo = $(this);
				jo.removeClass('animater,ani-' + jo.attr('ui-anim')).hide()
			});
		}
	},


	tips: function() {
		return this.popup.apply(this, arguments)
	},

	// tip
	tipup: function(a, b, c) {
		return this.tipup.show(a, b, c)
	},
	tipmini: function(a, b, c) {
		return this.tipmini.show(a, b, c)
	},
	minipop: function(a, b, c) {
		return this.tipmini.show(a, b, c)
	},

	// popup
	popups: function() {
		return this.popup.apply(this, arguments)
	},
	popup: function(opt, msg, cover, timer, close) {
		if (!iso(opt)) {
			if (isf(cover)) {
				close = cover;
				cover = true;
			}
			opt = {
				status: opt,
				message: msg
			};
			if (!isn(cover)) opt.cover = cover;
			if (!isn(timer)) opt.timer = timer;
			if (!isn(close)) opt.close = close;
		}
		return this.popup.display(opt)
	},

	hint: function(jo, msg, opt) {
		opt = ox({
			status: '',
			callback: null,
			tip: '.itip',
			tip_class: 'itip',
			timer: 2,
			speed: 350,
			cover: true
		}, opt);
		if (!jo || !jo.length) {
			if (msg == 'hide') ui.popup.hide(true)
			else ui.popup(opt.status, msg, opt.cover, opt.timer, opt.callback)
			return
		}
		if (this.hintTimer) {
			vdcs.timeoutClear(this.hintTimer);
			this.hintTimer = null;
		}
		if (msg == 'hide') return;
		if (!msg || msg == 'data') msg = jo.find('span').attrd('value');
		if (!msg) return;
		msg = r(msg, '\n', '<br/>');
		msg = r(msg, ';', '<br/>');
		msg = r(msg, '$$$', '<br/>');
		if (isdebug('hint')) dbg.t(opt.status + ' = ' + msg);
		if (opt.tip) jo.find(opt.tip).replaceClass(opt.tip_class).addClass(opt.status);
		//jo.hide();
		ui.data('hint', msg);
		jo.ihtml(msg);
		jo.show();
		if (opt.timer != null) {
			if (isn(opt.timer)) opt.timer = 2;
			var that = this;
			this.hintj = jo;
			this.hintTimer = vdcs.timeout(opt.timer, function() {
				jo.hide();
				if (isf(opt.callback)) opt.callback();
				that.hintj = null
			});
		} else {
			if (isf(opt.callback)) opt.callback();
		}
		return jo
	},

	confirm: function(msg, fn, opt) {
		if (msg && fn) {
			opt = ox({
				message: msg,
				callback: fn
			}, opt)
		} else {
			opt = msg
		}
		opt = ox({
			mode: 0,
			status: 'info',
			title: '操作确认',
			submit_name: '确定',
			close_name: '取消'
		}, opt);
		if (opt.mode > 0) opt.message = '您确定 ' + opt.message + ' 嘛？';
		if (opt.mode > 1) opt.message += '<p>操作将可能无法恢复！</p>';
		//dbg.o(opt);
		ui.data('confirm', opt.message);
		var htmla = [];
		htmla.push('<div>');
		htmla.push('<div class="iconfirm">');
		if (opt.status) htmla.push('<p class="itip m info ac"><em></em><span>');
		htmla.push(opt.message);
		if (opt.status) htmla.push('</span></p>');
		htmla.push('</div>');
		htmla.push('</div>');
		var opti = ox({}, opt); // title,nobar,nobtn,onsubmit,submit_name,onclose,close_off,close_name,cover
		this.jconfirm = $(htmla.join(EOL)).ibox(opti);
		ui.emit('confirm.init', this.jconfirm);
		return this.jconfirm
	},


	mtip: function(opt) {
		opt = ox({
			wrap: null,
			status: 'info',
			title: '系统提示',
			message: '提示详细信息'
		}, opt);
		opt.jwrap = opt.wrap ? $(opt.wrap) : $('form!last').parent();
		this.jmtip = opt.jwrap.finder('.mtip');
		if (!this.jmtip) {
			var htmla = [];
			htmla.push('<div class="mtip">');
			htmla.push('	<cite class="info"><em></em></cite>');
			htmla.push('	<h3>标题</h3>');
			htmla.push('	<h4>内容</h4>');
			htmla.push('	<h5>');
			htmla.push('		<a class="btn" el="index" href="' + vdcs.url('root') + '"><span>首页</span></a>');
			htmla.push('		<a class="btn" el="back" href="javascript:;"><span>返回</span></a>');
			htmla.push('	</h5>');
			htmla.push('</div>');
			this.jmtip = $(htmla.join(EOL)).appendTo(opt.jwrap);
		}
		this.jmtip.show();
		this.jmtip.find('cite').replaceClass(opt.status);
		this.jmtip.find('h3').html(opt.title);
		if (isa(opt.message)) opt.message = '<p>' + opt.message.join('</p><p>') + '</p>';
		this.jmtip.find('h4').html(opt.message);
		var jbtn = this.jmtip.find('h5');
		if (!opt.onback) opt.onback = function() {
			$p.goback()
		};
		jbtn.ibtn('index', opt);
		jbtn.ibtn('back', opt);
		this.jmtip.opt = opt;
		return this.jmtip
	},


	tipload: function(jo, action) {
		var ccont = 'tipload-container';
		if (jo.hasClass(ccont)) {
			if (action == 'remove') {
				jo.find('.tipload-shade,.tipload').remove();
				jo.removeClass(ccont)
			}
			return
		}
		jo.addClass(ccont);
		jo.append('<span class="tipload-shade"></span><span class="tipload"><em></em></span>')
	}
});

ui.itip = {
	_rc_: 'mini',
	_class_: 'ui-tipmini',
	opt: {
		timer: 2,
		load: 'loading..',
		index: 901,
	},
	show: function() {
		var st, msg, opt;
		var args = arguments;
		if (iss(args[1])) {
			msg = args[1];
			opt = args[2];
		} else {
			msg = args[0];
			opt = args[1];
		}
		opt = ox({
			timer: 2
		}, opt);
		if (!this.jo) {
			this.jo = $('<div></div>').attr('id', '__itip_' + this._rc_).addClass(this._class_)
				.css({
					zIndex: this.opt.index,
					position: 'fixed'
				})
				.appendTo('body');
			this.jo.html(this.opt.load);
		}
		if (opt.color) this.jo.css('color', opt.color);
		if (opt.bgcolor) this.jo.css('background-color', opt.bgcolor);
		if (opt.css) this.jo.css(opt.css);
		if (msg) this.message(msg);
		ui.show(this.jo, this._rc_);
		if (opt.timer) this.hide(opt.timer);
		return this.jo
	},
	message: function(msg) {
		ui.data('tip.' + this._rc_, msg);
		if (this.jo) this.jo.html(msg)
	},
	hide: function(timer) {
		if (!this.jo) return;
		var that = this;
		vdcs.timeout(timer, function() {
			ui.hide(that.jo, that._rc_)
		})
	}
};

extendo(ui.tipmini, ox(ui.itip, {
	_rc_: 'mini',
	_class_: 'ui-tipmini',
}));
ui.mini = ui.tipmini;

extendo(ui.tipup, ox(ui.itip, {
	_rc_: 'c',
	_class_: 'ui-tipup',
}));


extendo(ui.popup, {
	_id_: '__xtip_popup',
	_class_: 'ui-popup',
	_class_now: '',
	speed: 500,
	timer: 2,
	init: function() {
		if (this.isinit) return;
		this.isinit = true;
	},
	bar: function(opt) {

	},
	status: function(v, def) {
		var re = v;
		if (inp('succeed,error,info,load', v) < 1) re = def || 'info';
		return re
	},
	display: function(opt) {
		return this.show(opt, true)
	},
	show: function(opt, alway) {
		this.init();
		if (this._show && !alway) return;
		this._show = true;
		this.opt = ox({
			status: '',
			message: 'Hi Joekoe!',
			cover: true,
			timer: this.timer,
			classname: this._class_
		}, opt);
		var that = this;
		var _resize = function(sizes) {
			if (!that._show) return;
			that.jo.css({
				top: (sizes.height - that.jo.height() - 100) / 2,
				left: (sizes.width - that.jo.outerWidth()) / 2
			});
		};
		if (!this.init_) {
			this.jo = $('<div></div>').attr('id', this._id_).addClass(this.opt.classname)
				.css({
					zIndex: 10002,
					position: 'fixed',
					top: 0,
					left: 0
				})
				.appendTo('body');
			$('<em></em><cite></cite>').appendTo(this.jo);
			this.jcont = this.jo.finder('cite');
			if (!this.jcont) return;
			this.jo.on('click', function() {
				that.click()
			});
			this.init_ = true
		}
		this.jo.replaceClass(this.opt.classname);
		if (this._class_now) this.jo.removeClass(this._class_now);
		if (this.opt.status) {
			this._class_now = this.opt.status;
			this.jo.addClass(this.opt.status);
		}
		ui.show(this.jo, 'popup');
		if (this.opt.cover) ui.cover.show({
			real: true
		});
		this.message(this.opt.message);
		$.resized(_resize);
		vdcs.timeoutClear(this._timer);
		this.timer_v = this.opt.timer;
		if (this.timer_v) this._timer = vdcs.timeout(this.timer_v, function() {
			this.timer_v, that.hide()
		});
		return this.jo
	},
	message: function(msg) {
		ui.data('popup', msg);
		if (this._show && this.jcont) this.jcont.html(msg);
		return this
	},
	click: function() {
		if (this.timer_v) this.hide();
		return this
	},
	hide: function() {
		if (!this._show) return this;
		ui.hide(this.jo, 'popup');
		if (this.opt.cover) ui.cover.hide();
		if (this.opt.close && isf(this.opt.close)) this.opt.close();
		this._show = false;
		return this
	}
});


ui.masker = function(opt) {
	if (iss(opt)) opt = {
		message: opt
	};
	ui.loader(false);
	if (opt.status == 'close' || opt.message == 'close') {
		if (ui.mask_type == 'loader') ui.cover.hide();
		else ui.popup.hide();
		return;
	}
	if (opt.status == 'loader' || opt.message == 'loader') {
		ui.mask_type = 'loader';
		ui.cover.show();
		ui.loader();
		return;
	}
	ui.popup(ox(opt, {
		timer: 0,
		cover: true
	}));
};

ui.loader = function(sh) {
	if (isun(sh)) sh = true;
	if (!sh) ui.loader.hide();
	else ui.loader.show();
};
extendo(ui.loader, {
	_id_: '_ui_loader_',
	show: function(opt) {
		opt = ox({
			real: false
		}, opt);
		if (this._show && !opt.real) return;
		this._show = true;
		this.real = opt.real;
		if (!this._init) {
			this.jo = $('<div></div>').attr('id', this._id_).append('<div class="iload x64 cc"></div>')
				.css({
					zIndex: 950,
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					display: 'none'
				})
				.appendTo('body');
			// #loader .iload{margin:-32px 0 0 -32px;position:absolute;left:50%;top:50%;}
			this._init = true
		}
		this.jo.show();
		return this.jo
	},
	hide: function() {
		if (!this._show) return;
		this.jo.hide();
		this._show = false;
		this.real = false
	},
	hidei: function() {
		if (!this.real) this.hide()
	}
});


global.ui = ui;


extendo(ui.render, {
	logi: function(k, v) {
		return dbg.log('ui.render', k, v)
	},

	replaceItem: function(re, items, pattern) {
		return util.replaceFilter(re, items, pattern)
	},


	format: function(str, data) {
		return str.replace(/\{\{(\w+)\}\}/g, function($0, $1) {
			return data[$1] != null ? data[$1] : "";
		});
	},


	// struct
	jsonReplace: function(json, thos) {
		thos = vdcs.opter(thos);
		thos.opt = ox({
			mode: 'input',
			selector: $form.selector,
			sel: 'name'
		}, thos.opt); //:input
		var opt = thos.opt;
		thos.jwrap = thos.jwrap || $jo(opt.jwrap || opt.wrap);
		if (!thos.jwrap) return this.logi('jsonReplace', 'Require wrap!');
		switch (opt.mode) {
			case 've':
				opt.selector = '[evar]';
				opt.sel = 'evar';
				break;
		}
		var _value = function(key) {
			var re = json[key];
			if (opt.filter) re = opt.filter(re, key, json);
			return re
		};
		var _render = opt.render || (opt.mode == 'input' ? function(jo, f, v) {
			jo.vals(v)
		} : function(jo, f, v) {
			jo.html(v)
		});
		thos.jwrap.find(opt.selector).each(function() {
			var jo = $(this),
				f = jo.attr(opt.sel);
			_render(jo, f, _value(f));
		});
	},
	tableReplace: function(table, thos) {
		var that = this;
		thos = vdcs.opter(thos);
		thos.table = thos.table || table;
		vdcs.timeout(0.1, function() {
			that.tableReplacer(table, thos);
		});
		return thos
	},
	tableReplacer: function(table, thos) {
		if (!table || !thos) return this.logi('tableReplace', 'Require table & thos');
		thos = vdcs.opter(thos);
		thos.table = thos.table || table;
		var opt = thos.opt;
		if (!thos.is__init__re) {
			thos.opt = ox({
				progress: true,
				templater: true,
				tpl_adv: false,
				isloader: false,
				ispaging: false,
				append: false
			}, thos.opt);
			thos.jwrap = thos.jwrap || $jo(opt.jwrap || opt.wrap);
			if (!thos.jwrap) return this.logi('tableReplace', 'Required wrap!');
			thos.jcont = thos.jcont || $jo(opt.jcont || opt.cont) || thos.jwrap.finde('cont', true);
			thos.jtpl = thos.jtpl || $jo(opt.jtpl || opt.tpl) || thos.jwrap.finde('tpl', true) || thos.jwrap.finder('xmp:first');
			thos.jactions = thos.jactions || $jo(opt.jactions || opt.actions) || thos.jwrap.finde('actions', true);
			thos.jpaging = thos.jpaging || $jo(opt.jpaging || opt.paging) || thos.jwrap.finde('paging', true) || thos.jwrap.finder('.paging');
			if (!thos.jcont || !thos.jtpl) return this.logi('tableReplace', 'Require wrap & cont & xmp');
			thos.is__init__re = true
		}
		if (opt.xloader) opt.xloader.hide();
		if (!opt.append) thos.jcont.htmlClear();
		var that = this;
		thos.itemString = thos.itemString || function(items) {
			if (isun(thos.tpl_value)) thos.tpl_value = opt.tpl_value || thos.jtpl.html();
			var re = thos.tpl_value;
			re = that.replaceItem(re, items);
			if (opt.tpl_adv) re = that.templater(re, items);
			return re
		};
		var row = table.getRow();
		if (row > 0) {
			table.eachRow(function(row, n) {
				var items = cloner(row);
				var oe = (n + 1) % 2 + 1;
				items['_sn_'] = n;
				items['_oe_'] = oe;
				items = utilJSON.extract(items, opt.json_fields);
				var itemo = thos.emit('item.filter', items);
				if (iso(itemo)) items = itemo;
				var html = thos.itemString(items);
				var jitem = $(html).appendTo(thos.jcont);
				thos.opt.ele_item = thos.opt.ele_item || jitem.nodeName();
				thos.emit('bind', jitem, items);
			});
			thos.emit('binds', opt.jcont);
			thos.emit('parsing', opt.jcont);

			if (thos.jactions) thos.jactions.show();
			if (thos.jpaging && thos.vars) {
				thos.jpaging.show();
				ui.paging.parser(thos.vars, thos.jpaging, function(page) {
					thos.emit('page', page)
				}, {
					style: opt.paging_style
				});
				thos.emit('paging', thos.vars);
			}
		} else {
			if (thos.jactions) thos.jactions.hide();
			if (thos.jpaging) thos.jpaging.hide();
			ui.render.blankFiller(thos.jcont);
			thos.emit('empty');
			thos.emit('empty.paging');
		}
		ui.progressi.idone(opt.progress);
		thos.emit('completed');
		if (opt.completed) opt.completed.call(thos);
		return thos
	},


	tips: function(jo, status, message) {
		jo.html('<p class="itip ' + status + '"><em></em><span>' + message + '</span></p>')
	},

	// load
	loader: function(jo) {
		jo.html(this.loaderString())
	},
	loaderString: function(jo) {
		var re = jo ? jo.html() : '';
		if (!re) re = '<p class="load iloader"><em></em></p>';
		return re
	},
	loadString: function() {
		return '<span class="load iloading"></span>'
	},
	closeString: function(tag) {
		tag = tag || 'a';
		return '<' + tag + ' class="close iclose" href="#close"></' + tag + '>'
	},

	loaderFiller: function(jwrap, opt) {
		opt = ox({
			init: true,
			progress: true
		}, opt);
		if (opt.init) ui.progressi.istart(opt.progress);
		var jloader = opt.jloader || jwrap.finder('.xloader') || $('<div class="xloader"></div>');
		var jp = jwrap.finder('.bos:first');
		if (!jp) {
			jp = opt.jcont || jwrap.finde('cont');
			if (jp.nodeName() == 'tbody') {
				jp.parents('table').parent().append(jloader);
				jp = null;
			} else jp = jp.parent();
		}
		if (jp) jp.prepend(jloader)

		if (!jloader.html()) {
			jloader.html(ui.render.loaderString(opt.jloading || jwrap.finde('loading')));
		}
		if (opt.init) jloader.show();
		return jloader
	},


	// blank & empty
	blankFiller: function(jcont, jtple) {
		var re = false;
		jtple = jtple || jcont.parent().finde('tple');
		var html = $(jtple).html() || this.blankString(jcont);
		if (html) {
			var jempty = $(html);
			if (jcont.is('tbody') && jempty.find('tr > td').length < 1) {
				html = '<tr><td colspan="' + jcont.parents('table').find('thead th').length + '">' + html + '</td></tr>';
			}
			jcont.append(html);
			re = true;
		}
		return re
	},
	blank_empty_message: '暂无记录',
	blankString: function(opt) {
		var opt_def = {
			empty: 'true',
			status: 'info',
			type: 'inline'
		};
		if (opt.isBasic) {
			//data-empty="暂无记录" data-empty-type="inline" data-empty-status="info"
			var jo = opt,
				attr;
			opt = {
				empty: jo.attrd('empty')
			};
			if (attr = jo.attrd('empty-type')) opt.type = attr;
			if (attr = jo.attrd('empty-status')) opt.status = attr;
		};
		opt = ox(opt_def, opt);
		var html = '';
		if (opt.empty) {
			if (opt.empty == 'true') opt.empty = this.blank_empty_message;
			html = '<div class="iblank ' + opt.status + ' ' + opt.type + '"><p><em></em><i>' + opt.empty + '</i></p></div>';
		}
		return html
	},


	templater: function(str, data) {
		var fn = new Function('obj',
			'var p=[],print=function(){p.push.apply(p,arguments)};' +
			'with(obj){p.push(\'' + str
			.replace(/[\r\t\n]/g, " ")
			.split("<%").join("\t")
			.replace(/((^|%>)[^\t]*)'/g, "$1\r")
			.replace(/\t=(.*?)%>/g, "',$1,'")
			.split("\t").join("');")
			.split("%>").join("p.push('")
			.split("\r").join("\\'") +
			"');}return p.join('');")
		return data ? fn(data) : fn
	}
});
global.tpl = ui.render;

VDCS.UIResults = function(jcont) {
	this.jcont = $(jcont);
	this.push = function(msg, p1, p2, p3) {
		var ret = [];
		ret.push('<p>');
		ret.push(msg);
		if (p1) ret.push(': ' + utilJSON.toString(p1));
		if (p2) ret.push(' ' + utilJSON.toString(p2));
		if (p3) ret.push(' ' + utilJSON.toString(p3));
		ret.push('</p>');
		this.jcont.append(ret.join(''));
		return this
	};
	this.clear = function() {
		this.jcont.html('');
		return this
	};
};


vBasic.fn.extend({
	ibox: function(opt) {
		if (iss(opt)) {
			switch (opt) {
				case 'submit':
					ui.box.submit(ui.ebox);
					break;
				case 'close':
					ui.box.close(ui.ebox);
					break;
			}
			return
		}
		return ui.box.creater($(this), opt)
	}
});

ui.box = function(jo, opt) {
	return $(jo).ibox(opt)
};
extendo(ui.box, {
	creater: function(jo, opt) {
		if (isun(opt)) {
			opt = jo;
			jo = null
		}
		var thos = vdcs.opter(opt);
		thos.jsrc = $jo(jo);
		thos.opt = ox({
			effect: 'box',
			cover: true,
			autor: true
		}, thos.jsrc ? thos.jsrc.data() : null, thos.opt);
		thos.loader = function() {
			ui.box.loader(this);
			this.emit('loader', this.jbox);
			return this
		};
		thos.parser = function() {
			ui.box.parser(this);
			this.emit('parser', this.jbox);
			return this
		};
		thos.run = function() {
			if (this.is_run) return this;
			this.is_run = true;
			this.loader();
			this.parser();
			this.emit('completed', this.jbox);
			return this
		};
		thos.autorun();
		ui.ebox = thos;
		return thos
	},
	loader: function(thos) {
		var htmla = [];
		htmla.push('<div class="ui-box">');
		htmla.push('<h3><t></t><a class="close iclose closer"><span>close</span></a></h3>');
		htmla.push('<div class="conts"></div>');
		htmla.push('<h5>');
		htmla.push('<a class="btn m submit" el="submit"><span>确定</span></a>');
		htmla.push('<a class="btn close closer" el="close"><span>取消</span></a>');
		htmla.push('</h5>');
		htmla.push('</div>');
		thos.jbox = ui.floatBox(htmla.join(EOL), thos.opt);
		thos.jcont = thos.jbox.find('.conts');
		thos.jbar = thos.jbox.find('h3');
		thos.jbtn = thos.jbox.find('h5');
		ui.render(thos.jbox);
		return thos
	},
	parser: function(thos) {
		var opt = thos.opt,
			jbox = thos.jbox;

		thos.on('bar', function(real) {
			this.jbar.sh(real)
		});
		thos.on('title', function(tit) {
			if (tit) this.jbar.find('t').html(tit)
		});
		thos.on('btn', function(real) {
			this.jbtn.sh(real)
		});
		thos.on('btn.align', function(align) {
			if (align) this.jbtn.css('text-align', align)
		});

		thos.on('contenter', function(html) {
			this.jcont.html(html);
			this.jbox.trigger('resizer');
			this.emit('contented');
			this.emit('loaded');
		});

		thos.on('loading', function(html) {
			this.emit('contenter', html || ui.render.loaderString());
		});

		thos.on('content', function(content) {
			var htmla = (content || '').split('<!--script-->'),
				html = htmla[0],
				script = htmla[1];
			if (script) $('body').append(script);
			this.emit('contenter', html);
		});

		thos.on('submiter', function() {
			var ise = this.emit('submit', this.jbox);
			if (isn(ise) || ise) this.emit('closer');
			return false
		});
		thos.on('closer', function() {
			ui.hide(this.jbox, this.opt.effect);
			if (this.opt.cover) ui.cover.hidei();
			this.emit('closed', this.jbox);
			this.jbox.remove();
			return false
		});
		thos.on('close', function() {
			return this.emit('closer')
		});
		thos.close = function() {
			this.emit('closer')
		};

		thos.jbox.on('click', '.submit, a[href="#submit"], [el="submit"]', function() {
			thos.emit('submiter')
		});
		thos.jbox.on('click', '.closer, a[href="#colse"], [el="close"]', function() {
			thos.emit('closer')
		});

		thos.emit('bar', opt.nobar);
		thos.emit('title', opt.title);
		thos.emit('btn', opt.nobtn);
		thos.emit('btn.align', opt.btn_align);

		if (thos.jsrc) thos.emit('content', thos.jsrc.html());

		thos.emit('ready', thos.jbox);
		return thos
	},
	submit: function(ebox) {
		ebox.emit('submiter')
	},
	close: function(ebox) {
		ebox.emit('closer')
	}
});


ui.pages = {

	ex: function(jbtn, opt) {
		var that = this;
		jbtn.on('click', function() {
			that.exClick($(this), opt);
			return false
		})
	},
	exClick: function(jbtn, opt) {
		if (isun(opt)) {
			opt = jbtn;
			jbtn = null
		}
		opt = ox({
			names: '标题',
			name: '操作'
		}, opt);
		var ibox = ui.box.creater(opt);
		ibox.run();

		var _includer = function(html) {
			ibox.emit('content', html);
		};
		if (opt.esrc) _includer($(opt.esrc).html());
		else {
			ibox.emit('loading');
			this.bind_include(opt.serveVarE || opt.serveURLE, _includer);
		}

		return ibox
	},
	bind_include: function(serveVar, fn) {
		if (iso(serveVar)) serveVar = ox({
			x: 'e'
		}, serveVar);
		var url = vdcs.serveURL(serveVar);
		$ajax(url, function(html) {
			fn(html)
		})
	},

	record: function(jbtn, opt) {
		return this.ex(jbtn, opt)
	},
	recordClick: function(jbtn, opt) {
		return this.exClick(jbtn, opt)
	},


	actionParams: function(jo, op_) {
		var opt = ox({
			ele_item: 'tr',
			index: 'id'
		}, op_);
		var jrow = jo.parents(opt.ele_item),
			id = jrow.attrd('index') || jrow.attrd(opt.index);
		var action = '';
		url = '';
		if (jo.attr('href').substring(0, 1) == '#') action = jo.attr('href').substring(1);
		else url = jo.attr('href');
		jo.attr('href-orig', jo.attr('href'));
		jo.attrd('action', action);
		return {
			action: action,
			id: id,
			jo: jo,
			jrow: jrow,
			url: url
		}
	}
};


ui.paging = {
	def_style: 'simple',
	setStyle: function(value) {
		this.def_style = value;
		return this
	},
	parser: function(vars, jpaging, click, opt) {
		opt = ox({
			style: this.def_style,
			limit: true,
			around: false,
			totals: true,
			jump: true
		}, opt);
		if (opt.style == 'simple' || !opt.style) opt = ox(opt, {
			limit: false,
			totals: false,
			jump: false
		});
		jpaging.htmlClear();
		if (!vars || !vars['paging.total'] || vars['paging.total'] < 1) return;
		jpaging.html(this.toString(opt, vars));
		jpaging.on('click', 'a[page]', function() {
			var jo = $(this);
			if (ins(jo.parent('li').attr('class'), 'disabled') < 0) {
				var page = $(this).attr('page');
				click && click(page)
			}
			return false
		});
		jpaging.on('click', '.jump_btn', function() {
			var page = toi(jpaging.find('.jump_page').val());
			if (page) click && click(page)
			return false
		});
	},
	filterOpt: function(opt) {
		var numhalf = Math.floor(opt.page_num / 2);
		opt.page_begin = opt.page - numhalf;
		if (opt.page_begin < 1) opt.page_begin = 1;
		opt.page_end = opt.page_begin + opt.page_num - 1;
		if (opt.page_end > opt.page_total) opt.page_end = opt.page_total;
		return opt
	},
	toString: function(opt, vars) {
		var _opt = {
			page: 1,
			listnum: 10,
			total: 0,
			page_num: 5,
			page_total: 0,
			page_base: 0,
			classname: 'pagination',
			href: 'javascript:;',
			limit: false,
			around: false,
			jump: false,
			jump_txt: 'GO'
		};
		if (vars) {
			_opt = ox(_opt, {
				total: vars['paging.total'],
				listnum: vars['paging.listnum'],
				page: vars['paging.page'],
				page_num: vars['paging.pagenum'],
				page_total: vars['paging.pagetotal'],
				page_base: vars['paging.pagebase']
			});
		}
		opt = ox(_opt, opt);
		opt = this.filterOpt(opt);
		var htmla = [];
		htmla.push('<div class="' + opt.classname + '" data-total="' + opt.total + '" data-pagetotal="' + opt.page_total + '">');
		htmla.push('<ul>');
		if (opt.limit) htmla.push('<li class="first' + (opt.page < 2 ? ' disabled' : '') + '"><a href="' + opt.href + '" page="1">&laquo;</a></li>');
		if (opt.around || opt.page > 1) htmla.push('<li' + (opt.page < 2 ? ' class="disabled"' : '') + '><a href="' + opt.href + '" page="' + (opt.page - 1) + '"><</a></li>');
		for (var i = opt.page_begin; i <= opt.page_end; i++) {
			var _active = '';
			if (opt.page == i) _active = ' class="active"';
			htmla.push('<li' + _active + '><a href="' + opt.href + '" page="' + i + '">' + i + '</a></li>');
		};
		if (opt.around || (opt.page < opt.page_total && opt.page > 0)) htmla.push('<li' + (opt.page >= opt.page_total ? ' class="disabled"' : '') + '><a href="' + opt.href + '" page="' + (opt.page + 1) + '">></a></li>');
		if (opt.limit) htmla.push('<li class="last' + (opt.page >= opt.page_total ? ' disabled' : '') + '"><a href="' + opt.href + '" page="' + opt.page_total + '">&raquo;</a></li>');
		htmla.push('</ul>');
		if (opt.totals && opt.total) htmla.push('<cite><i>' + opt.total + '</i></cite>');
		if (opt.jump) {
			htmla.push('<div class="jump">');
			htmla.push('<i><input type="text" class="jump_page" name="jump_page" value="' + opt.page + '" size="3" /></i>');
			htmla.push('<a class="btn jump_btn"><span>' + opt.jump_txt + '</span></a>');
			htmla.push('</div>');
		}
		htmla.push('</div>');
		return htmla.join(BR)
	}
};


/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.NProgress = factory();
	}
})(this, function() {
	var NProgress = {};
	NProgress.version = '0.2.0';

	var Settings = NProgress.settings = {
		minimum: 0.08,
		easing: 'linear',
		positionUsing: '',
		speed: 200,
		trickle: true,
		trickleSpeed: 200,
		showSpinner: true,
		barSelector: '[role="bar"]',
		spinnerSelector: '[role="spinner"]',
		parent: 'body',
		template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
	};

	/**
	 * Updates configuration.
	 *
	 *     NProgress.configure({
	 *       minimum: 0.1
	 *     });
	 */
	NProgress.configure = function(options) {
		var key, value;
		for (key in options) {
			value = options[key];
			if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
		}
		return this;
	};

	NProgress.status = null;

	/**
	 * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
	 *
	 *     NProgress.set(0.4);
	 *     NProgress.set(1.0);
	 */
	NProgress.set = function(n) {
		var started = NProgress.isStarted();
		n = clamp(n, Settings.minimum, 1);
		NProgress.status = (n === 1 ? null : n);
		var progress = NProgress.render(!started),
			bar = progress.querySelector(Settings.barSelector),
			speed = Settings.speed,
			ease = Settings.easing;
		progress.offsetWidth;
		queue(function(next) {
			if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();
			css(bar, barPositionCSS(n, speed, ease));
			if (n === 1) {
				css(progress, {
					transition: 'none',
					opacity: 1
				});
				progress.offsetWidth;
				setTimeout(function() {
					css(progress, {
						transition: 'all ' + speed + 'ms linear',
						opacity: 0
					});
					setTimeout(function() {
						NProgress.remove();
						next();
					}, speed);
				}, speed);
			} else {
				setTimeout(next, speed);
			}
		});
		return this;
	};

	NProgress.isStarted = function() {
		return typeof NProgress.status === 'number';
	};

	/**
	 * Shows the progress bar.
	 * This is the same as setting the status to 0%, except that it doesn't go backwards.
	 *
	 *     NProgress.start();
	 *
	 */
	NProgress.start = function() {
		if (!NProgress.status) NProgress.set(0);
		var work = function() {
			setTimeout(function() {
				if (!NProgress.status) return;
				NProgress.trickle();
				work();
			}, Settings.trickleSpeed);
		};
		if (Settings.trickle) work();
		return this;
	};

	/**
	 * Hides the progress bar.
	 * This is the *sort of* the same as setting the status to 100%, with the
	 * difference being `done()` makes some placebo effect of some realistic motion.
	 *
	 *     NProgress.done();
	 *
	 * If `true` is passed, it will show the progress bar even if its hidden.
	 *
	 *     NProgress.done(true);
	 */
	NProgress.done = function(force) {
		if (!force && !NProgress.status) return this;
		return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
	};

	/**
	 * Increments by a random amount.
	 */
	NProgress.inc = function(amount) {
		var n = NProgress.status;
		if (!n) {
			return NProgress.start();
		} else if (n > 1) {
			return;
		} else {
			if (typeof amount !== 'number') {
				if (n >= 0 && n < 0.2) {
					amount = 0.1;
				} else if (n >= 0.2 && n < 0.5) {
					amount = 0.04;
				} else if (n >= 0.5 && n < 0.8) {
					amount = 0.02;
				} else if (n >= 0.8 && n < 0.99) {
					amount = 0.005;
				} else {
					amount = 0;
				}
			}
			n = clamp(n + amount, 0, 0.994);
			return NProgress.set(n);
		}
	};

	NProgress.trickle = function() {
		return NProgress.inc();
	};

	/**
	 * Waits for all supplied jQuery promises and
	 * increases the progress as the promises resolve.
	 *
	 * @param $promise jQUery Promise
	 */
	(function() {
		var initial = 0,
			current = 0;
		NProgress.promise = function($promise) {
			if (!$promise || $promise.state() === "resolved") {
				return this;
			}
			if (current === 0) {
				NProgress.start();
			}
			initial++;
			current++;
			$promise.always(function() {
				current--;
				if (current === 0) {
					initial = 0;
					NProgress.done();
				} else {
					NProgress.set((initial - current) / initial);
				}
			});
			return this;
		};
	})();

	NProgress.render = function(fromStart) {
		if (NProgress.isRendered()) return document.getElementById('nprogress');
		addClass(document.documentElement, 'nprogress-busy');
		var progress = document.createElement('div');
		progress.id = 'nprogress';
		progress.innerHTML = Settings.template;
		var bar = progress.querySelector(Settings.barSelector),
			perc = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
			parent = document.querySelector(Settings.parent),
			spinner;
		css(bar, {
			transition: 'all 0 linear',
			transform: 'translate3d(' + perc + '%,0,0)'
		});
		if (!Settings.showSpinner) {
			spinner = progress.querySelector(Settings.spinnerSelector);
			spinner && removeElement(spinner);
		}
		if (parent != document.body) {
			addClass(parent, 'nprogress-custom-parent');
		}
		parent.appendChild(progress);
		return progress;
	};

	NProgress.remove = function() {
		removeClass(document.documentElement, 'nprogress-busy');
		removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
		var progress = document.getElementById('nprogress');
		progress && removeElement(progress);
	};

	NProgress.isRendered = function() {
		return !!document.getElementById('nprogress');
	};

	NProgress.getPositioningCSS = function() {
		var bodyStyle = document.body.style;

		var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
			('MozTransform' in bodyStyle) ? 'Moz' :
			('msTransform' in bodyStyle) ? 'ms' :
			('OTransform' in bodyStyle) ? 'O' : '';

		if (vendorPrefix + 'Perspective' in bodyStyle) {
			return 'translate3d';
		} else if (vendorPrefix + 'Transform' in bodyStyle) {
			return 'translate';
		} else {
			return 'margin';
		}
	};

	function clamp(n, min, max) {
		if (n < min) return min;
		if (n > max) return max;
		return n;
	}

	function toBarPerc(n) {
		return (-1 + n) * 100;
	}

	function barPositionCSS(n, speed, ease) {
		var barCSS;
		if (Settings.positionUsing === 'translate3d') {
			barCSS = {
				transform: 'translate3d(' + toBarPerc(n) + '%,0,0)'
			};
		} else if (Settings.positionUsing === 'translate') {
			barCSS = {
				transform: 'translate(' + toBarPerc(n) + '%,0)'
			};
		} else {
			barCSS = {
				'margin-left': toBarPerc(n) + '%'
			};
		}
		barCSS.transition = 'all ' + speed + 'ms ' + ease;
		return barCSS;
	}

	var queue = (function() {
		var pending = [];

		function next() {
			var fn = pending.shift();
			if (fn) {
				fn(next);
			}
		}

		return function(fn) {
			pending.push(fn);
			if (pending.length == 1) next();
		};
	})();

	var css = (function() {
		var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'],
			cssProps = {};

		function camelCase(string) {
			return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
				return letter.toUpperCase();
			});
		}

		function getVendorProp(name) {
			var style = document.body.style;
			if (name in style) return name;
			var i = cssPrefixes.length,
				capName = name.charAt(0).toUpperCase() + name.slice(1),
				vendorName;
			while (i--) {
				vendorName = cssPrefixes[i] + capName;
				if (vendorName in style) return vendorName;
			}
			return name;
		}

		function getStyleProp(name) {
			name = camelCase(name);
			return cssProps[name] || (cssProps[name] = getVendorProp(name));
		}

		function applyCss(element, prop, value) {
			prop = getStyleProp(prop);
			element.style[prop] = value;
		}
		return function(element, properties) {
			var args = arguments,
				prop, value;
			if (args.length == 2) {
				for (prop in properties) {
					value = properties[prop];
					if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
				}
			} else {
				applyCss(element, args[1], args[2]);
			}
		}
	})();

	function hasClass(element, name) {
		var list = typeof element == 'string' ? element : classList(element);
		return list.indexOf(' ' + name + ' ') >= 0;
	}

	function addClass(element, name) {
		var oldList = classList(element),
			newList = oldList + name;
		if (hasClass(oldList, name)) return;
		element.className = newList.substring(1);
	}

	function removeClass(element, name) {
		var oldList = classList(element),
			newList;
		if (!hasClass(element, name)) return;
		newList = oldList.replace(' ' + name + ' ', ' ');
		element.className = newList.substring(1, newList.length - 1);
	}

	function classList(element) {
		return (' ' + (element && element.className || '') + ' ').replace(/\s+/gi, ' ');
	}

	function removeElement(element) {
		element && element.parentNode && element.parentNode.removeChild(element);
	}

	return NProgress;
});

// var NProgress=require('../lib/nprogress.js');


ui.progressi = NProgress;
if (ui.progressi) {
	NProgress.initer = function() {
		$(function() {
			NProgress.doned()
		});
		NProgress._initer_ = true;
		NProgress._doned_ = true;
		return NProgress.start(true)
	};
	NProgress.isInit = function() {
		return NProgress._initer_
	};
	NProgress.started = function() {
		if (NProgress.isStarted()) return NProgress.inc();
		else {
			NProgress._initer_ = true;
			NProgress._doned_ = true;
			return NProgress.start(true)
		}
	};
	NProgress.doned = function() {
		if (!NProgress._doned_) return false;
		NProgress.done()
	};
	NProgress.timer_clear = function() {
		if (NProgress.done_timer) {
			clearTimeout(NProgress.done_timer);
			NProgress.done_timer = null;
		}
	};
	ui.progressi.istart = ui.progressi.starter = function() {
		NProgress.timer_clear();
		return NProgress.started()
	};
	ui.progressi.idone = ui.progressi.doner = function() {
		NProgress.timer_clear();
		NProgress.done_timer = setTimeout(function() {
			NProgress.doned()
		}, 300);
	};
	ui.progressi.iset = NProgress.set;
	ui.progressi.ing = NProgress.inc;
} else {
	function f() {};
	ui.progressi = {
		initer: f,
		istart: f,
		iset: f,
		ing: f,
		idone: f
	}
}


vBasic.fn.extend({
	taber: function(opt) {
		return new VDCS.taber(ox({
			jwrap: $(this)
		}, opt))
	}
});

ui.taber = {
	initer: function(jtab, opt) {
		this.otab = $(jtab).taber(opt);
	},
};

VDCS.taber = function(opt) {
	VDCS.utilEvent.call(this);

	this.initer = function(opt) {
		this.opt = ox({
			noder: 'li',
			selector: null,
			container: 'body',
			conter: '.itab-cont',
			class_pop: 'pop',
			autor: true
		}, opt);
		this.jwrap = $(this.opt.jwrap || this.opt.wrap);
		this.opt = ox(this.opt, this.jwrap.attrs('tab'));
		this.autorun();
		return this
	};

	this.done = this.run = function() {
		this.inited();
		return this
	};
	this.inited = function() {
		if (this.is_inited) return;
		this.is_inited = true;
		var that = this;
		var aselector = this.opt.selector || (this.opt.noder + ' a'),
			n = 0;
		this.jwrap.find(aselector).each(function() {
			n++;
			$(this).attr('tab-sn', n);
		});
		this.jwrap.on('click', aselector, function() {
			that.click($(this));
			return false
		});
		this.click(this.jwrap.find(this.opt.noder + '.pop a'));
	};

	this.click = function(ja) {
		var opt = this.opt;
		var cont = ja.attr('tab-cont') || ja.attr('href');
		//dbg.t(ja.text(),'tab-cont='+cont);
		if (!cont) return dbg.log('taber.click', 'a cont is empty.');
		var jcant = $(opt.container);
		var jcont = jcant.finder(cont);
		if (!jcont) return dbg.log('taber.click', 'a[' + ja.text().trim() + '] cont no found');
		// clear all pop
		this.jwrap.find(opt.noder).removeClass(opt.class_pop);
		jcant.find(opt.conter).removeClass(opt.class_pop);
		// add now pop
		ja.parent().addClass(opt.class_pop);
		if (!jcont.hasClass('itab-cont')) jcont.addClass('itab-cont');
		jcont.addClass(opt.class_pop);
		// key event
		var key = ja.attr('tab-key'),
			sn = ja.attr('tab-sn');
		var on_key = key ? (key) : ('n' + sn);
		if (!ja.attr('tab-initer')) {
			this.emit(on_key + '.init', {
				ja: ja,
				jcont: jcont,
				sn: sn,
				key: key
			});
			ja.attr('tab-initer', 'true');
		}
		this.emit(on_key, {
			ja: ja,
			jcont: jcont,
			sn: sn,
			key: key
		});
		return this
	};

	this.initer(opt);
};


var app = {
	initer: function() {},
	storager: function() {
		this.odriver = this.odriver || vdcs.storager.driver('local');
		return this.odriver
	},
	getSession: function(key) {
		return this.storager().get(key)
	},
	setSession: function(key, value) {
		return this.storager().set(key, value)
	},
};

var appc = {
	initer: function() {},
	initSession: function(isserve) {
		var query_sid = dcs.query('sid');
		if (query_sid) {
			app.setSession('sid', query_sid);
		}
		this.sid = app.getSession('sid');
		if (isdebug('sid')) dbg.t('sid', this.sid);
		if (isserve && this.sid) {
			$serve.xparami({
				sid: this.sid
			});
		}
	},

};

var page = {

};

$(function() {
	app.initer();
	appc.initer();
});


ui.list = new VDCS.list();
app.serve = $serve;



var ua = {
	rc: '',
	id: '',
	names: '',
	sid: null,
	vars: {},
	location: {
		lng: 0,
		lat: 0,
		distance: 'all'
	},
	seti: function(opt) {
		extendo(this, opt);
	},
	session: function() {
		this.osession = this.osession || new utilSession('ua');
		return this.osession
	},
	setSid: function(v) {
		this.session().set('sid', v);
		this.sid = v;
		return this
	},
	getSid: function() {
		if (isn(this.sid)) this.sid = this.session().get('sid');
		return this.sid
	},

	isLogin: function(popup, quick, opt) {
		var re = (this.id > 0);
		if (!re) {
			if (popup) {
				ui.popup('info', '您还未登录！', true);
				return re
			}
			if (vdcs.isWX()) go('/wx/oauth?action=authorize');
			else if (vdcs.isMobile()) go('/login');
			else if (quick) this.loginQuick(opt);
		}
		return re
	},
	loginQuick: function(opt, jo) {
		opt = ox({
			serveE: {
				channel: 'passport',
				p: 'login',
				action: 'quick',
				params: ''
			},
			xopt: {
				message_succeed: '登录成功！'
			},
			serveXaction: function() {
				return app.xlogin
			},
			nobtn: true,
			title: '快捷登录',
			succeed: function() {
				refresh();
			},
		}, opt);
		ui.pages.exClick(jo, opt)
	}
};


/* Process in 0.527 s. */