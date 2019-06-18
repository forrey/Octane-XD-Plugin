const {createRect, createText, createGroup, getParentCoordinates, moveToParentCenter} = require('./helpers.js');
const {white, whiteF9, gray5} = require('../constants/colors.js');
const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');
const {defaultShadow, defaultShadowColor} = require('../constants/shadows.js');

const defaultDropdownWidth = 140;
const defaultDropdownItemHeight = 22;


async function createDropdownMenu(selection) {
    //Show a prompt to get the number of items
    var promptResponse = await prompt("How many menu items will appear in the menu?","from 0-10","# of items");
    if(promptResponse.which === 0) {
        return;
    }
    // Save user response
    var numLines = parseInt(promptResponse.value);
    
    //Get the Parent coordinates
    var parentCoordinates = getParentCoordinates(selection);
    
    var menuBG = createRect(defaultDropdownWidth, 120, white, whiteF9, "bg");
    menuBG.shadow = defaultShadow;
    
    selection.insertionParent.addChild(menuBG);
    var menu = createGroup(selection, [menuBG], "menu");
    
    var i;
    var dropdownHeight = 0;
    // This is where it's breaking
    for (i=0; i<numLines; i++) {
        var menuAction = createDropdownMenuItem(selection, i);
        menu.insertionParent.addChild(menuAction);
    }
    
    //createGroup(selection, [menuAction, menuBG], "menu");
    
}

function createDropdownMenuItem(selection, i) {
    var itemBG = createRect(defaultDropdownWidth, defaultDropdownItemHeight, white, null, "menu-item__bg");
    var itemText = createText(`Action ${i}`,gray5,"left",13, metricHPE, "Regular", "titlecase");
    
    selection.insertionParent.addChild(itemBG);
    selection.insertionParent.addChild(itemText);
    
    itemText.moveInParentCoordinates(4, 15);
    
    var menuAction = createGroup(selection, [itemBG, itemText], "menu-action");
    
    selection.items[0].moveInParentCoordinates(0, defaultDropdownItemHeight*i);
}

module.exports = createDropdownMenu;