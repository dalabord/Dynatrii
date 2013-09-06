//Document.ready
$(function() {

	jsonDossiers = $.parseJSON($('#dynatrii').attr('data-dyna'));
	var sOK = "OK";
	var sNOK = "Cancel";
	var sTitle = "Tree edition";
	var sMess = "";

    $("#dynatriiModal").dialog({
    	modal: true,
        position: 'center',
		autoOpen : false,
		show : {
			effect : "blind",
			duration : 1000
		},
		hide : {
			effect : "blind",
			duration : 1000
		}
	});

	$("#dynatrii").dynatree({
		minExpandLevel : 1,
		children : jsonDossiers,
		onActivate : function(node) {
			fc_dynatriiAjax("SELECT", false);
		}
	});
	
	$("#dynatriiCreateNode").click(function() {
		sMess = "Name of the new node";
		gc_openDynatriiModal("CREATE", sTitle, sMess, sOK, sNOK);
	});

	$('#dynatriiMoveNode').click(function() {
		sMess = "Select the destination of the node";
		gc_openDynatriiModal("MOVE", sTitle, sMess, sOK, sNOK);
	});

	$('#dynatriiDeleteNode').click(function() {
		sMess = "Do you confirm supression ?";
		gc_openDynatriiModal("DELETE", sTitle, sMess, sOK, sNOK);
	});
	
	$('#dynatriiModal_ok').click(function() {
		fc_switchDynatrii();
	});
	
	$('#dynatriiModal_nok').click(function() {
		$("#dynatriiModal").dialog("close");
	});
	
	// $(".bs-cadre").append("<div class=\"bs-cadre-label\">Information</div>");
	
	/* A l'init, on sélectionne le dossier racine utilisateur et on affiche la liste de ses groupes/études
	noeud_selectionne = $("#tree").dynatree("getTree").getNodeByKey(serveur_dossier_selec);
	
	// window.console.log("noeud_selectionne = "+ noeud_selectionne +" pour serveur_dossier_selec : "+ serveur_dossier_selec);
	if (noeud_selectionne != null)		
		noeud_selectionne.activate();
	*/
	// Petite gêne à l'affichage : mention close au dessus des popup
	$(".ui-dialog-titlebar").hide();

});

function fc_dynatriiAjax(sAction, bDialogBox) {
	var controllerAction = $('#dynatrii').attr('controller-action');
	var current_node = $('#dynatrii').dynatree('getActiveNode');
	
	if (current_node == null) {
		
	}

	if (bDialogBox) $("#dynatriiModal").dialog("open");
	
	$.ajax({
		url : controllerAction,
		type : "POST",
		cache : false,
		data : {
			nID : current_node.data.key,
			sCRUD : sAction
		},
		success : function(jsonArray) {
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

function gc_openDynatriiModal($sCRUD, $sTitle, $sMess, $sOK, $sNOK) {
	$("#dynatriiModal_message").empty();
	$("#dynatriiModal_title").empty();
	$("#dynatriiModal_special").empty();
	
	if ($sCRUD == "MOVE") {		
		fc_extendAllNodes();
		$("#dynatriiModal_special").append("<div id=\"dynatrii-move\"></div>");
		var dict = $("#dynatrii").dynatree("getTree").toDict(true, function(dict) {
			dict.title = "Target";
			delete dict.key; // prevent duplicate keys
		});
		var arbre_cible_avant = JSON.stringify(dict);
		var arbre_cible_apres = arbre_cible_avant.substring(arbre_cible_avant
				.indexOf("[", 2), arbre_cible_avant.length - 1);

		var jsonDossiers = $.parseJSON(arbre_cible_apres);

		$("#dynatrii-move").dynatree({
			minExpandLevel : 2,
			children : jsonDossiers,
			onActivate : function(node) {
				$("#dynatriiModal").attr("target-node", node.data.key);
			}
		});
	}
	if ($sCRUD == "CREATE") {	
		$("#dynatriiModal_special").append("<input type=\"text\" id=\"dynatriiModal_input\" value=\"\"></input>");
	}
	$("#dynatriiModal_title").append($sTitle);
	$("#dynatriiModal_message").append("<p>" + $sMess + "</p>");
	$("#dynatriiModal_ok").text($sOK);
	$("#dynatriiModal_nok").text($sNOK);
	$("#dynatriiModal").attr("value", $sCRUD);
	$("#dynatriiModal").dialog("open");
}

function fc_switchDynatrii() {
	
	switch ($("#dynatriiModal").attr("value")) {
		case "CREATE" :
			fc_addNode($("#dynatriiModal_input").val(), $("#dynatriiModal_input").val());
			break;
		case "MOVE" :
			fc_moveNode();
			break;
		case "DELETE" :
			fc_deleteNode();
			break;
		default :
			break;
	}	
	
	// eventualy, access to server
}

function fc_addNode(idNode, libelNode) {
	// Now get the current node object
	var targetNode = $("#dynatrii").dynatree("getActiveNode");
	// Call the DynaTreeNode.addChild() member function and pass options for the new node
	targetNode.addChild({
		key : idNode,
		title : libelNode,
		tooltip : "Node added successfully",
		isFolder : true
	});
	targetNode.expand(true);
	$("#dynatriiModal").dialog("close");

	fc_dynatriiAjax("CREATE", false);
}

function fc_moveNode() {
	var originNode = $("#dynatrii").dynatree("getActiveNode");
	var targetNode = $("#dynatrii").dynatree("getTree").getNodeByKey($("#dynatriiModal").attr("target-node"));
	originNode.move(targetNode, 'child');
	$("#dynatrii").dynatree("getTree").activateKey($("#dynatriiModal").attr("target-node"));
	$("#dynatriiModal").dialog("close");
	
	fc_dynatriiAjax("MOVE", false);
}

function fc_deleteNode() {
	var parentNode = $("#dynatrii").dynatree("getActiveNode").getParent();
	var originNode = $("#dynatrii").dynatree("getActiveNode");
	originNode.remove();
	$("#dynatriiModal").dialog("close");
	$("#dynatrii").dynatree("getTree").activateKey(parentNode.data.key);
	fc_dynatriiAjax("DELETE", false);
}

function fc_extendAllNodes() {
	$("#dynatrii").dynatree("getRoot").visit(function(node){
		node.expand(true);
	});	
}