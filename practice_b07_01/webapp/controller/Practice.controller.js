sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("practiceb0701.controller.Practice", {
      onInit: function () {
        // var oData = {
        //   ProductionCollection: [
        //     {
        //       ProductId: "PLUS",
        //       Name: "+",
        //     },
        //     {
        //       ProductId: "MINUS",
        //       Name: "-",
        //     },
        //     {
        //       ProductId: "MULTIPLE",
        //       Name: "*",
        //     },
        //     {
        //       ProductId: "DIVISION",
        //       Name: "/",
        //     },
        //   ],
        //   ProductionCollection2: [],
        // }; //json data 생성
        // var oModel = new JSONModel(oData);
        var oModel = new JSONModel();
        oModel.loadData("../model/viewData.json", {}, false); // sync = 동기처리, async = 비동기처리

        this.getView().setModel(oModel);
      },
      onClick: function (oEvent) {
        var nNum1 = this.getView().byId("X").getValue(),
          nNum2 = this.byId("Y").getValue(),
          oSelect = this.byId("idSel"),
          oText = this.byId("Result"),
          oSel = oSelect.getSelectedKey(),
          nResult = 0;

        nNum1 = Number(nNum1);
        nNum2 = Number(nNum2);

        switch (oSelect.getSelectedKey()) {
          case "PLUS":
            nResult = nNum1 + nNum2;
            break;

          case "MINUS":
            nResult = nNum1 - nNum2;
            break;

          case "MULTIPLE":
            nResult = nNum1 * nNum2;
            break;

          case "DIVISION":
            nResult = nNum1 / nNum2;
            break;
        }
        oText.setText(nResult);
        this.onAdd(nNum1, nNum2, oSel, nResult);
      },
      onAdd: function (nNum1, nNum2, oSelect, result) {
        var oModel = this.getView().getModel(),
          aList = oModel.getProperty("/ProductionCollection2");

        aList.push({
          num1: nNum1,
          operator: oSelect,
          num2: nNum2,
          result: result,
        });
        oModel.setProperty("/ProductionCollection2", aList);
      },
      onDelete: function (oEvent) {
        var oTable = this.byId("idTable"),
          oModel = this.getView().getModel(),
          aModelData = oModel.getProperty("/ProductionCollection2"), // 배열 데이터
          aIndex = oTable.getSelectedIndices(); // [1.2.3]

        for (var i = aIndex.length - 1; i > -1; i--) {
          aModelData.splice(aIndex[i], 1);
        }

        oModel.setProperty("/ProductionCollection2", aModelData);
      },
      onRowActionDelete: function (oEvent) {
        var nSelectedIndex = oEvent.getParameter("row").getIndex();
        var aList = this.getView().getModel().getData().list; // 배열 데이터
        aList.splice(nSelectedIndex, 1);

        this.getView().getModel().setData({ list: aList }, true);
      },
      onOpenDialog: function (oEvent) {
        // 신문법
        //   var oDialog = sap.ui.getCore().byId("idDialog");

        //   // if(oDialog) {
        //   //   oDialog.open();
        //   //   return; //함수종료
        //   // }
        //     Fragment.load({
        //       name: "practiceb0701.fragment.HelloDialog",
        //       type: "XML",
        //       controller: this,
        //     }).then(function (oDialog) {
        //       oDialog.open();
        //     });
        /////////////////////////////////////////////////////////////////
        //   if (!oDialog) {
        //     Fragment.load({
        //       name: "practiceb0701.fragment.HelloDialog",
        //       type: "XML",
        //       controller: this,
        //     }).then(function (oDialog) {
        //       oDialog.open();
        //     });
        //   } else {
        //     oDialog.open();
        //   }
        // },
        ///////////////////////////////////////////////
        // (구) 문법
        var oDialog = this.byId("idDialog");

        if (oDialog) {
          oDialog.open();
        } else {
          this.loadFragment({
            name: "practiceb0701.fragment.HelloDialog",
            type: "XML",
          }).then(
            function (oDialog) {
              oDialog.open();
            }.bind(this)
          );
        }
      },

      onClose: function (oEvent) {
        /*
        getSource(): 이벤트를 일으킨 객체
        getParameters() : 이벤트 관련 정보 
        */
        // var oDialog = sap.ui.getCore().byId("idDialog");
        var oButton = oEvent.getSource();
        var oDialog = oButton.getParent();
        oDialog.close();
      },
      onOpenDialog2: function () {
        if (this.byId("idDialogView")) {
          this.byId("idDialogView").open();
        }
      },
    });
  }
);
