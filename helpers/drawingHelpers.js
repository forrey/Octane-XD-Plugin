const {Rectangle, Ellipse, Text, Color, Line, Path} = require("scenegraph");

/* Draws a Rectangle & inserts it
 *
 * {width} 
 * {height}
 * {fill}            string (hex value)
 * {fillEnabled}     boolean
 * {stroke}          string (hex value)
 * {strokeEnabled}   boolean
 * {strokeWidth}     integer
 * {borderRadius}    integer
 * {opacity}         number 0.0 to 1.0
 * {name}            string, this will be the name of the layer
*/
function drawRect({
   width,
   height,
   fill = "#ffffff",
   fillEnabled = true,
   stroke = "#dddddd",
   strokeEnabled = true,
   strokeWidth = 1,
   borderRadius = 0,
   opacity = 1,
   name = "Rectangle"
} = {}) {
   const newRect = new Rectangle();
   newRect.width = width;
   newRect.height = height;

   newRect.fill = new Color(fill);
   newRect.fillEnabled = fillEnabled;

   newRect.stroke = new Color(stroke);
   newRect.strokeEnabled = strokeEnabled;
   newRect.strokeWidth = strokeWidth;

   newRect.setAllCornerRadii(borderRadius);

   newRect.opacity = opacity;
   newRect.name = name;

   return newRect;
}

/* Draws an Ellipse & inserts it
 *
 * {width} 
 * {height}
 * {fill}            string (hex value)
 * {fillEnabled}     boolean
 * {stroke}          string (hex value)
 * {strokeEnabled}   boolean
 * {strokeWidth}     integer
 * {opacity}         number 0.0 to 1.0
 * {name}            string, this will be the name of the layer
*/
function drawEllipse({
   width,
   height,
   fill = "#ffffff",
   fillEnabled = true,
   stroke = "#dddddd",
   strokeEnabled = true,
   strokeWidth = 1,
   opacity = 1,
   name = "Ellipse"
} = {}) {
   let newEllipse = new Ellipse();
   newEllipse.radiusX = width/2;
   newEllipse.radiusY = height/2;

   newEllipse.fill = new Color(fill);
   newEllipse.fillEnabled = fillEnabled;
 
   newEllipse.stroke = new Color(stroke);
   newEllipse.strokeEnabled = strokeEnabled;
   newEllipse.strokeWidth = strokeWidth;

   newEllipse.opacity = opacity;
   newEllipse.name = name;

   return newEllipse;
}

/* Creates Text
 *
 * {width} 
 * {height}
 * {fill}            string (hex value)
 * {fillEnabled}     boolean
 * {stroke}          string (hex value)
 * {strokeEnabled}   boolean
 * {strokeWidth}     integer
 * {opacity}         number 0.0 to 1.0
 * {name}            string, this will be the name of the layer
*/
function drawText({
   textText, 
   family = "MetricHPE", 
   style = "Regular", 
   size = 13, 
   color = "#555555", 
   transform = "none",
   align = "left", 
   boxSize = null
} = {}) {
   var text = new Text();
   text.text = textText;

   text.fontFamily = family;
   text.fontStyle = style;
   text.fontSize = size;

   text.fill = new Color(color);
   text.textTransform = transform;

   text.textAlign = align;

   text.areaBox = boxSize;

   return text;
}

/* Creates a Line
 *
 * {startX}          integer
 * {startY}          integer
 * {endX}            integer
 * {enxY}            integer
 * {color}           string (hex value)
 * {stroke}          integer, stroke width in pixels
*/
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

/* Creates a Path
 *
 * {path}      string, SVG format
 * {color}     string, hex value
*/
function drawPath({
   path,
   color = "#555555"
}) {
   let newPath = new Path();
   newPath.pathData = path;
   newPath.fill = new Color(color);

   return newPath;
}



module.exports = {
   drawRect,
   drawEllipse,
   drawText,
   drawLine,
   drawPath
}