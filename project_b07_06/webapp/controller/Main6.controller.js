sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Fragment, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("projectb0706.controller.Main6", {
      formatter: {
        fnDateString: function (oDate) {
          // return oDate.getFullYear() + "-" + (oDate.getMonth() + 1) + "-" + oDate.getDate();
          let oDateTimeInstance =
            sap.ui.core.format.DateFormat.getDateTimeInstance({
              pattern: "yyyy-MM-dd",
            });
          return oDateTimeInstance.format(oDate);
        },
      },
      onInit: function () {},

      onValueHelp: function (oEvent) {
        // fragment를 Core에 붙임 ( Core 밑에 View 가 있음)
        // Core를 불러옴
        // Core에 붙이기 떄문에 getView 후 open 전 setModel 해야함
        var oDialog = sap.ui.getCore().byId("idDialog");
        var oModel = this.getView().getModel();
        if (!oDialog) {
          Fragment.load({
            name: "projectb0706.view.fragment.Order",
            type: "XML",
            controller: this,
          }).then(function (oDialog) {
            oDialog.setModel(oModel);
            oDialog.open();
          });
        } else {
          oDialog.open();
        }

        // view에 바로붙임 (this 사용)
        // var oDialog = this.byId("idDialog");

        // if (!oDialog) {
        //   this.loadFragment({
        //     name: "projectb0706.view.fragment.Order",
        //     type: "XML",
        //     controller: this,
        //   }).then(function (oDialog) {
        //     oDialog.open();
        //   });
        // } else {
        //   oDialog.open();
        // }
      },

      onClose: function (oEvent) {
        sap.ui.getCore().byId("idDialog");
        var oButton = oEvent.getSource();
        var oDialog = oButton.getParent();
        oDialog.close();
      },
      onBeforeOpen: function () {
        var oTable = sap.ui.getCore().byId("idOrderTable");
        var aFilters = [
          new Filter({
            path: "EmployeeID",
            operator: FilterOperator.GE, //"GE"
            value1: 4,
            // value2: 23.0,
          }),
          new Filter({
            path: "CustomerID",
            operator: FilterOperator.Contains, //"Contains"
            value1: "R",
          }),
        ];

        // var oFilter = new Filter({
        //   path: "EmployeeID",
        //   operator: FilterOperator.GE, //"GE"
        //   value1: 4,
        // value2: 23.0,
        // });

        // oTable의 row에 바인딩된 정보를 가져와서
        // 바인딩 정보 중 filter 안에 필터 객체 추가
        // => 이때 filter()안에는 object 또는 Array 형태가 들어갈 수 있음
        // oTable.getBinding('rows').filter()=> 이렇게 하면 필터 초기화

        // oTable.getBinding("rows").filter(oFilter);
        oTable.getBinding("rows").filter(aFilters);
      },

      onSearch: function () {
        debugger;
        var oTable = this.byId("idProductsTable");
        var oInput = this.byId("idInput").getValue();
        var oInput2 = this.byId("idInput2").getValue();
        var oInput3 = this.byId("inputDate");
        var aFilters = [];

        if (oInput) {
          aFilters.push(
            new Filter({
              path: "OrderID",
              operator: "EQ",
              value1: oInput,
              value2: "",
            })
          );
        }
        if (oInput2) {
          aFilters.push(
            new Filter({
              path: "CustomerID",
              operator: "EQ",
              value1: oInput2,
              value2: "",
            })
          );
        }
        if (oInput3.getDateValue() && oInput3.getSecondDateValue()) {
          aFilters.push(
            new Filter({
              path: "OrderDate",
              operator: "BT",
              value1: oInput3.getDateValue(),
              value2: oInput3.getSecondDateValue(),
            })
          );
        }
        oTable
          .getBinding("items")
          .filter((aFilters.length && aFilters) || undefined);

        // var oFilter;
        // if (oInput) {
        //   oFilter = new Filter({
        //     path: "OrderID",
        //     operator: "EQ",
        //     value1: oInput,
        //   }),
        // }

        // oTable.getBinding("items").filter([oFilter]);
      },
      onNavDetail: function () {
        //Detail.view.xml 화면으로 이동
        var oRouter = this.getOwnerComponent().getRouter();
        // oRouter.navTO(/* 라우트 객체이름)
        oRouter.navTo("RouteDetail", {
          paramOrder: "OrderID",
          param2: "Option",
        });
      },
      onSelectionChange: function (oEvent) {
        // Bindingcontext 에서 경로를 가져올 수 있다.
        var sPath = oEvent.getParameters().listItem.getBindingContextPath();
        var oModel = this.getView().getModel();
        var oRouter = this.getOwnerComponent().getRouter();
        var oItem = oModel.getProperty(sPath);

        oRouter.navTo("RouteDetail", {
          paramOrder: oItem.OrderID,
        });
        //oDataModel.getProperty(경로) 해서 한 건의 데이터 전체 가져오기
        // 전체데이터.OrderID를 통해 OrderID 값을 얻을 수 있다.

        // Detail 화면으로 이동
        // 이동 시, 해당 ORderID를 필수 파라미터로 포함

        // 테스트는 Detail 라우터의 URL에 OrderID 값이 잘 들어오는 지 확인
      },

      onValueHelp2: function (oEvent) {
        var oDialog = sap.ui.getCore().byId("idDialog2");
        var oModel = this.getView().getModel();
        if (!oDialog) {
          Fragment.load({
            name: "projectb0706.view.fragment.CustomerID",
            type: "XML",
            controller: this,
          }).then(function (oDialog) {
            oDialog.setModel(oModel);
            oDialog.open();
          });
        } else {
          oDialog.open();
        }
      },
      onBeforeOpen2: function () {
        var oTable = sap.ui.getCore().byId("idOrderTable2");
        var oFilter = [
          new Filter({
            path: "Country",
            operator: FilterOperator.Contains, //"Contains"
            value1: "G",
          }),
        ];
        oTable.getBinding("rows").filter(oFilter);
      },
    });
  }
);
