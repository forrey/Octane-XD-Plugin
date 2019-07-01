const {buildHeader, buildFooter, buildSection, buildDropdown, buildTextInput, buildTextArea, buildCheckbox, buildInfoText} = require('../helpers/modalHelpers.js');
const entities = require('../constants/entityTypes');
const {getSiblings} = require('../helpers/utilities');

let selectedEntity;

async function entityIconsDialog(selection, dialog, form) {
   //Reset the dialog contents
   form.innerHTML = '';

   //First we build the header
   buildHeader({
      form: form,
      text: "Entity Icons",
      back: true
   });

   /* 
    * Here you'll build all your other crappy stuff
   */

   var section = buildSection({
      form: form
   });

   buildDropdown({
      container: section,
      label: "Icon style",
      id: "iconStyle",
      options: [
         {value: "colorFill", text: "Color Fill", selected: true},
         {value: "solidGrayBackground", text: "Solid gray background"},
         {value: "grayOutline", text: "Gray outline"}
      ]
   });

   buildDropdown({
      container: section,
      label: "Icon size",
      id: "iconSize",
      options: [
         {value: 20, text: "XS - 20px"},
         {value: 22, text: "S - 22px"},
         {value: 24, text: "M - 24px", selected: true},
         {value: 26, text: "L - 26px"},
         {value: 28, text: "XL - 28px"},
         {value: 30, text: "XXL - 30px"},
      ]
   });

   var entitiesSection = buildSection({
      form: form
   });


   //Create a search field for searching the list of components
   const searchField = document.createElement('input');
   searchField.id = "searchField";
   searchField.placeholder = "Search";
   entitiesSection.appendChild(searchField);

   entities.sort(sortEntities);
   createEntitiesList(entitiesSection, entities);
   
   //Now add an event handler for searching
   const {filterRows} = require("../helpers/utilities");
   searchField.oninput = (e) => filterRows("#searchField", "#entitiesList");


   

   /*
    * Are you done yet?! Finally. Let's move on.
   */

   buildFooter({
      form: form
   });



   form.onsubmit = onsubmit;
   function onsubmit(e) {

      /* 
       * Here you need to define what happens when you submit your crappy form
       * i.e. set options - let options = {...}
       * Then get the function file - const function = require('../functions/function.js')
       * Then pass the options to the function - function(selection, options);
       * 
      */

      let options = {
         type: selectedEntity,
         style: document.querySelector("#iconStyle").value,
         size: document.querySelector("#iconSize").value
      }

      const createEntityIcon = require('../functions/createEntityIcon');
      createEntityIcon(selection, options);
      
      /*
       * Oh thank god it's all over
      */

      dialog.close("ok");
      //e.preventDefault();
   };

   /* If you have a back arrow, you need this code */
   var backArrow = document.querySelector('.back-arrow');
   backArrow.onclick = (e) => {
      const mainDialog = require('./mainDialog');
      mainDialog(dialog, selection, form);
   }

   /* If you have an Add button, you need this code */
   const addButton = document.querySelector('#btnAdd');
   addButton.addEventListener("click", e => {
      onsubmit();
      e.preventDefault();
   });

   /* If you have a Cancel button, you need this code */
   const cancelButton = document.querySelector('#btnCancel');
   cancelButton.onclick = e => {
      dialog.close('reasonCanceled');
   }
}

function sortEntities(a, b) {
   const componentA = a.name.toUpperCase();
   const componentB = b.name.toUpperCase();

   let comparison = 0;
   if (componentA > componentB) {
       comparison = 1;
   } else if (componentA < componentB) {
       comparison = -1;
   }

   return comparison;
}

function createEntitiesList(section, items) {
   var entitiesList = document.createElement('div');
   entitiesList.id = "entitiesList";
   entitiesList.classList.add("entities-list", "scrollable");

   items.forEach((item) => {
      let entity = document.createElement('div');
      entity.className = 'entity';
      entity.innerHTML = `
         <div class="entity-badge" style="background: ${item.color}"><span>${item.initials}</span></div>
         <span class="entity-name">${item.name}</span>
         <input type="checkbox" value=${item.type}>
      `;

      /*
      *
      * YOU'RE HERE
      * Trying to make it so that on click, any currently selected entities will be unselected
      * i.e. the siblings of the selected entity will be unselected.
      * 
      */
      entity.onclick = () => {
         let siblings = getSiblings(entity);

         siblings.forEach((sibling) => {
            if (sibling.classList.contains("selected")) {
               sibling.classList.remove("selected");
               sibling.querySelector("input").checked = false;
            }
         });

         entity.classList.add("selected");
         entity.querySelector("input").checked = true;

         selectedEntity = item.type;
      };

      entitiesList.appendChild(entity);
   });

   section.appendChild(entitiesList);
}

module.exports = entityIconsDialog;