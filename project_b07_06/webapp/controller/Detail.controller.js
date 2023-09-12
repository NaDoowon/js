sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("projectb0706.controller.Main6", {
      onInit: function () {
        // RouteDetail 경로를 타면 _patternmattched 함수를 실행하겠다
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._patternMatched, this);
      },
      _patternMatched: function (oEvent) {
        // 파라미터로 받은 값들 가져오기
        // oParam 안에는 manifest.json 에 등록된
        // RouteDetail의 Parameter  값들이 있음

        var oParam = oEvent.getParameters().arguments; // paramOrder
        var oModel = this.getView().getModel(); // oData MOdel

        console.log(oParam.paramOrder);

        // this.getView().bindElement(`/Orders(${oParam.paramOrder})`); // /Orders(10248)

        var sPath = oModel.createKey("/Orders", { OrderID: oParam.paramOrder });

        oModel.read(sPath, {
          urlParameters: {
            $expand: "Order_Details",
          },
          success: function (oReturn) {
            console.log(oReturn); // json data => JSONMODEL에 넣어서 사용 가능
            // Detail.View.xml 에서 사용하는 'detail' JSONMODEL 만들어서
            // 해당 데이터를 담아놓고, Detail.View.xml 에 Binding 가능
          },
          error: function (oError) {},
        });
      },
      onNavMain: function () {
        var oRouter = this.getOwnerComponent().getRouter();

        oRouter.navTo("RouteMain6");
        // window.go(-1) // 뒤로가기.  정확하진 않음
      },
    });
  }
);
