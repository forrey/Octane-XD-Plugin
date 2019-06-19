const {drawRect, drawText, drawLine, drawPath, positionLayers, createGroup, getParentCoordinates, moveToParentCenter} = require('../helpers/drawingHelpers.js');

//const {octaneBlue, darkBlue, white, black, negativeRed} = require('../constants/colors.js');
//const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');

const defaultSearchWidth = 200;
const searchHeight = 30;
const searchPadding = 8;
const searchFontSize = 13;
const searchFontColor = "#aaaaaa";
const searchBorder = "#dddddd";
const textYAdjust = 3;
const searchIconPath = "M6,1a5,5,0,1,0,5,5A5,5,0,0,0,6,1Zm0,9a4,4,0,1,1,4-4A4,4,0,0,1,6,10Zm6.5,1H12L10.71,9.71a6.143,6.143,0,0,1-1,1L11,12v.5L13.5,15,15,13.5Z";

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