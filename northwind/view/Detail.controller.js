jQuery.sap.require("com.test.northwind.util.Formatter");
jQuery.sap.require("com.test.northwind.util.Controller");

com.test.northwind.util.Controller.extend("com.test.northwind.view.Detail", {

	/**
	 * Called when the detail list controller is instantiated. 
	 */
	onInit: function() {
		this.oInitialLoadFinishedDeferred = jQuery.Deferred();

		if (sap.ui.Device.system.phone) {
			//don't wait for the master on a phone
			this.oInitialLoadFinishedDeferred.resolve();
		} else {
			this.getView().setBusy(true);
			this.getEventBus().subscribe("Master", "InitialLoadFinished", this.onMasterLoaded, this);
		}

		this.getRouter().attachRouteMatched(this.onRouteMatched, this);

	},

	/**
	 * Master InitialLoadFinished event handler
	 * @param{String} sChanel event channel name
	 * @param{String}} sEvent event name
	 * @param{Object}} oData event data object
	 */
	onMasterLoaded: function(sChannel, sEvent, oData) {
		if (oData.oListItem) {
			this.bindView(oData.oListItem.getBindingContext().getPath());
			this.getView().setBusy(false);
			this.oInitialLoadFinishedDeferred.resolve();
		}
	},

	/**
	 * Detail view RoutePatternMatched event handler 
	 * @param{sap.ui.base.Event} oEvent router pattern matched event object
	 */
	onRouteMatched: function(oEvent) {
		var oParameters = oEvent.getParameters();

		jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function() {
			var oView = this.getView();

			// when detail navigation occurs, update the binding context
			if (oParameters.name !== "detail") {
				return;
			}

			var sEntityPath = "/" + oParameters.arguments.entity;
			this.bindView(sEntityPath);

			var oIconTabBar = oView.byId("idIconTabBar");
			oIconTabBar.getItems().forEach(function(oItem) {
				oItem.bindElement(com.test.northwind.util.Formatter.uppercaseFirstChar(oItem.getKey()));
			});

			// Which tab?
			var sTabKey = oParameters.arguments.tab;
			this.getEventBus().publish("Detail", "TabChanged", {
				sTabKey: sTabKey
			});

			if (oIconTabBar.getSelectedKey() !== sTabKey) {
				oIconTabBar.setSelectedKey(sTabKey);
			}
		}, this));

	},

	/**
	 * Binds the view to the object path.
	 * @param {string} sEntityPath path to the entity
	 */
	bindView: function(sEntityPath) {
		var oView = this.getView();
		oView.bindElement(sEntityPath);

		var frag = this.byId("detailFragment");
		frag.bindElement(sEntityPath + "/Supplier");

		//Check if the data is already on the client
		if (!oView.getModel().getData(sEntityPath)) {

			// Check that the entity specified actually was found.
			oView.getElementBinding().attachEventOnce("dataReceived", jQuery.proxy(function() {
				var oData = oView.getModel().getData(sEntityPath);
				if (!oData) {
					this.showEmptyView();
					this.fireDetailNotFound();
				} else {
					this.fireDetailChanged(sEntityPath);
				}
			}, this));

		} else {
			this.fireDetailChanged(sEntityPath);
		}

	},

	/**
	 * display NotFound view
	 */
	showEmptyView: function() {
		this.getRouter().myNavToWithoutHash({
			currentView: this.getView(),
			targetViewName: "com.test.northwind.view.NotFound",
			targetViewType: "XML"
		});
	},

	/**
	 * publish Detail Changed event
	 */
	fireDetailChanged: function(sEntityPath) {
		this.getEventBus().publish("Detail", "Changed", {
			sEntityPath: sEntityPath
		});
	},

	/**
	 * publish Detail NotFound event
	 */
	fireDetailNotFound: function() {
		this.getEventBus().publish("Detail", "NotFound");
	},

	/**
	 * Navigates back to main view
	 */
	onNavBack: function() {
		// This is only relevant when running on phone devices
		this.getRouter().myNavBack("main");
	},

	/**
	 * Detail view icon tab bar select event handler
	 */
	onDetailSelect: function(oEvent) {
		sap.ui.core.UIComponent.getRouterFor(this).navTo("detail", {
			entity: oEvent.getSource().getBindingContext().getPath().slice(1),
			tab: oEvent.getParameter("selectedKey")
		}, true);
	}

});