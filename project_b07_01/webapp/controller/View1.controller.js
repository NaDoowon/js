sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("projectb0701.controller.View1", {
      onInit: function () {},

      onClick: function () {
        // alert("버튼을 클릭하였습니다.");

        // var oText = this.getView().byId("idText"); // this(controller) 안에 있는 Text 객체 가져옴
        // var sText = oText.getText(); // Text 객체에서 text property 값을 가져옴
        // alert(sText);

        // var oText = this.byId("idInput");
        // var sText = oText.getValue();
        // alert(sText);

        var oText = this.byId("idText"),
          oInput = this.byId("idInput");

        var sUserText = oInput.getValue(); // 사용자 입력값 받음
        oText.setText(); // 사용자 입력값을 Text에 세팅
      },
    });
  }
);
