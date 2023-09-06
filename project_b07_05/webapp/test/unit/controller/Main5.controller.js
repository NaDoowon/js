/*global QUnit*/

sap.ui.define([
	"project_b07_05/controller/Main5.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Main5 Controller");

	QUnit.test("I should test the Main5 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
