const {Rectangle, Text, Color, Line} = require("scenegraph");
const Command = require("commands");

function drawRect({
    width,
    height,
    fill = "#ffffff",
    stroke = "#dddddd",
    borderRadius = 0,
    opacity = 1,
    name = "Rectangle"
} = {}) {
    let newRect = new Rectangle();
    newRect.width = width;
    newRect.height = height;
    newRect.fill = new Color(fill);
    newRect.setAllCornerRadii(borderRadius);
    if(stroke != null) {  
        newRect.stroke = new Color(stroke);
    }
    newRect.opacity = opacity;
    newRect.name = name;

    return newRect;
}

function drawText({
    textText, 
    color = "#555555", 
    align = "left", 
    size = 13, 
    family = "MetricHPE", 
    style = "Regular", 
    transform = "none"
} = {}) {
    var text = new Text();
    text.text = textText;
    text.fill = new Color(color);
    text.textAlign = align;
    text.fontSize = size;
    text.fontFamily = family;
    text.fontStyle = style;
    text.textTransform = transform;
    
    return text;
}

function drawLine({
    startX = 0,
    startY = 0,
    endX = 100,
    endY = 100,
    color = "#555555",
    stroke = 1
} = {}) {
    var line = new Line();
    line.setStartEnd(startX, startY, endX, endY);
    line.stroke = new Color(color);
    line.strokeWidth = stroke;
    
    return line;
}

/* Draws in measurements and returns an array with 2 layers (background rect & line)
 * In the parent function, you'll need to set the call to a variable and then access the layers
 * e.g. var divider = drawDivider({...});
 * var dividerBackground = divider[0];
 * var dividerLine = divider[1];
 * etc
 *
 * {width} - Number
 * {height} - Number
 * {paddingX} - Padding between background edge and the line. Should match padding of other elements (i.e. actions in dropdown, etc);
*/
function drawDivider({
    width = 100,
    height = 10,
    paddingX = 0
} = {}) {
    var dividerLayers = [];
    
    var background = drawRect({
        width: width,
        height: height,
        stroke: null,
        name: "background"
    });
    
    dividerLayers.push(background);
    
    var line = drawLine({
        startX: 0 + paddingX,
        startY: height/2,
        endX: width - paddingX,
        endY: height/2,
        color: "#eeeeee"
    });
    
    dividerLayers.push(line);
    
    return dividerLayers;
}

function createGroup(selection, items, groupName) {
    selection.items = items;
    Command.group();
    
    //Uncomment the following line if you want to clear the selection after grouping. Otherwise the group will be selected.
    //selection.items = [];
    
    selection.items[0].name = groupName;
}


function getParentCoordinates(selection) {
    // To be used in tandem with moveToParentCenter. set getParentCoordinates to a var at the beginning of a function, then pass the var as an argument to moveToParentCenter.
    return selection.insertionParent.localBounds;
}
/*
function moveToParentCenter(selection, parentCoordinates) {
    // To be used in tandem with getParentCoordinates.
    selection = selection.items[0];
    var selectionCoordinates = selection.localBounds;
    
    var newX = (parentCoordinates.x + (parentCoordinates.width/2)) - (selectionCoordinates.width/2);
    var newY = (parentCoordinates.y + (parentCoordinates.height/2)) - (selectionCoordinates.height/2);
    
    selection.moveInParentCoordinates(newX, newY);
}*/

function moveToParentCenter(selection, parentCoordinates) {
    // To be used in tandem with getParentCoordinates.
    
    selection = selection.items[0];
    var selectionCoordinates = selection.localBounds;
    
    var newX = (parentCoordinates.x + (parentCoordinates.width/2)) - (selectionCoordinates.width/2);
    var newY = (parentCoordinates.y + (parentCoordinates.height/2)) - (selectionCoordinates.height/2);
    
    selection.moveInParentCoordinates(newX, newY);
}

function centerLayers({
    background,
    foreground,
    x = true,
    y = true,
    xAdjust = 0,
    yAdjust = 0
} = {}) {
    let lowerCenter = background.localCenterPoint;
    let lowerCoordinates = background.localBounds;
    
    let upperCoordinates = foreground.localBounds;
    
    foreground.moveInParentCoordinates((x = true ? lowerCenter.x + xAdjust : 0), (y = true ? lowerCenter.y + yAdjust : 0));
}


/* Takes 2 nodes, and positions them in relation to each other
 * {background} - the lower layer
 * {foreground} - the upper layer
 * {positionX} - accepts "left", "center", or "right"
 * {positionY} - accepts "top", "center", or "bottom"
 * xAdjust - an addition to the X movement (useful for padding)
 * yAdjust = an addition to the Y movement (useful for padding or fixing fonts that aren't perfectly centered)
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
    drawRect,
    drawText,
    drawLine,
    drawDivider,
    createGroup,
    getParentCoordinates,
    moveToParentCenter,
    centerLayers,
    positionLayers
}