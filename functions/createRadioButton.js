const {drawRect, drawEllipse, drawText, drawLine, drawPath} = require('../helpers/drawingHelpers');
const {drawDivider} = require('../helpers/commonElements');
const {createGroup, getParentBounds, moveToParentCenter, positionLayers} = require('../helpers/layerHelpers');
const {stringToArray} = require('../helpers/utilities');
const {octaneBlue, darkBlue, okGreen, warningOrange, white, whiteF9, gray5, black, negativeRed} = require('../constants/colors');
const {metricHPE, metricHPEMoveFacor} = require('../constants/typography');
const {} = require('../constants/iconPaths');

const radioButtonWidth = 14;
const radioButtonSelectionWidth = 6;
const radioButtonBorderColor = "#AAAAAA";
const radioButtonSelectedColor = octaneBlue;

const radioButtonLabelSize = 14;
const radioButtonLabelColor = "#555555";
const radioButtonLabelMargin = 10;
const textMove = 2;

async function createThing(selection, options) {
   const parentBounds = getParentBounds(selection);

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
      strokeEnabled: false,
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

   moveToParentCenter(selection, parentBounds)
}

module.exports = createThing;