'use strict'

console.log('Click the Numbers')

var gCounter = 1;
var gLevel = 4;
var gTimer

//load first time
var radio = document.querySelectorAll('input');
for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
        init(radio[i]);
        break;
    }    
}

function init(level) {
    gCounter = 1;
    gLevel = level.value;
    renderTable(level.value);
}

function renderTable(number) {
    var srtHtml = '';
    var numbers = createNumbersArray(1,number*number)
    for (var i = 0; i < number; i++) {
        srtHtml += '<tr>'
        for (var j = 0; j < number; j++) {
            srtHtml += `<td onclick="cellClicked(this)">${numbers.pop()}</td>`
        }
        srtHtml += '</tr>'
    }
    document.querySelector('.board').innerHTML = srtHtml;
}

function cellClicked(elCell) {
    if(gCounter === +elCell.innerText) {
        if(gCounter === 1)
            startTimer();
        if(gCounter === gLevel*gLevel)
            stopTimer();
        if(gCounter !== gLevel*gLevel)
            document.querySelector('.next span').innerText = gCounter+1
        else
            document.querySelector('.next span').innerText = 'Done!'

        gCounter++        
        elCell.style.backgroundColor = 'yellow';
    }
}

function startTimer() {
    var timer = document.querySelector('.timer span')
    var timeSec = 1;
    var timeMil = 0;  
    gTimer = setInterval(function() {
        timer.innerText = `${timeSec}.${timeMil}`
        timeMil++;
        if(timeMil > 100) {
            timeSec++;
            timeMil = 0;
        }
    },10)
}

function stopTimer() {
    clearInterval(gTimer);
}