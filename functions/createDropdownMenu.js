const {drawRect, drawEllipse, drawText, drawLine, drawPath} = require('../helpers/drawingHelpers');
const {drawDivider} = require('../helpers/commonElements');
const {createGroup, getParentBounds, moveToParentCenter, positionLayers} = require('../helpers/layerHelpers');
const {stringToArray} = require('../helpers/utilities');
const {octaneBlue, darkBlue, okGreen, warningOrange, white, whiteF9, gray5, black, negativeRed} = require('../constants/colors');
const {metricHPE, metricHPEMoveFacor} = require('../constants/typography');
const {} = require('../constants/iconPaths');
const {defaultShadow} = require('../constants/shadows');

const minDropdownWidth = 140;
const dropdownActionHeight = 24;
const dropdownPadding = 4;
const dropdownActionPadding = 4;

const dividerHeight = 4;

const iconPlaceholderHeight = 12;
const iconPlaceholderWidth = 12;
const iconPlaceholderColor = "#dddddd";

async function createDropdownMenu(selection, options) {
    

   const parentBounds = getParentBounds(selection);
   
   // Set the array of actions to a variable
   var actions = stringToArray(options.actions);
   
   // We'll make an empty array. This will later be used to select everything we've made.
   var layersToGroup = [];
   

   // Now we'll make the background layer. Later we'll size it depending on the number and size of the actions.
   var dropdownBackground = drawRect({
       width: minDropdownWidth + (dropdownPadding * 2),
       height: 0,
       strokeEnabled: false,
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
               paddingX: dropdownActionPadding
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
           
           //Set an empty array. This will be used to add layers that will be grouped into an action
           var actionLayersToGroup = [];

           //Draw the background
           var actionBackground = drawRect({
               width: minDropdownWidth,
               height: dropdownActionHeight,
               strokeEnabled: false,
               name: "bg"
           });
                      
           //Draw the text
           var actionText = drawText({
               textText: action
           });
           
           //Add them to the scenegraph
           selection.insertionParent.addChild(actionBackground);
           selection.insertionParent.addChild(actionText);

           //Now we'll push them to our array for later grouping
           actionLayersToGroup.push(actionBackground);
           actionLayersToGroup.push(actionText);

           //Now we need to set some positioning variables for the different dropdown variations
           var moveTextX = dropdownActionPadding;
           var actionIcon = null;

           if (options.variation === "text") {
               //If the user only wants text
               var moveTextX = dropdownActionPadding;
           } else if (options.variation === "iconAndText") {
               //If the user wants icon and text
               actionIcon = drawRect({
                   width: iconPlaceholderWidth,
                   height: iconPlaceholderHeight,
                   fill: iconPlaceholderColor,
                   borderRadius: 2,
                   strokeEnabled: false,
                   name: "icon-placeholder"
               });

               //Add the icon placeholder to the graph
               selection.insertionParent.addChild(actionIcon);

               //Add it to the array to be grouped
               actionLayersToGroup.push(actionIcon);

               //Update the moveTextX variable, so the text won't overlap with the icon placeholder
               var moveTextX = iconPlaceholderWidth + (dropdownActionPadding * 2);

               //Position the icon Placeholder in relation to the background
               positionLayers({
                   background: actionBackground,
                   foreground: actionIcon,
                   positionX: "left",
                   positionY: "center",
                   xAdjust: dropdownActionPadding
               });
           } 

           //Position the text in relation to the background
           positionLayers({
               background: actionBackground,
               foreground: actionText,
               positionX: "left",
               positionY: "center",
               xAdjust: moveTextX,
               yAdjust: 2
           });
           
           //Group the lines together
           createGroup(selection, actionLayersToGroup, "action");
           
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
   dropdownBackground.height = yMove + (dropdownPadding * 2);
   dropdownBackground.moveInParentCoordinates(-dropdownPadding, -dropdownPadding);

   // Now we'll select everything we made and group it
   selection.items = layersToGroup;
   createGroup(selection, layersToGroup, "dropdown-menu");
   
   // And we'll move everything to the center of the selection.
   moveToParentCenter(selection, parentBounds)
}

module.exports = createDropdownMenu;