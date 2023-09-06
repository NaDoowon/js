sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("projectb0703.controller.View3", {
      onInit: function () {
        var oDatas = {
          name: "Na Doo Won",
          title: "집가고 싶다",
          // list: [{ num1: 12, operator: "test", num2: 13, result: 0 }]
          list: [],
          age: 28,
        }; //json data 생성
        var oModel = new JSONModel(oDatas); // json data 포함한 json model 생성

        this.getView().setModel(oModel, "main"); // json model을 View 에서 사용할수 있도록 세팅
      },

      onClick: function (oEvent) {
        var nNum1 = this.getView().byId("idInput1").getValue(),
          nNum2 = this.byId("idInput2").getValue(),
          oSelect = this.byId("idSelect"),
          oText = this.byId("idText"),
          nResult = 0,
          oSel = oSelect.getSelectedKey();
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
            // if (!nNum2) return this.onChange();
            nResult = nNum1 / nNum2;
            break;
        }
        oText.setText(nResult); // 이거 대신에 테이블에 추가

        this.onAdd(nNum1, nNum2, oSel, nResult);
      },

      onChange: function (oEvent) {
        var nNum = Number(oEvent.getParameters().value); //NaN,0
        var nNum2 = this.byId("idInput2");
        var sKey = this.byId("idSelect").getSelectedKey();
        var oButton = this.byId("Button");

        if (!nNum && sKey === "DIVISION") {
          //입력값이 없거나 0이면 에러상태로 변경
          console.log(nNum);
          nNum2.setValueState("Error");
          oButton.setEnabled(false);
        } else {
          nNum2.setValueState("None");
          oButton.setEnabled(true);
        }
      },

      onAdd: function (nNum1, nNum2, oSelect, result) {
        // main 모델의 list 배열 데이터를 가져오는 방법
        var oModel = this.getView().getModel("main"), // main 모델 가져오기
          // aList = oModel.getData().list, // list 배열 가져오기 "" getData = 전체데이터
          aList2 = oModel.getProperty("/list"); // list 배열(선택 데이터) 가져오기 "getProperty = 선택 경로 데이터만 " "/" 로 하면 정체 데이터 가져옴

        /* aList2에 새로운 데이터를 추가
         데이터 구조의 예시 : 
         {num1: 숫자1, operator: 오퍼레이터, num2: 숫자2, result: 결과}
         사용자가 입력한 계산식을 aLsit2에 추가하여 모델에 반영
         aList2.push(객체);
        */
        // oSelect.getSelectedItem().getText();
        aList2.push({
          num1: nNum1,
          operator: oSelect,
          num2: nNum2,
          result: result,
        });
        // aList2.push({ num1: nNum1, operator: oSelect, num2: nNum2 result: result});
        oModel.setProperty("/list", aList2);
      },
    });
  }
);
