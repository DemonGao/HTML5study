//初始相位，并创建一个900x420的游戏画布
//第一，第二个参数，canvas元素的宽和高，相当于画布的大小
//第三个参数：为phaser.canvas/phaser.webgl/pkaser.auto(推荐使用)
//第四个参数：为一个字符串，为你想插入相位器创建画布的元素
//第一步：设置动画的画布
var game = new Phaser.Game(900,420,Phaser.AUTO,'game_div')
//GameState是quick-coco2d-x中特有一个用户信息存储类
var game_state = {};
//计算跳跃的次数
var x = 2;
var choose = 0;
//创建一个新的“main”状态，将包含游戏
game_state.main = function(){};
//prototype原型
game_state.main.prototype = {
//	首先，调用函数，加载资源
	preload:function(){
//      改变游戏的背景图
		this.game.load.image('bg','img/bkg.png');
//		加载小狗
		this.game.load.image('dogLeft','img/dogleft.png');
		this.game.load.image('dogRight','img/dog.png');
//		加直线
		this.game.load.image('line','img/line.PNG');
//		添加障碍物master
		this.game.load.image('pipe','img/master.png');
//		添加障碍物wood
		this.game.load.image('ms2','img/wood.png');
		
		//加载音乐
		this.game.load.audio('failed','mp3/failed.wav');
		this.game.load.audio('game','mp3/game.mp3');
		this.game.load.audio('jump','mp3/jumpp.mp3');
	},
//	preload后调用函数：设置游戏
	create:function(){
		this.game.add.sprite(0,0,'bg');
//		在屏幕上显示狗
		this.dog = this.game.add.sprite(100,255,'dogRight');
//		在屏幕上显示直线
		this.line = this.game.add.sprite(0,313,'line');
//		给狗添加重力
		this.dog.body.gravity.y = 1000;
		var right_key = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		right_key.onDown.add(this.right,this);
		var left_key = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		left_key.onDown.add(this.left,this);
//		点击空格键，调用jump函数
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump,this);
//		包含20个障碍物pipe的组
		this.pipes = game.add.group();
		this.pipes.createMultiple(20,'pipe');
//		包含20个障碍物ms2的组
		this.pipes1 = game.add.group();
		this.pipes1.createMultiple(20,'ms2');
//		定时器，每1.5s调用一次
		this.timer = this.game.time.events.loop(1500,this.add_row_of_pipes,this);
		
//		在屏幕左侧添加一个积分文本框
		this.score = 0;
		
		var style = {font:"30px Arial",fill:"#fff"};
		//坐标
		this.label_score = this.game.add.text(20,20,"0",style);
		
		//游戏的音效 sound起的名字
		this.restart_game_sound=this.game.add.audio('failed');
		this.jump_sound=this.game.add.audio('jump');
		this.game_sound=this.game.add.audio('game');
		
		this.game_sound.play();
	},
//	向右移动的函数
	right:function(){
		this.dog.loadTexture('dogRight',0);
		this.dog.body.velocity.x = 150;
	},
	left:function(){
		this.dog.loadTexture('dogLeft',0);
		this.dog.body.velocity.x = -150;
	},
//	点击空格
	jump:function(){
//		判断是否有跳跃机会
		if(x > 0)
		{
			this.jump_sound.play();
//			this.game_sound.stop();
			this.dog.body.velocity.y = -320;
			x--;
		}
//		this.game_sound.play();
	},
//	落到木板上
	land:function()
	{
		this.dog.body.velocity.y = -150;
		x = 2;
	},
//  执行碰撞检测
	update:function(){
		if(this.dog.inWorld ==false)
		{
			this.restart_game();
		}
//		添加场景	
		this.game.physics.overlap(this.dog,this.line,this.land,null,this);
//		添加障碍物，狗和障碍物的碰撞
		this.game.physics.overlap(this.dog,this.pipes,this.restart_game,null,this);
		this.game.physics.overlap(this.dog,this.pipes1,this.restart_game,null,this);
	},
	//实现碰撞后的处理
	restart_game:function(){
//		alert(123);
//		删除计时器
		this.game.time.events.remove(this.timer);
		this.game_sound.stop();
		this.restart_game_sound.play();
		if(this.score<10)
		{
			alert("分数:"+this.score+"你个笨蛋!");
		}
		else if(this.score<20)
		{
			alert("分数:"+this.score+"还不错!!");
		}else{
			alert("分数:"+this.score+"这种智商的游戏,你都玩的这么High!在下佩服");
		}
		this.game.state.start('main');
	},
//	将障碍物添加到桌面上
	add_one_pipe:function(x,y)
	{
		if(choose == 0)
		{
//			获取障碍物到画布上
			var pipe = this.pipes.getFirstDead();
//			获取一个新的障碍物到画布上
			pipe.reset(x,y);
//			给障碍物添加移动速度
			pipe.body.velocity.x = -200;
//			障碍物移出屏幕，要自动消失
			pipe.outOfBoundsKill = true;
			choose = 1;
		}
		else{
			var pipe = this.pipes1.getFirstDead();
			pipe.reset(x,y);
			pipe.body.velocity.x = -200;
			pipe.outOfBoundsKill = true;
			choose = 0;
		}
	},
//	先显示6个障碍物
	add_row_of_pipes:function()
	{
		var hole = Math.floor(Math.random()*3);
		for(var i = 0;i < 3;i++)
		{
			if(i !=hole && i != hole + 1)
			{
				this.add_one_pipe((i + 1)*800,280);
			}
		}
		this.score +=1;
		this.label_score.content = this.score;
	}
}
//	调用方法，显示背景
	game.state.add('main',game_state.main);
	game.state.start('main');