const {buildHeader, buildFooter, buildSection, buildDropdown, buildTextInput, buildTextArea, buildCheckbox, buildInfoText} = require('../helpers/modalHelpers.js');

async function somethingDialog(selection, dialog, form) {
   //Reset the dialog contents
   form.innerHTML = '';

   //First we build the header
   buildHeader({
      form: form,
      text: "Radio Buttons",
      back: true
   });

   /* 
    * Here you'll build all your other crappy stuff
   */

   var section = buildSection({
      form: form
   });

   buildTextInput({
      container: section,
      label: "Radio Button Label",
      id: "radioButtonLabel",
      placeholder: "Leave blank if you don't want a label"
   });

   buildCheckbox({
      container: section,
      label: "Selected",
      id: "radioButtonSelected",
      checked: true
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
      text: document.querySelector('#radioButtonLabel').value,
      checked: document.querySelector('#radioButtonSelected').checked
   }

   const createRadioButton = require('../functions/createRadioButton.js');
   createRadioButton(selection, options);
      
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