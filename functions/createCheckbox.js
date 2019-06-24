const {drawRect, drawEllipse, drawText, drawLine, drawPath} = require('../helpers/drawingHelpers');
const {drawDivider} = require('../helpers/commonElements');
const {createGroup, getParentBounds, moveToParentCenter, positionLayers} = require('../helpers/layerHelpers');
const {} = require('../helpers/utilities');
const {octaneBlue, darkBlue, okGreen, warningOrange, white, whiteF9, gray5, black, negativeRed} = require('../constants/colors');
const {metricHPE, metricHPEMoveFacor} = require('../constants/typography');
const {checkWhitePath} = require('../constants/iconPaths');

const checkboxWidth = 14;
const checkboxBorderColor = "#555555";
const checkboxCheckedColor = octaneBlue;

const checkboxLabelSize = 14;
const checkboxLabelColor = "#555555";
const checkboxLabelMargin = 10;
const textMove = 2;

async function createThing(selection, options) {
   const parentBounds = getParentBounds(selection);
   console.log(options);
   //First we create the background of the checkbox
   var checkboxBackground = drawRect({
      width: checkboxWidth,
      height: checkboxWidth,
      fill: (options.checked ? checkboxCheckedColor : white),
      stroke: checkboxBorderColor,
      strokeEnabled: (options.checked ? false : true),
      name: "checkbox-background"
   });
   selection.insertionParent.addChild(checkboxBackground);

   //Now we'll add the check icon to it
   var checkboxCheck = drawPath({
      path: checkWhitePath,
      color: "#ffffff"
   });
   selection.insertionParent.addChild(checkboxCheck);

   //Center the check icon over the background
   positionLayers({
      background: checkboxBackground,
      foreground: checkboxCheck
   });

   //Group the check icon and background
   var checkBox = createGroup(selection, [checkboxBackground, checkboxCheck], "checkbox");

   //Now we draw the text
   var checkboxLabel = drawText({
      textText: options.text,
      color: checkboxLabelColor,
      size: checkboxLabelSize
   });
   selection.insertionParent.addChild(checkboxLabel);

   //Now we position the text relative to the checkbox
   positionLayers({
      background: checkBox,
      foreground: checkboxLabel,
      positionX: "left",
      yAdjust: textMove
   });
   checkboxLabel.moveInParentCoordinates(checkboxWidth + checkboxLabelMargin, 0);

   //Group everything
   createGroup(selection, [checkBox, checkboxLabel], "checkbox");

   moveToParentCenter(selection, parentBounds)
}

module.exports = createThing;