const {drawRect, drawEllipse, drawText, drawPath, createGroup, getParentCoordinates, positionLayers, moveToParentCenter} = require('../helpers/drawingHelpers.js');

const {octaneBlue, darkBlue, white, black, negativeRed} = require('../constants/colors.js');
const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');
const {checkWhitePath} = require('../constants/icons.js');

const checkboxWidth = 14;
const checkboxBorderColor = "#555555";
const checkboxCheckedColor = octaneBlue;

const checkboxLabelSize = 14;
const checkboxLabelColor = "#555555";
const checkboxLabelMargin = 10;
const textMove = 2;

async function createCheckbox(selection, options) {    
   // First, we'll get the parent coordinates, so we can move shit around later
   var parentCoordinates = getParentCoordinates(selection);
   
   var checkboxBackground = drawRect({
      width: checkboxWidth,
      height: checkboxWidth,
      fill: (options.checked ? checkboxCheckedColor : white),
      stroke: (options.checked ? null : checkboxBorderColor),
      name: "checkbox-background"
   });

   selection.insertionParent.addChild(checkboxBackground);

   var checkboxCheck = drawPath({
      path: checkWhitePath,
      color: "#ffffff"
   });

   selection.insertionParent.addChild(checkboxCheck);

   positionLayers({
      background: checkboxBackground,
      foreground: checkboxCheck
   });

   var checkBox = createGroup(selection, [checkboxBackground, checkboxCheck], "checkbox");

   var checkboxLabel = drawText({
      textText: options.text,
      color: checkboxLabelColor,
      size: checkboxLabelSize
   });
   selection.insertionParent.addChild(checkboxLabel);

   positionLayers({
      background: checkBox,
      foreground: checkboxLabel,
      positionX: "left",
      yAdjust: textMove
   });

   checkboxLabel.moveInParentCoordinates(checkboxWidth + checkboxLabelMargin, 0);

   createGroup(selection, [checkBox, checkboxLabel], "checkbox");


   moveToParentCenter(selection, parentCoordinates);
}

module.exports = createCheckbox;