const {drawRect, drawText, createGroup, getParentCoordinates, moveToParentCenter} = require('../helpers/drawingHelpers.js');

const {octaneBlue, darkBlue, white, black, negativeRed} = require('../constants/colors.js');
const {metricHPE, metricHPEMoveFactor} = require('../constants/typography.js');


async function doSomething(selection, options) {    
    var parentCoordinates = getParentCoordinates(selection);
    
}

module.exports = doSomething;