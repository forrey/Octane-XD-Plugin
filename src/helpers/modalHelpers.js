//const divider = '<hr />';
      
function buildHeader({
    form, 
    text, 
    back = true, 
    icon = ''
} = {}) {
    const headerImg = (back === true ? `<img class="back-arrow" src="../../img/icons/back-arrow.png">` : '');    
    const headerIcon = icon;
    
    const headerText = `<span>${text}</span>`;
    const header = document.createElement('h1');
    header.className = 'header';
    
    header.innerHTML = headerImg + headerIcon + headerText;
    form.appendChild(header);
    form.appendChild(document.createElement('hr'));
}

function buildFooter({
    form,
    buttons=[
        {label: 'Cancel', type: 'reset', id: 'btnCancel', variant: 'secondary'}
    ]
} = {}) {
    const footer = document.createElement('footer');
    
    buttons.forEach(({type, variant, id, label} = {}) => {
        var button = document.createElement('button');
        
        button.id = id;
        button.innerHTML = label;
        button.type = type;
        button.setAttribute('uxp-variant', variant);
        
        footer.appendChild(button);        
    });
    form.appendChild(footer);
}

/*function buildDropdown(container, label, id, options) {*/

function buildDropdown({
    container,
    label,
    id,
    options=[
        {value: 'option1', text: 'Option 1', selected: false}
    ]
} = {}) {
    //Make a section
    const section = document.createElement('div');
    section.className = "section";
    
    //Make the container. a <label> element which will contain a <span> label and a <select> dropdown
    const dropdownContainer = document.createElement('label');
    
    //Make the dropdown label span
    const dropdownLabel = document.createElement('span');
    dropdownLabel.innerHTML = label;
    
    //Make the <select> element and give it an ID
    const dropdown = document.createElement('select');
    dropdown.id = id;
    
    options.forEach(({value, text, selected} = {}) => {
       var option = document.createElement('option');
        
        option.value = value;
        option.innerHTML = text;
        option.selected = (selected === true ? 'selected' : '');
        
        dropdown.appendChild(option);
    });
    
    //Append all of the things
    dropdownContainer.appendChild(dropdownLabel);
    dropdownContainer.appendChild(dropdown);
    section.appendChild(dropdownContainer);
    container.appendChild(section);
}

function buildTextField({
    container, 
    label = "", 
    id, 
    placeholder = ""
} = {}) {
    //Make a section
    const section = document.createElement('div');
    section.className = "section";
    
    //Make the container. a <label> element which will contain a <span> label and a <select> dropdown
    const fieldContainer = document.createElement('label');
    
    //Make the field label span
    const fieldLabel = document.createElement('span');
    fieldLabel.innerHTML = label;
    
    //Make the field
    const textField = document.createElement('input');
    textField.id = id;
    textField.placeholder = placeholder;
    
    fieldContainer.appendChild(fieldLabel);
    fieldContainer.appendChild(textField);
    section.appendChild(fieldContainer);
    container.appendChild(section);
}

function buildCheckbox({
    container,
    label = "checkbox", 
    id, 
    checked = false
} = {}) {
    const section = document.createElement('div');
    section.className = "section";

    //Make the container
    const checkBoxContainer = document.createElement('label');
    checkBoxContainer.className = "checkbox-container";

    //Make the checkbox
    const checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    checkbox.id = id;
    checkbox.checked = checked;
        
    //Make the label
    const checkBoxLabel = document.createElement('span');
    checkBoxLabel.innerHTML = label;

    checkBoxContainer.appendChild(checkbox);
    checkBoxContainer.appendChild(checkBoxLabel);
    section.appendChild(checkBoxContainer);
    container.appendChild(section);
}

function buildInfoText(container, text) {
    const section = document.createElement('div');
    section.className = "section";
    
    const textParagraph = document.createElement('p');
    textParagraph.className = "info-text";
    
    textParagraph.innerHTML = text;
    
    section.appendChild(textParagraph);
    container.appendChild(section);
}

module.exports = {
    buildHeader,
    buildFooter,
    buildDropdown,
    buildTextField,
    buildCheckbox,
    buildInfoText
}