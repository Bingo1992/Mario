function Player(){
	base(this,LSprite,[]);
	var self = this;
	self.moveType = null;
	self.isMove = false;
	self.canshoot = false;
	var list = LGlobal.divideCoordinate(256, 256, 4, 4);
	var bitmapdata = new LBitmapData(imgList["chara"],0,128,64,64);
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
	if(self.moveType == "up"){
		self.y -= HEIGHT_STEP;
		var key = null;
		for(key in ladderLayer.childList){
			var ladderChild = ladderLayer.childList[key];
			//如果阶梯在屏幕之外将其移除
			if(ladderChild.x < -ladderChild.getWidth()){
				ladderLayer.removeChild(ladderChild);
			}
			//若处于梯子周围并且跳跃则将其置于阶梯上
			if(self.x+45 > ladderChild.x && self.x < ladderChild.x+50 && self.y <= ladderChild.y){
				self.y = self.y + 6;    
				
			}else{
				setTimeout(function(){
					self.y = 300;
				},200);
			}
			
		}
	}
	if(self.moveType == "shoot"){
		self.canshoot = true;
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


