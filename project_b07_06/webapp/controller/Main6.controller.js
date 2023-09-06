sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/Fragment"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Fragment) {
    "use strict";

    return Controller.extend("projectb0706.controller.Main6", {
      onInit: function () {},

      onValueHelp: function (oEvent) {
        // fragment를 Core에 붙임 ( Core 밑에 View 가 있음)
        // Core를 불러옴
        // Core에 붙이기 떄문에 getView 후 open 전 setModel 해야함
        // var oDialog = sap.ui.getCore().byId("idDialog");
        // var oModel = this.getView().getModel();
        // if (!oDialog) {
        //   Fragment.load({
        //     name: "projectb0706.fragment.Order",
        //     type: "XML",
        //     controller: this,
        //   }).then(function (oDialog) {
        //    oDialog.setModel(oModel);
        //     oDialog.open();
        //   });
        // } else {
        //   oDialog.open();
        // }aaaa

        // view에 바로붙임 (this 사용)
        var oDialog = this.byId("idDialog");

        if (!oDialog) {
          this.loadFragment({
            name: "projectb0706.view.fragment.Order",
            type: "XML",
            controller: this,
          }).then(function (oDialog) {
            oDialog.open();
          });
        } else {
          oDialog.open();
        }
      },

      onClose: function (oEvent) {
        sap.ui.getCore().byId("idDialog");
        var oButton = oEvent.getSource();
        var oDialog = oButton.getParent();
        oDialog.close();
      },
    });
  }
);
