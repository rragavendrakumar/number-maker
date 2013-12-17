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

    this.createMultiplication = function ($this) {
        var firstNumber = random(1, 10);
        var secondNumber = random(2, 10);
        var correctAnswer = firstNumber * secondNumber;
        var sum = firstNumber + " x " + secondNumber + " = ";
        return new Sum(sum, correctAnswer);
    };

    this.createHalf = function ($this) {
        var firstNumber = random(1, 10);
        var correctAnswer = firstNumber;
        var sum = "Half of " + (firstNumber * 2) + " = ";
        return new Sum(sum, correctAnswer);
    };

    this.createRounding = function ($this) {
        var firstNumber = random(1, 100);
        var remainder = firstNumber % 10;
        var correctAnswer;
        if (remainder >= 5) {
            correctAnswer = firstNumber + 10 - remainder;
        } else {
            correctAnswer = firstNumber - remainder;
        }
        var sum = "What is " + firstNumber + " rounded to the nearest 10?";
        return new Sum(sum, correctAnswer);
    };

    this.createDecimalRounding = function ($this) {
        var firstNumber = random(1, 100);
        var remainder = firstNumber % 10;
        var correctAnswer;
        if (remainder >= 5) {
            correctAnswer = firstNumber + 10 - remainder;
        } else {
            correctAnswer = firstNumber - remainder;
        }
        correctAnswer = correctAnswer / 10;
        firstNumber = firstNumber / 10;
        var sum = "What is " + firstNumber + " rounded to the nearest whole number?";
        return new Sum(sum, correctAnswer);
    };
}
