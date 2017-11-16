'use strict';

class utilFileDriver{
	constructor(path,opt){
		this.opt=ox({
			charset:'utf-8',
		},opt);
		this.fs_opt={
			encoding:this.opt.charset,
		};
		this.path=path;
		this.content=this.readContent();
	}

	getContent(){
		return this.content;
	}
	setContent(content){
		this.content=content;
		return this
	}
	readContent(path){
		path=path||this.path;
		return __fs.existsSync(path)?__fs.readFileSync(path,this.fs_opt):'';
	}

	replaceRegex(pattern,fn){
		if(!isf(fn)){
			var value=fn;
			fn=function(){return value};
		}
		this.content=utilRegex.replace_match(this.content,pattern,fn);
		return this
	}

	save(path,content){
		path=path||this.path;
		if(isun(content)) content=this.content;
		__fs.writeFileSync(path,content,this.fs_opt);
		return this
	}

}

exports=module.exports=utilFileDriver;
