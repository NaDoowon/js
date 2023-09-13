sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("odatacrudb07.controller.Main", {
      onInit: function () {
        // this.getView().getModel();
        // let oDataModel = this.getOwnerComponent().getModel();
        // let sPath = oDataModel.createKey("/MemberSet", {
        //   MB_ID: "10000001",
        // });
        //read    = GET 요청
        // create = POST 요청
        // update = PUT 요청
        // remove = DELETE 요청

        // JSONModel 이름 : view
        this.getView().setModel(new JSONModel(), "view");
      },
      // GET 요청 : /EntitySetname('keyValue')
      onRead: function () {
        let oDataModel = this.getOwnerComponent().getModel(); // ODATA MODEL
        let oModel = this.getView().getModel("view"); // JSONMODEL
        let oTable = this.byId("idMemberSetTable");
        // let oItem = oTable.getSelecteditem(); //Row
        let sValue = oTable.getSelectedContexts()[0].getObject().MB_ID;
        // let sValue = oTable.getSelectedItem().getBingingContext().getObject().MB_ID;
        let sPath = oDataModel.createKey("/MemberSet", {
          MB_ID: sValue, // "/MemberSet('10000001')"와 동일
        });

        // 전체조회(GET 요청)
        oDataModel.read(sPath, {
          success: function (oReturn) {
            console.log(oReturn);
            // 읽어온 데이터를 JSONModel에 세팅
            oModel.setProperty("/", oReturn); // {MB_ID:'',MB_NM:'', ...}
            // {list: [], title: ''}
            //oModel.getData();
            //oModel.getProperty("/");
          },
          error: function (oError) {
            console.log(oError);
          },
        });
      },

      // POST 요청 : /EntitySetname + Body정보
      onCreate: function () {
        // oDataModel.create('경로('/EntitySetname')',{생성할데이터} : (json format 형태가 들어간 객체),{옵션정보});
        let oDataModel = this.getOwnerComponent().getModel(); // ODATA MODEL
        let oModel = this.getView().getModel("view"); // JSONMODEL
        let oBody = oModel.getData(); // JsonModel 값 가져오기

        //   MB_ID: "10000207",
        //   MB_NM: "HARIBO",
        //   TELNO: "010-2312-5643",
        //   EMAIL: "haribo@gmail.com",
        //   MB_ST: "A",
        // }; // 생성할 데이터 구성

        oDataModel.create("/MemberSet", oBody, {
          success: function (oReturn) {
            sap.m.MessageToast.show("데이터 생성 완료");
          },
          else: function (oError) {},
        });
      },
      // PUT 요청 : /EntitySetname('keyValue') + Body정보
      onUpdate: function () {
        let oDataModel = this.getOwnerComponent().getModel(); // ODATA MODEL
        let oModel = this.getView().getModel("view"); // JSONMODEL
        let oBody = oModel.getData(); // Json Data로 구성되어 있음

        //아래와 같이 별도 구성해도 됨.
        // let obj = {
        //   MB_ID: oBody.MB_ID,
        //   MB_NM: oBody.MB_NM,
        //   TELNO: oBody.TELNO,
        //   EMAIL: oBody.EMAIL || "test@gmail.com",  > default 값 설정
        //   MB_ST: oBody.MB_ST
        // }

        oDataModel.update(`/MemberSet('${oBody.MB_ID}')`, oBody, {
          success: function () {
            sap.m.MessageToast.show("데이터 변경 완료");
          },
        });
      },
      // DELETE 요청 : /EntitySetname('keyValue')
      onDelete: function () {
        let oTable = this.byId("idMemberSetTable");
        let sValue = oTable.getSelectedContexts()[0].getObject().MB_ID;
        let oDataModel = this.getOwnerComponent().getModel(); // ODATA MODEL
        let sPath = oDataModel.createKey("/MemberSet", {
          MB_ID: sValue,
        }); // "/MemberSet('10000001')" 과 동일

        oDataModel.remove(sPath, {
          success: function () {
            sap.m.MessageToast.show("데이터 삭제 완료");
            oDataModel.refresh(true); // optional. 모델 리프레쉬
          },
        });
      },
    });
  }
);
