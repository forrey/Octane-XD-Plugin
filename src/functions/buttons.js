const {drawRect, drawText, createGroup, getParentCoordinates, moveToParentCenter} = require('../helpers/drawingHelpers.js');

const {octaneBlue, darkBlue, white, black, negativeRed} = require('../constants/colors.js');
const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');

const buttonPadding = 12;
const defaultButtonWidth = 80;
const buttonHeightNarrow = 26;
const buttonHeightStandard = 32;
const buttonHeightLarge = 42;
const buttonTextSize = 13;
const buttonBorderWidth = 2;

const defaultButtonText = "Button";


async function createButton(selection, options) { 
    var parentCoordinates = getParentCoordinates(selection);
    
    var buttonColor;
    var buttonFill;
    var buttonStroke;
    var textColor;
    var buttonName;
    var buttonHeight;
    
    switch(options.type) {
        case "primary":
            switch(options.variation) {
                case "raised":
                    buttonFill = octaneBlue;
                    buttonStroke = null;
                    textColor = white;
                    break;
                case "flat":
                    buttonFill = white;
                    buttonStroke = null;
                    textColor = octaneBlue;
                    break;
            }
            buttonName = "button--primary";
            break;
        case "secondary":
            switch(options.variation) {
                case "raised":
                    buttonFill = white;
                    buttonStroke = black;
                    textColor = black;
                    break;
                case "flat":
                    buttonFill = white;
                    buttonStroke = null;
                    textColor = black;
                    break;
            }
            buttonName = "button--secondary";
            break;
        case "negative":
            switch(options.variation) {
                case "raised":
                    buttonFill = negativeRed;
                    buttonStroke = null;
                    textColor = white;
                    break;
                case "flat":
                    buttonFill = white;
                    buttonStroke = null;
                    textColor = negativeRed;
                    break;
            }
            buttonName = "button--negative";
            break;
        case "accent":
            switch(options.variation) {
                case "raised":
                    buttonFill = white;
                    buttonStroke = darkBlue;
                    textColor = darkBlue;
                    break;
                case "flat":
                    buttonFill = white;
                    buttonStroke = null;
                    textColor = darkBlue;
                    break;
            }
            buttonName = "button--accent";
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
        name: "bg"
    });
    buttonBackground.strokeWidth = buttonBorderWidth;
    
    //Insert them into the document
    selection.insertionParent.addChild(buttonBackground);
    selection.insertionParent.addChild(buttonText);
    
    //Get the values for centering the text (vertically & horrizontally)
    var moveTextX = (buttonText.localBounds.width/2)+((buttonBackground.localBounds.width - buttonText.localBounds.width)/2);
    var moveTextY = (buttonText.localBounds.height/2)+((buttonBackground.localBounds.height - buttonText.localBounds.height)/2);
    
    //Move the text (note)
    buttonText.moveInParentCoordinates(moveTextX, moveTextY+metricHPEMoveFactor);
    
    createGroup(selection, [buttonBackground, buttonText], buttonName);
    
    moveToParentCenter(selection, parentCoordinates);
}

module.exports = createButton;