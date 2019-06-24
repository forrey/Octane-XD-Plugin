const {drawRect, drawEllipse, drawText, drawLine, drawPath} = require('../helpers/drawingHelpers');
const {drawDivider} = require('../helpers/commonElements');
const {createGroup, getParentBounds, moveToParentCenter, positionLayers} = require('../helpers/layerHelpers');
const {} = require('../helpers/utilities');
const {octaneBlue, darkBlue, okGreen, warningOrange, white, whiteF9, gray5, black, negativeRed} = require('../constants/colors');
const {metricHPE, metricHPEMove} = require('../constants/typography');

const buttonPadding = 12;
const defaultButtonWidth = 80;
const buttonHeightNarrow = 26;
const buttonHeightStandard = 32;
const buttonHeightLarge = 42;
const buttonTextSize = 13;
const buttonBorderWidth = 2;

async function createButton(selection, options) {
   const parentBounds = getParentBounds(selection);
   

   let buttonFill;
   let buttonStroke;
   let buttonStrokeEnabled;
   let textColor;
   let buttonHeight;

   switch(options.type) {
      case "primary":
         switch(options.variation) {
            case "raised":
                  buttonFill = octaneBlue;
                  buttonStrokeEnabled = false;
                  textColor = white;
                  break;
            case "flat":
                  buttonFill = white;
                  buttonStrokeEnabled = false;
                  textColor = octaneBlue;
                  break;
         }
         buttonStroke = octaneBlue;
         break;
      case "secondary":
         switch(options.variation) {
            case "raised":
                  buttonStrokeEnabled = true;
                  break;
            case "flat":
                  buttonStrokeEnabled = false;
                  break;
         }
         buttonStroke = black;
         textColor = black;
         buttonFill = white;
         break;
      case "negative":
         switch(options.variation) {
            case "raised":
                  buttonFill = negativeRed;
                  textColor = white;
                  break;
            case "flat":
                  buttonFill = white;
                  textColor = negativeRed;
                  break;
         }
         buttonStrokeEnabled = false;
         break;
      case "accent":
         switch(options.variation) {
            case "raised":
                  buttonStrokeEnabled = true;
                  buttonStroke = darkBlue;
                  textColor = darkBlue;
                  break;
            case "flat":
                  buttonStrokeEnabled = false;
                  textColor = darkBlue;
                  break;
         }
         buttonFill = white;
         break;
   };

   switch(options.size) {
      case "narrow":
         buttonHeight = buttonHeightNarrow; 
         break;
      case "standard":
         buttonHeight = buttonHeightStandard;
         break;
      case "large":
         buttonHeight = buttonHeightLarge;
         break;
   };

   //Make the button's text, and get its size (so we can size the bg layer)
   var buttonText = drawText({
      textText: (options.text === "" ? "Button" : options.text), 
      color: textColor,
      align: "center",
      style: "Semibold",
      transform: "uppercase"
   });
   var buttonTextSize = buttonText.localBounds;
   
   //Make the background layer
   var buttonBackground = drawRect({
      width: buttonTextSize.width + (buttonPadding * 2), 
      height: buttonHeight, 
      fill: buttonFill, 
      stroke: buttonStroke, 
      strokeEnabled: buttonStrokeEnabled,
      name: "bg"
   });
   buttonBackground.strokeWidth = buttonBorderWidth;

   //Add them to the scenegraph
   selection.insertionParent.addChild(buttonBackground);
   selection.insertionParent.addChild(buttonText);

   positionLayers({
      background: buttonBackground,
      foreground: buttonText,
      yAdjust: metricHPEMove
   });

   createGroup(selection, [buttonBackground, buttonText], "button");
   moveToParentCenter(selection, parentBounds)
}

module.exports = createButton;