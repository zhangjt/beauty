;var loadImg={
	loadImgSrc:function(){
		var imgs=document.getElementsByTagName('img');
		var srcs=[];
		if (imgs) {
			for (var i = 0; i < imgs.length; i++) {
				var img=imgs[i],src=img.getAttribute('src');
				if (src) {
					srcs.push(src);
				};
			};
		};
		this.checkLoadSuccess(srcs);	
	},
	checkLoadSuccess:function(srcs){
		var self=this;
		var len=srcs.length;
		var curNum=0;
		if (len) {
			
			for (var i = 0; i < len; i++) {
				//每次循环都新建img节点,后赋值当前新节点src值;img.onload函数是先执行函数外面代码后,再执行onload的
				var img = new Image();  //不能放在for循环外面,不然img节点src不断被重新赋值,最后只onload最后一个src
				                       
					img.onload=function(e){
						// onload可以用作外面变量,但是作用效果值,只在onload函数内有效
						curNum++;
						if (i==curNum) {
							
							self.musicInit();
							
						};
					}
					img.src=srcs[i];
				
			};

			
		};
	},
	// 音乐开启/关闭
	musicInit:function () {
		var loading=document.getElementById('loading'),
			music=document.getElementById('music'),
			audio=document.getElementById('audio');
			//~运算字符:~2==-3;~1==-2;~-1==0;0?==false?
		 // 	ua = navigator.userAgent,
			// evt = ~ua.indexOf('MicroMessenger') ?  			
			// 'WeixinJSBridgeReady' : 
			// 'touchstart';

		loading.style.display="none";
		audio.autoplay = "autoplay";
		music.classList.add("rotate");
		audio.play(); 

		 
	     
    	var autoPlay = function(){  
	            audio.play();  
	            document.removeEventListener("touchstart",autoPlay, false);  
	        };  
	    
	    document.addEventListener("WeixinJSBridgeReady", function () {  
	        audio.play();  
	    }, false);  
	    document.addEventListener('YixinJSBridgeReady', function() {  
	        audio.play();  
	    }, false);  
	    document.addEventListener("touchstart",function(e){
	    	if (e.target==music) {
				onOff();
			};
	    }, false);  

		var  onOff =function() {
			if(audio.paused) {
				audio.play();
				audio.autoplay = "autoplay";
				music.classList.add("rotate");
			}else {
				audio.pause();
				audio.removeAttribute("autoplay");
				music.classList.remove("rotate");
			}
		};
	}
};