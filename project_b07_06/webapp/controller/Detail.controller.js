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
        var oParam = oEvent.getParameters().arguments; // paramOrder
        // oParam 안에는 manifest.json 에 등록된
        // RouteDetail의 Parameter  값들이 있음
        console.log(oParam.paramOrder);

        this.getView().bindElement(`/Orders(${oParam.paramOrder})`); // /Orders(10248)
      },
      onNavMain: function () {
        var oRouter = this.getOwnerComponent().getRouter();

        oRouter.navTo("RouteMain6");
        // window.go(-1) // 뒤로가기.  정확하진 않음
      },
    });
  }
);
