<?php

class ExportAction extends CAction
{
    public $modelClass;
    public $template;
    
    public function run()
    {
		
		//$m = $this->modelClass;
		//$model = $m::model()->findByPk($_GET['id']);
		require_once 'dao/php-excel.class.php';
		
		
		$res = array();
		
		$starttime=strtotime(date("Y-m-d 14:00:00",strtotime("-1 day"))); 
		$endtime=strtotime(date("Y-m-d 14:00:00",time()));
	/*	
		echo '<br>';
		echo strtotime($starttime);
		echo '<br>';
		echo $starttime;
		echo '<br>';
		echo $endtime;
		echo '<br>';
		echo strtotime($endtime);
	*/			
		//$res = Tickets::model()->findAll();
		//$res = Tickets::model()->findAll('exchangetime BETWEEN '.$starttime .' and '.$endtime);
		$criteria=new CDbCriteria(array(
					'condition'=>'exchangetime BETWEEN '.$starttime .' and '.$endtime,
					'order'=>'category',
			));
		$res = Tickets::model()->findAll($criteria);

		$data[]=array('序号','礼券号','分类','收货人','省','市','区','详细地址','手机','座机','备注','运单号');
		foreach($res as $a=>$k){
			$isre=true;
				$province = Address::model()->findByPk($k->province)->name;
				if($province=="北京"||$province=="天津"||$province=="上海"||$province=="重庆"){
						$province = $province."市";
				}else{
						$province = strstr($province ,"省")?$province:$province."省";
				}
				$city = Address::model()->findByPk($k->city)->name;
				$city = strstr($city ,"市")?$city:$city."市";
				$category = $this->controller->category[$k->category];
				$area = $k->area;
				if(strstr($area ,"区")){					

				}elseif(strstr($area ,"县")){

				}else{
					$area = $area."区/县";
				}
				$address = $province." ".$city." ".$area." ".$k->address;
			
				$data[$a+2]=array($a+1,$k->ticket,$category,$k->consignee,$province,$city,$area,$address,$k->mobile,$k->areacode."-".$k->landline,$k->userremark);
				
				unset($province,$city);
		}


		$xls = new Excel_XML('UTF-8', false, 'Sheet1');
		$xls->addArray($data);
		$filename = date('Y-m-d');
		$xls->generateXML($filename);
		//$xls->saveXML($filename);        
	}
}

?>