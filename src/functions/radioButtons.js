const {drawRect, drawEllipse, drawText, drawPath, createGroup, getParentCoordinates, positionLayers, moveToParentCenter} = require('../helpers/drawingHelpers.js');

const {octaneBlue, darkBlue, white, black, negativeRed} = require('../constants/colors.js');
const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');
const {checkWhitePath} = require('../constants/icons.js');

const radioButtonWidth = 14;
const radioButtonSelectionWidth = 6;
const radioButtonBorderColor = "#AAAAAA";
const radioButtonSelectedColor = octaneBlue;

const radioButtonLabelSize = 14;
const radioButtonLabelColor = "#555555";
const radioButtonLabelMargin = 10;
const textMove = 2;

async function createRadioButton(selection, options) {    
   // First, we'll get the parent coordinates, so we can move shit around later
   var parentCoordinates = getParentCoordinates(selection);
   
   var radioButtonBackground = drawEllipse({
      width: radioButtonWidth,
      height: radioButtonWidth,
      fill: "#ffffff",
      stroke: radioButtonBorderColor,
      name: "background"
   });

   selection.insertionParent.addChild(radioButtonBackground);

   var radioButtonSelected = drawEllipse({
      width: radioButtonSelectionWidth,
      height: radioButtonSelectionWidth,
      fill: (options.checked ? radioButtonSelectedColor : white),
      stroke: null,
      name: "selector"
   });
   selection.insertionParent.addChild(radioButtonSelected);

   positionLayers({
      background: radioButtonBackground,
      foreground: radioButtonSelected
   });

   var radioButton = createGroup(selection, [radioButtonBackground, radioButtonSelected], "radio-button");

   var radioButtonLabel = drawText({
      textText: options.text,
      color: radioButtonLabelColor,
      size: radioButtonLabelSize
   });
   selection.insertionParent.addChild(radioButtonLabel);

   positionLayers({
      background: radioButton,
      foreground: radioButtonLabel,
      positionX: "left",
      yAdjust: textMove
   });

   radioButtonLabel.moveInParentCoordinates(radioButtonWidth + radioButtonLabelMargin, 0);

   createGroup(selection, [radioButton, radioButtonLabel], "radio-button");


   moveToParentCenter(selection, parentCoordinates);
}

module.exports = createRadioButton;