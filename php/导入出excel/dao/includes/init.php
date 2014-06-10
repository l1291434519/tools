<?php
	/*
	header('content-type: text/html; charset=utf-8');
	header('Expires: Fri, 14 Mar 1980 20:53:00 GMT');
	header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
	header('Cache-Control: no-cache, must-revalidate');
	header('Pragma: no-cache');
	*/
	
	//error_reporting(E_ALL);
	
	
	@ini_set('memory_limit',          '16M');
	@ini_set('session.cache_expire',  180);
	@ini_set('session.use_trans_sid', 0);
	@ini_set('session.use_cookies',   1);
	@ini_set('session.auto_start',    0);
	@ini_set('display_errors',        1);
	define("PUB_DB_TYPE", "mysql" ) ;
	
	define("PUB_DB_HOST", "10.37.71.221" ) ;
	define("PUB_DB_USER", "root" ) ;
	define("PUB_DB_PASS", "wangshidi3d_nexu3ns" ) ;
	define("PUB_DB_NAME", "discuz_demo") ;
	
	

	


	require_once("db.class.php");


?>