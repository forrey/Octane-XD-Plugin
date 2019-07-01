const {drawRect, drawEllipse, drawText, drawLine, drawPath} = require('../helpers/drawingHelpers');
const {drawDivider} = require('../helpers/commonElements');
const {createGroup, getParentBounds, moveToParentCenter, positionLayers} = require('../helpers/layerHelpers');
const {stringToArray} = require('../helpers/utilities');
const {octaneBlue, darkBlue, okGreen, warningOrange, white, whiteF9, gray5, black, negativeRed} = require('../constants/colors');
const {metricHPE, metricHPEMove} = require('../constants/typography');
const {} = require('../constants/iconPaths');

const iconOutlineColor = "#999999";

async function createEntityIcon(selection, options) {
   const parentBounds = getParentBounds(selection);
   
   //First we need to check the list of entity types and see which damn entity icon we even need to build here
   const entityTypes = require('../constants/entityTypes');
   const selectedEntity = entityTypes.filter(entity => {
      return entity.type === options.type;
   });

   //First we'll figure out what our styles need to be
   let iconBackgroundColor;
   let iconTextColor;
   
   if (options.style === "colorFill") {
      iconBackgroundColor = selectedEntity[0].color;
      iconTextColor = "#ffffff";
   } else if (options.style === "solidGrayBackground") {
      iconBackgroundColor = "#cccccc";
      iconTextColor = "#ffffff";
   } else if (options.style === "grayOutline") {
      iconBackgroundColor = "#ffffff";
      iconTextColor = iconOutlineColor;
   }

   //Then we'll draw the background
   const iconBackground = drawEllipse({
      width: options.size,
      height: options.size,
      fill: iconBackgroundColor,
      strokeEnabled: (options.style === "grayOutline" ? true : false),
      stroke: iconOutlineColor,
      name: "background"
   });

   selection.insertionParent.addChild(iconBackground);


   let textSize;
   let textStyle;

   if(options.size < 24) {
      textSize = 12;
      textStyle = "Semibold";
   } else if (options.size >= 24 && options.size < 28) {
      textSize = 14;
      textStyle = "Regular";
   } else if (options.size >= 28) {
      textSize = 16;
      textStyle = "Regular";
   }

   const iconText = drawText({
      textText: selectedEntity[0].initials,
      style: textStyle,
      size: textSize,
      color: iconTextColor,
      transform: "uppercase",
      align: "center"
   });
   selection.insertionParent.addChild(iconText);

   positionLayers({
      background: iconBackground,
      foreground: iconText,
      yAdjust: metricHPEMove - 2
   });


   createGroup(selection, [iconBackground, iconText], "entity-icon");

   moveToParentCenter(selection, parentBounds)
}

module.exports = createEntityIcon;