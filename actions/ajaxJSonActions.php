<?php
class ajaxJSonActions extends CAction
{
	public function run()
	{
		var $id = $_POST['id'];
		var $sCRUD = $_POST['id'];
		
		$data = array(
				'id' => $id,
				'retCode' => '0',
				'toPrint' => $_POST['action']
			);
		
		echo CJavaScript::jsonEncode($data);
		
		// Yii::app()->end();
	}
}