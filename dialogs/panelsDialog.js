const {buildHeader, buildFooter, buildSection, buildDropdown, buildTextInput, buildTextArea, buildCheckbox, buildInfoText} = require('../helpers/modalHelpers.js');

async function somethingDialog(selection, dialog, form) {
   //Reset the dialog contents
   form.innerHTML = '';

   //First we build the header
   buildHeader({
      form: form,
      text: "Panels",
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
      label: "Panel Type",
      id: "panelType",
      options: [
         {value: "left", text: "Left Panel", selected: true},
         {value: "main", text: "Main Panel"},
         {value: "right", text: "Right Panel"}
      ]
   });

   buildCheckbox({
      container: section,
      label: "With Toolbar",
      id: "panelToolbar",
      checked: true
   });

   buildCheckbox({
      container: section,
      label: "Collapsed Panel",
      id: "panelCollapsed",
      checked: false
   });

   buildCheckbox({
      container: section,
      label: "Fit to Selection",
      id: "panelFitToSelection",
      checked: false
   });

   buildInfoText({
      container: section,
      text: [
         "Fitting the panel to the selection will place the panel inside of the currently selected element with proper margins.",
         "To create a panel within a group, select a layer inside the group."
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
         type: document.querySelector('#panelType').value,
         toolbar: document.querySelector('#panelToolbar').checked,
         collapsed: document.querySelector('#panelCollapsed').checked,
         fit: document.querySelector('#panelFitToSelection').checked
      }

      const createPanel = require('../functions/createPanel');
      createPanel(selection, options);
      
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