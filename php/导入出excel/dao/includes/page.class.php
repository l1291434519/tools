<?php
/**
	类名：pageClass
	功能：实现数据分页显示的类，自动获取及传递查询参数
	修改日期：2005-1-21 15:00:25
	作者：李永清 liyongqing2008@gmail.com
	
=================使用方法================================
  $mypage=new pageClass($num,$_GET["page"],$intPageSize);
  $mypage->showPage();
  注：你只要需要传递记录总数$num，如果需要，可传递每页显示记录数$intPageSize，默认为10
	另外，查询表单递交方式需要为GET方式
**/

class pageClass
{

	var $intTotalPages;	//总页数;
	var $intPageSize;	//每页显示记录数;
	var $intTotalRecord;	//总记录数;
	var $intCurrentPage;	//当前页数;
	var $intNextPage;	//下一页;
	var $intPervPage;	//前一页;
	var $strParamList;      //当前页面附带的URL查询串;
	var $strParamListTransfer; //需要传递到下一页的正确URL查询串;		
	var $pagestr; //存储需要输出的翻页文字
	
	/** 构造函数 **/
	function pageClass($TotalRecord,$CurrentPage=1,$PageSize=10)
	{
		$this->intPageSize = $PageSize;
		$this->intCurrentPage = $CurrentPage;
		$this->strParamList = $_SERVER['QUERY_STRING'];
		$this->intTotalRecord = $TotalRecord;
	}
	
	/**
	 函数：param_parse()
	 功能：解析需要传递的URL查询串参数,目的是去掉上一页URL查询串中的page参数，换上正确的page参数
	 返回：需要正确传递的查询串参数
	**/
	function param_parse()
	{
		$strTransfer = "";
		
		$arrayParam = explode("&",$this->strParamList);	
		for($i = 0;$i < count($arrayParam);$i++)
		{		
			if (($arrayParam[$i]!="")&&(substr($arrayParam[$i],0,4)!="page"))//去掉上一页URL查询串中的page参数，换上正确的page参数
			{
				$strTransfer .= $arrayParam[$i] . "&";
			}
		}
		$this->strParamListTransfer = $strTransfer;			
	}
		
	/**
	 函数：check_currentPage($page)
	 功能：检测页数是否违规
	 参数：$page 页数
	 返回：当前页数
	**/
	function checkPage($page)
	{
		
		if($page <= 1)
		{
			return (1);
		}
		if($page > $this->intTotalPages)
		{
			return ($this->intTotalPages);
		}
		return ($page);
	}

	/**
	函数：init()
	功能：初始化数据
	**/
	function init()
	{
		$this->param_parse();//初始化需要传递的查询URL参数
		$this->intTotalPages = ceil($this->intTotalRecord / $this->intPageSize);//初始化总页数
		$this->intCurrentPage = $this->checkPage($this->intCurrentPage);//初始化当前页页码
		$this->intNextPage = $this->checkPage($this->intCurrentPage + 1);//初始化下一页页码
		$this->intPrevPage = $this->checkPage($this->intCurrentPage-1);//初始化上一页页码
	}
	
	/**
	 函数：noRecord()
	 功能：如果记录数为0，显示提示信息
	**/
	function noRecord()
	{
		
		$pList .= "<a href=\"#\">&nbsp;</a>";

		return $pList;
	}
	
	
	/**
	 函数：showPage()
	 功能：显示常规分页信息,样式：首页 上一页 下一页 末页 共有 3 条记录 1/1 转到页
	**/

