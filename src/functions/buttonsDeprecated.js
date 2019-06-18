const {createRect, createText, createGroup, getParentCoordinates, moveToParentCenter} = require('./helpers.js');
const {prompt} = require('../../lib/dialogs.js');
const {octaneBlue, white, black, negativeRed} = require('../constants/colors.js');
const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');
const {buttonPadding, defaultButtonWidth, defaultButtonHeight, buttonTextSize} = require('../constants/buttonStyles.js');

const defaultButtonText = "Button";

async function createButton(selection, type) {
    // Show a prompt and get the button text
    var promptResponse = await prompt("Button text","Enter text here, or leave blank for default 'Button'","Button Text");
    
    // If the user presses "cancel," end the button creation
    if(promptResponse.which === 0) {
        return;
    }
        
    // If the user left the field blank, use the default. Otherwise, use the entered value.
    var buttonLabel = (promptResponse.value === "") ? defaultButtonText : promptResponse.value;
    
    var parentCoordinates = getParentCoordinates(selection);
    
    var buttonFill;
    var buttonStroke;
    var textFill;
    var buttonName;
    
    switch(type) {
        case "primary":
            buttonFill = octaneBlue;
            buttonStroke = null;
            textFill = white;
            buttonName = "button--primary";
            break;
            
        case "secondary":
            buttonFill = white;
            buttonStroke = black;
            textFill = black;
            buttonName = "button--secondary";
            break;
            
        case "negative":
            buttonFill = negativeRed;
            buttonStroke = null;
            textFill = white;
            buttonName = "button--negative";
            break;
    }
    
    //Make the button's text, and get its size (so we can size the bg layer)
    var buttonText = createText(buttonLabel, textFill, "center", 13, metricHPE, "Semibold","uppercase");
    var buttonTextSize = buttonText.localBounds;
    
    //Make the background layer
    var buttonBackground = createRect(buttonTextSize.width + (buttonPadding * 2), defaultButtonHeight, buttonFill, buttonStroke, "bg");
    
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