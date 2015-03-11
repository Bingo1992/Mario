function Enemy(name){
	base(this,LSprite,[]);
	var self = this;
	self.name = name;
	if(name=="enemy"){
		self.list = LGlobal.divideCoordinate(94, 30, 1, 3);
		self.bitmapdata = new LBitmapData(imgList[name],0,0,31,30);
	}else if(name == "gui" || name == "bird"){
		self.list = LGlobal.divideCoordinate(384, 96, 1, 4);
		self.bitmapdata = new LBitmapData(imgList[name],0,0,96,96);
	}	
	self.anime = new LAnimation(self,self.bitmapdata,self.list);
	self.x = LGlobal.width;
	self.y = LGlobal.height - 35 - self.bitmapdata.height;
}
Enemy.prototype.run =  function(){
	var self = this;
//	if(self.islive){
		self.x -= EN_STEP;
		self.changeAction();
//	}
};
Enemy.prototype.changeAction = function(){
	LGlobal.setDebug(true);
	var self = this;
	if(!self.islive){
//			self.islive = false;
			setTimeout(function(){
				self.anime.setAction(0,1);
			},100);
			setTimeout(function(){
				self.anime.setAction(0,2);
			},100);
	}
};