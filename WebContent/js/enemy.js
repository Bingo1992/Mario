var enemy;
var bird = false;
function Enemy(name){
	base(this,LSprite,[]);
	var self = this;
	self.name = name;
	if(name=="enemy" || name=="big"){
		self.list = LGlobal.divideCoordinate(32,96, 3, 1);
		self.bitmapdata = new LBitmapData(imgList[name],0,0,32,32);
	}else if(name == "gui" || name == "bird"){
		self.list = LGlobal.divideCoordinate(384, 96, 1, 4);
		self.bitmapdata = new LBitmapData(imgList[name],0,0,96,96);
		
	}
	self.anime = new LAnimation(self,self.bitmapdata,self.list);
	self.x = LGlobal.width;
	if(name=="bird"){
		self.y = LGlobal.height - 135 - self.bitmapdata.height;
	}else{
		self.y = LGlobal.height - 35 - self.bitmapdata.height;
	}
	
}
Enemy.prototype.onframe = function(){
	var self = this;
	self.anime.onframe();//循环播放list图	
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
function enemyInit(){
	enemyLayer = new LSprite();
	backLayer.addChild(enemyLayer);
}
Enemy.add = function(){
	var random = Math.random();
	if(random > 0.6){
		enemy = new Enemy("enemy");
		bird = false;
	}else if(random > 0.2){
		enemy = new Enemy("gui");
		bird = false;
	}else{
		enemy = new Enemy("bird");
		bird = true;
	}
	enemyLayer.addChild(enemy);
}


Enemy.prototype.Run = function(){
	//敌物移动
	for(var key3 in enemyLayer.childList){
		var _child = enemyLayer.childList[key3];
		if(_child.x < -_child.getWidth()){
			enemyLayer.removeChild(_child);				
		}
		_child.x -=  EN_STEP;
		enemy.onframe();
	}	
}

Enemy.prototype.Hit = function(){
	for(var key3 in enemyLayer.childList){
		var _child = enemyLayer.childList[key3];
		if(_child.x < -_child.getWidth()){
			enemyLayer.removeChild(_child);				
		}
		if(bird == false){
			if(girl.x+40 >= _child.x && girl.x <= _child.x+5 && girl.y==LGlobal.height-70-girl.height){

			if(!girl.small){
					girl.Small();

			}else{
					bgClear();
					var layer = new GameOver();
					backLayer.addChild(layer);
				}
				// girl.Big();
		//		backLayer.removeEventListener(LEvent.ENTER_FRAME,onframe);
		//		return;
			}else{
				// enemyLayer.removeChild(_child);		
			}
		}
		
	}	
}