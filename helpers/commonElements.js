const {drawRect, drawLine} = require('./drawingHelpers');


/* Creates a Divider
 * This is a simple line that appears in dropdowns, tooltips, etc
 * 
 * In the parent function, you'll need to set the call to a variable and then access the layers
 * e.g. var divider = drawDivider({...});
 * var dividerBackground = divider[0];
 * var dividerLine = divider[1];
 * etc
 * 
 * {width}     Integer
 * {height}    Integer
 * {paddingX}  Ineger. Padding between background edge and the line. Should match padding of other elements (i.e. actions in dropdown, etc);
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
       strokeEnabled: false,
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

module.exports = {
    drawDivider
}