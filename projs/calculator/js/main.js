'use strict'

console.log('Calculator')

var gApp
var gButtons = ['C', 'M', '%', '÷', '7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '±', '0', '.', '=']
var gScreen = { show: '0', action: '', allClear: true, float: false };
var gAction = ''
var gFirstNum = '';
var gMemoNum = '';

function init() {
    gApp = document.querySelector('.app');
    renderCalcolator()
}

function pressed(Btn, keyBoard = false) {
    var value = (keyBoard) ? Btn : Btn.innerText;
    if (value.charCodeAt() >= 49 && value.charCodeAt() <= 57) { if (gScreen.allClear) { gScreen.show = value; gScreen.allClear = false; } else gScreen.show += value;
    }else {
        switch (value) {
        case 'C': gScreen.show = '0'; gScreen.action = ''; gScreen.allClear = true; gFirstNum = ''; gMemoNum = ''; break;
        case '±': if (!gScreen.allClear) gScreen.show = -gScreen.show; break;
        case '.': gScreen.allClear = false; gScreen.float = true; gScreen.show += value; break;
        case '%': if (!gScreen.allClear) { (!gFirstNum) ? gFirstNum = +gScreen.show : gFirstNum = result(gFirstNum, +gScreen.show); gScreen.action = '%'; gScreen.allClear = true; } break;
        case '÷': if (!gScreen.allClear) { (!gFirstNum) ? gFirstNum = +gScreen.show : gFirstNum = result(gFirstNum, +gScreen.show); gScreen.action = '/'; gScreen.allClear = true; } break;
        case 'X': if (!gScreen.allClear) { (!gFirstNum) ? gFirstNum = +gScreen.show : gFirstNum = result(gFirstNum, +gScreen.show); gScreen.action = 'X'; gScreen.allClear = true; } break;
        case '+': if (!gScreen.allClear) { (!gFirstNum) ? gFirstNum = +gScreen.show : gFirstNum = result(gFirstNum, +gScreen.show); gScreen.action = '+'; gScreen.allClear = true; } break;
        case '-': if (!gScreen.allClear) { (!gFirstNum) ? gFirstNum = +gScreen.show : gFirstNum = result(gFirstNum, +gScreen.show); gScreen.action = '-'; gScreen.allClear = true; } break;
        case '0': if (gScreen.allClear) { gScreen.show = value; gScreen.allClear = false; } else if (gScreen.show != '0') gScreen.show += value; break;
        case '=': if (!gScreen.allClear) gScreen.show = result(gFirstNum, +gScreen.show); gFirstNum = ''; break;
        case 'M': if (!gMemoNum) { gMemoNum = +gScreen.show } else { if (!gScreen.action) { gScreen.show = gMemoNum } else { gScreen.show = result(gFirstNum, gMemoNum); gMemoNum = ''; } }
        }
    }
    updateScreen()
}

function updateScreen() {
    document.querySelector('.screen').innerText = gScreen.show;
}

function result(num1, num2) {
    var result = null
    switch (gScreen.action) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '/': result = num1 / num2; break;
        case 'X': result = num1 * num2; break;
        case '%': result = num1 * (num2 / 100); break;
    }
    gScreen.show = String(result);
    updateScreen();
    return result;

}

function handleKey(ev) {
    console.log('ev:', ev);
    switch (ev.key) {
        case '*': pressed('X', true); break;
        case 'Enter': pressed('=', true); break;
        case 'Escape': pressed('C', true); break;
        case 'm': pressed('M', true); break;
        default: pressed(ev.key, true);
    }    
}

function renderCalcolator() {
    var strHtml = `<div class="calculator"><table><tr><th colspan="4"><div class="screen">${gScreen.show}</div></th></tr>`;
    for (var i = 0, k = 0; i < 5; i++) {
        strHtml += `<tr>`;
        for (var j = 0; j < 4; k++, j++) {
            strHtml += `<th><button onclick="pressed(this)">${gButtons[k]}</button></th>`;
        }
        strHtml += `</tr>`;
    }
    strHtml += `</table></div>`;
    gApp.innerHTML = strHtml;
}
