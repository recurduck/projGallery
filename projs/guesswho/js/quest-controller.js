'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  $('.game-start').hide();
  renderQuest();
  $('.quest').show();
}

function renderQuest() {
  var quest = getCurrQuest()
  $('.quest h2').text(quest.txt);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // TODO : make it UI
      alert('Yes, I knew it!');
      $('.quest').hide();
      onRestartGame();
    } else {
      // TODO : make it UI
      alert('I dont know...teach me!');
      $('.quest').hide();
      $('.new-quest').show();
    }
  } else {
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  $('#newGuess').val('') ;
  $('#newQuest').val('');
  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  resetGame();
  gLastRes = null;
}
