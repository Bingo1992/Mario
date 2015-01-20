init(200,"mylegend",800,400,main);
var loadingLayer,backLayer,barrierLayer;
var bitmap01,background; //背景层
var anime,hero,barrier;
var addSpeed = 0;//添加障碍物的速度
var playerX = 20;//记录玩家的横坐标
var MOVE_STEP = 3,HEIGHT_STEP = 78;
var imgList = {};
var imgData = new Array(
	{name:"background",path:"images/background.png"},
	{name:"player",path:"images/player.png"},
	{name:"chara",path:"images/chara.png"},
	{name:"pillar",path:"images/pillar.png"}
);

function main(){
	//	背景层初始化
	backLayer = new LSprite();
	backLayer.graphics.drawRect(1, "#000", [0,0,320,480], true, "#00E3E3");
	//	背景显示
	addChild(backLayer);	
	//	进度条读取层
	loadingLayer = new LoadingSample3();
	backLayer.addChild(loadingLayer);
	//利用LLoadManage类读取所有图片并显示进度条进程
	LLoadManage.load(
			imgData,
			function(progress){
				loadingLayer.setProgress(progress);
			},
			function(result){
				//取得图片读取结果
				imgList = result;
				backLayer.removeChild(loadingLayer);
				loadingLayer = null;
				gameInit();	
			}			
	);	
}

//读取完所有图片，进行游戏标题画面的初始化工作
function gameInit(){
	//	显示游戏标题
	var title = new LTextField();
	title.x = 50;
	title.y = 100;
	title.size = 30;
	title.color = "#fff";
	title.text = "超级马里奥";
//	backLayer.addChild(title);
	
	//	显示说明文字
	backLayer.graphics.drawRect(1, "#fff", [50,240,220,40]);
	var txtClick = new LTextField();
	txtClick.size = 18;
	txtClick.color = "#fff";
	txtClick.text = "点击页面开始游戏";
	txtClick.x = (LGlobal.width - txtClick.getWidth())/10;
	txtClick.y = 245;
//	backLayer.addChild(txtClick);
	//添加点击事件
//	backLayer.addEventListener(LMouseEvent.MOUSE_UP,gameStart);
	gameStart();

}
//游戏画面开始
function gameStart(){
	//背景层清空
	backLayer.die();
	backLayer.removeAllChild();
	//添加背景图片
//	var bitmap01 = new LBitmap(new LBitmapData(imgList["background"]));
//	backLayer.addChild(bitmap01);
	
	background = new Background();
	backLayer.addChild(background);

	//添加障碍物
	barrierInit();
	
	
	
	//添加玩家
	hero = new Player();
	hero.x = 20;
	hero.y = 300;
	backLayer.addChild(hero);
	
	
//	  loader = new LLoader();  
//    loader.addEventListener(LEvent.COMPLETE,loadBitmapdata);  
//    loader.load("images/player.png","bitmapData");  
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
	//键盘事件
	if(!LGlobal.canTouch){
		LEvent.addEventListener(window,LKeyboardEvent.KEY_DOWN,down);
		LEvent.addEventListener(window,LKeyboardEvent.KEY_UP,up);
	}
 
}



//玩家动作
//function loadBitmapdata(event){
//	 var bitmapdata = new LBitmapData(loader.content,0,0,50,60); 
//	 var bitmap02 = new LBitmap(bitmapdata);
//	 //将玩家添加到canvas
//	 bitmap02.x = 20;
//	 bitmap02.y = 300;
//	 backLayer.addChild(bitmap02);
//	 // 保存有坐标位置的二维数组
//    var list = LGlobal.divideCoordinate(150,120,2,3);
//	anime = new LAnimation(backLayer,bitmapdata,list);
//	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
//}

function mouseup(event){
	hero.moveType = null;
	hero.changeAction();
//	background.run();
	
}

function mousedown(event){
	if(event.offsetX<=LGlobal.width*0.5){
		down({keycode:37});
	}else{
		down({keycode:39});
	}
}

function up(event){
	hero.moveType = null;
	hero.changeAction();
	hero.isJump = false;
//	background.run();
}

function down(event){
//	if(hero.moveType)return;
	if(event.keyCode == 37){
		hero.moveType = "left";
//		background.moveType = "left";
		
		
	}else if(event.keyCode == 39){
		hero.moveType = "right";
//		background.moveType = "right";
		
	}
	if(event.keyCode == 38){
		//按一次向上键跳一次
		if(hero.moveType == "up")return;
		hero.moveType = "up";
	}
	hero.changeAction();
	background.run();
}

//循环播放
function onframe(){
	
	background.run();
	
	hero.changeAction();
	//玩家存在时一直调用循环播放事件
	if(hero.isJump){
		hero.onframe();
	}
	
}

