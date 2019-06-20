const {drawRect, drawEllipse, drawText, drawPath, createGroup, getParentCoordinates, positionLayers, moveToParentCenter} = require('../helpers/drawingHelpers.js');

const {octaneBlue, darkBlue, white, black, negativeRed} = require('../constants/colors.js');
const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');

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
/*
const toggleSmallIndicatorSize = 16;
const toggleSmallIndicatorOnColor = "#80D4C0";
const toggleSmallIndicatorOffColor = "#AEADAD";
const toggleSmallIndicatorDisabledColor = "#BBBBBB";
*/

async function createToggle(selection, options) {    
   // First, we'll get the parent coordinates, so we can move shit around later
   var parentCoordinates = getParentCoordinates(selection);

   var layersToGroup = [];

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
      stroke: null,
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
      stroke: null,
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
   moveToParentCenter(selection, parentCoordinates);
}

module.exports = createToggle;