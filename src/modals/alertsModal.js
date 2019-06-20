const {buildDropdown, buildTextField, buildTextArea, buildInfoText, buildCheckbox} = require('../helpers/modalHelpers.js');

/* 
 * Here you'll define the footer buttons for your dialog 
 *
*/
    
const buttons = [
    {label: 'Cancel', type: 'reset', id: 'cancel', variant: 'secondary'},
    {label: 'Add', type: 'submit', id: 'submit', variant: 'cta'}
];

async function alertDialog(selection) {
   //Clear out any old trash still showing
   document.body.innerHTML = '';
   
   //Create the dialog
   const dialog = document.createElement('dialog');
   
   //Fill the dialog with the base structure
   const baseModal = require('./baseModal.js');
   dialog.innerHTML = await baseModal({
      dialog: dialog, 
      title: "Alerts", 
      buttons: buttons
   });
   
   //Get the container element. This is where you'll put all the cool stuff
   const container = dialog.querySelector('.container');
   
   /* 
   *
   * Here add all the dialog content
   * You'll always need to add things to the container element.
   *
   */
   
   buildDropdown({
      container: container,
      label: "Alert Type",
      id: "alertType",
      options: [
         {value: 'confirmation', text: 'Confirmation (ok)', selected: true},
         {value: 'warning', text: 'Warning (uh oh!)'}
      ]
   });

   buildTextArea({
      container: container,
      label: "Alert Message",
      id: "alertMessage",
      placeholder: "this text will appear in the alert"
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
   
   // EXPERIMENTAL: get the back button & set click event
   //var backButton = dialog.querySelector(".back-arrow");
   //backButton.onclick = e => {
   //    dialog.close('back');
   //}
   
   //Finally, add the dialog to the view and show it to the adoring masses
   try {
      document.appendChild(dialog);
      const response = await dialog.showModal();
      
      if (response === 'reasonCanceled') {
         // user hit ESC
         return {which: cancelButtonIdx, value: ''};
      } else if (response === 'back') {
         //EXPERIMENTAL: go back after clicking back button
         //const showMainDialog = require('./mainModal.js');
         //showMainDialog(selection);
         //console.log(selection);
         //return('');
      } else {
         if (clickedButtonIdx === -1) {
               // user pressed ENTER, so no button was clicked!
               clickedButtonIdx = okButtonIdx; // may still be -1, but we tried
         }
         
         /*
            *
            * Here is where you'll add all the stuff that happens when the form is submitted!
            * In other words, get the form values the user entered (let options = {...})
            * e.g. let options = {optionA: dialog.querySelector('#id').value}
            *
            * And run building functions (put the require statements here)
            * const runFunction = require('../functions/function.js');
            * runFunction(options);
            * 
         */

         let options = {
            type: dialog.querySelector('#alertType').value,
            message: dialog.querySelector('#alertMessage').value
         }

         const createAlert = require('../functions/alerts.js');
         createAlert(selection, options);
      }
   } catch(err) {
      // system refused the dialog
      return {which: cancelButtonIdx, value: ''};
   } finally {
      dialog.remove();
   }
}


module.exports = alertDialog;