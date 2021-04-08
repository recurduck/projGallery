'use strict'

console.log('utilUploaded')

// return Array with num from min to max
function listNums(minNum,maxNum) {
    var nums = [];
    for (var i = minNum; i <= maxNum; i++) {
        nums.push(i);
    }
    return nums;    
}

function getRandomInt(minNum, maxNum) {
    
}

// return Shuffeled Array from min to max
function createNumbersArray(min, max) {
    var numbers = [];
    for (var i = min; i <= max; i++) {
        numbers.push(i);
    }
    for (var i = numbers.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[rand]] = [numbers[rand], numbers[i]]
    }
    return numbers;
}