import Common from './common'

var u = navigator.userAgent;
var Re = {
	OS:!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)?"ios":"android",
	isWeb:true,
	_init(){
		if(this.rem){
			return;
		}
		var startY = 0;
        document.addEventListener('touchstart',function (event) {  
            startY = event.touches[0].pageY;
            if(event.touches.length>1){  
                event.preventDefault();  
            }  
        })  
        var lastTouchEnd=0;  
        
        document.addEventListener('touchend',function (event) {  
            var now=(new Date()).getTime();  
            if(now-lastTouchEnd<=300){  
                event.preventDefault();  
            }  
            startY = 0;
            lastTouchEnd=now;  
        },false)  
            
		var docEl = document.documentElement;
		this.screen.dpr = window.devicePixelRatio || 1;
		var docClientWidth =  docEl.clientWidth;
		var docClientHeight = docEl.clientHeight;
		this.rem = docClientWidth * this.screen.dpr / 10;
		this.screen.width = docClientWidth*this.screen.dpr;
		this.screen.originWidth = docClientWidth;
		this.screen.originHeight = docClientHeight;
		this.screen.height = docClientHeight*this.screen.dpr;

		var scale = 1 / this.screen.dpr;
		var fontEl = document.createElement('style');
		var metaEl = document.querySelector('meta[name="viewport"]');
		metaEl.setAttribute('content', 'width=' + this.screen.dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
		docEl.setAttribute('data-dpr', this.screen.dpr);
		docEl.firstElementChild.appendChild(fontEl);
		fontEl.innerHTML = 'html{font-size:' + this.rem+ 'px!important;}';
	},
	create(styles){
		return Common.create(styles,this.OS,this.isWeb,this.px.bind(this));
	},
	pxVal(val){
		try{
			val = parseFloat(val);
		}catch(e){
			val = 0;
		}
		//iphone6 为标准 px为标准  
		//比如想要screen.width/3 这样的效果 只能使用 (375*2)/3 值为250 这样去标示 
		return ((val/Common.baseScreen.rem));
	},
	px(val){
		return this.pxVal(val)+"rem";
	},
	rem:0,
	baseScreen:Common.baseScreen,
	screen:{
		dpr:0,
		originWidth:0,
		originHeight:0,
		width:0,
		height:0
	},
};

Re._init();

export default Re;