/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zpjt_b07_10/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
