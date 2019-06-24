const {drawRect, drawEllipse, drawText, drawLine, drawPath} = require('../helpers/drawingHelpers');
const {drawDivider} = require('../helpers/commonElements');
const {createGroup, getParentBounds, moveToParentCenter, positionLayers} = require('../helpers/layerHelpers');
const {octaneBlue, darkBlue, okGreen, warningOrange, white, whiteF9, gray5, black, negativeRed} = require('../constants/colors');
const {metricHPE, metricHPEMoveFacor} = require('../constants/typography');
const {} = require('../constants/iconPaths');

const tabPaddingBottom = 12;
const tabPaddingRight = 24;
const selectionLineHeight = 3;
const selectedColor = "#000000";
const unselectedColor = "#888888";

async function createThing(selection, options) {
   const parentBounds = getParentBounds(selection);

   // Set the array of actions to a variable
   const stringToArray = require('../helpers/utilities.js');
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
           strokeEnabled: false,
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

   moveToParentCenter(selection, parentBounds)
}

module.exports = createThing;