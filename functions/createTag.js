const {drawRect, drawEllipse, drawText, drawLine, drawPath} = require('../helpers/drawingHelpers');
const {drawDivider} = require('../helpers/commonElements');
const {createGroup, getParentBounds, moveToParentCenter, positionLayers} = require('../helpers/layerHelpers');
const {stringToArray} = require('../helpers/utilities');
const {octaneBlue, darkBlue, okGreen, warningOrange, white, whiteF9, gray5, black, negativeRed} = require('../constants/colors');
const {metricHPE, metricHPEMoveFacor} = require('../constants/typography');
const {} = require('../constants/iconPaths');

const tagHeight = 20;
const tagPaddingX = 8;
const tagBorderColor = "#dddddd";
const tagBorderRadius = 5;
const tagFontSize = 13;
const tagFontColor = "#333333";
const tagFontStyle = "Regular";
const tagSelectedBgColor = octaneBlue;
const tagSelectedFontColor = white;

async function createThing(selection, options) {
   const parentBounds = getParentBounds(selection);

   //Now we'll draw the background
   var tagBackground = drawRect({
      width: 1,
      height: tagHeight,
      fill: (options.checked ? tagSelectedBgColor : white),
      stroke: tagBorderColor,
      strokeEnabled: (options.checked ? false : true),
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

   moveToParentCenter(selection, parentBounds)
}

module.exports = createThing;