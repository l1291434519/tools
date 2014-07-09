<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" pageEncoding="gbk"%>
<html>
<head>
    <title>easy 拼图游戏</title>
    <script type="text/javascript" src="jquery-1.4.2.js"></script>
    <script type="text/javascript" src="jquery-ui.js"></script>
    <script type="text/javascript" src="jigsawPuluzze.js"></script>
    <link rel="stylesheet" type="text/css" href="css/jigsawPuzzle.css"/>
    <style type=text/css>
    	
    </style>
    <script type="text/javascript"> 
		
   </script>
</head>
<body>
	<div class="jp-operation">
 		<button class="start">开始游戏</button>
 		<div class="timer"></div>
	</div>
	<div id="egg" >
		<div class="jp-msg-bg"></div>	
		<div class="jp-msg-chicken">
			<div class="jp-msg-cxt">您用了<span>9423</span>s完成.</div>
			<div class="jp-msg-restart">重新开始</div>
		</div>	
	</div>
	<div class="debug">
	</div>
</body>
</html>