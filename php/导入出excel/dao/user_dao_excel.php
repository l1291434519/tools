<?php
	header("Content-type: text/html; charset=utf-8"); 	
include_once("includes/init.php");
require_once('../../AES/AES.php');
set_time_limit(0);
ini_set("memory_limit","512M");
$db = new DB_sql();

 // $sql = "select a.uid,a.mobile_key,b.realname,b.mobile from pre_common_member as a,pre_common_member_profile as b where a.uid = b.uid and  b.mobile!='' and a.veri_type = 5 and a.regdate> UNIX_TIMESTAMP( '2012-08-01' ) and a.uid<1243296  order by a.uid desc limit 0,50000";
if(isset($_GET['a']) and isset($_GET['b'])){
	$na = $_GET['a'];
	$nb = $_GET['b'];
	$sql ="select uid, email from pre_common_member where email !='' order by uid ASC limit ".$na.",".$nb;
}else{
	$sql ="select uid, email from pre_common_member where email !='' order by uid ASC limit 0,5";
}
/*
$sql = "SELECT *
FROM `pre_common_member`
LIMIT 0 , 30";
*/
$db->execute_sql($sql);
$res=$db->fetch_result_records(); 

 require_once 'php-excel.class.php';
//print_r($res);

$aes = new AES(true);// 把加密后的字符串按十六进制进行存储
$key = "20121225maimang*#)by aj";// 密钥
$keys = $aes->makeKey($key);

//var_dump($res);

//$ct = $aes->decryptString($res[0]['email'], $keys);
//echo $ct;





foreach($res as $a=>$k){
	$email = $aes->decryptString($k['email'], $keys);
 	$data[$a+2]=array($a+1,$k["uid"],$email);	
}


		$xls = new Excel_XML('UTF-8', false, 'Sheet1');
		$xls->addArray($data);
		$filename = "userdata--".$na."---".$nb;
		//$xls->generateXML($filename)
		$xls->saveXML($filename);

//重定向浏览器 
if(!empty($res)){
header("Location: http://club.beijing-hyundai.com.cn/weixin/dao/user_dao_excel.php?a=".($na+10000)."&b=".($nb+10000)); 
//确保重定向后，后续代码不会被执行 
exit;
}

?>



