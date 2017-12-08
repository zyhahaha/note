### ----------------- window.postMessage -------------------
	# 打开子窗口 #
	var popup = window.open('http://bbb.com', 'title');

	# 给子窗口和父窗口添加message监听事件 #
	window.addEventListener('message', function(e) {
	  console.log(e.data);
	},false);

	# 给子窗口发送信息 #
	popup.postMessage('Hello World!', 'http://bbb.com');

	# 给父窗口发送信息 #
	window.opener.postMessage('Nice to see you', 'http://aaa.com');

	# event属性 #
	event.source：发送消息的窗口
	event.origin: 消息发向的网址
	event.data: 消息内容


