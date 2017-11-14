/* Crypt(MD5) */
(function($) {
	$.md5 = function(s) {
		return md5_encode(s, t); // markZy 单独用要去掉参数t，否则会报错 ??? why?
	};
	$.md5_hex = function(s) {
		return hex_md5(s)
	};

	function test_md5() {
		return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72"
	};

	function md5_encode(s, t) {
		return hex_md5(s).toLowerCase()
	};

	var hexcase = 0,
		b64pad = "";

	function hex_md5(s) {
		return rstr2hex(rstr_md5(str2rstr_utf8(s)))
	};

	function b64_md5(s) {
		return rstr2b64(rstr_md5(str2rstr_utf8(s)))
	};

	function any_md5(s, e) {
		return rstr2any(rstr_md5(str2rstr_utf8(s)), e)
	};

	function hex_hmac_md5(k, d) {
		return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)))
	};

	function b64_hmac_md5(k, d) {
		return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)))
	};

	function any_hmac_md5(k, d, e) {
		return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e)
	};

	function rstr_md5(s) {
		return binl2rstr(binl_md5(rstr2binl(s), s.length * 8))
	};

	function rstr_hmac_md5(key, data) {
		var bkey = rstr2binl(key);
		if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);
		var ipad = Array(16),
			opad = Array(16);
		for (var i = 0; i < 16; i++) {
			ipad[i] = bkey[i] ^ 0x36363636;
			opad[i] = bkey[i] ^ 0x5C5C5C5C;
		}
		var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
		return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
	};

	function rstr2hex(input) {
		try {
			hexcase
		} catch (e) {
			hexcase = 0
		}
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var output = "";
		var x;
		for (var i = 0; i < input.length; i++) {
			x = input.charCodeAt(i);
			output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
		}
		return output;
	};

	function rstr2b64(input) {
		try {
			b64pad
		} catch (e) {
			b64pad = ''
		}
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var output = "";
		var len = input.length;
		for (var i = 0; i < len; i += 3) {
			var triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 > input.length * 8) output += b64pad;
				else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
			}
		}
		return output;
	};

	function rstr2any(input, encoding) {
		var divisor = encoding.length;
		var i, j, q, x, quotient;
		var dividend = Array(Math.ceil(input.length / 2));
		for (i = 0; i < dividend.length; i++) {
			dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
		}
		var full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
		var remainders = Array(full_length);
		for (j = 0; j < full_length; j++) {
			quotient = Array();
			x = 0;
			for (i = 0; i < dividend.length; i++) {
				x = (x << 16) + dividend[i];
				q = Math.floor(x / divisor);
				x -= q * divisor;
				if (quotient.length > 0 || q > 0) quotient[quotient.length] = q;
			}
			remainders[j] = x;
			dividend = quotient;
		}
		var output = "";
		for (i = remainders.length - 1; i >= 0; i--) output += encoding.charAt(remainders[i]);
		return output;
	};

	function str2rstr_utf8(input) {
		var output = "",
			i = -1,
			x, y;
		while (++i < input.length) {
			x = input.charCodeAt(i);
			y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
			if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
				x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
				i++;
			}
			if (x <= 0x7F) output += String.fromCharCode(x);
			else if (x <= 0x7FF) output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
			else if (x <= 0xFFFF) output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
			else if (x <= 0x1FFFFF) output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
		}
		return output;
	};

	function str2rstr_utf16le(input) {
		var output = "";
		for (var i = 0; i < input.length; i++) output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
		return output;
	};

	function str2rstr_utf16be(input) {
		var output = "";
		for (var i = 0; i < input.length; i++) output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
		return output;
	};

	function rstr2binl(input) {
		var output = Array(input.length >> 2);
		for (var i = 0; i < output.length; i++) output[i] = 0;
		for (var i = 0; i < input.length * 8; i += 8) output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
		return output;
	};

	function binl2rstr(input) {
		var output = "";
		for (var i = 0; i < input.length * 32; i += 8) output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
		return output;
	};

	function binl_md5(x, len) {
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
		var a = 1732584193,
			b = -271733879,
			c = -1732584194,
			d = 271733878;
		for (var i = 0; i < x.length; i += 16) {
			var olda = a,
				oldb = b,
				oldc = c,
				oldd = d;

			a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
			d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
			b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
			d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
			c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
			d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
			d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

			a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
			d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
			c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
			b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
			d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
			c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
			d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
			c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
			a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
			d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
			c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
			b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

			a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
			d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
			b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
			d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
			c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
			d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
			a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
			d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
			b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

			a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
			d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
			c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
			d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
			d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
			a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
			d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
			b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return Array(a, b, c, d);
	};

	function md5_cmn(q, a, b, x, s, t) {
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
	};

	function md5_ff(a, b, c, d, x, s, t) {
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
	};

	function md5_gg(a, b, c, d, x, s, t) {
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
	};

	function md5_hh(a, b, c, d, x, s, t) {
		return md5_cmn(b ^ c ^ d, a, b, x, s, t)
	};

	function md5_ii(a, b, c, d, x, s, t) {
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
	};

	function safe_add(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	};

	function bit_rol(num, cnt) {
		return (num << cnt) | (num >>> (32 - cnt))
	};
})(jQuery);


