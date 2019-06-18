
/* 
 * Here you'll define the footer buttons for your dialog 
 *
*/

const buttons = [
    {label: 'Cancel', type: 'reset', id: 'cancel', variant: 'secondary'}
];

async function showMainDialog(selection) {
    let nextDialog = await mainDialog(selection);
    switch (nextDialog) {
        case 'createButton':
            const createButton = require('./buttonsModal.js');
            return createButton(selection);
            break;
        case 'testModal':
            const buttonsDialog = require('./buttonsModal.js');
            await buttonsDialog(selection);
            break;
    }
    return true;
}

async function mainDialog(selection) {
    return new Promise((resolve, reject) => {
        //Clear out any old trash still showing
        document.body.innerHTML = '';

        //Create the dialog
        const dialog = document.createElement('dialog');

        //Fill the dialog with the base structure
        const baseModal = require('./baseModal.js');
        dialog.innerHTML = baseModal({dialog: dialog, title: "Octane Components", buttons: buttons, back: false, icon: true});

        //Get the container & form element. This is where you'll put all the cool stuff
        const container = dialog.querySelector('.container');

        /* 
         *
         * Here add all the dialog content
         * You'll always need to add things to the container element.
         *
        */

        const components = [
            {
                name: 'button',
                label: 'Button',
                image: '../../img/icons/button.png',
                id: 'rowButton',
                action: () => {
                    resolve('createButton')
                }
            },
            {
                name: 'dropdown',
                label: 'Dropdown',
                image: '../../img/icons/dropdown.png',
                id: 'rowDropdown',
                action: () => {

                }
            }
        ];

        createRow(dialog, components, container);


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
            const response = dialog.showModal();

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
                 * And run building functions (put the require statements here)
                 * 
                */
            }
        } catch(err) {
            // system refused the dialog
            return {which: cancelButtonIdx, value: ''};
        } finally {
            dialog.remove();
        }
    });
}

function createRow(dialog, components, container) {
    const section = document.createElement('div');
    section.className = "section"
    
    const componentsList = document.createElement('div');
    componentsList.className = "component-list";
    
    components.forEach((component) => {
        let row = document.createElement('div');
        row.className = 'component-row';
        row.id = component.id;
        row.onclick = () => {
            component.action();
            dialog.close();
        };
        
        row.innerHTML = `
            <div class="component-name"><span>${component.label}</span></div>
            <div class="component-icon"><img src="${component.image}" /></div>
        `;
        componentsList.appendChild(row);
    });
    
    section.appendChild(componentsList);
    container.appendChild(section);
}


module.exports = showMainDialog;