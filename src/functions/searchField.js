const {drawRect, drawText, drawLine, drawPath, positionLayers, createGroup, getParentCoordinates, moveToParentCenter} = require('../helpers/drawingHelpers.js');
const {searchIconPath} = require('../constants/icons.js');

//const {octaneBlue, darkBlue, white, black, negativeRed} = require('../constants/colors.js');
//const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');

const defaultSearchWidth = 200;
const searchHeight = 30;
const searchPadding = 8;
const searchFontSize = 13;
const searchFontColor = "#aaaaaa";
const searchBorder = "#dddddd";
const textYAdjust = 3;

async function createSearchField(selection, options) {  
   // First, we'll get the parent coordinates, so we can move shit around later
   var parentCoordinates = getParentCoordinates(selection);
    
   var layersToGroup = [];

   //Draw the background layer
   var searchBackground = drawRect({
      width: defaultSearchWidth,
      height: searchHeight,
      stroke: (options.variation === 'fullBorder' ? "#dddddd" : null),
      name: "bg"
   });

   selection.insertionParent.addChild(searchBackground);
   layersToGroup.push(searchBackground);

   //Now draw the placeholder text
   var searchText = drawText({
      textText: (options.placeholder === '' ? 'Search' : options.placeholder),
      color: searchFontColor,
      size: searchFontSize,
   });

   selection.insertionParent.addChild(searchText);
   layersToGroup.push(searchText);

   //Now draw the search icon
   var searchIcon = drawPath({
      path: searchIconPath
   });

   selection.insertionParent.addChild(searchIcon);
   layersToGroup.push(searchIcon);
   
   //If it doesn't have the full border, we'll draw a line for the bottom border
   if(options.variation === "bottomBorder") {

      var searchBottomBorder = drawLine({
         startX: 0,
         startY: searchHeight,
         endX: defaultSearchWidth,
         endY: searchHeight,
         color: searchBorder
      });

      selection.insertionParent.addChild(searchBottomBorder);
      layersToGroup.push(searchBottomBorder);
   }

   //Now we'll position stuff
   //Starting with the text
   positionLayers({
      background: searchBackground,
      foreground: searchText,
      positionX: "left",
      xAdjust: searchPadding,
      yAdjust: textYAdjust
   });

   //And moving on to the search icon
   positionLayers({
      background: searchBackground,
      foreground: searchIcon,
      positionX: "right",
      xAdjust: searchPadding
   })

   createGroup(selection, layersToGroup, "search-field");

   selection.width = 100;
   moveToParentCenter(selection, parentCoordinates);
}

module.exports = createSearchField;