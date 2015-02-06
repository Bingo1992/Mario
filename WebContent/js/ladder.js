function Ladder(){
	base(this,LSprite,[]);
	var self = this;
	self.child = null;
	self.hx = 0;//控制游戏相对地板位置	
	self.setView();
}

//设定不同障碍物
Ladder.prototype.setView = function(){};

//障碍物1
function Ladder01(){
	base(this,Ladder,[]);
}

//将障碍物显示在canvas上
Ladder01.prototype.setView = function(){
	var self = this;
	self.bitmap02 = new LBitmap(new LBitmapData(imgList["pillar"]));
	self.addChild(self.bitmap02);
};

//添加障碍物
function addladder(){
	var aladder;
	aladder = new Ladder01();
	aladder.x = Math.random()*800;
	aladder.y = 285;
	ladderLayer.addChild(aladder);
}

//消灭障碍物
function removeladder(){
//	ladderLayer.removeChild(aladder);
}

//障碍物实例化
function ladderInit(){
	ladderLayer = new LSprite();
	backLayer.addChild(ladderLayer);
	
//	setInterval(function(){
//		addladder();
//	},10000);
	
	
}

Ladder.prototype.onframe = function(){
	var self = this;

	if(background.moveType == "left"){
		self.x += 2*MOVE_STEP;
		if(self.child){
			self.x += 2*MOVE_STEP;
		}
	}else if(background.moveType == "right"){
		self.x -= 2*MOVE_STEP;
		if(self.child){
			self.x -= 2*MOVE_STEP;
		}
	}
};

