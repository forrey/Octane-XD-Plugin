const {Color, Shadow} = require("scenegraph");

const defaultShadowColor = new Color("#000000",.16);
const defaultShadow = new Shadow(0,3,6,defaultShadowColor);

module.exports = {
    defaultShadowColor,
    defaultShadow
}