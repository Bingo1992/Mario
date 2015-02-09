init(200,"mylegend",800,400,main);
var loadingLayer,backLayer,ladderLayer;
var bitmap01,bitmap02,bitmap03,background; //背景层
var anime,mario,ladder;
var isMove = false;
var count = 0;//统计分数
var score = 0;
var isOnladder = false;//在阶梯上
var hx; //阶梯的横坐标
var canshoot;//是否射击炮弹
var addSpeed = 0;//添加阶梯的速度
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
	ladderInit();
	//添加玩家
	mario = new Player();
	mario.x = 200;
	mario.y = 300;
	backLayer.addChild(mario);
	addScore();
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
	mario.moveType = null;
	mario.isMove = false;
	
}

function mousedown(event){
	if(event.offsetX<=LGlobal.width*0.5){
		down({keycode:37});
	}else{
		down({keycode:39});
	}
}

function up(event){
	mario.moveType = null;
	mario.isMove = false;
}

function down(event){
//	if(mario.moveType)return;
	if(event.keyCode == 37 || event.keyCode == 65){
//		mario.moveType = "left";
		background.moveType = "left";
		
		
	}else if(event.keyCode == 39 || event.keyCode == 68){
//		mario.moveType = "right";
		background.moveType = "right";
		
	}
	if(event.keyCode == 38 ||event.keyCode == 87){
		//按一次向上键跳一次
		if(mario.moveType == "up")return;
		mario.moveType = "up";
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
	times.text = "0";
	backLayer.addChild(times);
	
}
//循环播放
function onframe(){
	LGlobal.setDebug(true);
	if(mario.isMove){
		mario.onframe();
		//执行100次onframe添加一个阶梯
		if(addSpeed -- < 0){
			addSpeed = 100;
			addladder();
		}
		mario.changeAction();
		
	}
	
}
	

	


