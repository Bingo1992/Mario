function Player(){
	base(this,LSprite,[]);
	var self = this;
	self.moveType = null;
	self.isMove = false;
	self.canshoot = false;
	self.small = true;
	var list = LGlobal.divideCoordinate(150,120,2,3);
	var bitmapdata = new LBitmapData(imgList["player"],0,0,50,60);
	self.anime = new LAnimation(self,bitmapdata,list);
}

Player.prototype.onframe = function(){
	var self = this;
//	if(self.moveType == "shoot"){
//		self.isMove = true;
//		self.shoot();
//	}
	self.anime.onframe();//循环播放list图	
};

//控制主角动作
Player.prototype.changeAction = function(){
	var self = this;
	if(self.moveType == "shoot"){
		self.canshoot = true;
	}
	
	if(mario.moveType == "up"){
		self.y -= HEIGHT_STEP;
		self.isMove = true;
		LGlobal.setDebug(true);
		//阶梯
		for(var key1 in ladderLayer.childList){
			var ladderChild = ladderLayer.childList[key1];
			//如果阶梯在屏幕之外将其移除
			if(ladderChild.x < -ladderChild.getWidth()){
				ladderLayer.removeChild(ladderChild);
			}
			//若处于梯子周围并且跳跃则将其置于阶梯上
				if(self.small){
					if(self.x+34 >= ladderChild.x && self.x <= ladderChild.x+50 && self.y<=240){
						self.y = 318 - ladderChild.height;
					}else{
						setTimeout(function(){
							if(self.small){
								self.y = 318;
							}
						},500);
					}
					
				}else if(self.x+50 >= ladderChild.x && self.x <= ladderChild.x+50 && self.y<=240){
					self.y = 300 - ladderChild.height;
				}else{
					setTimeout(function(){
						if(self.small){
							self.y = 300;
						}
					},500);
			}
		}
	}		
};

//射击
Player.prototype.setBullet = function(bulletIndex){
	this.bullet = bulletIndex;
};

Player.prototype.shoot = function(){
	var self = this;
	var bullet = bulletList[self.bullet];
	if(self.shoopIndex++ < bullet.step) return;
	self.shoopIndex = 0;
	//开发发射
	for(var i = 0; i < bullet.count; i++){
		var angle = i*bullet.angle + bullet.startAngle;
		xspeed = bullet.speed * Math.cos(angle+Math.PI / 180);
		var params = {
				x:self.x + 50,
				y:self.y +30,
				xspeed:xspeed,
				belong:self.belong
		};
	}	
	//子弹实例化
	obj = new Bullet(params);
	bulletLayer.addChild(obj);
};

Player.prototype.Small = function(){
	var self = this;
	self.small = true;
	self.canshoot = false;
	self.scaleX = 0.7;
	self.scaleY = 0.7;
	self.x = 200;
	self.y = 318;
};

Player.prototype.Big = function(){
	var self = this;
	self.small = false;
	self.canshoot = true;
	self.scaleX = 1;
	self.scaleY = 1;
	self.x = 200;
	self.y = 300;
}
