

async function secondDialog(dialog, selection, form) {
    form.innerHTML = '';

    var header = document.createElement('h1');
    header.innerHTML = `<img class="back-arrow" src="../assets/ui-icons/back-arrow.png" /><span>SecondDialog</span>`;
    form.appendChild(header);

    var newDiv = document.createElement('div');
    newDiv.className = "new-div";
    form.appendChild(newDiv);

    var textField = document.createElement('input');
    textField.placeholder = "testing";
    textField.id = "testInput";

    form.appendChild(textField);

    var backArrow = document.querySelector('.back-arrow');
    
    backArrow.onclick = (e) => {
        const mainDialog = require('./mainDialog');
        mainDialog(dialog, selection, form);
    }

    form.onsubmit = (e) => {
        let options = {
            text: document.querySelector('#testInput').value 
        }

        const functionOne = require('../functions/functionOne');
        functionOne(selection, options);

        dialog.close('ok');
        e.preventDefault();
    }
}


module.exports = secondDialog;