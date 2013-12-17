function Sum(sum, correctAnswer) {
    this.sum = sum;
    this.correctAnswer = correctAnswer;
}

function SumProvider() {
    var random = function (minX, max) {
        var range = max + 1 - minX;
        return minX + Math.floor(Math.random() * range);
    };

    var createAddition = function ($this, max, divide) {
        var firstNumber = random(1, max) / divide;
        var secondNumber = random(1, max) / divide;
        var correctAnswer = (firstNumber + secondNumber).toFixed(1);
        var sum = firstNumber + " + " + secondNumber + " = ";
        return new Sum(sum, correctAnswer);
    };

    this.createSimpleAddition = function ($this) {
        return createAddition($this, 10, 1);
    };

    this.createDecimalAddition = function ($this) {
        return createAddition($this, 100, 10);
    };

    this.createSubtraction = function ($this) {
        var firstNumber = random(1, 10);
        var secondNumber = random(1, 10);
        if (secondNumber > firstNumber) {
            var x = firstNumber;
            firstNumber = secondNumber;
            secondNumber = x;
        }
        var correctAnswer = firstNumber - secondNumber;
        var sum = firstNumber + " - " + secondNumber + " = ";
        return new Sum(sum, correctAnswer);
    };
}

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

