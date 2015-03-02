//init(200,"mylegend",800,400,main);
var loadingLayer,backLayer,ladderLayer;
var bitmap01,bitmap02,bitmap03,bitmap04,background; //背景层
//1,2,3背景  4蘑菇
var anime,mario,ladder;
var isMove = false;
var score = 0;//统计分数
var isOnladder = false;//在阶梯上
var islive = true;
var hx; //阶梯的横坐标
var canshoot;//是否射击炮弹
var shootx = 0;//炮口相对人物的位置
var addSpeed = 0;//添加阶梯的速度
var playerX = 20;//记录玩家的横坐标
var MOVE_STEP = 5,HEIGHT_STEP = 76;
var EN_STEP = 7;
var imgList = {};
var bitmapDataList = [];
var STEP = 48;
var imgData = new Array(
	{name:"background",path:"images/background.png"},
	{name:"player",path:"images/player.png"},
	{name:"bg",path:"images/bg.png"},
	{name:"pillar",path:"images/pillar.png"},
	{name:"bullet",path:"images/bullet01.png"},
	{name:"enemy",path:"images/enemy.png"},
	{name:"ico_sina",path:"./images/ico_sina.gif"},
	{name:"ico_qq",path:"./images/ico_qq.gif"},
	{name:"ico_facebook",path:"./images/ico_facebook.png"},
	{name:"ico_twitter",path:"./images/ico_twitter.png"}
);
//子弹类型数组
var bulletList = new Array(
		{startAngle:0,angle:20,step:10,speed:5,count:1},
		{startAngle:180,angle:20,step:50,speed:5,count:1}
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
	var title = new GameLogo();
	backLayer.addChild(title);
	//添加点击事件
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,gameStart);

}
//游戏画面开始
function gameStart(){
	//背景层清空
	backLayer.die();
	backLayer.removeAllChild();
	
	//添加背景图片
	background = new Background();
	backLayer.addChild(background);
	
	var effect = new LEffect();  
	backLayer.addChild(effect);  
	//下雪  
	effect.snowing();  
	
	//添加玩家
	mario = new Player();
	mario.x = 200;
	mario.y = 300;
	backLayer.addChild(mario);
	addScore();
	//添加子弹层
	bulletLayer = new LSprite();
	backLayer.addChild(bulletLayer);
	mario.setBullet(0);
	//添加障碍物
	enemy = new Enemy();
	background.addChild(enemy);
	//添加阶梯
	ladderInit();
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
	
	
	//键盘事件
	if(!LGlobal.canTouch){
		LEvent.addEventListener(window,LKeyboardEvent.KEY_DOWN,down);
		LEvent.addEventListener(window,LKeyboardEvent.KEY_UP,up);
	}
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

function addScore(){
	labelText = new LTextField();
	labelText.color = "#ffffff";
	labelText.font = "HG行書体";
	labelText.size = 14;
	labelText.x = 10;
	labelText.y = 20;
	labelText.text = "Distance:";
	backLayer.addChild(labelText);
	times = new LTextField();
	times.color = "#fff";
	times.font = "HG行書体";
	times.size = 14;
	times.x = 120;
	times.y = 20;
	if(times.text == null){
		times.text = "0";
	}else{
		times.text = localStorage.getItem("distance");
	}
	backLayer.addChild(times);
}
//循环播放
function onframe(){
	LGlobal.setDebug(true);
	var key= null;
	enemy.run();

	if(mario.isMove){
		mario.onframe();
		//执行100次onframe添加一个阶梯
		if(addSpeed -- < 0){
			addSpeed = 100;
			addladder();
		}	
	}

	mario.changeAction();	
	if(mario.x+40 >= enemy.x && mario.y==300){
		alert("u lost");
		backLayer.removeEventListener(LEvent.ENTER_FRAME,onframe);
		return;
	}
	else{
		enemy.anime.setAction(0,1);
	}
	
	for(key in bulletLayer.childList){
		bulletLayer.childList[key].onframe();
	}
	if(mario.moveType == "shoot"){
		mario.shoot();
	}
}
