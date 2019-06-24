const {buildHeader, buildFooter, buildSection, buildDropdown, buildTextInput, buildTextArea, buildCheckbox, buildInfoText} = require('../helpers/modalHelpers.js');

async function alertsDialog(selection, dialog, form) {
   //Reset the dialog contents
   form.innerHTML = '';
   dialog = document.querySelector('dialog');

   //First we build the header
   buildHeader({
      form: form,
      text: "Alerts",
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
      label: "Alert Type",
      id: "alertType",
      options: [
         {value: 'confirmation', text: 'Confirmation (ok)', selected: true},
         {value: 'warning', text: 'Warning (uh oh!)'}
      ]
   });

   buildTextArea({
      container: section,
      label: "Alert Message",
      id: "alertMessage",
      placeholder: "this text will appear in the alert"
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
         type: document.querySelector('#alertType').value,
         message: document.querySelector('#alertMessage').value
      }

      const createAlert = require('../functions/createAlert');
      createAlert(selection, options);
      
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

module.exports = alertsDialog;