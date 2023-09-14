sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Filter, FilterOperator, JSONModel) {
    "use strict";

    return Controller.extend("sap.btp.ux410solving.controller.Main", {
      onInit: function () {
        var oData = {
          list: [
            { type: "bar" },
            { type: "column" },
            { type: "line" },
            { type: "donut" },
          ],
        };

        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "typeList");
        this.byId("idComboBox2").setSelectedKey("bar");
      },
      onSearch: function () {
        // debugger;

        let oFlattenedDataset = this.getView().byId("FlattenedDataset");
        let oComboBox = this.getView().byId("idComboBox").getSelectedKey(); //*order ID 가져옴 comboBox엔 getvalue 없음
        let oFilter = new Filter({
          path: "OrderID",
          operator: "EQ",
          value1: oComboBox,
        });

        //* getBinding("속성")
        oFlattenedDataset.getBinding("data").filter(oFilter);
      },
      onChange: function () {
        let oValidatedComboBox = this.getView().byId("idComboBox2"),
          sSelectedKey = oValidatedComboBox.getSelectedKey(),
          sValue = oValidatedComboBox.getValue();

        if (
          sValue == "bar" ||
          sValue == "column" ||
          sValue == "line" ||
          sValue == "dount"
        ) {
          oValidatedComboBox.setValueState("None");
          return true;
        } else {
          oValidatedComboBox.setValueState("Error");
          oValidatedComboBox.setValueStateText("Please enter a valid value!");
          return false;
        }
      },
      onSelectData: function (oEvent) {
        let oOrder = oEvent.getParameter("data")[0].data.OrderID;
        let oProduct = oEvent.getParameter("data")[0].data.ProductID;

        this.onNavDetail(oOrder, oProduct);
      },
      onNavDetail: function (orderID, productID) {
        let oRouter = this.getOwnerComponent().getRouter();

        oRouter.navTo("RouteDetail", {
          paramOrder: orderID,
          paramProduct: productID,
        });
      },
    });
  }
);
