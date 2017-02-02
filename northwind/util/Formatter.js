jQuery.sap.declare("com.test.northwind.util.Formatter");

com.test.northwind.util.Formatter = {
	/**
	 * Upper the first character of giving string
	 * param{String} sStr input string
	 * @returns {String}} the input string with the first uppercase character
	 */
	uppercaseFirstChar: function(sStr) {
		return sStr.charAt(0).toUpperCase() + sStr.slice(1);
	}

	/*
	discontinuedStatusState : function(sDate) {
		return sDate ? "Error" : "None";
	},

	discontinuedStatusValue : function(sDate) {
		return sDate ? "Discontinued" : "";
	},

	currencyValue : function (value) {
		return parseFloat(value).toFixed(2);
	}
	*/
};