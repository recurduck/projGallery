var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var KEY = 'quests'

function createQuestsTree() {
    var quests = loadFromStorage(KEY);
    if (!quests) {
        quests = createQuest('Male?');
        quests.yes = createQuest('Gandhi');
        quests.no = createQuest('Rita');  
    }
    gQuestsTree = quests;
    _saveQuestsToStorage();
    resetGame();
}

function createQuest(txt, yes = null, no = null) {
    return {
        txt: txt,
        yes: yes,
        no: no
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest; 
    gCurrQuest = gPrevQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    var newQuest = createQuest(newQuestTxt, createQuest(newGuessTxt), gCurrQuest); 
    gPrevQuest[lastRes] = newQuest;
    _saveQuestsToStorage();
}

function getCurrQuest(){
    return gCurrQuest
}

function resetGame() {
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function _saveQuestsToStorage() {
    saveToStorage(KEY, gQuestsTree)
}