	function showPage2()
	{    
		if ($this->intTotalRecord == 0)
		{
			$this->pagestr = $this->noRecord();
		}else
		{
			$this->init();//初始化需要的数据
			
			$pList  = "<table width=\"100%\" border=\"0\" cellspacing=\"1\" cellpadding=\"0\">";
			$pList .= "<form method=\"get\" name=\"pageForm\" action=\"{$_SERVER['PHP_SELF']}\"><tr width=\"100%\"><td align=\"center\">";
			$nbsp="&nbsp;";
			if($this->intCurrentPage == 1)
			{
				//$pList .= "首页".$nbsp."上一页".$nbsp;
			}else
			{
				$pList .= "<a href=\"{$_SERVER['PHP_SELF']}?page=1&".$this->strParamListTransfer."\" title=\"首页\">首页</a>$nbsp<a href=\"{$_SERVER['PHP_SELF']}?page=$this->intPrevPage&".$this->strParamListTransfer."\" title=\"上一页\">上一页</a>$nbsp";
			}
		
		
		
		if ($this->intTotalPages<=5)
			{
				for($i=1;$i<=$this->intTotalPages;$i++){
					if ($i==$this->intCurrentPage){
						$pList.= "<a href=\"{$_SERVER['PHP_SELF']}?page=$i&".$this->strParamListTransfer."\"><u>$i</u></a>&nbsp;&nbsp;";
					}else{
						$pList.= "<a href=\"{$_SERVER['PHP_SELF']}?page=$i&".$this->strParamListTransfer."\"><u>$i</u></a>&nbsp;&nbsp;";
					}
				}
			}else{
				$startpage=$this->intCurrentPage-3;
				if ($startpage<=0) $startpage=1;
				$endpage=$this->intCurrentPage+3;
				if($this->intCurrentPage==1||$this->intCurrentPage==2){
				$endpage=$this->intCurrentPage+3;
				}
				if ($endpage>$this->intTotalPages) $endpage=$this->intTotalPages;
				for($i=$startpage;$i<=$endpage;$i++){
					if ($i==$this->intCurrentPage){
						$pList.= "<a href=\"{$_SERVER['PHP_SELF']}?page=$i&".$this->strParamListTransfer."\"><u>$i</u></a>&nbsp;&nbsp;";
					}else{
						$pList.= "<a href=\"{$_SERVER['PHP_SELF']}?page=$i&".$this->strParamListTransfer."\"><u>$i</u></a>&nbsp;&nbsp;";
					}
				}
			}
		
		
		
			if ($this->intCurrentPage == $this->intTotalPages)
			{
				//$pList .= "下一页".$nbsp."末页".$nbsp;
			}else
			{
				$pList .= "<a href=\"{$_SERVER['PHP_SELF']}?page=$this->intNextPage&".$this->strParamListTransfer."\" title=\"下一页\">下一页</a>".$nbsp."<a href=\"{$_SERVER['PHP_SELF']}?page=$this->intTotalPages&".$this->strParamListTransfer."\" title=\"末页\">末页</a>".$nbsp;
			}
			$pList .= "&nbsp;&nbsp;共有 <b>".$this->intTotalRecord."</b> 个作品".$nbsp;
			//$pList .= "<b>$this->intCurrentPage</b>/<b>$this->intTotalPages</b>".$nbsp;
			//$pList .= "转到<input type=\"text\" name=\"page\" size=\"2\" value=\"$this->intCurrentPage\" onKeyUp=\"if (isNaN(this.value)||(this.value>$this->intTotalPages)||(this.value<1)){this.value=$this->intCurrentPage;} \">页<input type=\"submit\" value=\"Go\">";
			
			//当跳到某个页时，需要手动生成需要传递的URL查询串
			$arrayParam = explode("&",$this->strParamListTransfer);	
			for($i = 0;$i < count($arrayParam);$i++)
			{
				if ($arrayParam[$i]!="")
				{
					$tempParam = explode("=",$arrayParam[$i]);
					$pList .="<input name=\"".$tempParam[0]."\" type=\"hidden\" id=\"".$tempParam[0]."\" value=\"".urldecode($tempParam[1])."\">"; 			
				}
			}
									
			$pList .= "</td></tr></form></table>";
			$this->pagestr=$pList;
			//print $pList;
		}
	}




	/**
	 函数：showPage()
	 功能：显示google类型的分页样式,外观：上一页 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 下一页 
	**/
	function showPage()
	{    
		if ($this->intTotalRecord == 0)
		{
			$this->pagestr = $this->noRecord();
		}else
		{
			$this->init();//初始化需要的数据
			$pList="";
			
			if($this->intCurrentPage!=1){
				$pList.="<a href=\"{$_SERVER['PHP_SELF']}?page=$this->intPrevPage&".$this->strParamListTransfer."\">&lt;</a>";
			}
			
			if ($this->intTotalPages<=5)
			{
				for($i=1;$i<=$this->intTotalPages;$i++){
					if ($i==$this->intCurrentPage){
						$pList.= "<a href=\"{$_SERVER['PHP_SELF']}?page=$i&".$this->strParamListTransfer."\">$i</a>";
					}else{
						$pList.= "<a href=\"{$_SERVER['PHP_SELF']}?page=$i&".$this->strParamListTransfer."\">$i</a>";
					}
				}
			}else{
				$startpage=$this->intCurrentPage-2;
				if ($startpage<=0) $startpage=1;
				$endpage=$this->intCurrentPage+2;
				if($this->intCurrentPage==1||$this->intCurrentPage==2){
				$endpage=$this->intCurrentPage+3;
				}
				if ($endpage>$this->intTotalPages) $endpage=$this->intTotalPages;
				for($i=$startpage;$i<=$endpage;$i++){
					if ($i==$this->intCurrentPage){
						$pList.= "<a href=\"{$_SERVER['PHP_SELF']}?page=$i&".$this->strParamListTransfer."\">$i</a>";
					}else{
						$pList.= "<a href=\"{$_SERVER['PHP_SELF']}?page=$i&".$this->strParamListTransfer."\">$i</a>";
					}
				}
			}
			
			if($this->intCurrentPage!=$this->intTotalPages){
				$pList.="<a class='next' href=\"{$_SERVER['PHP_SELF']}?page=$this->intNextPage&".$this->strParamListTransfer."\">&gt;</a>";
			}
									
			$this->pagestr=$pList;
			//print $pList;
		}
	}

}

?>