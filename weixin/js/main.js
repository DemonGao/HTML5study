//jQuery
//是一个js库,他为我们封装了许多繁琐而常用的功能
//只需要调用它内部的方法
//就能轻松炫酷的实现炫酷的效果

//Jquery基本语法  $(selecter).action();
//1.使用美元符号$定义Jquery函数:
//2.selecter: 为选择器, Jquery 完全兼容css选择器
//id选择器 标签选择器 类型选择器 派生选择器
//action() :为要执行的函数

var nowpage =0;
$(document).ready(function(e){
	//获取屏幕的宽和高
	var width=window.innerWidth;
	var height=window.innerHeight;

//	最外层盒子的宽高
//	$(".content").css("width",width);
//	$(".content").css("height",height*4);
	$(".content").width(width);
	$(".content").height(height*4);
	
//	每一页的宽高
	$(".page").width(width);
	$(".page").height(height);
	
//	触控监听
	$(".content").swipe({
//		event: 事件
//		direction: 方向(参数),它是我们滑动屏幕的方向
//			取值可以为:up/down/left/right
//		distance:距离
//		duration:时间 单位:毫秒
//		fingerCount:个数
		swipe:function(event,direction,distance,duration,fingerCount){
			if(direction =="up")
			{//如果方向为上
				nowpage = nowpage +1;
				
			}else if(direction =="down")
			{
				nowpage = nowpage -1;
				
			}
			if(nowpage<0)
			{
				nowpage=0;
			}
			if(nowpage>3)
			{
				nowpage=3;
			}
//			动画:移动content盒子的位置
			$(".content").animate({
//				+为字符串拼接
				top:nowpage*-100+"%"
//				complete执行完后,执行animations()函数
			},{duration:500,complete:animations()})	
			
		}
	});
	
	//第一页的动画效果 楼的淡入 fadeIn 淡出fadeOut
	$(".page1-building").fadeIn(2000,function(){

		$(".page1-person").animate({width:'70%'},{duration:2000})
	});
	
});
function animations(){
	//第二页动画
	if(nowpage==1)
	{
		$(".page2-bg").fadeIn(2000,function(){
			$(".page2-text1").fadeIn(1000,function(){
				$(".page2-text2").fadeIn(1000,function(){
					$(".page2-star").fadeIn(1000);
				});
			});
		})
	}
	if(nowpage==2){
		$(".page3-early").fadeIn(2000);
		$(".page3-last").fadeIn(3000);
//		车跑人追
		$(".page3-bus").animate({left:'-100%'},{duration:2000});
		$(".page3-me").animate({right:'50%'},{duration:3000,complete:function(){
//			场景一淡出
			$(".page3-early").fadeOut("slow",function(){
				dispaly:none
			});
			$(".page3-last").fadeOut("slow",function(){
				display:none
			});
			$(".page3-station").fadeOut("slow");
			$(".page3-me").fadeOut("slow",function(){
				$(".page3-wall").fadeIn("slow");
				$(".page3-cry").fadeIn("slow",function(){
						$(".page3-space").animate({width:'35%'},{duration:1000,complete:function(){
							$(".page3-where").animate({width:'50%'},"slow");
						}})
					});
			});
		}});
		
	}
	
	
}
function start(img){
	img.src="img/lightOn.png";
	$(".page4-lobg").fadeOut("slow");
	$(".page4-ct").fadeOut("slow");
	$(".page4-click").fadeOut("slow",function(){
		$(".page4-wky").fadeIn("slow",function(){
			$(".page4-lobg2").fadeIn("slow");
		});
	});
}
//音乐控制
function playPause(img){
	var player=document.getElementById("musicPlayer");
	
	if(player.paused)
	{//如果在暂停状态
		
		//播放音乐 播放的方法 audio自带的方法
		player.play();
		img.src="img/musicBtn.png";
	}else{
		//暂停
		player.pause();
		img.src="img/musicBtnOff.png";
	}
}
function clickup(){
	if(nowpage>2)
	{
		nowpage=3;
	}else{
		nowpage++;
	}
//			动画:移动content盒子的位置
	$(".content").animate({
//		+为字符串拼接
		top:nowpage*-100+"%"
//		complete执行完后,执行animations()函数
	},{duration:500,complete:animations()})	
			
}
