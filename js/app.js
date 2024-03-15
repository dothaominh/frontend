var app = angular.module('myApp', []);

app.directive('quiz',function (quizFactory){
    return {
        restrict: 'AE',
        scope:{},
        templateUrl: 'template-quiz.html',
        link: function(scope, elem, attrs){
            scope.start = function(){
                scope.id = 0;
                scope.quizOver = false; //Chưa hoàn thành
                scope.inProgess = true;
                scope.getQuestion();
            };
            scope.reset = function(){
                scope.inProgess = false;
                scope.score = 0;
            };
            scope.getQuestion = function(){
                var quizz = quizFactory.getQuestion(scope.id);
                if (quizz) {
                    scope.question = quizz.Text;
                    scope.options = quizz.Answers;
                    scope.answer = quizz.AnswerId;
                    scope.answerMode = true;
                }else{
                    scope.quizOver = true;
                }
            }
            scope.checkAnswer = function(){
                // alert('answer');
                if (!$('input[name=answer]:checked').length) {
                    return;
                }else{
                    var ans = $('input[name=answer]:checked').val();
                }

                if (ans == scope.answer) {
                    // alert('đúng');
                    scope.score++;
                    scope.correctAns = true;
                } else {
                    // alert('sai');
                    scope.correctAns = false;
                }
                scope.answerMode = false;
            };
            scope.nextQuestion = function(){
                scope.id++;
                scope.getQuestion();
            };
            scope.reset();
        }
    }
});

app.factory('quizFactory', function($http){
    $http.get('../db/Quizs/ADAV.js').then(function(res){
        questions = res.data;
        // alert(questions.length);
    });
    return {
        getQuestion:function(id){
            var count = questions.length;
            if (count > 10) {
                count = 10;
            }
            if (id < count) {
                return questions[id];
            } else {
                return false;
            }
        }
    }
});