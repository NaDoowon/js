sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";
    return Controller.extend("sap.btp.ux410solving.controller.Detail", {
      onInit: function () {
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onPatternMatched, this);
      },
      _onPatternMatched: function (oEvent) {
        let oParam = oEvent.getParameters().arguments;
        console.log(oParam.paramOrder);

        this.getView().bindElement(
          `/Order_Details(OrderID=${oParam.paramOrder},ProductID=${oParam.paramProduct})`
        );
      },
    });
  }
);
