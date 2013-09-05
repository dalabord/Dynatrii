Dynatrii
========
Implentation of Dynatree as a Yii widget with CRUD.

* Web site: http://idnesoftcomputing.com/wordpress/
* Tutorial: http://idnesoftcomputing.com/wordpress/?p=302

Using Dynatrii
--------------
Drag'n'drop the extension to the Yii project extensions folder

1. Add that code to your view :

		<?php
		// DDB : paramétre de test 
		$datatree = array(
			"title" => "idne.softcomputing",
			"key" => "2",
			"isFolder" => true,
			"children" => array(
				"title" => "sous-dossier",
				"key" => "2",
				"isFolder" => true,
				"children" => null
			)
		);
	
		$this->widget('ext.dynatrii.dynatrii', array(
			'dataDyna'=>$datatree,
			'fieldToRefresh'=>'dyna-target',
			'controllerAction'=>'Utilisateurs/dynatrii'
		)); 
		?>
	
		<div id="dyna-target" style="background-color: #CCCCCC"><i>target div</i></div>
2. Add that code to the accessRules of a concerned controller :

		array('allow', // allow all users to perform 'dynatree' action
				'actions'=>array('Dynatrii'),
				'users'=>array('*'),
		),
3. Add that function to the concerned controller :

		// Action accessed by AJAX request (Dynatree node or create/move/delete button) 
		// Param : CRUD action
		public function actionDynatrii()
		{	
			$nID=$_POST["nID"];
			$sCRUD=$_POST["sCRUD"];
	
			switch ($sCRUD) {
				case "CREATE" :
					// CREATE process
					break;
				case "SELECT" :
					// CREATE process
					break;
				case "MOVE" :
					// CREATE process
					break;
				case "DELETE" :
					// CREATE process
					break;
			 	default :
			 	
			}
			// global process (database update, view linked with the tree update...)
			// ...
			 
			// Return value : return code & html to print
			$data = array(
					"errCode" => "0", // If (retCode < 0) alert(toPrint) else field2refresh.Add(toPrint) ; 
					"toPrint" => "Action : <b>".$sCRUD."</b><br/>Node : <b>".$nID."</b>", // Html content to print
					);
			
			echo CJavaScript::jsonEncode($data);
		}
To learn more about the Dynatrii contact ddb@softcomputing.com
