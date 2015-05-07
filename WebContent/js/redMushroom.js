function RedMushroom(){
	base(this,LSprite,[]);
	var self = this;
	self.list = LGlobal.divideCoordinate(94,30, 1, 3);
	self.bitmapdata = new LBitmapData(imgList["big"],0,0,31,30);
 	self.anime = new LAnimation(self,self.bitmapdata,self.list);
	self.x = LGlobal.width;
	self.y = LGlobal.height - 35 - self.height;
}
//添加蘑菇
RedMushroom.add = function(){
	var random = Math.random();
	 if(random > 0.8){
		mushroom = new RedMushroom();
		mushroomLayer.addChild(mushroom);
	 }
	
};
//蘑菇移动
RedMushroom.prototype.Run = function(){

	for(var key4 in mushroomLayer.childList){
		var _child =mushroomLayer.childList[key4];
		if(_child.x < -_child.getWidth()){
			mushroomLayer.removeChild(_child);				
		}
		_child.x -= 20;
	}	
};
//蘑菇撞击
RedMushroom.prototype.Hit = function(){
		for(var key4 in mushroomLayer.childList){
		var _child = mushroomLayer.childList[key4];
		if(_child.x < -_child.getWidth()){
			mushroomLayer.removeChild(_child);				
		}
		if(girl.x+40 >= _child.x && girl.x <= _child.x+30 && girl.y==LGlobal.height-70-girl.height){
			girl.Big();
		}
	}		
};


function MushroomInit(){
	mushroomLayer = new LSprite();
	backLayer.addChild(mushroomLayer);
}