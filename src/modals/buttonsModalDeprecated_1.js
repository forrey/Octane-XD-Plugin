const {buttonPadding, defaultButtonWidth, defaultButtonHeight, buttonTextSize} = require('../constants/buttonStyles.js');
const {buildHeader, buildFooter, buildDropdown, buildTextField, buildInfoText} = require('../helpers/modalHelpers.js');

/*
async function showDialog(selection) {
    let params = await buttonsDialog(selection);
    const createButton = require('../functions/buttons.js');

    //If the user hit ESC or cancel before finishing, call the whole operation off
    if (params != null) {   
        await createButton(selection, params);
    }
}
*/

async function showDialog(selection) {
    let buttonOptions;
    
        document.body.innerHTML = '';
        
        const dialog = document.createElement('dialog');
        dialog.id = 'buttonsDialog';
        dialog.innerHTML = `
<style>
/*              */
/*  BASE STYLES */
/*              */

form {
    display: flex;
}
h1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18pt;
}
hi img {
    max-width: 35px;
    max-height: 35px;
    padding: 0;
    margin: 0 8px 0 0;
}
h1 img.back-arrow {
    width: auto;
    max-height: 16px;
}
.container {
    margin: 8px;
    overflow-x: hidden;
    overflow-y: auto;
}
.section {
    width: 100%;
    height: auto;
    max-height: 400px;
    overflow-x: scroll;
    padding: 0 10px;
}
.info-text {
    font-size: 11pt;
    color: #888;
    line-height: 14pt;
    background: #fafafa;
    border-radius: 4px;
    padding: 8px;
    border: 1px solid #ededed;
}
.section h2 {
    font-weight: 500;
    font-size: 12pt;
    color: #777;
}
.section input#search {
    margin: 0;
    padding: 0;
    border-radius: 2px;
}
label {
    padding-bottom: 4px;
    margin-bottom: 8px;
}
select {
    height: 30px;
}
.checkbox-row {
    display: flex;
}
.checkbox-row label {
    display: flex;
    flex-direction: rows;
    align-items: center;
    border: 1px solid #ddd;
    border-right: none;
    padding: 8px 12px;
}
.checkbox-row label:last-child {
    border-right: 1px solid #ddd;
}
.checkbox-row label span {
    margin: 0;
    padding: 0;
    font-size: 12pt;
    font-weight: 400;
}
input[type="checkbox"] {
    margin: 0;
}

/*                  */
/*  END BASE STYLES */
/*                  */

form {
    width: 500px;
}
</style>
`;
        //Define the form and buttons
        //const form = dialog.querySelector('form');
        const form = document.createElement('form');
        form.method = "dialog";
        dialog.appendChild(form);
                
        //Build the header
        buildHeader(form, "Buttons", true);
        
        //Add a container div
        const container = document.createElement('div');
        container.className = "container";
        
        buildInfoText(container, "To add a button to an artboard, select an artboard.<br />To add a button to a group, select a layer within the group");
                
        buildDropdown({container, label: "Type", id: "buttonType", options: [
            {value: 'primary', text: 'Primary (blue)', selected: true},
            {value: 'secondary', text: 'Secondary (black)'},
            {value: 'negative', text: 'Negative (red)'},
            {value: 'accent', text: 'Accent (dark blue)'},
            ]
        });
        
        buildDropdown({container, label: "Variation", id: "buttonVariation", options: [
            {value: 'raised', text: 'Raised (with background/border)', selected: true},
            {value: 'flat', text: 'Flat (no background/border)'}
            ]
        });
        
        buildDropdown({container, label: "Size", id: "buttonSize", options: [
            {value: 'narrow', text: 'Narrow'},
            {value: 'standard', text: 'Standard', selected: true},
            {value: 'large', text: 'Large'}
            ]
        });
        
        buildTextField(container, "Button Text", "buttonText", "If blank, the label will simply be 'Button'");
        
        form.appendChild(container); 
        
        
        buildFooter({form, buttons: [      
            {label: 'Cancel', type: 'reset', id: 'btnCancel', variant: 'secondary'},
            {label: 'Add', type: 'submit', id: 'btnSubmit', variant: 'cta'}
            ]
        });
        
        //When submitting the form, get the values from the fields
        var submitButton = dialog.querySelector('#btnSubmit');
        
        submitButton.onclick = e => {            
            buttonOptions = {
                type: dialog.querySelector('#buttonType').value,
                variation: dialog.querySelector('#buttonVariation').value,
                size: dialog.querySelector('#buttonSize').value,
                text: dialog.querySelector('#buttonText').value
            }
            
            const createButton = require('../functions/buttons.js');
            createButton(selection, buttonOptions);
            
            dialog.close('ok');
            //resolve(buttonOptions);
        };
        
        //When clicking the Cancel button
        var cancelButton = dialog.querySelector('#btnCancel');
        cancelButton.onclick = e => {
            reject();
            dialog.close();
            document.body.innerHTML = '';
        };
        
        document.appendChild(dialog);
        dialog.showModal().then(() => resolve()).catch(() => reject());
}

function createRow(buttons, parent) {
    buttons.forEach((button) => {
        
    });
}

module.exports = showDialog;