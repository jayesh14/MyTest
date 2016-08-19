(function () {
    'use strict';
    app.controller('ProductController', ['$scope', 'ProductService', 'AuthData', '$location', '$uibModal', 'uiGridConstants', function ($scope, productService, authData, $location, $uibModal, uiGridConstants) {
        var paginationOptions = {
            pageNumber: 1,
            pageSize: 10,
            sort: null,
            sortBy: 'ProductID'
        };

        $scope.productModel = {
            enablePaginationControls: false,
            paginationPageSizes: [10, 20, 75],
            paginationPageSize: 10,
            paginationCurrentPage: 1,
            useExternalPagination: true,
            useExternalSorting: true,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
            enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
            columnDefs: [
            { field: 'ProductID', displayName: 'No.' },
            { field: 'ProductName', displayName: 'Name' },
            { field: 'Price', displayName: 'Height' },
            {
                field: 'ProductID',
                displayName: 'status',
                cellTemplate: '<button type="button" class="btn btn-default" ng-click="grid.appScope.add(lg,row.entity.ProductID)">Add</button> '
            },
            {
                field: 'ProductID',
                displayName: 'Delete',
                cellTemplate: '<button class="btn primary" confirmed-click="grid.appScope.deleteRow(row.entity.ProductID)" ng-confirm-click="Are you sure you want to delete this record?">Delete</button>'
            }
            ]
        };
        $scope.add = function (size, id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'View/ProductManagement/ProductDetail.html',
                controller: 'ProductDetails',
                size: size,
                resolve: {
                    editId: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.getAll();
            }, function () {

            });
        }
        $scope.getAll = function () {
            productService.getAll(paginationOptions).then(function (response) {
                if (response.data != null && response.data.length > 0) {
                    $scope.productModel.totalItems = response.data[0].pageSortSearch.totalItems;
                }
                $scope.productModel.data = response.data;
            });
        }

        $scope.goTO = function (no) {
            $scope.productModel.paginationCurrentPage = no;


        }

        $scope.getAll();

        $scope.productModel.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                if (sortColumns.length == 0) {
                    paginationOptions.sort = null;
                    paginationOptions.sortBy = 'StudentID';
                } else {
                    paginationOptions.sort = sortColumns[0].sort.direction;
                    paginationOptions.sortBy = sortColumns[0].field;
                }
                $scope.getAll();
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                $scope.getAll();
            });
        }
    }]);



    app.controller('ProductDetails', ['$scope', 'ProductService', '$uibModalInstance', 'editId', function ($scope, productService, $uibModalInstance, editId) {
        $scope.productModel = [];
        $scope.getProduct = function () {
            productService.getProduct(editId).then(function (response) {
                $scope.productModel = response.data;
            })
        };
        $scope.getProduct();

        $scope.ok = function () {
            productService.save($scope.productModel).then(function (response) {
                $uibModalInstance.close();
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
})();

