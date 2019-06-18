const {drawRect, drawText, createGroup, getParentCoordinates, moveToParentCenter} = require('../helpers/drawingHelpers.js');

const {octaneBlue, darkBlue, white, black, negativeRed} = require('../constants/colors.js');
const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');

const tabPaddingBottom = 12;
const tabPaddingRight = 24;
const selectionLineHeight = 3;
const selectedColor = "#000000";
const unselectedColor = "#888888";

async function createTabs(selection, options) {    
    var parentCoordinates = getParentCoordinates(selection);
    
    //Take the input (a string of text) and convert it to an array
    const stringToArray = require('../helpers/utilities.js');
    
    // Set the array of actions to a variable
    var tabs = stringToArray(options.tabs);
    var selectedTab = (options.selectedTab === '' ? 1 : parseInt(options.selectedTab));
        
    // We'll make an empty array. This will later be used to select everything we've made.
    var layersToGroup = [];
    
    var xMove = 0;
    var currentTab = 1;
    
    tabs.forEach((tab) => {
        //Take out any white space
        tab = tab.trim();

        //Now we'll draw the text, changing styles based on whether or not it's selected
        var tabText = drawText({
            textText: tab,
            color: (selectedTab === currentTab ? selectedColor : unselectedColor),
            size: 14,
            style: "Medium",
            transform: "uppercase"
        });
        
        selection.insertionParent.addChild(tabText);
        
        //Get the size of the text layer, so we can make the selection line the same size
        var textCoordinates = tabText.localBounds;
        
        //Now we'll make the selection line
        var tabLine = drawRect({
            width: textCoordinates.width,
            height: selectionLineHeight,
            fill: selectedColor,
            opacity: (selectedTab === currentTab ? 1 : 0),
            stroke: null,
            name: "selection-line"
        });
        
        selection.insertionParent.addChild(tabLine);
        tabLine.moveInParentCoordinates(0, textCoordinates.y + textCoordinates.height + tabPaddingBottom);
        
        //Group the text and line
        createGroup(selection, [tabText, tabLine], "tab");

        //Now we assign the selection to a variable so we can move it and add it to the layersToGroup Array
        var newTab = selection.items[0];
        newTab.moveInParentCoordinates(xMove,0);
        
        layersToGroup.push(newTab);
        
        //Now we'll increment our counters
        currentTab += 1;
        xMove += textCoordinates.width + tabPaddingRight;
    });
    
    //Now we'll select our layers to group, and group them
    selection.items = layersToGroup;
    createGroup(selection, layersToGroup, "tabs");
    
    //And we'll move them to the center
    moveToParentCenter(selection, parentCoordinates);
}

module.exports = createTabs;