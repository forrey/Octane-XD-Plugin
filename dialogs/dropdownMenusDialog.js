const {buildHeader, buildFooter, buildSection, buildDropdown, buildTextInput, buildTextArea, buildCheckbox, buildInfoText} = require('../helpers/modalHelpers.js');

async function somethingDialog(selection, dialog, form) {
   //Reset the dialog contents
   form.innerHTML = '';
   dialog = document.querySelector('dialog');

   //First we build the header
   buildHeader({
      form: form,
      text: "Dropdown Menus",
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
      label: "Variation",
      id: "dropdownVariation",
      options: [
          {value: 'text', text: 'Text only', selected: false},
          {value: 'iconAndText', text: 'Icon + Text', selected: true}
      ]
  });

  buildTextInput({
      container: section, 
      label: "Actions", 
      id: "dropdownActions"
  });

  buildInfoText({
     container: section, 
     text: [
        'Enter text for each dropdown action, separated by commas.',
        'To add a divider line, enter "Divider" as a value',
        'For example "Save, Edit, Divider, Delete"'
     ]
  });


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
         actions: document.querySelector('#dropdownActions').value,
         variation: document.querySelector('#dropdownVariation').value
      }

      
      const createDropdownMenu = require('../functions/createDropdownMenu');
      createDropdownMenu(selection, options);
      
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

module.exports = somethingDialog;