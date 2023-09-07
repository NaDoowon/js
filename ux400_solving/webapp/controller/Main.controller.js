sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("sap.btp.ux400solving.controller.Main", {
      formatter: {
        transformDiscontinued: function (sData) {
          if (sData == true) {
            return "Yes";
          } else if (sData == false) {
            return "No";
          }
        },
      },
      onInit: function () {
        var oData = {
          ranlist: [],
        };
        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "list");
      },
      onRandomPress: function () {
        var oInput = this.getView().byId("idInput1");
        var nRandom = Math.floor(Math.random() * 100) + 1;

        oInput.setValue(nRandom);
        this.onAdd(nRandom);
      },
      onAdd: function (num) {
        var oModel = this.getView().getModel("list"),
          aList = oModel.getProperty("/ranlist");

        aList.push({
          value: num,
        });
        oModel.setProperty("/ranlist", aList);
      },
      onProduct: function (oEvent) {
        var oDialog = sap.ui.getCore().byId("idDialog");
        var oModel = this.getView().getModel();

        if (oDialog) {
          oDialog.open();
        } else {
          Fragment.load({
            name: "sap.btp.ux400solving.view.fragment.Products",
            type: "XML",
            controller: this,
          }).then(function (oDialog) {
            oDialog.setModel(oModel);
            oDialog.open();
          });
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
