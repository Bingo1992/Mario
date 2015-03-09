var loadingLayer,backLayer,ladderLayer;
var bitmap01,bitmap02,bitmap03,bitmap04,background; //背景层
//1,2,3背景  4蘑菇
var anime,mario,ladder;
var isMove = false;
var small = true;//mario是否处于小的状态
var score = 0;//统计分数
var isOnladder = false;//在阶梯上
var islive = true;
var hx; //阶梯的横坐标
var canshoot;//是否射击炮弹
var shootx = 0;//炮口相对人物的位置
var addSpeed = 0;//添加阶梯的速度
var coinSpeed = 0;//添加硬币的速度
var MOVE_STEP = 6,HEIGHT_STEP = 100;//mario向右走的宽度和向上跳的高度
var EN_STEP = 9;//蘑菇速度
var imgList = {};
var coin = {};
var bitmapDataList = [];
var STEP = 48;
var coinlen = 0;
var pass = 1;//关卡
var imgData = new Array(
	{name:"background",path:"images/background.png"},
	{name:"player",path:"images/player.png"},
	{name:"mario",path:"images/chara.png"},
	{name:"bg",path:"images/mario.jpg"},
	{name:"map",path:"images/map.png"},
	{name:"pillar",path:"images/pillar_s.png"},
	{name:"floor1",path:"images/floor1.png"},
	{name:"floor2",path:"images/floor2.png"},
	{name:"bullet",path:"images/bullet.png"},
	{name:"enemy",path:"images/enemy.png"},
	{name:"coin",path:"images/coin.png"}
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
//	var title = new GameLogo();
//	backLayer.addChild(title);
//	//添加点击事件
//	backLayer.addEventListener(LMouseEvent.MOUSE_UP,gameStart);
//	gameStart();
	addMap();
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
	
	//下雪  
	var effect = new LEffect();  
	backLayer.addChild(effect);  
	effect.snowing();  
	
	//阶梯实例化
	ladderInit();
	//硬币实例化
	coinInit();
	//添加障碍物
	enemy = new Enemy();
	background.addChild(enemy);
	//添加玩家
	mario = new Player();
	mario.Small();
	backLayer.addChild(mario);	
	//添加分数
	addScore();	
	//添加子弹层
	bulletLayer = new LSprite();
	backLayer.addChild(bulletLayer);
	mario.setBullet(0);
	
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
	mario.moveType = null;
	mario.isMove = false;
}

function mousedown(event){
	if(event.offsetX<=LGlobal.width*0.5){
		down({keycode:37});
	}else if(event.offsetX>LGlobal.width*0.5){
		down({keycode:39});
	}else if(event.offsetY>=LGlobal.height*0.5){
		down({keycode:38});
	}
}

function up(event){
	background.moveType = null;
	mario.moveType = null;
	mario.isMove = false;
}

function down(event){
	if(event.keyCode == 37){
		background.moveType = "left";
		
	}else if(event.keyCode == 39){
		background.moveType = "right";
	}
	if(event.keyCode == 38){
		//按一次向上键跳一次
		if(mario.moveType == "up")return;
		mario.moveType = "up";
	}
	if(event.keyCode == 65){
		//按一次A发射子弹
		if(mario.moveType == "shoot")return;
		mario.moveType = "shoot";
	}
	background.run();
	
}

//循环播放
function onframe(){
	LGlobal.setDebug(true);
	enemy.run();

	if(mario.isMove){
		mario.onframe();
		//执行100次onframe添加一个阶梯
		if(addSpeed -- < 0){
			addSpeed = 20;
			addladder();
		}	
		if(coinSpeed -- < 0){
			coinSpeed = 80;
			addCoin();
		}
	}

	mario.changeAction();	
	
	if(mario.x+40 >= enemy.x && mario.x <= enemy.x+30 && mario.y==LGlobal.height-35-mario.height){
		mario.Big();
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
	if(mario.moveType == "shoot"){
		mario.shoot();
	}
}
