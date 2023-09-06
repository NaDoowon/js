sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("projectb0705.controller.HelloPanel", {
      onInit: function () {},
      onShowHello: function () {
        // sap.m.MessageBox.information("Hello Panel Click");
        MessageBox.success("버튼이 클릭되었습니다."),
          {
            title: "Success",
            onClose: function (action) {
              switch (action) {
                case "YES":
                  this.afterSuccess();
                  break;
                case "NO":
                  sap.m.MEssageToast.show("No Click");
                  break;
              }
            }.bind(this),
            actions: [MessageBox.Action.YES, MessageBox.Action.No],
            emphasizedAction: MessageBox.Action.Yes,
          };
      },
      afterSuccess: function () {
        sap.m.MessageToast.show("생성 후 로직");
      },
    });
  }
);
