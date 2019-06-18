const {Rectangle, Shadow, Color, Text, Line, Ellipse} = require("scenegraph");
const Command = require("commands");

const {alert,error,prompt} = require("./lib/dialogs.js");
const showMainDialog = require('./src/modals/mainModal.js');

async function mainDialog(selection) {
    await showMainDialog(selection);
}


module.exports = {
    commands: {
        mainDialog
    }
}