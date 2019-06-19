const {drawRect, drawText, createGroup, getParentCoordinates, positionLayers, moveToParentCenter} = require('../helpers/drawingHelpers.js');

const {octaneBlue, darkBlue, white, black, negativeRed} = require('../constants/colors.js');
const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');

const tagHeight = 20;
const tagPaddingX = 8;
const tagBorderColor = "#dddddd";
const tagBorderRadius = 5;
const tagFontSize = 13;
const tagFontColor = "#333333";
const tagFontStyle = "Regular";
const tagSelectedBgColor = octaneBlue;
const tagSelectedFontColor = white;

async function createTag(selection, options) {    
    //First, we'll get the parent coordinates, so we can move shit around later
    var parentCoordinates = getParentCoordinates(selection);

    //Now we'll draw the background
    var tagBackground = drawRect({
       width: 1,
       height: tagHeight,
       fill: (options.checked ? tagSelectedBgColor : white),
       stroke: (options.checked ? null : tagBorderColor),
       borderRadius: tagBorderRadius,
       name: "bg"
    });

    selection.insertionParent.addChild(tagBackground);
    
    //And now the text
    var tagText = drawText({
       textText: options.text,
       color: (options.checked ? tagSelectedFontColor : tagFontColor),
       size: tagFontSize,
       style: tagFontStyle
   });

   selection.insertionParent.addChild(tagText);

   //Size the background according to the text width + padding
   tagBackground.width = tagText.localBounds.width + (tagPaddingX * 2);

   positionLayers({
      background: tagBackground,
      foreground: tagText,
      yAdjust: 2
   });

   createGroup(selection, [tagText, tagBackground], "tag");

   moveToParentCenter(selection, parentCoordinates);
}

module.exports = createTag;