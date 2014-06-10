<?php

class YangchenghuAction extends CAction
{
    public $modelClass;
    public $template;
    public function init(){
        
    }
    public function run()
    {
		$this->controller->layout='t1';
        //if(!empty($this->modelClass))
			//$model=new $this->modelClass;

		$uploadFile = CUploadedFile::getInstanceByName('excel');
		if($uploadFile !== null){
			$uploadFileName = 'yang'.date('Y-m-d').'_'.time() . '.' . $uploadFile->getExtensionName();
			$filepath = Yii::app()->basePath.'/../uploadfiles/'.$uploadFileName;
			
			$starttime=strtotime(date("Y-m-d 14:00:00",strtotime("-1 day"))); 
			$endtime=strtotime(date("Y-m-d 14:00:00",time()));
			$t = Tickets::model()->count('waybill != "" and exchangetime BETWEEN '.$starttime .' and '.$endtime);
			if($t>0){
				die('你今天已经提交过了，不可以再次提交');
			}
			//判断文件是否保存成功
			if($uploadFile->saveAs($filepath))
			{
				$this->controller->layout='t2';
				$postStr = file_get_contents($filepath);

				$postObj = @simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
				//var_dump($postObj->Worksheet->Table);
				if(!$postObj){//导入方式一
					require_once('Excel/reader.php');		
					// ExcelFile($filename, $encoding);

					$data = new Spreadsheet_Excel_Reader();

					// Set output Encoding.
					$data->setOutputEncoding('CP936');
					
					$data->read($filepath);
					
					error_reporting(E_ALL ^ E_NOTICE);

					//var_dump($data->sheets);die;
					
					for ($i = 2; $i <= $data->sheets[0]['numRows']; $i++) {
					/*
						$d = array();
						for ($j = 1; $j <= $data->sheets[0]['numCols']; $j++) {
							echo "\"".$this->utf8($data->sheets[0]['cells'][$i][$j])."\",";
							//$d[] = $this->utf8($data->sheets[0]['cells'][$i][$j]);
						}
						echo "\n";
					*/
					
					//echo "\"".$this->utf8($data->sheets[0]['cells'][$i][2])."\",";
					//echo "\"".$this->utf8($data->sheets[0]['cells'][$i][10])."\",";
					//echo "\n";
					$ticket = $this->utf8($data->sheets[0]['cells'][$i][2]);
					$waybill = $this->utf8($data->sheets[0]['cells'][$i][12]);
					
					$model = Tickets::model()->findByPk($ticket);
						
						if(!empty($model) and $model->status==3){
							$model->sendtime=time();
							if(!empty($waybill)){
								$model->waybill = $waybill;
								$model->status=5;
							}else{
								$model->status=4;
							}
							
							
							if(strlen($waybill) == "12"){ 
								
										if(preg_match("/^\d*$/",$waybill)){							
												if($model->update()){
															if($model->status == 4){
																echo '<font color="red">'.$model->ticket.'------导入失败，礼券号有问题<br></font>';
															}else{
																echo $model->ticket.'------导入成功<br>';
															}
													}else{
														echo '<font color="red">'.$model->ticket.'------导入失败，数据更新失败<br></font>';
													}
										}else{
													echo '<font color="red">'.$ticket.'------失败，'.$waybill.'单号应该为数字<br></font>';	
										
										}
									
									}else{
											echo '<font color="red">'.$ticket.'------失败，'.$waybill.'单号位数不对应该为12位<br></font>';	
									}


						}else{
							if(!empty($ticket))
								echo '<font color="red">'.$ticket.'------失败，对象为空，或未兑换<br></font>';
						}
					unset($ticket);
					unset($waybill);
					unset($model);
					
					
					
					}
					//echo '格式';
					die;
				}else{
					
					//导入方式二
					unset($postObj->Worksheet->Table->Row[0]);
					foreach($postObj->Worksheet->Table->Row as $k=>$v){
						//var_dump($v);
						/*
						echo $v->Cell[0]->Data.'&nbsp;';
						echo $v->Cell[1]->Data.'&nbsp;';
						echo $v->Cell[2]->Data.'&nbsp;';
						echo $v->Cell[3]->Data.'&nbsp;<br>';
						*/
						
						$model = Tickets::model()->findByPk($v->Cell[1]->Data);
						
						if(!empty($model) and $model->status==3){
							$model->sendtime=time();
							if(!empty($v->Cell[11]->Data)){
								$model->waybill = $v->Cell[11]->Data;
								$model->status=5;
							}else{
								$model->status=4;
							}
							
						$waybill = $this->utf8($v->Cell[11]->Data);
						if(strlen($waybill) == "12"){ 
								
										if(preg_match("/^\d*$/",$waybill)){							
												if($model->update()){
															if($model->status == 4){
																echo '<font color="red">'.$model->ticket.'------导入失败，礼券号有问题<br></font>';
															}else{
																echo $model->ticket.'------导入成功<br>';
															}
													}else{
														echo '<font color="red">'.$model->ticket.'------导入失败，数据更新失败<br></font>';
													}
										}else{
													echo '<font color="red">'.$ticket.'------失败，'.$waybill.'单号应该为纯数字<br></font>';	
										
										}
									
									}else{
											echo '<font color="red">'.$ticket.'------失败，'.$waybill.'单号位数不对应该为12位<br></font>';	
							}
							


						}else{
							echo '<font color="red">'.$v->Cell[1]->Data.'------导入失败，礼券状态'.$model->status.'<br></font>';
						}	
					}
					
					//die;
				}
                
                echo '<script>alert("导入结束")</script>';
			}
		}				
			
        if(!isset($this->template))
                $this->template='create';

        $this->controller->render($this->template,array(
            'model'=>$model,
        ));
        
    }
	
	public function utf8($str){
		return iconv('GB2312', 'UTF-8', $str);
	}
}

?>