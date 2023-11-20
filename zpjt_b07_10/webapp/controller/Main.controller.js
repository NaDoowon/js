sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/Fragment"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Fragment) {
    "use strict";

    return Controller.extend("zpjtb0710.controller.Main", {
      onInit: function () {
        this.byId("idImage").setSrc(_rootPath + "/image/00001.jpg");
      },

      onValueHelp: function (oEvent) {
        var oDialog = sap.ui.getCore().byId("idDialog");
        var oModel = this.getView().getModel("scarr");
        if (!oDialog) {
          Fragment.load({
            name: "zpjtb0710.view.fragment.Scarr",
            type: "XML",
            controller: this,
          }).then(function (oDialog) {
            oDialog.setModel(oModel, "scarr");
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
