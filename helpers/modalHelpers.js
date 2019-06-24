
/* Builds the header
 *
 * {form}       You must always pass the form, otherwise the function won't insert the header
 * {text}       String, this will be the header span text
 * {back}       Boolean. True shows the back arrow. (note, you can't have both the back arrow & another icon)
 * {iconPath}   String (path to the icon you want to show, i.e. '../assets/icon.png')
 * 
*/
function buildHeader({
    form, 
    text, 
    back = true, 
    iconPath = ''
} = {}) {    
    const header = document.createElement('h1');

    const headerIcon = document.createElement('img');
    headerIcon.className = (back ? 'back-arrow' : 'header-icon');
    headerIcon.src = (back ? "../assets/ui-icons/back-arrow.png" : iconPath);
    
    header.appendChild(headerIcon);


    const headerText = document.createElement('span');
    headerText.innerHTML = text;

    header.appendChild(headerText);

    form.appendChild(header);
    form.appendChild(document.createElement('hr'));
}

/* Builds the header
 *
 * {form}       You must always pass the form, otherwise the function won't insert the header
 * {text}       String, this will be the header span text
 * {back}       Boolean. True shows the back arrow. (note, you can't have both the back arrow & another icon)
 * {iconPath}   String (path to the icon you want to show, i.e. '../assets/icon.png')
 * 
*/
function buildFooter({
    form,
    buttons=['Cancel', 'Add']
} = {}) {
    const footer = document.createElement('footer');
    
    buttons.forEach((button) => {
        var buttonId;
        var buttonLabel;
        var buttonType;
        var buttonUXP;

        switch(button.toLowerCase()) {
            case 'add':
                buttonId = "btnAdd";
                buttonLabel = "Add";
                buttonType = "submit";
                buttonUXP = "cta";
                break;
            case 'cancel':
                buttonId = "btnCancel";
                buttonLabel = "Cancel";
                buttonType = "reset";
                buttonUXP = "secondary";
                break;
        }
        

        var button = document.createElement('button');
        
        button.id = buttonId;
        button.innerHTML = buttonLabel;
        button.type = buttonType;
        button.setAttribute('uxp-variant', buttonUXP);
        
        footer.appendChild(button); 
    });
    form.appendChild(footer);
}

/* Builds a section.
 * You should always place form content (dropdowns, fields, etc) in a section
 *
 * {form}           You must always pass the form, otherwise the function won't insert the header
 * {sectionClass}   String. Usually the default will be fine.
 * 
*/
function buildSection({
    form,
    sectionClass = "section"
}) {
    const section = document.createElement('div');
    section.className = sectionClass;

    form.appendChild(section);

    return section;
}


/* Builds a dropdown element
 *
 * {container}      You must always pass a container, otherwise the dropdown won't be inserted
 * {label}          String. This will be the label text above the dropdown
 * {id}             String. For getting the input value at the end
 * {options}        Obj Array. Need a value [string], text [string], and selected [boolean]
 * 
*/
function buildDropdown({
    container,
    label,
    id,
    options=[
        {value: 'option1', text: 'Option 1', selected: false}
    ]
} = {}) {
    
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
    container.appendChild(dropdownContainer);
}

/* Builds a Text Input element
 *
 * {container}      You must always pass a container, otherwise the dropdown won't be inserted
 * {label}          String. This will be the label text above the dropdown
 * {id}             String. For getting the input value at the end
 * {placeholder}    String. Placeholder text that will appear inside the field
 * 
*/
function buildTextInput({
    container, 
    label = "", 
    id, 
    placeholder = ""
} = {}) {
    
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
    container.appendChild(fieldContainer);
}

/* Builds a Text Area element
 *
 * {container}      You must always pass a container, otherwise the dropdown won't be inserted
 * {label}          String. This will be the label text above the dropdown
 * {id}             String. For getting the input value at the end
 * {placeholder}    String. Placeholder text that will appear inside the field
 * 
*/
function buildTextArea({
    container,
    label = "",
    id,
    placeholder = ""
} = {}) {
    //Make the container. a <label> element which will contain a <span> label and a <select> dropdown
    const fieldContainer = document.createElement('label');
    
    //Make the field label span
    const fieldLabel = document.createElement('span');
    fieldLabel.innerHTML = label;

    //Make the text area
    const textArea = document.createElement('textarea');
    textArea.id = id;
    textArea.placeholder = placeholder;

    fieldContainer.appendChild(fieldLabel);
    fieldContainer.appendChild(textArea);
    container.appendChild(fieldContainer);
}

/* Builds a Text Area element
 *
 * {container}      You must always pass a container, otherwise the dropdown won't be inserted
 * {label}          String. This will be the label text above the dropdown
 * {id}             String. For getting the input value at the end
 * {checked}        Boolean
 * 
*/
function buildCheckbox({
    container,
    label = "checkbox", 
    id, 
    checked = false
} = {}) {
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
    container.appendChild(checkBoxContainer);
}

function buildInfoText({
    container, 
    text = []
} = {}) {
    const textContainer = document.createElement('div');
    textContainer.className = "info-text";

    text.forEach((paragraph) => {
        var textParagraph = document.createElement('p');
        textParagraph.innerHTML = paragraph;
        textContainer.appendChild(textParagraph);
    });

    container.appendChild(textContainer);
}

module.exports = {
   buildHeader,
   buildFooter,
   buildSection,
   buildDropdown,
   buildTextInput,
   buildTextArea,
   buildCheckbox,
   buildInfoText
}