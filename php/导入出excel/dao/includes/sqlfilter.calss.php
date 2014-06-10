<?php
/**
	类名：sqlin
	功能：实现sql防注入,js代码提交过滤
	修改日期：2012-3-08
	作者：郭晋峰  guojinfeng@139.com
	
=================使用方法================================
直接在需要防止sql注入的php文件中引入该类文件即可
**/
class sqlin
{
//dowith_sql($value)
function dowith_sql($str)
{
if($str!=""){
 //$str = htmlspecialchars($str); 
}

 $str = str_replace("&gt", "", $str); 
 $str = str_replace("&Gt", "", $str);
 $str = str_replace("&gT", "", $str);
 $str = str_replace("&GT", "", $str);

 $str = str_replace("&lt", "", $str); 
 $str = str_replace("&Lt", "", $str);
 $str = str_replace("&lT", "", $str);
 $str = str_replace("&LT", "", $str);

//js
 $str = str_ireplace("script", "script", $str);  
 $str = str_replace("<script>", "", $str);  
 $str = str_replace("</script>", "", $str);  


//sql
   $str = str_ireplace(" and","",$str);
   $str = str_ireplace(" execute","",$str);
   $str = str_ireplace(" update","",$str);
   $str = str_ireplace(" count","",$str);
   $str = str_ireplace(" chr","",$str);
   $str = str_ireplace(" mid","",$str);
   $str = str_ireplace(" master","",$str);
   $str = str_ireplace(" truncate","",$str);
   $str = str_ireplace(" char","",$str);
   $str = str_ireplace(" declare","",$str);
   $str = str_ireplace(" select","",$str);
   $str = str_ireplace(" create","",$str);
   $str = str_ireplace(" delete","",$str);
   $str = str_ireplace(" insert","",$str);
	 $str = str_ireplace(" truncate","",$str);
   $str = str_ireplace(" drop","",$str);
   $str = str_replace("'","",$str);
   $str = str_replace(" ","",$str);
   $str = str_replace(" or","",$str);
   $str = str_replace("=","",$str);


   $str = str_replace("/","",$str);
   $str = str_replace("\\","",$str);
   $str = str_replace("\"","",$str);
	 $str=str_replace("&","&",$str);
		$str=str_replace(">",">",$str);
		$str=str_replace("<","<",$str);
		$str=str_replace(" ",chr(32),$str);
		$str=str_replace(" ",chr(9),$str);
		$str=str_replace("    ",chr(9),$str);
		$str=str_replace("&",chr(34),$str);
		$str=str_replace("'",chr(39),$str);
   //echo $str;
   return $str;
}
//aticle()防SQL注入函数
function sqlin()
{
   foreach ($_GET as $key=>$value)
   {
       $_GET[$key]=$this->dowith_sql($value);
   }
   foreach ($_POST as $key=>$value)
   {
       $_POST[$key]=$this->dowith_sql($value);
   }
	 foreach ($_REQUEST as $key=>$value)
   {
       $_REQUEST[$key]=$this->dowith_sql($value);
   }
}
}

$dbsql=new sqlin();
?>