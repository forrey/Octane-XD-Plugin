const {Rectangle, Text} = require("scenegraph");
const Command = require("commands");

function createRect(rectWidth,rectHeight,rectFill,rectStroke,rectName) {
    let newRect = new Rectangle();
    newRect.width = rectWidth;
    newRect.height = rectHeight;
    newRect.fill = rectFill;
    newRect.stroke = rectStroke;
    newRect.name = rectName;
    return newRect;
}

function createText(textText, fill, align, size, family, style, transform) {
    var text = new Text();
    text.text = textText;
    text.fill = fill;
    text.textAlign = align;
    text.fontSize = size;
    text.fontFamily = family;
    text.fontStyle = style;
    text.textTransform = transform;
    return text;
}

function createGroup(selection, args, name) {
    selection.items = args;
    Command.group();
    
    //Uncomment the following line if you want to clear the selection after grouping. Otherwise the group will be selected.
    //selection.items = [];
    
    selection.items[0].name = name;
}



function getParentCoordinates(selection) {
    // To be used in tandem with moveToParentCenter. set getParentCoordinates to a var at the beginning of a function, then pass the var as an argument to moveToParentCenter.
    return selection.insertionParent.localBounds;
}

function moveToParentCenter(selection, parentCoordinates) {
    // To be used in tandem with getParentCoordinates.
    selection = selection.items[0];
    var selectionCoordinates = selection.localBounds;
    
    var newX = (parentCoordinates.x + (parentCoordinates.width/2)) - (selectionCoordinates.width/2);
    var newY = (parentCoordinates.y + (parentCoordinates.height/2)) - (selectionCoordinates.height/2);
    
    selection.moveInParentCoordinates(newX, newY);
}

module.exports = {
    createRect,
    createText,
    createGroup,
    getParentCoordinates,
    moveToParentCenter
}