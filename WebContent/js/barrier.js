function Barrier(){
	base(this,LSprite,[]);
	var self = this;
	self.child = null;
	self.hy = 0;//控制游戏相对地板位置	
	self.setView();
}
Barrier.prototype.setView = function(){};
//障碍物1
function Barrier01(){
	base(this,Barrier,[]);
}

//将障碍物显示在canvas上
Barrier01.prototype.setView = function(){
	var self = this;
	self.bitmap02 = new LBitmap(new LBitmapData(imgList["pillar"]));
	self.addChild(self.bitmap02);
};

//添加障碍物
function addBarrier(){
	var aBarrier;
	aBarrier = new Barrier01();
	aBarrier.x = Math.random()*800;
	aBarrier.y = 285;
	barrierLayer.addChild(aBarrier);
}

//障碍物实例化
function barrierInit(){
	barrierLayer = new LSprite();
	backLayer.addChild(barrierLayer);
	
	setInterval(function(){
		addBarrier();
	},10000);
}

