/* var dan_size = 90;
 var num_x = 4;
 var num_y=5;
 var imgurl = 'images/default.jpg';*/
 
var dan_size = 120;
 var num_x = 3;
 var num_y=4;
 var imgurl = 'images/default.jpg';
 
 $(function(){
     var size= dan_size,border=1,dragging,timeslice=0,interval;
	 var body = $("<div class='jigsaw-body'></div>").css({
	 	    "width":(size+border*2)*num_x+"px",
			"height":(size+border*2)*num_y+"px",
			"position":"relative"
	 	});
	 var item,x,y,pCss,JP = new Array();
	 for(var i=0;i<(num_x*num_y);i++){
	    x = -(i%num_x)*size;
	    y = -Math.floor(i/num_x)*size;
	    pCss = x+"px "+y+"px";
	    JP.push(pCss);
	 	item = $("<div class='jigsaw-item'></div>").css({
	 	    "width":size+"px",
			"height":size+"px",
			"border":border+"px solid #111111",
			"background-image":"url('"+imgurl+"')",
			"background-position":x+"px "+y+"px"
	 	}).draggable({ 
	 		helper: function(event) {
				return $(this).clone().css({
				}).addClass("jigsaw-item-dragging");
			},
	 		opacity: 0.7,
	 		width:'100px',
	 		height:'100px',
	 		stack: '.jigsaw-item',
	 		containment: 'parent',
	 		start: function(event,ui) {
	 			dragging = $(this);
	 		}
	 	}).droppable({
			drop: function(event, ui) {
			var 
			D = dragging.data("position"),
			T = $(this).data("position"),
			DI = dragging.data("index"),
			TI =  $(this).data("index");
			 $(this).css("border","1px solid #111111");
			 $(this).css("background-position",D);
			 dragging.css("background-position",T);
			 dragging.data("index",TI);
			 dragging.data("position",T);
			 $(this).data("index",DI);
			 $(this).data("position",D);
			 if(validate(body)){
			 	clearInterval(interval);
			 	$(".jp-msg-cxt").html("您共用了<span>"+timeslice+"</span>s完成.");
			 	$(".jp-msg-bg").fadeIn(300,function(){
			 		$(".jp-msg-chicken").animate({
			 			'top':'0px'
			 		},500).animate({
			 			'top':'-30px'
			 		},200).animate({
			 			'top':'0px'
			 		},200);
			 	});
			 }
			},
			over: function(event, ui) {
			 $(this).css("border","1px solid #ffffff");
			},
			out: function(event, ui) {
			 $(this).css("border","1px solid #111111");
			}
		});
		body.append(item); 	
	 }
	 
	 function validate(e){
		  var win = true; 
		 	e.children().each(function(i){
			 	if($(this).data("index")!=null){
			 		if($(this).data("index")!=i){
			 			win = false;
			 			return false;
			 		}
		 		}
		 	});
		 	return win;
	 }
	 function getRandom(n){
	 	if(n==1){return 0;}
	 	return Math.floor(Math.random()*n);
	 }
	 function getIndex(css){
	 	for(var i=0;i<JP.length;i++){
			if(JP[i]==css){
				return i;
			}
		}
	 }
	 function start(){
	 	var t = new Array();
		for(var i=0;i<JP.length;i++){
			t.push(JP[i]);
		}
		body.children().each(function(i){
		 		var r = getRandom(t.length);
				//alert("第"+i+"个,产生随机数r:"+r+",getIndex(t[r]):"+getIndex(t[r])+",t.length:"+t.length);
				var index = getIndex(t[r]);
		 		$(this).css("background-position",t[r]).data("index",index).data("position",t[r]);
		 		//$(".debug").append(index+",");
		 		t.splice(r,1);
	 	});
	 	timeslice = 0;
	 	$(".timer").html("用时:"+timeslice+"s");
	 	clearInterval(interval);
	 	timer();
	 }
	 function timer(){
	 	interval = setInterval(function(){
	 		timeslice++;
	 		$(".timer").html("用时:"+timeslice+"s");
	 	},1000);
	 }
 	$("#egg").css({
 			"width":(size+border*2)*num_x+"px",
			"height":(size+border*2)*num_y+"px"
	}).append(body);
	$(".jp-msg-bg").css({
		"width":(size+border*2)*num_x+"px",
		"height":(size+border*2)*num_y+"px",
		"opacity":0.1
	});
	$(".jp-operation").css("width",(size+border*2)*num_x+10+"px");
	$(".jp-msg-chicken").css("left",((size+border*2)*num_x-300)/2+"px");
	
	$(".start").click(function(){
		$(".jp-msg-bg").css(
			"opacity",0.9
		).fadeIn(500,function(){
			$(this).fadeOut(500,function(){
			start();
			$(this).html("重新开始");
				$(this).css("opacity",0.2);
			});
		})
	});
	
	$(".jp-msg-restart").click(function(){
			$(".jp-msg-chicken").animate({
			 			'top':'-320px'
		 		},500,function(){
		 			$(".jp-msg-bg").fadeOut(100);
		 			start();
		 		});
	 	});	
	
	
 });