(function($) {


	$.query = {
		initer: function() {

		},
		getString: function() {
			if (this.qstring == null) {
				this.qstring = document.location.search;
				if (this.qstring) {
					this.qstring = this.qstring.substr(1)
				}
			}
			return this.qstring
		},
		getJSON: function() {
			return this.query_json ? this.query_json : this.query_json = s2o(this.getString(), '&')
		},
		get: function(k) {
			var re = this.getJSON()[k];
			return isun(re) ? '' : decodeURIComponent(re)
		},
		hash: function(v) {
			var lh = location.hash;
			if (isun(v)) return lh.substr(1);
			lh = '#' + v;
			return v
		}
	};


	$.extend($, {
		initer: function() {
			if ($.jwin) return true;
			$.jdoc = $(document), $.jbody = $(document.body), $.jwin = $(window), $.jconf = $('#confine');
			$.widthi = $.jconf.width() || 980;
		},
		iso: function(o) {
			return o && o.length
		},

		_sets_: [],
		sets: function(k, v) {
			if (v) $._sets_[k] = v;
			return $._sets_[k]
		},

		html: function(re) {
			if (!re) return re;
			re = r(re, BR, '<br/>');
			re = r(re, '&#10;', '<br/>');
			re = r(re, '&#13;', '<br/>');
			re = r(re, '<br/><br/>', '<br/>');
			return re
		},

		sizes: function() {
			return this.winSize()
		},
		winSize: function() {
			return {
				widthi: $.widthi,
				width: $.jwin.width(),
				height: $.jwin.height()
			}
		},
		winOffset: function() {
			return {
				top: $.jdoc.scrollTop(),
				left: $.jdoc.scrollLeft()
			}
		},
		testWin: function(jo) {
			dbg.t('testWin');
			dbg.t('window=' + $.jwin.width() + '*' + $.jwin.height());
			dbg.t('document=' + $.jdoc.width() + '*' + $.jdoc.height());
			dbg.t('body=' + $.jbody.width() + '*' + $.jbody.height());
			if (jo) dbg.t('jo=' + jo.outerWidth() + '*' + jo.outerHeight());
		},

		resized: function(fn) {
			fn($.sizes());
			$.resizer(fn)
		},
		resizer: function(fn) {
			$.jwin.resize(function() {
				fn($.sizes())
			})
		},
		scrolled: function(fn) {
			fn($.winOffset());
			$.scroller(fn)
		},
		scroller: function(fn) {
			$.jwin.scroll(function() {
				fn($.winOffset())
			})
		},

		css_effect: function(real, type) {
			var re = '';
			switch (real) {
				case 'mini':
				case 'popup':
				case 'box':
				case 'ui':
					re = 'ui@';
					break;
				case 'fade':
					re = 'fade@';
					break;
				case 'up':
					re = 'fade@Up';
					break;
				case 'down':
					re = 'fade@Down';
					break;
				case 'left':
					re = 'fade@Left';
					break;
				case 'right':
					re = 'fade@Right';
					break;
				default:
					re = real;
					break;
			}
			return re.replace('@', type)
		},
		append: function(type, value, opt) {
			if (!type) return false;
			opt = ox(opt);
			if (iso(type)) {
				var or = iso(value) ? value : document.body;
				or.appendChild(t);
				return true
			}
			switch (type) {
				case 'o':
					$('head').append(value);
					break;
				case 'e':
					$('body').append(value);
					break;
				case 'css':
					$('head').append('<style type="text/css"' + (opt.id ? ' id="' + opt.id + '"' : '') + '>' + value + '</style>');
					break;
			}
			return true
		}
	});
	$(function() {
		$.initer();
	});

	$.fn.extend({
		isBasic: function() {
			return true
		},
		nodeName: function() {
			return this[0] ? this[0].nodeName.toLowerCase() : ''
		},
		htmlClear: function() {
			$(this).html('')
		},


		// initi
		initi: function(key, fn, opt) {
			if (!fn) {
				fn = key;
				key = ''
			}
			key = key || '0';
			var key2 = '_initi_' + key;
			return this.each(function() {
				var $0 = $(this);
				if ($0.attr(key2)) return;
				fn && fn($0);
				if (!$0.attr(key2)) $0.attr(key2, 'true')
			})
		},


		// find
		finder: function(s) {
			var re = this.find(s);
			if (re.length < 1) re = null;
			return re
		},
		finde: function(s, k, r) {
			if (isb(k)) {
				r = k;
				k = ''
			}
			k = k ? k : 'el';
			var term = '';
			if (s.substring(0, 1) == '^') {
				term = s.substring(0, 1);
				s = s.substring(1);
			}
			var sel = '[' + k + '' + term + '="' + s + '"]';
			return r ? this.finder(sel) : this.find(sel)
		},
		finda: function(s, as) {
			return this.find('a[href="' + s + '"]' + (as || ''))
		},
		findin: function(s, as) {
			return this.find('input[name="' + s + '"]' + (as || ''))
		},

		// attr
		attrs: function(node) {
			node = node || 'data';
			var i, name, re = null,
				len = node.length + 1,
				elem = this[0],
				attrs = elem && elem.attributes;
			if (this.length) {
				re = [];
				if (elem.nodeType === 1) {
					i = attrs.length;
					while (i--) {
						if (attrs[i]) {
							name = attrs[i].name;
							if (name.indexOf(node + '-') === 0) {
								re[name.slice(len)] = attrs[i].value;
							}
						}
					}
				}
			}
			return re
		},
		attrd: function(key, value) {
			if (typeof value !== 'undefined') this.attr('data-' + key, value);
			return this.attr('data-' + key)
		},
		attrdi: function(key, value) {
			return parseInt(this.attrd(key, value))
		},
		// data
		dateSet: function(obj) {
			var jo = $(this);
			eacho(obj, function(k, v) {
				jo.attr('data-' + k, v)
			})
			return this
		},


		replaceClass: function(v) {
			return this.removeClass().addClass(v)
		},


		// on ..
		on_code: function(code, fn) {
			return $(this).on('keypress', function(e) {
				if (e.keyCode == code) {
					var re = fn.apply(this);
					if (!isun(re)) return re
				}
			})
		},
		on_off: function() {
			return $(this).off('keypress');
		},
		ontab: function(fn) {
			$(this).on_code(9, fn)
		},
		onenter: function(fn) {
			$(this).on_code(13, fn)
		},
		oninput: function(fn, opt) {
			if (typeof opt === 'Function') {
				var f = opt;
				opt = fn;
				fn = f;
			}
			opt = $.extend({
				on: 'input'
			}, opt);
			return $(this).on(opt.on, function() {
				var re = fn.apply(this);
				if (!isun(re)) return re
			})
		},


		// show & hide
		sh: function(real) {
			if (isn(real)) real = true;
			return real ? this.show() : this.hide()
		},
		ishow: function(real, fn) {
			var jo = $(this);
			if (real) {
				var effect = $.css_effect(real, 'In');
				jo.removeClass('animater fast ani-' + jo.attr('class-effect'));
				if (effect) jo.attr('class-effect', effect).addClass('animater fast ani-' + effect).delay(1000).show();
				else jo.show();
				if (fn) timeoutRun(function() {
					fn()
				}, 1)
			} else {
				jo.fadeIn(500);
				if (fn) fn()
			}
		},
		ihide: function(real, fn) {
			var jo = $(this);
			if (real) {
				var effect = $.css_effect(real, 'Out');
				jo.removeClass('animater fast ani-' + jo.attr('class-effect'));
				if (effect) jo.attr('class-effect', effect).addClass('animater fast ani-' + effect).delay(1000).hide();
				else jo.hide();
				if (fn) timeoutRun(function() {
					fn()
				}, 1)
			} else {
				jo.fadeOut(500);
				if (fn) fn()
			}
		},


		outerHTML: function(value) {
			if (!this.length) return null;
			if (value === undefined) {
				var el = (this.length) ? this[0] : this,
					re;
				if (el.outerHTML) re = el.outerHTML;
				else re = $(document.createElement('div')).append($(el).clone()).html();
				if (typeof re === 'string') re = $.trim(re);
				return re
			} else if ($.isFunction(value)) {
				this.each(function(i) {
					$(this).outerHTML(value.call(this, i, $(this).outerHTML()))
				})
			} else {
				var ela = [],
					$value = $(value),
					$cloneValue;
				for (var x = 0; x < $(this).length; x++) {
					$cloneValue = $value.clone(true);
					$(this).eq(x).replaceWith($cloneValue);
					for (var i = 0; i < $cloneValue.length; i++) ela.push($cloneValue[i]);
				}
				return ela.length ? $(ela) : null
			}
		}
	});

})(vBasic);


