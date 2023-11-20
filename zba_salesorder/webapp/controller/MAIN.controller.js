sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter, FilterOperator, Fragment) {
    "use strict";

    return Controller.extend("zbasalesorder.controller.MAIN", {
      onInit: function () {},
      onSearch: function (oEvent) {
        let oInput = this.byId("idcomboBox").getValue();
        let oInput3 = this.byId("idcomboBox3").getValue();
        let aFilter = [];

        if (oInput) {
          aFilter.push(
            new Filter({ path: "Vbeln", operator: "Contains", value1: oInput })
          );
        }

        if (oInput3) {
          aFilter.push(
            new Filter({ path: "Kunnr", operator: "Contains", value1: oInput3 })
          );
        }

        this.byId("idTable").getBinding("items").filter(aFilter);
      },

      onButton1: function () {
        let aFilter = [];
        aFilter.push(
          new Filter({ path: "Status", operator: "EQ", value1: "1" })
        );
        this.byId("idTable").getBinding("items").filter(aFilter);
      },
      onButton2: function () {
        let aFilter = [];
        aFilter.push(
          new Filter({ path: "Status", operator: "EQ", value1: "4" })
        );
        this.byId("idTable").getBinding("items").filter(aFilter);
      },

      onButton3: function () {
        let aFilter = [];
        aFilter.push(
          new Filter({ path: "Delet", operator: "EQ", value1: "X" })
        );
        this.byId("idTable").getBinding("items").filter(aFilter);
      },

      onButton4: function () {
        let aFilter = [];
        aFilter.push(
          new Filter({ path: "Vbeln", operator: "Contains", value1: "1" })
        );
        this.byId("idTable").getBinding("items").filter(aFilter);
      },
      onOpenDialog: function (oData) {
        var oDialog = sap.ui.getCore().byId("idDialog");
        var oModel = this.getView().getModel();
        if (!oDialog) {
          Fragment.load({
            name: "zbasalesorder.view.fragment.Order",
            type: "XML",
            controller: this,
          }).then(function (oDialog) {
            oDialog.setModel(oModel);
            oDialog.open();
          });
        } else {
          oDialog.open();
        }
      },
      onPress: function (oEvent) {
        let oModel = this.getView().getModel();
        let sPath = oEvent.getSource().getParent().getBindingContextPath();
        oModel.read(sPath, {
          urlParameters: { $expand: "ZBA_SDT070Set" },
          success: function (oReturn) {
            this.onOpenDialog(oReturn, sPath);
          }.bind(this),
          error: function (oError) {
            console.log(oError);
          },
        });
      },
      onClose: function (oEvent) {
        let oButton = oEvent.getSource();
        let oDialog = oButton.getParent();
        oDialog.close();
      },
    });
  }
);
