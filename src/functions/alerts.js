const {drawRect, drawText, drawPath, createGroup, getParentCoordinates, moveToParentCenter, positionLayers} = require('../helpers/drawingHelpers.js');
const {okIconPath, warningIconPath, closeIconPath} = require('../constants/icons.js');

const {octaneBlue, darkBlue, white, black, negativeRed, okGreen, warningOrange} = require('../constants/colors.js');
const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');

const minAlertWidth = 520;
const minAlertHeight = 46;
const alertTextSize = 14;
const alertTextColor = "#555555";
const alertBorderColor = octaneBlue;
const alertPaddingX = 14;
const alertPaddingY = 18;
const alertIconContainerSize = 24;
const hpeTextMove = 2;
const isMultiLine = false;

async function createAlert(selection, options) {    
   // First, we'll get the parent coordinates, so we can move shit around later
   var parentCoordinates = getParentCoordinates(selection);
   
   var layersToGroup = [];

   //Draw the background
   //For now, we'll use the minimum height. Later we'll adjust based on the text height
   var alertBackground = drawRect({
      width: minAlertWidth,
      height: minAlertHeight,
      stroke: alertBorderColor,
      name: "bg"
   });
   selection.insertionParent.addChild(alertBackground);
   layersToGroup.push(alertBackground);

   //Now we'll make a background layer for the icon (this is to keep everything nice & centered for different icon sizes)
   var alertIconBackground = drawRect({
      width: alertIconContainerSize,
      height: alertIconContainerSize,
      stroke: null,
      opacity: 0,
      name: "icon-bg"
   });
   selection.insertionParent.addChild(alertIconBackground);

   //And we'll draw the icon
   var alertIconPath;
   var alertIconColor;

   if (options.type === "confirmation") {
      alertIconPath = okIconPath;
      alertIconColor = okGreen;
   } else if (options.type === "warning") {
      alertIconPath = warningIconPath;
      alertIconColor = warningOrange;
   }

   var alertIcon = drawPath({
      path: alertIconPath,
      color: alertIconColor
   });
   selection.insertionParent.addChild(alertIcon);

   //Center the icon in its container
   positionLayers({
      background: alertIconBackground,
      foreground: alertIcon
   });

   //Group the icon & its background
   var iconGroup = createGroup(selection, [alertIconBackground, alertIcon], "alert-icon");
   layersToGroup.push(iconGroup);



   //Now we'll make the close icon
   var closeIcon = drawPath({
      path: closeIconPath
   });
   selection.insertionParent.addChild(closeIcon);
   layersToGroup.push(closeIcon);



   //Now the text
   //If the user submits the form with the enter key, there will be a line break at the end of the text. 
   //We want to remove it so there isn't blank space below the text.
   var messageText = options.message.trimRight("\n");

   var alertText = drawText({
      textText: messageText,
      color: alertTextColor,
      size: alertTextSize
   });

   selection.insertionParent.addChild(alertText);
   layersToGroup.push(alertText);

   //Now we'll get the text width and turn it into a text Area
   var textWidth = minAlertWidth - ((alertIconContainerSize + (alertPaddingX * 2)) + (closeIcon.localBounds.width + (alertPaddingX * 2)));
   alertText.areaBox = {width: textWidth, height: alertText.localBounds.height};

   //Now that it's a text area, it's possible the text is clipped. So we need to adjust it's height until all the text shows.
   var oldTextHeight = alertText.localBounds.height;
   var newTextHeight = oldTextHeight;
   while (alertText.clippedByArea) { 
      newTextHeight += 1;
      alertText.areaBox = {width: textWidth, height: newTextHeight};
   };

   //Based on the new text height, we need to adjust the background layer's size
   //But only if the text is actually multi-line
   if(newTextHeight !== oldTextHeight) {
      alertBackground.height = newTextHeight + (alertPaddingY * 2);
   }

   //Now we'll start positioning stuff
   positionLayers({
      background:alertBackground,
      foreground: alertText,
      positionX: "left",
      positionY: "top",
      xAdjust: alertIconContainerSize + (alertPaddingX * 2),
      yAdjust: alertPaddingY
   });

   positionLayers({
      background: alertBackground,
      foreground: iconGroup,
      positionX: "left",
      xAdjust: alertPaddingX
   });

   positionLayers({
      background: alertBackground,
      foreground: closeIcon,
      positionX: "right",
      positionY: "top",
      xAdjust: alertPaddingX,
      yAdjust: alertPaddingY
   });
   

   createGroup(selection, layersToGroup, "alert");
   moveToParentCenter(selection, parentCoordinates);
}

module.exports = createAlert;