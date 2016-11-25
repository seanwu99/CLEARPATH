function ApplicationHeader(f) {

	new sap.ui.commons.ApplicationHeader({
		logoSrc : f.logoSrc,
		logoText : f.logoText,
		displayLogoff : true,
		userName : f.user,
		displayWelcome : true,
	}).placeAt(f.elm);
}
