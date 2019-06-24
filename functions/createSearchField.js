const {drawRect, drawEllipse, drawText, drawLine, drawPath} = require('../helpers/drawingHelpers');
const {drawDivider} = require('../helpers/commonElements');
const {createGroup, getParentBounds, moveToParentCenter, positionLayers} = require('../helpers/layerHelpers');
const {stringToArray} = require('../helpers/utilities');
const {octaneBlue, darkBlue, okGreen, warningOrange, white, whiteF9, gray5, black, negativeRed} = require('../constants/colors');
const {metricHPE, metricHPEMoveFacor} = require('../constants/typography');
const {searchIconPath} = require('../constants/iconPaths');

const defaultSearchWidth = 200;
const searchHeight = 30;
const searchPadding = 8;
const searchFontSize = 13;
const searchFontColor = "#aaaaaa";
const searchBorder = "#dddddd";
const textYAdjust = 3;

async function createThing(selection, options) {
   const parentBounds = getParentBounds(selection);

   var layersToGroup = [];

   //Draw the background layer
   var searchBackground = drawRect({
      width: defaultSearchWidth,
      height: searchHeight,
      stroke: "#dddddd",
      strokeEnabled: (options.variation === 'fullBorder' ? true : false),
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

   moveToParentCenter(selection, parentBounds)
}

module.exports = createThing;