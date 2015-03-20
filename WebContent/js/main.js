var loadingLayer,backLayer,stoneLayer,starLayer;
var bitmap01,bitmap02,bitmap03,bitmap04,background; //背景层
var direction;
var isMove = false;
var small = true;//girl是否处于小的状态
var canshoot;//是否射击炮弹
var addSpeed = 0;//添加阶梯的速度
var coinSpeed = 0;//添加硬币的速度
var MOVE_STEP = 6,HEIGHT_STEP = 100;//girl向右走的宽度和向上跳的高度
var EN_STEP = 9;//蘑菇速度
var imgList = {};
var coin = {};
var bitmapDataList = [];
var STEP = 48;
var coinlen = 0;
var pass = 1;//关卡
var keylock = false;//锁定按键
var keyCtrl = new Array();
var keyList = [{keyCode:0,time:0},{keyCode:0,time:0},{keyCode:0,time:0}];
var imgData = new Array(
	{name:"background",path:"images/background.png"},
	{name:"girl",path:"images/girl2.png"},
	{name:"bg",path:"images/mario.jpg"},
	{name:"map",path:"images/map.png"},
	{name:"stone",path:"images/stone.png"},
	{name:"floor1",path:"images/floor1.png"},
	{name:"floor2",path:"images/floor2.png"},
	{name:"bullet",path:"images/bullet.png"},
	{name:"enemy",path:"images/enemy.png"},
	{name:"gui",path:"images/gui.png"},
	{name:"bird",path:"images/bird.png"},
	{name:"coin",path:"images/coin.png"},
	{name:"star",path:"images/star.png"}
);
var KEY = {LEFT:65,RIGHT:68,JUMP:75,SHOOT:74,L:37,R:39,U:38,D:40};
function main(){
	//	背景层初始化
	backLayer = new LSprite();
	backLayer.graphics.drawRect(1, "#000", [0,0,800,400], true, "#00E3E3");
	//	背景显示
	addChild(backLayer);	
	//	进度条读取层
	loadingLayer = new LoadingSample3(100);
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
//	var title = new GameLogo();
//	backLayer.addChild(title);
//	//添加点击事件
//	backLayer.addEventListener(LMouseEvent.MOUSE_UP,gameStart);
	gameStart();
//	addMap();
}

//添加地图，表示关数
function addMap(){  	
	bgClear();
    map = new LTileMap(mapData,imgList["map"],36,36);  
    backLayer.addChild(map); 
//    backLayer.addEventListener(LMouseEvent.MOUSE_UP,gameStart);
} 

//游戏画面开始
function gameStart(){
	bgClear();
	//添加背景图片
	background = new Background();
	backLayer.addChild(background);
	startTime = new Date().getTime();
	//下雪  
	var effect = new LEffect();  
	backLayer.addChild(effect);  
	effect.snowing();  
	
	//阶梯实例化
	stoneInit();

	starInit();
	//添加障碍物
	enemy = new Enemy("enemy");
	background.addChild(enemy);

	//添加玩家
	girl = new Player();
	girl.Small();
	backLayer.addChild(girl);	
	//添加分数
	addScore();	
	//添加子弹层
	bulletLayer = new LSprite();
	backLayer.addChild(bulletLayer);
	girl.setBullet(0);
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
	
	//键盘事件
	if(!LGlobal.canTouch){
		LEvent.addEventListener(window,LKeyboardEvent.KEY_DOWN,down);
		LEvent.addEventListener(window,LKeyboardEvent.KEY_UP,up);
	}
}

//清空背景层
function bgClear(){
	backLayer.die();
	backLayer.removeAllChild();
}

function mouseup(event){
	background.moveType = null;
	girl.moveType = null;
	girl.isMove = false;
}

function mousedown(event){
	if(event.offsetX<=LGlobal.width*0.5){
		down({keycode:65});
	}else if(event.offsetX>LGlobal.width*0.5){
		down({keycode:68});
	}else if(event.offsetY>=LGlobal.height*0.5){
		down({keycode:75});
	}
}

function up(event){
	keyCtrl[event.keyCode] = false;
	background.moveType = null;
	girl.moveType = null;
	girl.isMove = false;
}


function down(event){
//	if(keylock || keyCtrl[event.keyCode])return;
	var keyThis = {keyCode:event.keyCode,time:(new Date()).getTime()};
	var keyLast01 = keyList[0];
	var keyLast02 = keyList[1];
	keyCtrl[event.keyCode] = true;
	keyList.unshift(keyThis);
	keyList.pop();
	switch(event.keyCode){
	case KEY.LEFT:
		if(keyLast01.keyCode == KEY.JUMP &&  keyThis.time - keyLast01.time < 500){
			background.moveType = "left";
			girl.moveType = "jump";
		}else{
			background.moveType = "left";
		}
		 break;
	case KEY.RIGHT:
		if(keyLast01.keyCode == KEY.JUMP &&  keyThis.time - keyLast01.time < 500){
			background.moveType = "right";
			girl.moveType = "jump";
		}else{
			background.moveType = "right";
		}
		break;
	case KEY.JUMP:
		if(keyLast01.keyCode == KEY.RIGHT &&  keyThis.time - keyLast01.time < 500){
			background.moveType = "right";
			girl.moveType = "jump";
		}else if(keyLast01.keyCode == KEY.LEFT &&  keyThis.time - keyLast01.time < 500){
			background.moveType = "left";
			girl.moveType = "jump";
		}else if(keyLast01.keyCode == KEY.JUMP && keyLast02.keyCode == KEY.JUMP && keyThis.time - keyLast02.time < 200){
			girl.moveType = "power_jump";
		}else{
			girl.moveType = "jump";
		}
		break;
	case KEY.U:
		 player.moveType = "UP";
		 break;
	case KEY.D:
		 player.moveType = "DOWN";
		 break;
	case KEY.L:
		 player.moveType = "LEFT";
		 break;
	case KEY.R:
		 player.moveType = "RIGHT";
		 break;
	}
//	if(event.keyCode == 37){
//		background.moveType = "left";
//		
//	}else if(event.keyCode == 39){
//		background.moveType = "right";
//	}
//	if(event.keyCode == 38){
//		//按一次向上键跳一次
//		if(girl.moveType == "up")return;
//		girl.moveType = "up";
//	}
//	if(event.keyCode == 65){
//		//按一次A发射子弹
//		if(girl.moveType == "shoot")return;
//		girl.moveType = "shoot";
//	}
	background.run();
	girl.changeAction();
}

//循环播放
function onframe(){
	LGlobal.setDebug(true);
	enemy.run();
	if(girl.isMove){
		girl.onframe();
		//执行100次onframe添加一个阶梯
		if(addSpeed -- < 0){
			addSpeed = 8;
			addstone();
		}
	}
	
	var str = (new Date().getTime() - startTime) + "";
	times.text = str.substr(0,str.length - 3) + ":" + str.substr(str.length - 3,1);
	
	girl.changeAction();	
	
	if(girl.x+40 >= enemy.x && girl.x <= enemy.x+30 && girl.y==LGlobal.height-70-girl.height){
		girl.Big();
//		backLayer.removeEventListener(LEvent.ENTER_FRAME,onframe);
//		return;
	}
	
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
	if(girl.moveType == "shoot"){
		girl.shoot();
	}
}
