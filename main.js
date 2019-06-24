
const Command = require("commands");

//const {alert,error,prompt} = require("./lib/dialogs.js");
//const showMainDialog = require('./src/modals/mainModal.js');

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
                max-height: 400px;
                overflow-y: scroll;
            }
            .section {
                padding: 4px 0;
            }
            .section label {
                margin-bottom: 8px;
            }
            .section label span {
                font-size: 12pt;
                text-transform: uppercase;
                color: #777;
                margin-bottom: 0;
            }
            .section label select {
                height: 30px;
            }
            .section label.checkbox-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
            }
            .section label.checkbox-container input {
                margin-right: 0;
                margin-left: 8px;
            }
            .section label.checkbox-container span {
                margin-left: 4px;
                position: relative;
                top: -1px;
            }
            input[type="checkbox"] {
                margin: 0;
            }
            .section .info-text {
                background: #fafafa;
                border-radius: 4px;
                padding: 4px;
                margin: 0 6px 8px 6px;
                border: 1px solid #ededed;
            }
            .section .info-text p {
                font-size: 11pt;
                color: #888;
                line-height: 14pt;
                margin-bottom: 4px;
            }
            /*                      */
            /*  Components List     */
            /*                      */
            .components-list {
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