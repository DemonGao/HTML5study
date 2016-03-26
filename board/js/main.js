var game = new Phaser.Game(288,512,Phaser.AUTO,'game_div')

var game_state = {};
var choose = 0;
//创建一个新的“main”状态，将包含游戏
game_state.main = function(){};
//prototype原型
game_state.main.prototype = {
//	首先，调用函数，加载资源
	preload:function(){
		this.game.load.image('bg','img/bg_day.png');
		//加载鸟
		this.game.load.image('bird0_0','img/bird0_0.png');
		this.game.load.image('bird0_1','img/bird0_1.png');
		this.game.load.image('bird0_2','img/bird0_2.png');
		
		//加载障碍
		this.game.load.image('pipe_down','img/pipe_down.png');
		this.game.load.image('pipe_up','img/pipe_up.png');
		
		//加载音乐
		this.game.load.audio('failed','mp3/failed.wav');
		this.game.load.audio('game','mp3/game.mp3');
		this.game.load.audio('jump','mp3/jumpp.mp3');
	},
//	preload后调用函数：设置游戏
	create:function(){
		this.game.add.sprite(0,0,'bg');
		this.bird=this.game.add.sprite(50,256,'bird0_0');
		
		//设置重力
		this.bird.body.gravity.y=1000;
		
		//点击空格键，调用jump函数
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump,this);
		
        //包含40个障碍物pipe_down的组
		this.pipes_down = game.add.group();
		this.pipes_down.createMultiple(40,'pipe_down');
		//包含40个障碍物pipe_up的组
		this.pipes_up = game.add.group();
		this.pipes_up.createMultiple(40,'pipe_up');
		
		//		定时器，每1.5s调用一次
		this.timer = this.game.time.events.loop(700,this.add_row_of_pipes,this);
		//		在屏幕左侧添加一个积分文本框
		this.score = 0;
		var style = {font:"30px Arial",fill:"#000"};
		//坐标
		this.label_score = this.game.add.text(135,20,"0",style);
		
		
		//游戏的音效 sound起的名字
		this.restart_game_sound=this.game.add.audio('failed');
		this.jump_sound=this.game.add.audio('jump');
		this.game_sound=this.game.add.audio('game');
		
		this.game_sound.play();
		
	},
	//	点击空格
	jump:function(){
		this.jump_sound.play();
		this.bird.body.velocity.y = -320;
	},
	//  执行碰撞检测
	update:function(){
		if(this.bird.inWorld ==false)
		{
			this.restart_game();
		}
		//		添加障碍物，狗和障碍物的碰撞
		this.game.physics.overlap(this.bird,this.pipes_up,this.restart_game,null,this);
		this.game.physics.overlap(this.bird,this.pipes_down,this.restart_game,null,this);
		
	},
	restart_game:function(){
		//		删除计时器
		this.game.time.events.remove(this.timer);
		this.game_sound.stop();
		this.restart_game_sound.play();
		if(this.score<10)
		{
			alert("分数:"+this.score+"您的水平已经超过了全国0.01%的玩家!");
		}
		else if(this.score<20)
		{
			alert("分数:"+this.score+"您的水平已经超过了全国5%的玩家!");
		}else if(this.score<40){
			alert("分数:"+this.score+"您的水平已经超过了全国99%的玩家!");
		}
		this.game.state.start('main');
	},
	add_row_of_pipes:function(){
//		var hole = Math.floor(Math.random()*2);
		var pipe_down_height=Math.floor(Math.random()*220+100);
		var pipe_up_height=Math.floor(Math.random()*220+100);
		if(choose==0)
		{
			if(pipe_down_height>300)
			{
				pipe_down_height-=50;
			}
			this.add_one_pipe(288,-pipe_down_height);
		}else{
			if(pipe_down_height<20)
			{
				pipe_down_height+=50;
			}
			this.add_one_pipe(288,512-pipe_up_height);
			

		}	
			
		this.score +=1;
		this.label_score.content = this.score;
	},
	add_one_pipe:function(x,y)
	{
		if(choose == 0)
		{
//			获取障碍物到画布上
			var pipe = this.pipes_down.getFirstDead();
//			获取一个新的障碍物到画布上
			pipe.reset(x,y);
//			给障碍物添加移动速度
			pipe.body.velocity.x = -200;
//			障碍物移出屏幕，要自动消失
			pipe.outOfBoundsKill = true;
			choose = 1;
		}
		else{
			var pipe = this.pipes_up.getFirstDead();
			pipe.reset(x,y);
			pipe.body.velocity.x = -200;
			pipe.outOfBoundsKill = true;
			choose = 0;
		}
	},
}
//	调用方法，显示背景
	game.state.add('main',game_state.main);
	game.state.start('main');