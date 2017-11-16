'use strict';

const utilFileDriver=require('./utilFileDriver.js');
const INI=require('./ini.js');

class utilINIDriver extends utilFileDriver{
	constructor(path,opt){
		super(path,opt);
		this.obj=INI.decode(this.content);
		this.objs=vdcs.cfg.toFlat(this.obj);
	}


	get(key){
		var re=this.objs[key];
		return isun(re)?'':re
	}
	set(key,value){
		this.obj[key]=value;
	}


	toJSON(){
		return this.obj
	}
	toJSONFlat(){
		return this.objs
	}
	toString(){
		return INI.encode(this.obj);
	}

}

exports=module.exports=utilINIDriver;
