var app = angular.module("myApp",[]);

app.controller("subjectCtrl", function($scope, $http) {
    $scope.list_subject = [];
    $http.get('db/Subjects.js').then(function(reponse){
        $scope.list_subject = reponse.data;
    })
});