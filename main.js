
const Command = require("commands");
const {octaneBlue} = require("./constants/colors");

async function mainDialog(selection) {
    document.body.innerHTML = '';

    let dialog = document.createElement('dialog');

    //Render the base of the form.
    //From here, we'll always add content to the <form> element for each separate screen
    dialog.innerHTML = `
        <style>
            /*                  */
            /*  Global styles   */
            /*                  */
            dialog {
            }
            form {
                width: 400px;
                height: auto;
                display: flex;
                justify-content: flex-start;
            }
            /*                  */
            /*  Header Styles   */
            /*                  */
            h1 {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-family: Helvetica, sans-serif;
            }
            h1 span {
                font-family: Helvetica, sans-serif;
                font-size: 20pt;
                font-weight: 400;
            }
            h1 img.header-icon {
                max-width: 35px;
                max-height: 35px;
                padding: 0;
                margin: 0 8px 0 0;
            }
            h1 img.back-arrow {
                width: auto;
                max-height: 16px;
                margin-right: 8px;
                opacity: .6;
                display: none;
            }
            h1 img.back-arrow:hover {
                opacity: 1;
            }

            /*                  */
            /*  Form Styles     */
            /*                  */
            form > div {
                margin: 0 6px;
                padding: 0;
            }
            div.scrollable {
                height: auto;
                overflow-y: scroll;
            }
            .section {
                padding: 4px 0;
            }
            .section label {
                margin-bottom: 8px;
                text-align: left;
            }
            .section label span {
                width: 100%;
                font-size: 11pt;
                text-transform: uppercase;
                color: #777;
                margin-bottom: 0;
            }
            .section label select {
                width: 100%;
                height: 30px;
            }
            .section label input {
                width: 100%;
            }
            .section label textarea {
                width: 100%;
            }
            .section label.checkbox-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
            }
            .section label.checkbox-container input {
                width: auto;
                margin-right: 0;
                margin-left: 8px;
            }
            .section label.checkbox-container span {
                width: auto;
                margin-left: 4px;
                position: relative;
                top: -1px;
            }
            input[type="checkbox"] {
                /*width: auto;*/
                /*margin: 0;*/
            }
            input[type="checkbox"]:checked {
                /*background-color: ${octaneBlue};
                color: #fff;*/
            }
            .section .info-text {
                background: #fafafa;
                border-radius: 4px;
                padding: 4px;
                margin: 0 6px 8px 6px;
                border: 1px solid #ededed;
            }
            .section .info-text p {
                font-size: 9pt;
                color: #888;
                line-height: 14pt;
                margin-bottom: 4px;
            }
            /*                      */
            /*  Components List     */
            /*                      */
            .components-list {
                max-height: 400px;
            }
            .components-list .component {
                width: 100%;
                height: 70px;
                padding: 8px 0;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #eeeeee;
            }
            .components-list .component:hover {
                cursor: pointer;
                background: #fcfcfc;
            }
            .components-list .component span {
                margin-left: 8px;
                font-size: 16pt;
                font-weight: 200;
                color: #555;
            }
            .components-list .component img.component-image {
                width: 140px;
                margin-right: 8px;
            }
            .entities-list {
                max-height: 250px;
            }
            .entities-list .entity {
                height: 36px;
                padding: 8px 0;
                margin: 0 8px;
                display: flex;
                flex-direction: row;
                align-items: center;
                box-sizing: border-box;
            }
            .entities-list .entity:hover {
                cursor: pointer;
                background: #fcfcfc;
            }
            .entities-list .entity .entity-badge {
                width: 24px;
                height: 24px;
                margin-left: 8px;
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13pt;
                color: #fff;
                font-size: 11pt;
                font-weight: 600;
            }
            .entities-list .entity .entity-name {
                margin-left: 8px;
                font-size: 13pt;
                font-weight: 200;
                color: #555;
                flex-grow: 1;
            }
            .entities-list .entity input {
                margin-right: 8px;
                opacity: 0;
            }

            .entities-list .entity.selected {
                background: #fff;
            }

            .entities-list .entity.selected input {
                opacity: 1;
            }
        </style>

        <form method="dialog">
        </form>

    `;

    //Define the form
    let form = dialog.querySelector('form');

    //Call the main dialog to start
    const mainDialog = require('./dialogs/mainDialog');
    mainDialog(selection, dialog, form);

    //Add the dialog to the document
    document.appendChild(dialog);

    await dialog.showModal().then(result => {
        console.log(result);
        dialog.remove();
    });
}


module.exports = {
    commands: {
        mainDialog
    }
}