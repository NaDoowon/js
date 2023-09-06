sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("projectb0704.controller.Main", {
      onInit: function () {
        var oDatas = {
          list: [],
        };
        var oModel = new JSONModel(oDatas);
        this.getView().setModel(oModel);
      },
      onAdd: function () {
        var oModel = this.getView().getModel(),
          oInput1 = this.byId("input1").getValue(),
          oInput2 = this.byId("input2").getValue(),
          oInput3 = this.byId("input3").getValue(),
          oInput4 = this.byId("input4").getValue(),
          aList = oModel.getProperty("/list");
        aList.push({
          name: oInput1,
          address: oInput2,
          phone: oInput3,
          department: oInput4,
        });

        oModel.setProperty("/list", aList);
      },
      onDelete: function (oEvent) {
        /* Table 객체, model의 배열 데이터를 가져옴
           Table 객체에서 getSelectedIndices()로 선택된 Row의 index를 다 가져옴
           반복문을 통해 Model의 배열 데이터를 삭제한다
           => Array 메서드 중 aModelData.splice(삭제할 index,1 )을 사용
           변경된 배열 데이터를 다시 model에 세팅한다
           (참고) 프로세스 중간에 debugger를 통해 확인*/

        var oTable = this.byId("idTable"),
          oModel = this.getView().getModel(),
          aModelData = oModel.getProperty("/list"), // 배열 데이터
          // aList = oModel.getData().list;
          aIndex = oTable.getSelectedIndices(); // [1.2.3]
        // 테이블에서 선택된 index를 array 형태로 받기
        // 내가 선택한 Row 갯수만큼 반복문을 돌면서, aModelData 배열에서 삭제 후 다시 세팅

        for (var i = aIndex.length - 1; i > -1; i--) {
          aModelData.splice(aIndex[i], 1);

          /*
          for (var i = 0 ; i < aIndex.length; i++) {
            aModelData.splice(aIndex[i], 1);
            > 루프돌고 올라가면 배열이 업데이트 되어서 새로운 순서 기준으로 삭제됨
            */
        }

        oModel.setProperty("/list", aModelData);
        //oModel.setData(aList,true);
      },
      onRowActionDelete: function (oEvent) {
        var nSelectedIndex = oEvent.getParameter("row").getIndex();
        var aList = this.getView().getModel().getData().list; // 배열 데이터
        //var aList = this.getView().getModel().getProperty("/list")
        // .splice를 통해 단건 삭제 후 적용
        aList.splice(nSelectedIndex, 1);

        //this.getView().getModel().setProperty("/list",aList);
        this.getView().getModel().setData({ list: aList }, true);
      },
    });
  }
);
