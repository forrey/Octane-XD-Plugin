const {buildHeader, buildFooter, buildSection, buildDropdown, buildTextInput, buildTextArea, buildCheckbox, buildInfoText} = require('../helpers/modalHelpers.js');

async function somethingDialog(selection, dialog, form) {
   //Reset the dialog contents
   form.innerHTML = '';

   //First we build the header
   buildHeader({
      form: form,
      text: "Tabs",
      back: true
   });

   /* 
    * Here you'll build all your other crappy stuff
   */

   var section = buildSection({
      form: form
   });

   buildInfoText({
      container: section, 
      text: ['Enter text for each tab, separated by commas.']
   });
    
    buildTextInput({
        container: section, 
        label: "Tabs", 
        id: "tabs"
    });
    buildTextInput({
        container: section, 
        label: "Which tab should be selected?", 
        id: "selectedTab", 
        placeholder: 'Enter 1 to select the first tab, 2 to select the second, etc...'
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
         tabs: document.querySelector('#tabs').value,
         selectedTab: document.querySelector('#selectedTab').value
      }

      const createTabs = require('../functions/createTabs.js');
      createTabs(selection, options);
      
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