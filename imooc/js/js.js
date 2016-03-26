/*
 * 最普通的写法
window.onload=function(){
	var music=document.getElementById("music");
	var audio=document.getElementsByTagName("audio")[0];//获取的是数组
	
	music.onclick = function(){
		audio.pause();
	};
};

*/
/*defer的作用 可以不用写window.onload=function(){}*/
var page1=document.getElementById("page1");
var page2=document.getElementById("page2");
var page3=document.getElementById("page3");

var music=document.getElementById("music");
var audio=document.getElementsByTagName("audio")[0];//获取的是数组

//当音乐播放停止时候,自动停止光盘效果
audio.addEventListener("ended",function(event){
	music.setAttribute("class","");
//	music.style.animationPlayState="paused";
},false);
music.onclick = function(){
	if(audio.paused)
	{
		audio.play();
		this.setAttribute("class","play");
//		this.style.animationPlayState="running";//兼容性问题较差 iphone6s
	}else{
		audio.pause();
		this.setAttribute("class","");
//		this.style.animationPlayState="paused";
	}
	
};
//添加手机触摸控制声音的监听事件
music.addEventListener("touchstart",function(event){
	if(audio.paused)
	{
		audio.play();
		this.setAttribute("class","play");
//		this.style.animationPlayState="running";//兼容性问题较差 iphone6s以上才支持
	}else{
		audio.pause();
		this.setAttribute("class","");
//		this.style.animationPlayState="paused";
	}
},false);
//点击屏幕,开启好运2016
page1.addEventListener("touchstart",function(event){
	page1.style.display="none";
	page2.style.display="block";
	page3.style.display="block";
	page3.style.top="100%";
	
	setTimeout(function(){
		page2.setAttribute("class","page fadeOut");
		page3.setAttribute("class","page fadeIn");
	},5500);
},false);