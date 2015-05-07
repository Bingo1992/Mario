var stonenum;
var stone;
function Stone(){
	base(this,LSprite,[]);
	var self = this;
	self.setView();
//	self.hitPoint();
}
Stone.prototype.setView = function(){};
Stone.prototype.hitRun = function(){};

function Stone01(){
	base(this,Stone,[]);
}
//将石阶显示在canvas上
Stone01.prototype.setView = function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["stone"],0,0,Math.ceil(Math.random()*5)+150,30));
	self.height = self.bitmap.getHeight();
	self.width = self.bitmap.getWidth();
	self.addChild(self.bitmap);
};
//Stone01.prototype.hitPoint = function(x,y){
//	var self = this;
//	if(x>self.x && x<self.x+self.width && y>self.y && y<self.y+self.height){		
//		return true;
//	}	
//	return false;
//};
//阶梯1
function Stone02(){
	base(this,Stone,[]);
	var self = this;
	this.hy = 8;
	self.ctrlIndex = 0;//控制地板状态
}
Stone02.prototype.setView = function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["stone2"],0,0,100,20));
	self.addChild(self.bitmap);
};
Stone02.prototype.hitRun = function(){
	var self = this;
	self.callParent("hitRun",arguments);
	self.ctrlIndex = 0;
	girl.y -= self.hy;
	self.child.speed = -4;
	self.child.isJump = true;
	self.child = null;
	self.bitmap.bitmapData.setCoordinate(100,0);
};
Stone02.prototype.onframe = function (){
	var self = this;
	self.callParent("onframe",arguments);
	self.ctrlIndex++;
	if(self.ctrlIndex == 20)self.bitmap.bitmapData.setCoordinate(0,0);
}
//阶梯2
function Stone03(){
	base(this,Stone,[]);
}
Stone03.prototype.setView = function(){
	var self = this;
	// self.graphics.drawRect(1,"#cccccc",[10,2,80,16]);
	// self.wheelLeft = new LBitmap(new LBitmapData(imgList["wheel"]));
	// self.addChild(self.wheelLeft);
	// self.wheelRight = new LBitmap(new LBitmapData(imgList["wheel"]));
	// self.wheelRight.x = 100 - self.wheelRight.getWidth()
	// self.addChild(self.wheelRight);
		var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["stone2"],0,0,100,20));
	self.addChild(self.bitmap);
};
Stone03.prototype.hitRun = function (){
	var self = this;
	self.callParent("hitRun",arguments);
	girl.x += (MOVE_STEP-1);
};
Stone03.prototype.onframe = function (){
	var self = this;
	self.callParent("onframe",arguments);
	self.wheelLeft.rotate += 2;
	self.wheelRight.rotate += 2;
}
//阶梯实例化
function stoneInit(){
	stoneLayer = new LSprite();
	backLayer.addChild(stoneLayer);
}
//添加阶梯
function addstone(){
	var astone;
	var index = Math.random() * 9;
	LGlobal.setDebug(true);
	
	if(index < 3 || index > 6){
		astone = new Stone01();
		astone.y = LGlobal.height - 70 - astone.height - 30*(Math.random()*2);
	}
	else{
		astone = new Stone03();
		astone.y = 340;

	}
	astone.x = LGlobal.width;	
	stonenum = parseInt(astone.width/50);
	Star.add(astone);
	stoneLayer.addChild(astone); 
}

