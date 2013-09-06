<? 
	$extPath = Yii::app()->request->baseUrl .'/protected/extensions/dynatrii/';
	
	// Librairies : Dynatree, JQuery, JQuery UI, JQuery Cookies, Dynatrii
	Yii::app()->clientScript->registerScriptFile($extPath .'js/jquery.js');
	Yii::app()->clientScript->registerScriptFile($extPath .'js/jquery-ui.custom.js');
	Yii::app()->clientScript->registerScriptFile($extPath .'js/jquery.cookie.js');
	Yii::app()->clientScript->registerCssFile($extPath .'css/ui.dynatree.css');
	Yii::app()->clientScript->registerScriptFile($extPath .'js/jquery.dynatree.js');
	Yii::app()->clientScript->registerScriptFile($extPath .'js/dynatrii.js');
	Yii::app()->clientScript->registerCssFile($extPath .'css/dynatrii.css');
	
// DIV contenant l'arbre dynatree
	echo '<div class="dynatrii-container">';

	echo '<div id="dynatrii" data-dyna="'. htmlspecialchars(json_encode($this->dataDyna)) .'" '.
						' field-to-refresh="'. $this->fieldToRefresh .'" '.
						' controller-action="'. $this->controllerAction .'"> </div>';

// Affichage des boutons d'édition Création, Deplacement, Suppression
	echo '<div class="dynatrii-buttons">';
	echo '	<div class="bg_create_img"> '.
	 	'		<a class="click_field" id="dynatriiCreateNode" title="New"></a> '.
		'	</div>'.
		'	<div class="bg_move_img">'.
		'		<a class="click_field" id="dynatriiMoveNode" title="Move"></a>'.
		'	</div>'.
		'	<div class="bg_delete_img">'.
		'		<a class="click_field" id="dynatriiDeleteNode" title="Delete"></a>'.
		'	</div>';
	echo '</div>';

// Modal
	echo '<div id="dynatriiModal" class="bs-cadre" label="Info" value="">'.
			 '<div class="modal-header">'.
			 	'<h3 id="dynatriiModal_Label"><div id="dynatriiModal_title">Information</div></h3>'.
		 	 '</div>'.
		 	 '<div class="modal-body">'.
				 '<div id="dynatriiModal_message"></div>'.
				 '<div id="dynatriiModal_special"></div>'.
			 '</div>'.
			 '<div class="modal-footer">'.
				 '<button id="dynatriiModal_ok" class="btn btn-primary">OK</button>'.
				 '<button id="dynatriiModal_nok" class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>'.
			 '</div>'.
		 '</div>';

	echo '</div>';

	echo '<div class="dynatrii-separation"></div>';
?>