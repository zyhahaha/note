// 过滤XSS攻击
Zescape = function(re){
	return String(re)
		.replace(/&(?!\w+;)/g,'&amp;')
		.replace(/</g,'&lt;')
		.replace(/>/g,'&gt;')
		.replace(/"/g,'&quot;');
};
// 反编
Yescape = function(re){
	return String(re)
		.replace(/&amp;/g,'&')
		.replace(/&lt;/g,'<')
		.replace(/&gt;/g,'>')
		.replace(/&quot;/g,'"');
};