<?php
class dynatrii extends CWidget
{
	public $dataDyna;
	public $fieldToRefresh;
	public $controllerAction;
	/*
	public static function actions(){
		return array(
				// naming the action and pointing to the location
				// where the external action class is
				'ajaxJSonActions'=>'application.extensions.interface.actions.ajaxJSonActions',
		);
	}
	*/
	public function init()
	{
		parent::init();
		// add any assets here
	}
	
	public function run()
	{
		parent::run();
		
		if($this->dataDyna===null)
			throw new CException(Yii::t('ext.dynatrii','"dataDyna" field must be set.'));

		if($this->fieldToRefresh===null)
			throw new CException(Yii::t('ext.dynatrii','"fieldToRefresh" field must be set.'));
		
		if($this->controllerAction===null)
			throw new CException(Yii::t('ext.dynatrii','"controllerAction" field must be set.'));

		//$this->controllerAction=Yii::app()->request->baseUrl .'/site/dynatrii.ajaxJSonActions';
		
		$this->render('body');
	}	
}