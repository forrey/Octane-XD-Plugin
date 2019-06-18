const {drawRect, drawText, drawDivider, createGroup, getParentCoordinates, moveToParentCenter, centerLayers, positionLayers} = require('../helpers/drawingHelpers.js');

const {white, whiteF9, gray5} = require('../constants/colors.js');
const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');
const {defaultShadow, defaultShadowColor} = require('../constants/shadows.js');

const minDropdownWidth = 140;
const dropdownActionHeight = 22;
const dropdownPadding = 8;
const dividerHeight = 10;


async function createDropdownMenu(selection, options) {   
    // First, we'll get the parent coordinates, so we can move shit around later
    var parentCoordinates = getParentCoordinates(selection);

    //Take the input (a string of text) and convert it to an array
    const stringToArray = require('../helpers/utilities.js');
    
    // Set the array of actions to a variable
    var actions = stringToArray(options.actions);
    
    // We'll make an empty array. This will later be used to select everything we've made.
    var layersToGroup = [];
    
    // Now we'll make the background layer. Later we'll size it depending on the number and size of the actions.
    var dropdownBackground = drawRect({
        width: minDropdownWidth,
        height: 0,
        stroke: null,
        name: "bg"
    });
    dropdownBackground.shadow = defaultShadow;
    
    //Now we'll add it to the scene graph and push it to the layersToGroup array
    selection.insertionParent.addChild(dropdownBackground);
    layersToGroup.push(dropdownBackground);
    
    // Now we're ready to start making the actions.
    // For each action, we'll move it down the height of the previous action
    var yMove = 0;
    var yMoveIncrement = 0;
    
    actions.forEach((action) => {
        //Take out any white space
        action = action.trim();
        
        if(action.toLowerCase() === "divider") {
            //We'll send stuff to the drawDivider function to make life easier.
            var divider = drawDivider({
                width: minDropdownWidth,
                height: dividerHeight,
                paddingX: dropdownPadding
            });
            
            var dividerBackground = divider[0];
            var dividerLine = divider[1];
            
            selection.insertionParent.addChild(dividerBackground);
            selection.insertionParent.addChild(dividerLine);
            
            createGroup(selection, [dividerBackground, dividerLine], "divider");
            
            yMoveIncrement = dividerHeight;
            
        } else if(action.length === 0) {
            yMoveIncrement = 0;
        } else {  
            var actionBackground = drawRect({
                width: minDropdownWidth,
                height: dropdownActionHeight,
                stroke: null,
                name: "bg"
            });
                        
            var actionText = drawText({
                textText: action
            });
            
            selection.insertionParent.addChild(actionBackground);
            selection.insertionParent.addChild(actionText);
            
            positionLayers({
                background: actionBackground,
                foreground: actionText,
                positionX: "left",
                positionY: "center",
                xAdjust: dropdownPadding,
                yAdjust: 2
            });
            
            
            //Group the lines together
            createGroup(selection, [actionBackground, actionText], "action");
            
            // Increment the yMoveActionHeight
            yMoveIncrement = dropdownActionHeight;
        } 
        
        // The group containing the new text + background is now selected.
        // Let's give this current selection a nice name
        // This will let us do stuff with it easier.
        var currentAction = selection.items[0];

        // Now we move it down, depending on how many actions came before it, and we'll increment the yMove variable.
        currentAction.moveInParentCoordinates(0,yMove);
        yMove += yMoveIncrement;
        
        // Now we add it to a layer so we can later select everything and group that shit.
        layersToGroup.push(currentAction);
    });
    
    // Now we need to properly size that background layer we made earlier
    dropdownBackground.height = yMove;
    
    // Now we'll select everything we made and group it
    selection.items = layersToGroup;
    createGroup(selection, layersToGroup, "dropdown-menu");
    
    // And we'll move everything to the center of the selection.
    moveToParentCenter(selection, parentCoordinates);
}

module.exports = createDropdownMenu;