(function($) {

	$.fn.extend({


		// form
		formEach: function(fn) {
			$(this).find($form.selector).each(function() {
				fn($(this))
			});
		},
		formValues: function(values) {
			var jo = $(this);
			if (!values) return jo.formJSON();
			for (var field in values) {
				jo.findin(field).vals(values[field]);
			}
		},
		formJSON: function() {
			var reo = {};
			$(this).formEach(function(jo) {
				reo[jo.attr('field') || jo.attr('name')] = jo.vals()
			});
			// var ary=$(this).serializeArray();
			// eacha(ary,function(obj){
			// 	reo[obj.name]=obj.value
			// });
			return reo
		},
		vals: function(value, mode) {
			var jthis = $(this),
				_name = jthis.attr('name'),
				type = jthis.attr('type'),
				re = '',
				rea = [],
				isset = false,
				ismulti = false;
			var name = _name,
				selector = '',
				selx = '';
			if (_name && _name.substr(-2) == '[]') {
				_name.substr(0, _name.length - 2);
				ismulti = true
			}
			var jwrap = jthis.parents('form');
			if (!jwrap.length) jwrap = jthis.parent().parent().parent().parent().parent();
			if (!isun(value)) {
				isset = true
					//dbg.t(type+','+value);
			}
			switch (type) {
				case 'radio':
					//__all,_all_,_no1
					selector = 'input[name="' + _name + '"][type=radio]'; //,input[name="'+_name+'"][type=radio][checked]
					if (isset) {
						var val = value + '';
						if (val.substr(0, 3) == '_no') selx = ':eq(' + (parseInt(val.substr(3)) - 1) + ')';
						else selx = '[value="' + val + '"]';
						jwrap.find(selector + selx).prop('checked', 'checked')
					}
					var jitem = jwrap.find(selector + ':checked');
					if (isset) jitem.trigger('click');
					if (jitem.length) re = jitem.val();
					break;
				case 'select':
				case 'checkbox':
					var _type = 'checkbox',
						_prop = 'checked',
						_propv = 'checked';
					if (type == 'select') {
						_type = 'select', _prop = 'selected', _propv = 'selected';
					}
					selector = 'input[name="' + _name + '"][type=' + _type + ']'; //,input[name="'+_name+'"][type=checkbox][checked]
					if (isset) {
						var valuea = value.split(',');
						for (var i in valuea) {
							var val = valuea[i] + '';
							if (val == '__all' || val == '_all_') selx = '';
							else if (val.substr(0, 3) == '_no') selx = ':eq(' + (parseInt(val.substr(3)) - 1) + ')';
							else selx = '[value="' + val + '"]';
							jwrap.find(selector + selx).prop(_prop, _propv)
							if (isset) jwrap.find(selector + selx).trigger('click');
						}
					}
					jwrap.find(selector + ':' + _prop).each(function() {
						rea.push($(this).val())
					});
					re = rea.join(',');
					break;
				default:
					if (isset) jthis.val((mode == 'append' ? jthis.val() : '') + value);
					if (ismulti) {
						jwrap.find('input[name="' + _name + '"]').each(function() {
							rea.push($(this).val())
						});
						re = rea.join(',')
					} else {
						re = jthis.val()
					}
					break;
			}
			if (isset) {
				jthis.trigger('input').trigger('keypress');
			}
			return re
		},
		valer: function(v) {
			return $(this).val(v)
		},

		// prop
		form_prop: function(type, bool) {
			if (typeof bool !== 'undefined') this.prop(type, bool ? true : false);
			return this.prop(type)
		},
		disabled: function(bool) {
			return this.form_prop('disabled', bool)
		},
		checked: function(bool) {
			return this.form_prop('checked', bool)
		},
		selected: function(bool) {
			return this.form_prop('selected', bool)
		},


		/* a[href] */
		ahref: function() {
			var jo = $(this),
				href = jo.attr('href'),
				action = '';
			url = '';
			if (href.substr(0, 1) == '#') action = href.substr(1);
			else url = href;
			return {
				jo: jo,
				action: action,
				url: url,
				href: href
			}
		},
		aclick: function(opt, et, fn) {
			if (isf(opt)) {
				fn = opt;
				opt = {}
			} else if (isf(et)) {
				fn = et;
				et = null
			}
			opt = ox({
				selector: 'a[href^="#"]'
			}, opt);
			et = et || newEvent();
			et.jwrap = et.jwrap || $(this);
			et.jwrap.on('click', opt.selector, function() {
				var ahref = $(this).ahref(),
					act = ahref.action,
					ps = {
						action: act,
						jwrap: et.jwrap,
						opt: opt
					};
				if (fn) {
					fn(act, ahref.jo, ps);
					return false
				}
				if (et.is(act)) et.emit(act, ahref.jo, ps);
				else {
					if (et.is('invoker')) et.emit('invoker', act, ahref.jo, ps)
					else dbg.log('aclick.on [' + act + '/invoker] NULL');
				}
				return false
			});
			return et
		},
		iclick: function(opt, et, fn) {
			return $(this).aclick(opt, et, fn)
		},



		// smart
		htmlSmart: function(opt) {
			return this.ihtml(opt)
		},
		itext: function(opt) {
			return this.ihtml(opt)
		},
		ihtml: function(opt) {
			if (!iso(opt)) opt = {
				value: opt
			};
			var jo = $(this),
				jsub = jo.find(opt.esub || 'span');
			if (jsub.length > 0) jsub.html(opt.value);
			else jo.html(opt.value);
			return this
		},
		ibtn: function(el, opt) {
			var jo = $(this).finde(el);
			if (opt[el + '_off']) jo.hide();
			if (opt[el + '_value'] || opt[el + '_name']) jo.ihtml(opt[el + '_value'] || opt[el + '_name']);
			if (opt[el + '_link']) jo.attr('href', opt[el + '_link']);
			if (opt['on' + el]) jo.on('click', opt['on' + el]);
		},
		btnSmart: function(opt) {
			if (!iso(opt)) opt = {
				set: opt
			};
			opt = $.extend({
				set: 'ing',
				value_px: 'data-value',
				class_px: 'data-class',
				data_orig: 'orig'
			}, opt);
			if (!opt.value_set) opt.value_set = opt.set;
			var jo = $(this),
				_set = '',
				_value = '',
				_class = '',
				attr_orig = opt.value_px + '--' + opt.data_orig,
				attr_set = opt.value_px + '--set';
			if (opt.set == 'reset') {
				_value = jo.attr(attr_orig);
				_class = jo.attr(opt.class_px + '-' + jo.attr(attr_set));
				if (_class) {
					if (_class == 'disabled') jo.disabled(false);
					else jo.removeClass(_class);
				}
			} else {
				_status = opt.set;
				if (!jo.attr(attr_orig)) jo.attr(attr_orig, jo.text());
				var oldclass = jo.attr(opt.class_px + '-' + jo.attr(attr_set));
				if (oldclass) jo.removeClass(oldclass);
				_value = jo.attr(opt.value_px + '-' + opt.value_set);
				_class = jo.attr(opt.class_px + '-' + opt.value_set);
				if (opt.value_set == 'load') {
					_value = _value || '{em}';
					_class = _class || 'load';
					_value = r(_value, '{em}', '<em class="iload"></em>');
				}
				_value = _value || jo.text() + '[' + opt.value_set + ']';
				if (_class) {
					if (_class == 'disabled') jo.attr('disabled', 'disabled');
					else jo.addClass(_class);
				}
			}
			jo.attr(attr_set, opt.set);
			if (_value) jo.ihtml({
				esub: opt.esub,
				value: _value
			});
			return this
		},


		/* placeto */
		placeto: function(opt) {
			return this.each(function() {
				var jo = $(this);
				opt = $.extend({
					holder: true,
					offset: 0,
					speed: 800
				}, jo.data(), opt);
				if (opt.holder) opt.offset -= $.holder_height('headbar');
				$('body').animate({
					scrollTop: jo.offset().top + opt.offset
				}, opt.speed);
			});
		},
		/* float */
		floato: function(opt) {
			opt = $.extend({
				offset: 0
			}, jo.data(), opt);
			var jo = $(this);
			var _resize = function(sizes) {
				sizes = sizes || $.sizes();
				var css = ox({
					position: 'fixed'
				}, opt); //,zIndex:1000
				if (typeof(opt.lefto) !== 'undefined') css = ox(css, {
					left: ((sizes.width - $.jconf.width()) / 2 - opt.lefto - jo.width())
				});
				if (typeof(opt.righto) !== 'undefined') css = ox(css, {
					right: ((sizes.width - $.jconf.width()) / 2 - opt.righto - jo.width())
				});
				jo.css(css).show()
			};
			jo.on('resizer', function() {
				_resize()
			});
			$.resized(_resize);

			if (opt.follow) {
				var jfollow = $(opt.follow);
				if (!jfollow.length) {
					dbg.log('floato', 'follow none');
					return false
				}
				if (opt.w) jo.css('min-width', jfollow.outerWidth());
				var _follow = function(pos) {
					jo.css({
						top: jfollow.offset().top - pos.top + jfollow.outerHeight() + opt.offset,
						left: jfollow.offset().left - pos.left
					});
				};
				$.scrolled(_follow);
			}
		},
		floatBox: function(opt) {
			var jo = $(this);
			opt = ox({
				status: '',
				message: 'hello',
				cover: true,
				top_hold: true,
				top_offset: 100,
				top: 0,
				zindex: 1001
			}, jo.data(), opt);
			if ($.jfloatbox) $.jfloatbox.hide();
			jo.css({
				zIndex: opt.zindex,
				position: 'fixed',
				top: 0,
				left: 0
			});
			ui.show(jo, opt.effect);
			if (opt.cover) ui.cover.show();
			var _resize = function(e, sizes) {
				sizes = sizes || $.sizes();
				var _top = (sizes.height - jo.height() - opt.top_offset) / 2 + opt.top;
				if (opt.top_hold) _top += $.holder_height('headbar');
				jo.css({
					top: _top,
					left: (sizes.width - jo.width()) / 2
				})
			};
			jo.on('resizer', _resize);
			$.resized(_resize);
			$.jfloatbox = jo;
			return jo
		},
		floatac: function(opt) {
			var jo = $(this);
			opt = ox({
				ani: true,
				reset: false,
				offset: 0,
				offsetX: 0,
				offsetY: 0
			}, jo.data(), opt);
			jo.css({
				position: 'fixed'
			});
			if (opt.ani) jo.addClass('anim');
			if (opt.reset) jo.css({
				margin: 0
			});
			jo.on('abs_center', function(e, sizes) {
				var $this = $(this);
				var _left = (sizes.width - $this.outerWidth()) / 2,
					_top = (sizes.height - $this.outerHeight()) / 2;
				_left += (jo.attrdi('offsetX') || opt.offsetX);
				_top += (jo.attrdi('offset') || opt.offsetY || opt.offset);
				//dbg.t('left='+_left+', top='+_top);
				$this.css({
					left: _left,
					top: _top
				});
			});
			jo.show();
			$.resized(function(sizes) {
				jo.trigger('abs_center', [sizes])
			});
		},


		/* linkpop */
		linkpop: function(opt) {
			opt = ox({
				url: null,
				selector: 'li a',
				father: 'li',
				classname: 'pop',
				attr: 'href'
			}, opt);
			if (!opt.url) opt.url = vdcs.url('path');
			var len = 0,
				jo = null;
			$(this).find(opt.selector).each(function() {
				var ja = $(this),
					_url = ja.attr(opt.attr);
				// dbg.t('len',len);dbg.t('length',_url.length);
				if (_url.length > len && opt.url.substr(0, _url.length) == _url) {
					len = _url.length;
					jo = ja
				}
			});
			if (!jo) jo = $($(this).find(opt.selector)[0]);
			//if(jo) dbg.t('pop',jo.attr('href'));
			jo.parents(opt.father).addClass(opt.classname);
			return this
		}
	});

	$.extend($, {
		preload_pic: function(srca, fn) {
			if (typeof(srca) != 'object') srca = [srca];
			var i, src, loada = [];
			var _loaded = function(src) {
				loada[src] = true;
				_check(src)
			};
			var _check = function(src) {
				var re = true;
				for (var i = srca.length; i--;) {
					if (!loada[srca[i]]) {
						re = false;
						break
					}
				}
				if (re && fn) fn(srca);
			};
			for (i = srca.length; i--;) loada[srca[i]] = false;
			for (var i = srca.length; i--;) {
				$('<img>').attr('src', srca[i]).load(function() {
					_loaded($(this).attr('src'))
				})
			}
		},

		holder_h: [],
		holder_height: function(t) { // headbar_holder_height
			t = t || 'headbar';
			if (typeof this.holder_h[t] != 'undefined') return this.holder_h[t];
			var jo = $('#' + t + '_holder');
			this.holder_h[t] = 0;
			if (jo.length) this.holder_h[t] = jo.height() + parseInt(jo.css('marginTop')) + parseInt(jo.css('marginBottom'));
			return this.holder_h[t]
		}
	});

})(vBasic);


/* Process in 0.353 s. */