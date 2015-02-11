
function QuizController($scope) {
    var correctAnswer;
    var sumProvider = new SumProvider();
    $scope.correct = 0;
    $scope.incorrect = 0;
    $scope.sum = "";
    $scope.answer = "";
    $scope.message = "";

    var random = function (minX, max) {
        var range = max + 1 - minX;
        return minX + Math.floor(Math.random() * range);
    };

    var loadSum = function (sum) {
        $scope.sum = sum.sum;
        correctAnswer = sum.correctAnswer;
        $scope.answer = "";
    }


    $scope.submit = function () {
        if ((Math.abs($scope.answer - correctAnswer) < 0.000001)) {
            $scope.message = "well done! let's try another.";
            $scope.correct += 1;
            $scope.createSum();
        } else {
            $scope.message = "Sorry, that's the wrong answer! try again.";
            $scope.incorrect += 1;
            $scope.answer = "";
        }
        $('[ng-model="answer"]').focus();
    };



    $scope.problemTypes = [{
        builder: sumProvider.createSimpleAddition,
        name: "Simple Addition",
        selected: true
    }, {
        builder: sumProvider.createDecimalAddition,
        name: "Decimal Addition",
        selected: true
    }, {
        builder: sumProvider.createSubtraction,
        name: "Simple Subtraction",
        selected: true
    }, {
        builder: sumProvider.createMultiplication,
        name: "Multiplication",
        selected: true
    }, {
        builder: sumProvider.createHalf,
        name: "Halves",
        selected: true
    }, {
        builder: sumProvider.createRounding,
        name: "Round to nearest 10",
        selected: true
    }, {
        builder: sumProvider.createDecimalRounding,
        name: "Round to nearest whole number",
        selected: true
    },

    ];

    $scope.createSum = function () {
        var builders = [];
        for (var n = 0; n < $scope.problemTypes.length; n++) {
            var pt = $scope.problemTypes[n];
            if (pt.selected) {
                builders.push(pt.builder);
            }
        }

        var index = random(0, builders.length - 1);
        var builder = builders[index];
        var sum = builder(this);
        loadSum(sum);

    };

    $scope.createSum();
}

