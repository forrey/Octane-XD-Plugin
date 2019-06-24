const Command = require("commands");

/* Takes in objects and groups them
 * 
 * (items)        Array of objects to be grouped
 * (groupName)    String. This will be the group name
*/
function createGroup(selection, items, groupName) {
   selection.items = items;
   Command.group();
   
   selection.items[0].name = groupName;

   return selection.items[0];
}

/* Gets the parent dimensions & coordinates at the beginning of a function
 * this allows you to store it, and pass it to a later function
 * 
 * (selection)    Just pass it the current selection
*/
function getParentBounds(selection) {
   return selection.insertionParent.localBounds;
}


/* Takes in an object and moves it to the center of the original selection
 * To be used in tandem with getParentBounds
 * 
 * (selection)    Or an object, or a selection in the scenegraph
 * (parentBounds) Object {x: , y: , width: , height: }
*/
function moveToParentCenter(selection, parentBounds) {   
   selection = selection.items[0];
   var selectionCoordinates = selection.localBounds;
   
   var newX = (parentBounds.x + (parentBounds.width/2)) - (selectionCoordinates.width/2);
   var newY = (parentBounds.y + (parentBounds.height/2)) - (selectionCoordinates.height/2);
   
   selection.moveInParentCoordinates(newX, newY);
}


/* Takes a foreground object & a background object
 * Moves the foreground in relation to the background
 * 
 * {background}      Object in scenegraph
 * {foreground}      Object in scenegraph
 * {positionX}       String. "left", "center", or "right"
 * {positionY}       String. "top", "center", or "bottom"
 * {xAdjust}         Integer. an addition to the X movement (useful for padding)
 * {yAdjust}         Integer. an addition to the Y movement (useful for padding or fixing fonts that aren't perfectly centered)
*/
function positionLayers({
   background,
   foreground,
   positionX = "center",
   positionY = "center",
   xAdjust = 0,
   yAdjust = 0
} = {}) {
   // First we get the background layer's center & coordinates
   let lowerCenter = background.localCenterPoint;
   let lowerCoordinates = background.localBounds;
   
   
   // Now we get the foreground coordinates
   let upperCenter = foreground.localCenterPoint;
   let upperCoordinates = foreground.localBounds;
   
   // Set the variables that will move the foreground layer
   var backgroundX;
   var backgroundY;
   var foregroundX;
   var foregroundY;
   
   
   
   switch (positionX) {
       case "left" :
           //xMove = lowerCoordinates.x + xAdjust;
           backgroundX = lowerCoordinates.x + xAdjust;
           foregroundX = upperCoordinates.x;
           break;
       case "center" :
           //xMove = lowerCenter.x - (upperCoordinates.width / 2) + xAdjust;
           backgroundX = lowerCenter.x + xAdjust;
           foregroundX = upperCenter.x;
           break;
       case "right" :
           //xMove = (lowerCoordinates.x + lowerCoordinates.width) - upperCoordinates.width - xAdjust;
           backgroundX = (lowerCoordinates.x + lowerCoordinates.width) - xAdjust;
           foregroundX = upperCoordinates.x + upperCoordinates.width;
           break;
   }
       
   switch (positionY) {
       case "top" :
           //yMove = lowerCoordinates.y + yAdjust;
           backgroundY = lowerCoordinates.y + yAdjust;
           foregroundY = upperCoordinates.y;
           break;
       case "center" :
           //yMove = (lowerCoordinates.y + upperCoordinates.y) + (20 + lowerCenter.y - (upperCoordinates.height / 2));
           backgroundY = lowerCenter.y + yAdjust;
           foregroundY = upperCenter.y;
           break;
       case "bottom" :
           //yMove = (lowerCoordinates.y + lowerCoordinates.height) - upperCoordinates.height - yAdjust;
           backgroundY = (lowerCoordinates.y + lowerCoordinates.height) - yAdjust;
           foregroundY = upperCoordinates.y + upperCoordinates.height;
           break;
   }
       
   foreground.placeInParentCoordinates({x: foregroundX, y: foregroundY}, {x: backgroundX, y: backgroundY});
}

module.exports = {
   createGroup,
   getParentBounds,
   moveToParentCenter,
   positionLayers
}