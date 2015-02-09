function Player(){
	base(this,LSprite,[]);
	var self = this;
	var list = LGlobal.divideCoordinate(256, 256, 4, 4);
	var bitmapdata = new LBitmapData(imgList["chara"],0,128,64,64);
	self.moveType = null;
	self.isMove = false;
	self.anime = new LAnimation(self,bitmapdata,list);
}

Player.prototype.onframe = function(){
	var self = this;
	
	
	self.anime.onframe();//循环播放list图
};

//控制主角动作
Player.prototype.changeAction = function(){
	var self = this;	
	if(self.moveType == "up"){
		mario.y -= HEIGHT_STEP;
		var key = null;
		for(key in ladderLayer.childList){
			var ladderChild = ladderLayer.childList[key];
			//如果阶梯在屏幕之外将其移除
			if(ladderChild.x < -ladderChild.getWidth()){
				ladderLayer.removeChild(ladderChild);
			}
			//若处于梯子周围并且跳跃则将其置于阶梯上
			if(mario.x+45 > ladderChild.x && mario.x < ladderChild.x+50 && mario.y <= ladderChild.y){
				mario.y = mario.y + 6;    
				
			}else{
				setTimeout(function(){
					mario.y = 300;
				},200);
			}
			
		}
	}	
};

Player.prototype.showEffect = function(type){
	var self = this;
	switch(type){
	
	}
}

