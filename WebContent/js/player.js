function Player(){
	base(this,LSprite,[]);
	var self = this;
	self.moveType = null;
	self.isMove = false;
	self.canshoot = false;
	self.small = true;
	self.shift = false;//地图中移动
	var list = LGlobal.divideCoordinate(384,384,4,4);
	var bitmapdata = new LBitmapData(imgList["girl"],0,0,96,96);

	self.oldwidth = bitmapdata.width;
	self.oldheight = bitmapdata.height;
	self.x = 200;
	self.anime = new LAnimation(self,bitmapdata,list);
}

Player.prototype.onframe = function(){
	var self = this;
	self.anime.onframe();//循环播放list图	

};

//控制主角动作
Player.prototype.changeAction = function(){
	var self = this;
	if(self.moveType == "shoot"){
		self.canshoot = true;
	}
	if(self.moveType == "jump"){
		self.y -= HEIGHT_STEP;
		self.anime.setAction(0, 0);
		self.isMove = false;
		trace(self.y);
		//阶梯
		for(var key1 in ladderLayer.childList){
			var ladderChild = ladderLayer.childList[key1];
			//如果阶梯在屏幕之外将其移除
			if(ladderChild.x < -ladderChild.getWidth()){
				ladderLayer.removeChild(ladderChild);				
			}
			//若处于梯子周围并且跳跃则将其置于阶梯上
			self._oldy = LGlobal.height-70-self.height;
			if(self.x+self.width >= ladderChild.x && self.x <= ladderChild.x+ladderChild.width && self.y<=240){
				self.y = ladderChild.y - ladderChild.height;
				ladderChild.hitRun();
			}else{
				setTimeout(function(){
					self.y=self._oldy;
				},500);
			}
		}
		if(key1 == null){
			setTimeout(function(){
				self.y=self._oldy;
			},500);
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
				x:self.x + 32,
				y:self.y +12,
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
	self.width = self.oldwidth * 0.3;
	self.height = self.oldheight * 0.3;
	self.y = LGlobal.height-70-self.height;
};

Player.prototype.Big = function(){
	var self = this;
	self.small = false;
	self.canshoot = true;
	self.scaleX = 1;
	self.scaleY = 1;
	self.width = self.oldwidth * 0.6;
	self.height = self.oldheight * 0.6;
	self.y = LGlobal.height-70-self.height;
};
//地图上的移动
Player.prototype.onmove = function(){
	var self = this;
	var ml = 32;
	switch(self.moveType){
	case "UP":
		self.y -= ml;
		break;
	case "LEFT":
		self.x -= ml;
		self.anime.setAction(0);
		break;
	case "RIGHT":
		self.x += ml;
		self.anime.setAction(1);
		break;
	case "DOWN":
		self.y += ml;
		break;
	}
};

