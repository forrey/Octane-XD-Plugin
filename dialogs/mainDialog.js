const {buildHeader, buildFooter} = require('../helpers/modalHelpers.js');

const components = require('../constants/componentsList.js');

async function mainDialog(selection, dialog, form) {
   form.innerHTML = '';

   //First we build the header
   buildHeader({
       form: form,
       text: "Octane Components",
       back: false,
       iconPath: '../assets/plugin-icons/icon.png'
   });

    //Create a search field for searching the list of components
    const searchField = document.createElement('input');
    searchField.id = "searchField";
    searchField.placeholder = "Search";
    form.appendChild(searchField);

    //Now add an event handler for searching
    searchField.oninput = (e) => filterRows("#searchField", "#componentsList");

   components.sort(sortComponents);
   createComponentsList(dialog, selection, form, components);

   
   buildFooter({
       form: form,
       buttons: ['Cancel']
   });

   let cancelButton = document.querySelector(`#btnCancel`);
   cancelButton.addEventListener("click", e => {
       dialog.close('reasonCanceled');
   });
}

function createComponentsList(dialog, selection, form, items) {
    var componentsList = document.createElement('div');
    componentsList.id = "componentsList";
    componentsList.classList.add("components-list", "scrollable");
    

    items.forEach((item) => {
        let component = document.createElement('div');
        component.className = 'component';
        component.innerHTML = `
            <span>${item.label}</span>
            <img class="component-image" src="${item.imagePath}" />
        `;

        component.onclick = () => {
            const targetDialog = require(item.file);
            targetDialog(selection, dialog, form);
        };

        componentsList.appendChild(component);
    });

    form.appendChild(componentsList);
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

module.exports = mainDialog;