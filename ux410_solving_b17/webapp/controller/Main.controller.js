sap.ui.define(
  [
    "sap/ui/core/library",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (coreLibrary, Controller, JSONModel, Filter, FilterOperator) {
    "use strict";
    let ValueState = coreLibrary.ValueState;
    return Controller.extend("sap.btp.ux410solvingb17.controller.Main", {
      onInit: function () {
        this._setChartInController();
        let oData = {
          list: [
            { type: "bar" },
            { type: "column" },
            { type: "line" },
            { type: "donut" },
          ],
        };

        let oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "typeList");
        this.byId("idCombo2").setSelectedKey("bar");
      },

      _setChartInController: function () {
        let oColChart = this.getView().byId("idChart");

        let oColDataset = new sap.viz.ui5.data.FlattenedDataset({
          data: { path: "/Order_Details" },
          dimensions: [
            { name: "OrderID", value: "{OrderID}" },
            { name: "ProductID", value: "{ProductID}" },
          ],
          measures: [{ name: "UnitPrice", value: "{UnitPrice}" }],
        });

        oColChart.setDataset(oColDataset);

        let oFeedItemCategory = new sap.viz.ui5.controls.common.feeds.FeedItem({
          uid: "categoryAxis",
          type: "Dimension",
          values: ["OrderID", "ProductID"],
        });

        let oFeedItemValue = new sap.viz.ui5.controls.common.feeds.FeedItem({
          uid: "valueAxis",
          type: "Measure",
          values: ["UnitPrice"],
        });

        oColChart.addFeed(oFeedItemCategory);
        oColChart.addFeed(oFeedItemValue);

        oColChart.setVizProperties({
          legendGroup: { layout: { position: "right" } },
          colorPalette: ["#5f00ff", "#ff5e00", "#ffc19e"],
        });
        // oColChart.setSizeLimit(30);
      },
      onSearch: function () {
        if (!this.onChange()) {
          return;
        }
        let oColChart = this.getView().byId("idChart");
        let oSel = this.getView().byId("idCombo").getSelectedKey();
        let oDataset = this.byId("idChart")
          .getAggregation("dataset")
          .getBinding("data");

        let aFilters = [];

        if (oSel) {
          let oFilter1 = new Filter({
            path: "OrderID",
            operator: FilterOperator.EQ,
            value1: oSel,
          });
          aFilters.push(oFilter1);
        }
        oDataset.filter(aFilters);

        oColChart.setVizType(this.getView().byId("idCombo2").getSelectedKey());
      },
      onChange: function () {
        let oValidatedComboBox = this.getView().byId("idCombo2"),
          sSelectedKey = oValidatedComboBox.getSelectedKey(),
          sValue = oValidatedComboBox.getValue();

        if (!sSelectedKey && sValue) {
          oValidatedComboBox.setValueState(ValueState.Error);
          oValidatedComboBox.setValueStateText("Please enter a valid value!");
          return false;
        } else {
          oValidatedComboBox.setValueState(ValueState.None);
          return true;
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
