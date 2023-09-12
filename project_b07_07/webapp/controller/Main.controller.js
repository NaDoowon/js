sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("projectb0707.controller.Main", {
      onInit: function () {
        this._setChartInView();
        this._setChartInController();
      },
      _setChartInView: function () {
        var oData = {
          list: [
            { name: "aaa", rate: "34", cost: "10" },
            { name: "bbb", rate: "20", cost: "12" },
            { name: "vcc", rate: "30", cost: "11" },
            { name: "ddd", rate: "15", cost: "17" },
            { name: "eee", rate: "10", cost: "15" },
            { name: "fff", rate: "6", cost: "10" },
          ],
        };

        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "view");
      },

      _setChartInController: function () {
        var oData = {
          sales: [
            { product: "Pants", amount: "30" },
            { product: "Jacket", amount: "20" },
            { product: "Shirt", amount: "22" },
            { product: "T-Shirt", amount: "16" },
            { product: "Socks", amount: "8" },
          ],
        };
        // var oModel = new JSONModel(oData);
        // this.getView().setModel(oModel, "cont");
        this.getView().setModel(new JSONModel(oData), "cont");
        //chart
        var oColChart = this.getView().byId("idChart");
        // dataset
        var oColDataset = new sap.viz.ui5.data.FlattenedDataset({
          data: { path: "cont>/sales" },
          dimensions: [{ name: "Product", value: "{cont>product}" }],
          measures: [{ name: "Amount", value: "{cont>amount}" }],
        });
        oColChart.setDataset(oColDataset);
        // feeds
        var oFeedItemValue = new sap.viz.ui5.controls.common.feeds.FeedItem({
          uid: "valueAxis",
          type: "Measure",
          values: ["Amount"],
        });
        var oFeedItemCategory = new sap.viz.ui5.controls.common.feeds.FeedItem({
          uid: "categoryAxis",
          type: "Dimension",
          values: ["Product"],
        });
        oColChart.addFeed(oFeedItemValue);
        oColChart.addFeed(oFeedItemCategory);

        //optional
        oColChart.setVizProperties({
          title: { visible: true, text: "My Chart" },
          legendGroup: { layout: { position: "left" } },
          plotArea: {
            drawingEffect: "glossy",
            colorPalette: ["#1312FF", "#8C8C8C", "#1DDB16"],
          },
        });
      },
    });
  }
);
