sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sap.btp.ux400solvingb17.controller.Main", {
      formatter: {
        transformDiscontinued: function (value) {
          return value ? "Yes" : "No";
        },
      },
      onInit: function () {
        let oData = { list: [] };
        let oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "main");
      },
      onRandomPress: function () {
        let oModel = this.getView().getModel("main");
        let oData = oModel.getProperty("/list");
        let oInput = this.getView().byId("idInput");
        let ranNum = Math.floor(Math.random() * 100) + 1;
        oInput.setValueState("None");
        oInput.setValue(ranNum);
        oData.push({ key: ranNum });
        oModel.setProperty("/list", oData);
      },
      onProducts: function () {
        let oDialog = this.getView().byId("idDialog");

        if (!oDialog) {
          this.loadFragment({
            name: "sap.btp.ux400solving.view.fragment.Products",
            type: "XML",
          }).then(
            function (oDialog) {
              let oModel = this.getView().getModel();
              oDialog.setModel(oModel);
              oDialog.open();
            }.bind(this)
          );
        } else {
          oDialog.open();
        }
      },
      onClose: function (oEvent) {
        let oButton = oEvent.getSource();
        let oDialog = oButton.getParent();
        oDialog.close();
      },
      onValueChange: function (oEvent) {
        let oSource = oEvent.getSource();
        let oValue = Number(oSource.getValue());
        let oModel = this.getView().getModel("main");
        let oData = oModel.getProperty("/list");

        if (1 <= oValue && oValue <= 100) {
          oSource.setValueState("None");
          oData.push({ key: oValue });
        } else {
          oSource.setValueState("Error");
          oSource.setValueStateText("Type between 1 and 100");
        }
        oModel.setProperty("/list", oData);
      },
      onEnter: function (oEvent) {},
    });
  }
);
