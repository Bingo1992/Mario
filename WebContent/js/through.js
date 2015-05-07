var backLayer,fireworksLayer;
var back;
//烟花颜色集
var colorArray = new Array(
	"yellow",
	"orangered",
	"red",
	"pink"
);
//加入烟花最大数量
var maxFrame = 4;
//当前加入烟花数量
var frameIndex = 0;
var sound;
function GamePass(){
	base(this,LSprite,[]);
	var self = this;
	fireworksLayer = new LSprite();
	backLayer.addChild(fireworksLayer);
	fireworksLayer.graphics.drawRect(1,"#000",[0,0,800,400],true,"#000");
	labelText4 = new LTextField();
	labelText4.color = "#0f0";
	labelText4.font = "HG行書体";
	labelText4.size = 30;
	labelText4.x = 200;
	labelText4.y = 200;
	labelText4.text = "太棒了，您已通关！";
	fireworksLayer.addChild(labelText4);
	//加入时间轴事件
	fireworksLayer.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
function addFireworks(){
		var toY = Math.floor(Math.random() * (-350 + 250) - 250);
		
		var colorIndex = Math.floor(Math.random() * 4)
		//画一个黄色矩形作为一颗升天的烟花
		var fireworks = new LSprite();
		fireworks.x = Math.floor(Math.random() * (480 - 20) + 20);
		fireworks.y = 500;
		fireworks.graphics.drawRect(0,"",[0,0,10,10],true,colorArray[colorIndex]);
		
		//为升起的烟花添加一个拖尾
		var smearing = new Smearing(fireworks,50);
		//移动烟花
		smearing.to(1,{
			x: 0,
			y: toY,//-300
			onComplete:function(){
				//添加扩散开的烟花
				var spreading = new Fireworks(fireworks.x,fireworks.y+toY,colorArray[colorIndex]);
				fireworksLayer.addChild(spreading);
			}
		});
		fireworksLayer.addChild(smearing);
	}

GamePass.prototype.onframe = function(){
		//加入烟花
	if(frameIndex < maxFrame){
		frameIndex ++;
		addFireworks();
	}
	
	//移除烟花
	for(var key in fireworksLayer.childList){
		if(fireworksLayer.childList[key].mode == "complete"){
			//通过缓动更改烟花透明度
			LTweenLite.to(fireworksLayer.childList[key],0.3,{
				alpha:0,
				onComplete:function(o){
					//移除对象
					fireworksLayer.removeChild(o);
					//如果界面上没有烟花，将已经加入数量设为0
					if(fireworksLayer.childList.length == 0){
						frameIndex = 0;
					}
				}
			});
		}
	}
}