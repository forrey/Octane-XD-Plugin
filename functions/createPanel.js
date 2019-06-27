const {drawRect, drawEllipse, drawText, drawLine, drawPath} = require('../helpers/drawingHelpers');
const {drawDivider} = require('../helpers/commonElements');
const {createGroup, getParentBounds, moveToParentCenter, positionLayers} = require('../helpers/layerHelpers');
const {stringToArray} = require('../helpers/utilities');
const {octaneBlue, darkBlue, okGreen, warningOrange, white, grayD, whiteF9, gray5, black, negativeRed} = require('../constants/colors');
const {metricHPE, metricHPEMoveFacor} = require('../constants/typography');
const {panelCloseLeftPath, panelCloseRightPath} = require('../constants/iconPaths');

const panelBackgroundColor = white;
const panelBorderColor = grayD;

const panelToolbarHeight = 50;

const panelMargin = 10;

const sidePanelDefaultWidth = 260;
const sidePanelDefaultHeight = 608;

const mainPanelDefualtWidth = 1076;
const mainPanelDefaultHeight = 608;

const collapsedPanelWidth = 30;

const collapseArrowColor = "#888888";

async function createThing(selection, options) {
   const parentBounds = getParentBounds(selection);

   let layersToGroup = [];

   //Here we figure out what the width of the panel should be
   let panelWidth;
   if (options.collapsed) {
      panelWidth = collapsedPanelWidth;
   } else if (options.fit) {
      panelWidth = parentBounds.width - (panelMargin * 2);
   } else if (options.type === "left" || options.type === "right") {
      panelWidth = sidePanelDefaultWidth;
   } else if (options.type === "main") {
      panelWidth = mainPanelDefualtWidth;
   }


   //And here we figure out what the panel Height should be
   let panelHeight;
   if (options.fit) {
      panelHeight = parentBounds.height - (panelMargin * 2);
   } else if (options.type === "left" || options.type === "right") {
      panelHeight = sidePanelDefaultHeight;
   } else if (options.type === "main") {
      panelHeight = mainPanelDefaultHeight;
   }

   var panelBackground = drawRect({
      width: panelWidth,
      height: panelHeight,
      fill: panelBackgroundColor,
      stroke: panelBorderColor,
      name: "background"
   });
   selection.insertionParent.addChild(panelBackground);
   layersToGroup.push(panelBackground);
   

   //Does the panel need a toolbar? If so, we'll build it
   let panelToolbar;
   let toolbarLayersToGroup = [];

   if (options.toolbar) {
      var panelToolbarBackground = drawRect({
         width: panelWidth,
         height: panelToolbarHeight,
         fill: white,
         stroke: panelBorderColor,
         name: "toolbar-bg"
      });

      selection.insertionParent.addChild(panelToolbarBackground);
      toolbarLayersToGroup.push(panelToolbarBackground);
      
      //Is it a side panel? if so, it needs a collapse/expand arrow.
      let panelCollapseArrow;
      if (options.type !== "main") {
         var collapseArrowPath;
         if (options.type === "left") {
            collapseArrowPath = (options.collapsed ? panelCloseRightPath : panelCloseLeftPath);
         } else if (options.type === "right") {
            collapseArrowPath = (options.collapsed ? panelCloseLeftPath : panelCloseRightPath);
         }

         panelCollapseArrow = drawPath({
            path: collapseArrowPath,
            color: collapseArrowColor
         });

         selection.insertionParent.addChild(panelCollapseArrow);
         toolbarLayersToGroup.push(panelCollapseArrow);

         positionLayers({
            background: panelToolbarBackground,
            foreground: panelCollapseArrow,
            positionX: (options.type === "left" ? "right" : "left"),
            xAdjust: panelMargin
         });
      }

      panelToolbar = createGroup(selection, toolbarLayersToGroup, "toolbar");
      layersToGroup.push(panelToolbar);

      positionLayers({
         background: panelBackground,
         foreground: panelToolbar,
         positionX: "left",
         positionY: "top"
      });
   }

   createGroup(selection, layersToGroup, "panel");

   moveToParentCenter(selection, parentBounds)
}

module.exports = createThing;