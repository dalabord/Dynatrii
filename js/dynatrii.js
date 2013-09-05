//Document.ready
$(function() {

	jsonDossiers = $.parseJSON($('#dynatrii').attr('data-dyna'));
	
	$("#dynatrii").dynatree({
		minExpandLevel : 1,
		children : jsonDossiers,
		onActivate : function(node) {
			//$("#modal_ajax_loader").dialog("open");
			// var current_node = node.data.key;
			fc_dynatriiAjax("SELECT");
		}
	});
	
	$("#dynatriiCreateNode").click(function() {
		fc_dynatriiAjax("CREATE");
	});

	$('#dynatriiMoveNode').click(function() {
		fc_dynatriiAjax("MOVE");
	});

	$('#dynatriiDeleteNode').click(function() {
		fc_dynatriiAjax("DELETE");
	});
});

function fc_dynatriiAjax(sAction) {
	var controllerAction = $('#dynatrii').attr('controller-action');
	var current_node = $('#dynatrii').dynatree('getActiveNode');
	
	// alert(controllerAction+" : "+current_node.data.key +" & "+sAction);
	$.ajax({
		url : controllerAction,
		type : "POST",
		cache : false,
		data : {
			nID : current_node.data.key,
			sCRUD : sAction
		},
		success : function(jsonArray) {
			// jsonArray : 0=>id, 1=>errCode, 2=>toPrinf
			var lstElements = jQuery.parseJSON(jsonArray); 

			if (lstElements.errCode >= 0) {
				$("#"+$('#dynatrii').attr('field-to-refresh')).empty();
				$("#"+$('#dynatrii').attr('field-to-refresh')).append(lstElements.toPrint);
			}
			else {
				alert(lstElements.toPrint);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Dynatrii ("+ sAction +")- Status : " + textStatus+ " / Error : " + errorThrown);
		}
	});
}
