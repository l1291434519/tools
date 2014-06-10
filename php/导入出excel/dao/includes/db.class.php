<?php
/*
　* 类名：DB_sql
　* 功能：数据库操作类
　* 版本：v1.0
　* 日期:2005-1-18
　* 整理:李永清

=============使用方法=======================
1. 初始化类，执行SQL语句：
		$db=new DB_sql("SQL语句"); 
	或：
	    $db=new DB_sql()
	    $db->execute_sql("SQL语句");              
		
2. 取得执行结果
    如果为Insert，Update或Delete操作，则用：
    $number=$db->fetch_affected_rows();

   如果为Select操作，则用：
	$number=$db->fetch_result_rows();
    $result=$db->fetch_result_records();
	$i=0;
	while($i<$number)
	{
	  echo($result[$i]["字段名"]);
      $i++;   
    }
*/

class DB_sql
{
	var $PConnect= 0;		//是否为持续连接
	var $connect_id= 0;  		//连接状态
	var $query_id = 0; 		//查询状态
	
	/*
	函数名称：DB_sql()
	功    能：构造函数
	参    数：$query:要执行的SQL语句,可为空
	返回结果：无
	*/
	function DB_sql($query = "")
	{	      
	      $this->execute_sql($query);
	}
	
	/*
	函数名称：connect()
	功    能：数据库连接函数
	参    数：在配置文件中的静态变量
				1. $Database为数据库名称.
				2. $Host为数据库服务器名称.
				3. $User为数据库用户名. 
				4. $Password为数据库用户密码.
	返回结果：数据库连接状态，0表示连接失败，1表示连接成功
	*/
	function connect($Database = PUB_DB_NAME, $Host = PUB_DB_HOST, $User = PUB_DB_USER, $Password = PUB_DB_PASS) 
	{
		if ("" == $Database) return 0;
		if ("" == $Host)     return 0;
		if ("" == $User)     return 0;
		//if ("" == $Password) return 0;
		if ( 0 == $this->connect_id )
		{
			if(!$this->PConnect)
				$this->connect_id = @mysql_connect($Host, $User, $Password);
			else
				$this->connect_id = @mysql_pconnect($Host, $User, $Password); 

			if (!$this->connect_id)	return 0;

			if (!@mysql_select_db($Database,$this->connect_id))
			{
				@mysql_close($this->connect_id);
				return 0;
			}
		}
	    return $this->connect_id;
	}

	/*
	函数名称：execute_sql()
	功    能：执行SQL语句函数
	参    数：$strSQL为要执行的SQL语句
	返回结果：查询字符串是 UPDATE、INSERT 及 DELETE 时，返回的可能是 true（1） 或者 false（0）；查询的字符串是 SELECT 则返回新的 ID 值。当返回 false 时，表示查询的字符串有错误。
	*/
	function execute_sql($strSQL="")
	{
		if ($strSQL == "")	return 0;
		if (!$this->connect())	return 0; 				
		if ($this->query_id) $this->Free($this->query_id);	
		@mysql_query("SET names 'utf8'");				
		if (!$this->query_id = @mysql_query($strSQL,$this->connect_id)) return 0;				
		return $this->query_id;
	}	
	


	/*
	函数名称：fetch_result_rows()
	功    能：返回本次查询操作结果集的记录总数
	返回结果：查询结果记录总数
	*/
	function fetch_result_rows() 
	{
		return @mysql_num_rows($this->query_id);
	}
	
	/*
	函数名称：fetch_result_records()
	功    能：返回本次查询操作结果记录
	返回结果：记录数组
	举    例：
			$db=new DB_sql("select name,phone from member"); *
			$aList=$db->fetch_result_records();                *
			$aList为一数组。格式为：                         *
			$aList["0"]["name"]                              *
			$aList["0"]["phone"]                             *
			$aList["1"]["name"]                              *
			$aList["1"]["phone"]                             *
			......
			$aList["x"]["name"]                              *
			$aList["x"]["phone"]                             *
			x为返回的总条数减1                              *
	*/
	function fetch_result_records()
	{
		$i = 0;
		while ($myrow=@mysql_fetch_array($this->query_id))
		{			
			$result[$i]=$myrow;	
			$i++;			
		}
		if (empty($result)) return 0;
		return $result;
	}

	/*
	函数名称：get_insert_id()
	功    能：返回上一条新增记录的ID
	返回结果：上一记录的ID
	*/
	function get_insert_id()
	{
		return mysql_insert_id();
	}

	/*
	函数名称：fetch_current_record()
	功    能：返回当前查询结果集中游标所在记录
	返回结果：游标所在记录
	*/
	function fetch_current_record()
	{
		return @mysql_fetch_array($this->query_id);
	}


	/*
	函数名称：fetch_affected_rows()
	功    能：返回本次数据库操作所影响到的记录条数。主要是在插入、更新、删除记录后使用。
	返回结果：影响到的记录条数
	*/
	function fetch_affected_rows() 
	{
		return @mysql_affected_rows($this->connect_id);
	}


	/*
	函数名称：Free()
	功    能：释放已使用的数据资源
	参数： $ID为要释放的数据查询ID. 
	返回结果：无
	*/
	function free($ID = "") 
	{
		if ($ID == "")
		{
			if (is_resource($this->query_id)) @mysql_free_result($this->query_id);
			if ($this->connect_id) @mysql_close($this->connect_id);
			$this->query_id = 0;
			$this->connect_id = 0;
		}else
		{			
			if (is_resource($this->query_id)) @mysql_free_result($this->query_id);
			$this->query_id = 0;
		}
	}

}
?>