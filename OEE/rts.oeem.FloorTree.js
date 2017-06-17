function FloorTree(f) {
	var treeIndex = 0;
	var treeArray;
	var treeNodes;
	var floorTreeReady;
	var floorTree = new sap.ui.commons.Tree("tree", {
		title : "FloorMaps",
		width : "100%",
		// 		height : "400px",
		showHeaderIcons : true,
		showHorizontalScrollbar : true,
		showHeader : true,
		select : function(oControlEvent) {
			treeIndex = parseInt(oControlEvent.getParameters().node.getId().substring(oControlEvent.getParameters().node.getId().indexOf("_") + 1));
			var name = treeArray[treeIndex]['unitName'];
			var id = treeArray[treeIndex]['recordID'];
			// 			sap.ui.getCore().byId("mTableLabel").setText(name + " (ID: " + id + " )");
			// 			TableRef(id, name);
			oeeChartInit(oControlEvent.getParameters().node);

		}
	});
	var url = f.url;

	getData(url, parseJsonParent);

	function parseJsonParent(jsondata) {
		treeArray = [];
		treeNodes = new Array(jsondata.length);
		$.each(jsondata, function(i, _jsondata) {
			treeArray.push({
				unitName : _jsondata['unitName'],
				recordID : _jsondata['recordID'],
				unitType : _jsondata['unitType'],
				idUnitParent : _jsondata['idUnitParent'],
				oeeStatus : _jsondata['oeeStatus'],
			});
			var _icon = "";

			treeNodes[i] = new sap.ui.commons.TreeNode("floorTree_" + i, {
				text : _jsondata['unitName'],
				icon : _icon,
				expanded : true
			});
			floorTree.addNode(treeNodes[i]);
		});

		$.each(treeNodes, function(i, m) {
			$.each(treeNodes, function(j, n) {
				if (i != j) {
					if (treeArray[j]['idUnitParent'] == treeArray[i]['recordID']) {
						m.addNode(n);
					}
					if (treeArray[i]['idUnitParent'] == treeArray[j]['recordID']) {
						n.addNode(m);
					}
				}
			});
		});
		floorTree.placeAt("nav");
		// oeeChartInit(getTreeNodeByText('2100 DOC'));
		// oeeChartInit(floorTree.getNodes()[0]);
		// cc(oeeChart);
		floorTreeReady = true;
	}

}
// ******************************************************************************************************************************************************************
