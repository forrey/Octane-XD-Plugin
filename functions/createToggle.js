const {drawRect, drawEllipse, drawText, drawLine, drawPath} = require('../helpers/drawingHelpers');
const {drawDivider} = require('../helpers/commonElements');
const {createGroup, getParentBounds, moveToParentCenter, positionLayers} = require('../helpers/layerHelpers');
const {stringToArray} = require('../helpers/utilities');
const {octaneBlue, darkBlue, okGreen, warningOrange, white, whiteF9, gray5, black, negativeRed} = require('../constants/colors');
const {metricHPE, metricHPEMoveFacor} = require('../constants/typography');
const {} = require('../constants/iconPaths');

const toggleWidth = 30;
const toggleHeight = 16;
const toggleButtonSize = 12;
const toggleBorderRadius = toggleHeight / 2;

const toggleOnColor = octaneBlue;
const toggleOffColor = "#5D5C5C";
const toggleDisabledColor = "#cccccc";

const toggleButtonDisabledOpacity = 0.5;

const toggleLabelSize = 14;
const toggleLabelMargin = 10;
const toggleLabelYAdjust = 2;

async function createThing(selection, options) {
   const parentBounds = getParentBounds(selection);

   //Now we'll draw the toggle track (background)
   //First we select the right color based on the toggle state
   var toggleTrackFill;

   if (options.state === "on") {
      toggleTrackFill = toggleOnColor;
   } else if (options.state === "off") {
      toggleTrackFill = toggleOffColor;
   } else {
      toggleTrackFill = toggleDisabledColor;
   }

   var toggleTrack = drawRect({
      width: toggleWidth,
      height: toggleHeight,
      strokeEnabled: false,
      fill: toggleTrackFill,
      borderRadius: toggleBorderRadius
   });

   selection.insertionParent.addChild(toggleTrack);
   //layersToGroup.push(toggleTrack);

   //Now we'll draw the toggle button
   var toggleButton = drawEllipse({
      width: toggleButtonSize,
      height: toggleButtonSize,
      fill: "#ffffff",
      strokeEnabled: false,
      opacity: (options.state === "disabled" ? toggleButtonDisabledOpacity : 1),
      name: "toggle-button"
   });
   
   selection.insertionParent.addChild(toggleButton);
   //layersToGroup.push(toggleButton);

   //Now we center the button in the track and move it to it's proper location
   var toggleButtonMargin = (toggleHeight - toggleButtonSize) / 2;

   positionLayers({
      background: toggleTrack,
      foreground: toggleButton,
      positionX: (options.state === "on" ? "right" : "left"),
      xAdjust: toggleButtonMargin
   });

   var toggle = createGroup(selection, [toggleTrack, toggleButton], "toggle");

   //Now we draw the text label
   var toggleLabel = drawText({
      textText: options.label,
      size: toggleLabelSize
   });

   selection.insertionParent.addChild(toggleLabel);

   positionLayers({
      background: toggle,
      foreground: toggleLabel,
      positionX: "left",
      yAdjust: toggleLabelYAdjust
   });

   toggleLabel.moveInParentCoordinates(toggleWidth + toggleLabelMargin, 0);

   createGroup(selection, [toggle, toggleLabel], "toggle");

   moveToParentCenter(selection, parentBounds)
}

module.exports = createThing;