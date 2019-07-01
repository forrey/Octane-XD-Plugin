const {drawRect, drawEllipse, drawText, drawLine, drawPath} = require('../helpers/drawingHelpers');
const {drawDivider} = require('../helpers/commonElements');
const {createGroup, getParentBounds, moveToParentCenter, positionLayers} = require('../helpers/layerHelpers');
const {stringToArray} = require('../helpers/utilities');
const {octaneBlue, darkBlue, okGreen, warningOrange, white, whiteF9, gray5, black, negativeRed} = require('../constants/colors');
const {metricHPE, metricHPEMove} = require('../constants/typography');
const {} = require('../constants/iconPaths');

async function createThing(selection, options) {
   const parentBounds = getParentBounds(selection);


   moveToParentCenter(selection, parentBounds)
}

module.exports = createThing;