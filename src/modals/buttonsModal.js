const {buildHeader, buildFooter, buildDropdown, buildTextField, buildInfoText} = require('../helpers/modalHelpers.js');

/* 
 * Here you'll define the footer buttons for your dialog 
 *
*/
    
const buttons = [
    {label: 'Cancel', type: 'reset', id: 'cancel', variant: 'secondary'},
    {label: 'Add', type: 'submit', id: 'submit', variant: 'cta'}
];

async function buttonsDialog(selection) {
    //Clear out any old trash still showing
    document.body.innerHTML = '';
    
    //Create the dialog
    const dialog = document.createElement('dialog');
    
    //Fill the dialog with the base structure
    const baseModal = require('./baseModal.js');
    dialog.innerHTML = await baseModal({dialog: dialog, title: "Button", buttons: buttons});
    
    //Get the container element. This is where you'll put all the cool stuff
    const container = dialog.querySelector('.container');
    
    
    /* Here add all the dialog content
     * You'll always need to add things to the container element.
    */
    
    buildInfoText(container, 'To add a button to an artboard, select an artboard.<span class="divider"></span>To add a button to a group, select a layer within the group');
    
    /* 
     * Done adding dialog content
    */
    
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

    buildTextField({
        container: container, 
        label: "Button Text", 
        id: "buttonText", 
        placeholder: "If blank, the label will simply be 'Button'"
    });
    
    
    
    //Now define the form, and what happens when you submit it.
    const form = dialog.querySelector('form');
    form.onsubmit = () => dialog.close('submit');

    // The "ok" and "cancel" button indices. OK buttons are "submit" or "cta" buttons. Cancel buttons are "reset" buttons.
    let okButtonIdx = -1;
    let cancelButtonIdx = -1;
    let clickedButtonIdx = -1;
    
    
    // Attach button event handlers and set ok and cancel indices
    buttons.forEach(({type, variant} = {}, idx) => {
        const button = dialog.querySelector(`#btn${idx}`);
        if (type === 'submit' || variant === 'cta') {
            okButtonIdx = idx;
        }
        if (type === 'reset') {
            cancelButtonIdx = idx;
        }
        button.onclick = e => {
            e.preventDefault();
            clickedButtonIdx = idx;
            dialog.close( idx === cancelButtonIdx ? 'reasonCanceled' : 'ok');
        }
    });
    
    
    //Finally, add the dialog to the view and show it to the adoring masses
    try {
        document.appendChild(dialog);
        const response = await dialog.showModal();
        
        if (response === 'reasonCanceled') {
            // user hit ESC
            return {which: cancelButtonIdx, value: ''};
        } else {
            if (clickedButtonIdx === -1) {
                // user pressed ENTER, so no button was clicked!
                clickedButtonIdx = okButtonIdx; // may still be -1, but we tried
            }
            
            let buttonOptions = {
                type: dialog.querySelector('#buttonType').value,
                variation: dialog.querySelector('#buttonVariation').value,
                size: dialog.querySelector('#buttonSize').value,
                text: dialog.querySelector('#buttonText').value
            }
            
            const createButton = require('../functions/buttons.js');
            createButton(selection, buttonOptions);
        }
    } catch(err) {
        // system refused the dialog
        return {which: cancelButtonIdx, value: ''};
    } finally {
        dialog.remove();
    }
}


module.exports = buttonsDialog;