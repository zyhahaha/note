
var mframe={

	set:function(k,v){this._data[k]=v;},
	get:function(k){return this._data[k];},

	tab_index:1,tab_index_now:1,

	initer:function(){
		var that=this;
		this.initNow();
		that.initerDefault();
		that.inited();
		that.fresh();
	},

	initNow:function(){
		var tmpDate=new Date();
		var tmpYear=tmpDate.getYear();
		tmpYear=(tmpYear<1000) ? tmpYear+1900 : tmpYear;
		var tmpMonth=tmpDate.getMonth()+1;
		var tmpDay=tmpDate.getDate();
		var aryWeek=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
		var tmpWeek=aryWeek[tmpDate.getDay()];
		$('#sider').find('.li_date .explan').html('今天是');
		$('#sider').find('.li_date .date').html(tmpYear+'-'+tmpMonth+'-'+tmpDay);
		$('#sider').find('.li_date .week').html(tmpWeek);
		// this.jtimer=this.jtimer||$('#timer');
		// this.jtimer.finde('today').html(tmpYear+'-'+tmpMonth+'-'+tmpDay);
		// this.jtimer.finde('week').html(tmpWeek);
		// ui.emit('manager.timer.init',this.jtimer);
	},

	inited:function(){
		var that=this;
		this.sider_menu=$('#sider');

		this.sider_menu.find('a').on('click',function(){
			var ja=$(this),zbx_taber=$('#zbx-taber');

			if(ja.attr('href').split('/').length > 1){
				that.handleTab(ja,zbx_taber);
			}

			return false;
		})

		$('#zbx-taber').on('click','li',function(){
			var ja=$(this);
			var tab_url=ja.attrd('url');
			if(!ja.hasClass('pop')){
				//update pop
				that.prop($('#zbx-taber'),tab_url);
			}
		})

		$('#zbx-taber').on('click','li .close',function(){
			var ja=$(this);
			// console.log(ja.parents('li'));
			var ja_li=ja.parents('li'),index=ja_li.attrd('index');

			//高亮处理
			//最后一个tab时处理

			if(ja_li.hasClass('pop')){
				if(ja_li.prev().length){
					var tab_url=ja_li.prev().attrd('url');
					that.prop($('#zbx-taber'),tab_url);

					that.closeTab(ja,index);
				}else if(ja_li.next().length){
					var tab_url=ja_li.prev().attrd('url');
					that.prop($('#zbx-taber'),tab_url);

					
					that.closeTab(ja,index);
				}else{
					// do nothing
				}
			}else{
				that.closeTab(ja,index);
			}

			return false
		})
	},

	closeTab:function(ja,index){
		ja.parents('li').remove();
		$('.ifrm_'+index+'').remove();
	},

	handleTab:function(ja,tab){
		var that=this;
		var tab_url=ja.attr('href'),flag=that.prop(tab,tab_url),tab_url_html=ja.find('span').html()?ja.find('span').html():ja.html();

		if(!flag){
			//不存在
			var frame_li=that.dom_frame_li(that.tab_index,tab_url,tab_url_html);
			//加载iframe
			var iframe=that.dom_iframe(that.tab_index,tab_url);

			that.tab_index++;
			that.prop(tab,tab_url);
			tab.find('ul').append(frame_li);
			$('#zbx-main-con').append(iframe);
		}

		return false;
	},

	prop:function(tab,tab_url){
		var that=this;

		var flag=false;
		tab.find('li').each(function(){
			var ja=$(this);
			var _url=ja.attrd('url'),index=ja.attrd('index');
			if(tab_url == _url){
				ja.addClass('pop').siblings().removeClass('pop');
				$('#zbx-main-con').find('.ifrm_'+index+'').removeClass('hide').siblings().addClass('hide');

				flag=true;
			}else{
				ja.removeClass('pop');
				$('#zbx-main-con').find('.ifrm_'+index+'').addClass('hide');
			}
		})

		return flag;
	},
	fresh:function(){
		$('.zbx-part').find('.refresh').on('click',function(){
			console.log(11);
		})
	},

	initerDefault:function(){
		var that=this,sider=$('#sider'),frame_first=sider.find('.sider-li:not(.hide)');

		if(!frame_first.length){
			 // ui.minipop('您暂无权限操作，请联系管理员');
			return false;
		}

		var _url=frame_first.find('dd a').attr('href'),_url_html=frame_first.find('dd a span').html()?frame_first.find('dd a span').html():frame_first.find('dd a').html();

		var frame_li=that.dom_frame_li(this.tab_index,_url,_url_html);
		var iframe=that.dom_iframe(this.tab_index,_url);

		this.tab_index++;

		$('#zbx-taber').find('ul').append(frame_li);
		$('#zbx-main-con').append(iframe);
	},

	dom_frame_li:function(index,url,text){
		var li='<li data-index="'+index+'" class="pop" data-url="'+url+'"><a href="javascript:;">'+text+'</a><span class="close"><i class="icon-close"></i></span></li>';
		return li;
	},
	dom_iframe:function(index,url){
		var _action=url.split('.')[0],_class=_action.substr(1).replace(/\//g,'_');
		var iframe='<div class="ifrm ifrm_'+index+'" data-index="'+index+'"><iframe name="ifrm_'+index+'" class="'+_class+'" src="'+url+'" noresize="" style="height:100%;"></iframe></div>';
		return iframe;
	},

'':''};