/*global QUnit*/

sap.ui.define([
	"project_b07_06/controller/Main6.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Main6 Controller");

	QUnit.test("I should test the Main6 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
