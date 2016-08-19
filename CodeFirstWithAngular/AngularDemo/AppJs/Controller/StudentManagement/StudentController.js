(function () {
    'use strict';
    app.controller('StudentController', ['$scope', 'StudentService', 'AuthData', '$location', '$uibModal', 'uiGridConstants', function ($scope, studentService, authData, $location, $uibModal, uiGridConstants) {
        $scope.studentModel = []
        var paginationOptions = {
            pageNumber: 1,
            pageSize: 10,
            sort: null,
            sortBy: 'StudentID'
        };
        var statusTemplate = '<button type="button" class="btn btn-default" ng-click="grid.appScope.add(lg,row.entity.StudentID)">Add</button> ';    /** <div> {{row.entity.StudentID}}</div>**/
        $scope.studentModel = {
            paginationPageSizes: [10, 20, 75],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableRowSelection: false,

            enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
            enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
            columnDefs: [
            { field: 'StudentID', displayName: 'No.' },
            { field: 'StudentName', displayName: 'Name' },
            { field: 'Height', displayName: 'Height' },
            {
                field: 'StudentID',
                displayName: 'status',
                cellTemplate: statusTemplate
            },
            {
                field: 'StudentID',
                displayName: 'Delete',
                cellTemplate: '<button class="btn primary" confirmed-click="grid.appScope.deleteRow(row.entity.StudentID)" ng-confirm-click="Are you sure you want to delete this record?">Delete</button>'
            }
            ]
        };



        $scope.studentModel.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                if (sortColumns.length == 0) {
                    paginationOptions.sort = null;
                    paginationOptions.sortBy = 'StudentID';
                } else {
                    paginationOptions.sort = sortColumns[0].sort.direction;
                    paginationOptions.sortBy = sortColumns[0].field;
                }
                $scope.getAllUser();
            });
            //gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            //    var msg = 'row selected ' + row.isSelected;
            //    console.log(msg);
            //});

            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                $scope.getAllUser();
            });
        }

        $scope.refresh = function () {
            $scope.getAllUser();
        }

        $scope.getAllUser = function () {
            studentService.getAllStudent(paginationOptions).then(function (response) {
                if (response.data != null) {
                    $scope.studentModel.totalItems = response.data[0].pageSortSearch.totalItems;
                }
                $scope.studentModel.data = response.data;
            });
        }


        $scope.getAllUser();
        $scope.deleteRow = function (id) {
            studentService.delete(id).then(function (respone) {
                $scope.getAllUser();
            });

        }

        $scope.add = function (size, id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'View/StudentManagement/StudentDetail.html',
                controller: 'StudentDetails',
                size: size,
                resolve: {
                    editId: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.getAllUser();
                $scope.gridApi.core.refresh();
            }, function () {

            });
        };
    }]);

    app.controller('StudentDetails', ['$scope', 'StudentService', '$uibModalInstance', 'editId', function ($scope, studentService, $uibModalInstance, editId) {
        $scope.studentModel = [];
        $scope.getStudent = function () {
            studentService.getUser(editId).then(function (response) {
                $scope.studentModel = response.data;
                if ($scope.studentModel.DateOfBirth == null)
                    $scope.today();
                else
                    $scope.studentModel.DateOfBirth = new Date($scope.studentModel.DateOfBirth);
            })
        };

        $scope.getStudent();

        $scope.ok = function () {
            studentService.save($scope.studentModel).then(function (response) {
                $uibModalInstance.close();
            });

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        $scope.today = function () {
            $scope.studentModel.DateOfBirth = new Date();
        };


        $scope.clear = function () {
            $scope.studentModel.DateOfBirth = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
              mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
          {
              date: tomorrow,
              status: 'full'
          },
          {
              date: afterTomorrow,
              status: 'partially'
          }
        ];

        function getDayClass(data) {
            var date = data.date,
              mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }



    }]);
})();

