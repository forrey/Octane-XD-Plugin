const {buildHeader, buildFooter, buildSection, buildDropdown, buildTextInput, buildTextArea, buildCheckbox, buildInfoText} = require('../helpers/modalHelpers.js');

async function buttonsDialog(selection, dialog, form) {
   form.innerHTML = '';
   dialog = document.querySelector('dialog');

   buildHeader({
      form: form,
      text: "Buttons",
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
      text: [
         "To add a button to an artboard, select an artboard",
         "To add a button to a group, select a layer within a group"
      ]
   });

   buildDropdown({
      container: section,
      label: "Type",
      id: "buttonType",
      options: [
         {value: 'primary', text: 'Primary (blue)', selected: true},
         {value: 'secondary', text: 'Secondary (black)'},
         {value: 'negative', text: 'Negative (red)'},
         {value: 'accent', text: 'Accent (dark blue)'},
      ]
   });

   buildDropdown({
      container: section,
      label: "Variation",
      id: "buttonVariation",
      options: [
         {value: 'raised', text: 'Raised (with background/border)', selected: true},
         {value: 'flat', text: 'Flat (no background/border)'}
      ]
   });

   buildDropdown({
      container: section,
      label: "Size",
      id: "buttonSize",
      options: [
         {value: 'narrow', text: 'Narrow'},
        {value: 'standard', text: 'Standard', selected: true},
        {value: 'large', text: 'Large'}
      ]
   });

   buildTextInput({
      container: section,
      label: "Button Text",
      id: "buttonText",
      placeholder: 'If blank, the label will simply be "Button"'
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
         type: document.querySelector('#buttonType').value,
         variation: document.querySelector('#buttonVariation').value,
         size: document.querySelector('#buttonSize').value,
         text: document.querySelector('#buttonText').value
      }

      const createButton = require('../functions/createButton.js');
      createButton(selection, options);

      /*
       * Oh thank god it's all over
      */

      dialog.close("ok");
      //e.preventDefault();
   };

   var backArrow = document.querySelector('.back-arrow');
   backArrow.onclick = (e) => {
      //const mainDialog = require('./mainDialog');
      //mainDialog(dialog, selection, form);
      const baseDialog = require('./baseDialog');
      baseDialog(selection, dialog);
   };

   const addButton = document.querySelector('#btnAdd');
   addButton.onclick = e => {
      onsubmit();
      e.preventDefault();
   };

   const cancelButton = document.querySelector('#btnCancel');
   cancelButton.onclick = e => {
      dialog.close('reasonCanceled');
   }
}



module.exports = buttonsDialog;