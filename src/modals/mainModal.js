const {buildHeader, buildFooter, buildTextField} = require('../helpers/modalHelpers.js');

async function showDialog(selection) {
    //The result will the choice of which component the user wants to add
    let result = await mainDialog(selection);
    
    //Depending on the user selection, we'll show a dialog
    switch (result) {
        case 'createButton':
            const createButton = require('./buttonsModal.js');
            return createButton(selection);
            break;
        case 'createDropdownMenu':
            const createDropdownMenu = require('./dropdownsModal.js');
            await createDropdownMenu(selection);
            break;
        case 'createTabs':
            const createTabs = require('./tabsModal.js');
            await createTabs(selection);
            break;
        case 'createSearchField':
            const createSearchField = require('./searchModal.js');
            await createSearchField(selection);
            break;
        case 'createTag':
            const createTag = require('./tagModal.js');
            await createTag(selection);
            break;
        case 'createAlert':
            const createAlert = require('./alertsModal.js');
            await createAlert(selection);
            break;
        case 'createToggle':
            const createToggle = require('./toggleModal.js');
            await createToggle(selection);
            break;
        case 'createCheckbox':
            const createCheckbox = require('./checkboxModal.js');
            await createCheckbox(selection);
            break;
        case 'createRadioButton':
            const createRadioButton = require('./radioButtonModal.js');
            await createRadioButton(selection);
            break;
    }
    return true;
}
async function mainDialog(selection) {
    return new Promise((resolve, reject) => {
        document.body.innerHTML = '';
        
        const dialog = document.createElement('dialog');
        dialog.id = 'mainModal';
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
    width: 400px;
}
h1 img {
    width: 40px;
    height: 40px;
    margin-right: 12px;
}
.component-list {
    display: flex;
    flex-direction: column;
}
.component-row {
    width: 100%;
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
}
.component-row:hover {
    cursor: pointer;
    background: "#fff";
}
.component-row .component-name {
    height: 100%;
    font-size: 16pt;
    display: flex;
    align-items: center;
}
.component-row .component-icon {
    width: 140px;
    height: 50px;
    border: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.component-row .component-icon img {
    width: auto;
    height: auto;
    max-width: 90%;
    max-height: 90%;
}
</style>
`;
        //Define the form and buttons
        //const form = dialog.querySelector('form');
        const form = document.createElement('form');
        form.method = "dialog";
        dialog.appendChild(form);
        
        //Build the header
        buildHeader({
            form: form, 
            text: "Octane Components", 
            back: false, 
            icon: '<img src="../../img/plugin-icon.png">'
        });
        
        //Add a container div
        const container = document.createElement('div');
        container.className = "container";
        
        //Create a search field for searching the list of components
        const searchField = document.createElement('input');
        searchField.id = "searchField";
        searchField.placeholder = "Search";
        form.appendChild(searchField);

        //Now add an event handler for searching
        searchField.oninput = (e) => filterRows("#searchField", "#componentList");

        //List of components
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
                label: 'Dropdown Menu',
                image: '../../img/icons/dropdown.png',
                id: 'rowDropdown',
                action: () => {
                    resolve('createDropdownMenu')
                }
            },
            {
                name: 'tabs',
                label: 'Tabs',
                image: '../../img/icons/tabs.png',
                id: 'rowTabs',
                action: () => {
                    resolve('createTabs')
                }
            },
            {
                name: 'search',
                label: 'Search Field',
                image: '../../img/icons/search.png',
                id: 'rowSearch',
                action: () => {
                    resolve('createSearchField')
                }
            },
            {
                name: 'tag',
                label: 'Tag',
                image: '../../img/icons/tags.png',
                id: 'rowTag',
                action: () => {
                    resolve('createTag')
                }
            },
            {
                name: 'alert',
                label: 'Alert',
                image: '../../img/icons/alert.png',
                id: 'rowAlert',
                action: () => {
                    resolve('createAlert')
                }
            },
            {
                name: 'toggle',
                label: 'Toggle',
                image: '../../img/icons/toggle.png',
                id: 'rowToggle',
                action: () => {
                    resolve('createToggle')
                }
            },
            {
                name: 'checkbox',
                label: 'Checkbox',
                image: '../../img/icons/checkbox.png',
                id: 'rowCheckbox',
                action: () => {
                    resolve('createCheckbox')
                }
            },
            {
                name: 'radioButton',
                label: 'Radio Button',
                image: '../../img/icons/radio-button.png',
                id: 'rowRadioButton',
                action: () => {
                    resolve('createRadioButton')
                }
            }
        ];

        components.sort(sortComponents);

        
        //Now we'll build the rows
        createRow(components, dialog, form);
        
        //And a footer
        buildFooter({form, buttons: [      
            {label: 'Cancel', type: 'reset', id: 'btnCancel', variant: 'secondary'}
            ]
        });
        
        //When submitting the form
        form.onsubmit = () => {
            dialog.close('ok');
            dialog.remove();
        }

        //When clicking the Cancel button
        var cancelButton = dialog.querySelector('#btnCancel');
        cancelButton.onclick = e => {
            dialog.close();
            reject();
        };
        

        //add the dialog to the document
        document.appendChild(dialog);
        dialog.showModal().then(() => resolve()).catch(() => reject());
    });
}

function filterRows(searchFieldId, filterContainerId) {
    var searchString = document.querySelector(searchFieldId).value;
    var searchContainer = document.querySelector(filterContainerId);

    Array.from(searchContainer.childNodes).forEach(function (row) {
        var textToSearch = row.textContent.trim();

        if (textToSearch.search(new RegExp(searchString, "i")) < 0) {
            row.style.display = 'none';
        } else {
            row.style.display = 'flex';
        };
    });
}

function createRow(components, dialog, form) {
    const section = document.createElement('div');
    section.className = "section"
    
    const componentsList = document.createElement('div');
    componentsList.className = "component-list";
    componentsList.id = "componentList";

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
    form.appendChild(section);
}

function sortComponents(a, b) {
    const componentA = a.label.toUpperCase();
    const componentB = b.label.toUpperCase();

    let comparison = 0;
    if (componentA > componentB) {
        comparison = 1;
    } else if (componentA < componentB) {
        comparison = -1;
    }

    return comparison;
}

module.exports = showDialog;