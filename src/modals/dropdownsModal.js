const {buildDropdown, buildTextField, buildCheckbox, buildInfoText} = require('../helpers/modalHelpers.js');

/* 
 * Here you'll define the footer buttons for your dialog 
 *
*/
    
const buttons = [
    {label: 'Cancel', type: 'reset', id: 'cancel', variant: 'secondary'},
    {label: 'Add', type: 'submit', id: 'submit', variant: 'cta'}
];

async function dropdownMenuDialog(selection) {
    //Clear out any old trash still showing
    document.body.innerHTML = '';
    
    //Create the dialog
    const dialog = document.createElement('dialog');
    
    //Fill the dialog with the base structure
    const baseModal = require('./baseModal.js');
    dialog.innerHTML = await baseModal({dialog: dialog, title: "Dropdown Menu", buttons: buttons});
    
    //Get the container element. This is where you'll put all the cool stuff
    const container = dialog.querySelector('.container');
    
    
    /* 
     *
     * Here add all the dialog content
     * You'll always need to add things to the container element.
     *
    */
    
    buildInfoText(container, 'Enter text for each dropdown action, separated by commas.<span class="divider"></span>To add a divider line, enter "Divider" as a value<span class="divider"></span>For example "Save, Edit, Divider, Delete"');
    
    buildTextField(container, "Actions", "actions", "");
    
    buildCheckbox({
        container: container, 
        label: "Give each action an icon placeholder", 
        id: "iconPlaceholder", 
        checked: false
    });

    /* 
     * Done adding dialog content
    */
    
    
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
    
    var backButton = dialog.querySelector(".back-arrow");
    backButton.onclick = e => {
        dialog.close('back');
    }
    
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
            
            /*
             *
             * Here is where you'll add all the stuff that happens when the form is submitted!
             * In other words, get the form values the user entered (let options = {...})
             * eg let options = {optionA: dialog.querySelector('#id').value}
             * 
             * And run building functions (put the require statements here)
             * const runFunction = require('../functions/function.js');
             * runFunction(options);
             * 
            */
                        
            let options = {
                actions: dialog.querySelector('#actions').value,
                iconPlaceholder: dialog.querySelector('#iconPlaceholder').checked
            }

            const createDropdownMenu = require('../functions/dropdowns.js');
            createDropdownMenu(selection, options);
        }
    } catch(err) {
        // system refused the dialog
        return {which: cancelButtonIdx, value: ''};
    } finally {
        dialog.remove();
    }
}


module.exports = dropdownMenuDialog;