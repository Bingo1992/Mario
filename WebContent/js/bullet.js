 //子弹类型数组
var bulletList = new Array(
		{startAngle:0,angle:20,step:10,speed:5,count:1},
		{startAngle:180,angle:20,step:50,speed:5,count:1}
);

function Bullet(params){
	base(this,LSprite,[]);
	var self = this;
	self.x = params.x;
	self.y = params.y;
	self.xspeed = params.xspeed;
	self.belong = params.belong;
	self.iside = false;
	self.bitmap = new LBitmap(new LBitmapData(imgList["bullet"]));
	self.addChild(self.bitmap);
}

Bullet.prototype.onframe = function(){
	var self = this;
	//根据人物的动作判断向左还是向右
	var action = girl.anime.getAction();
	switch(action[0]){
		case 0: break;
		case 1: break;
		case 2: self.x += self.xspeed; break;
		case 3: break;
	}
	 self.x += self.xspeed;
	if(self.x < 0 || self.x > LGlobal.width || self.y < 0 || self.y > LGlobal.height){
		//从屏幕移除
		bulletLayer.removeChild(self);
	}
	self.checkHit();
};
//子弹与敌物碰撞
Bullet.prototype.checkHit = function(){
	var self = this;
	for(var key in enemyLayer.childList){
		if(LGlobal.hitTestArc(self,enemyLayer.childList[key])){
			bulletLayer.removeChild(self);
			enemyLayer.removeChild(enemyLayer.childList[key]);
		}
	}
}
function removeBullet(){
	//子弹
	for(var key in bulletLayer.childList){
		bulletLayer.childList[key].onframe();
		//移除飞出屏幕的子弹
		if(  
            bulletLayer.childList[key].x > LGlobal.width  
            || bulletLayer.childList[key].x < 0  
            || bulletLayer.childList[key].y < 0  
            || bulletLayer.childList[key].y > LGlobal.height  
        ){  
            bulletLayer.removeChild(bulletLayer.childList[key]);  
		}  
	}
}