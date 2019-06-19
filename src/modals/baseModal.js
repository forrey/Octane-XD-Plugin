/* Generates the basic framework of a dialog
 * {title} - string, it will appear in the header
 * {back} - boolean, default is true. When true, a back button will appear to the left of the title
 * {icon} - boolean, when true, the main plugin icon will appear
 * {buttons} - object, pass multiple buttons if desired. Default is just the cancel button
    Possible buttons (with correct IDs) are:
    {label: 'Cancel', type: 'reset', id: 'cancel', variant: 'secondary'}
    {label: 'Add', type: 'submit', id: 'submit', variant: 'cta'}
 * {width} - number, will define pixel width of the dialog. Default is 500
*/

function baseDialog({
    dialog,
    title,
    back = true,
    icon = false,
    buttons=[
        {label: 'Cancel', type: 'reset', id: 'cancel', variant: 'secondary'}
    ],
    width = 500
} = {}) {
    let modalContent = `
<style>
/*              */
/*  BASE STYLES */
/*              */

form {
    display: flex;
    width: ${width}px;
}
br {
    line-height: 150%;
}
h1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18pt;
}
h1 img {
    max-width: 35px;
    max-height: 35px;
    padding: 0;
    margin: 0 8px 0 0;
}
h1 img.back-arrow {
    width: auto;
    max-height: 16px;
    opacity: 0;
}
.container {
    margin: 8px;
    overflow-x: hidden;
    overflow-y: auto;
}
.section {
    width: 100%;
    height: auto;
    max-height: 400px;
    overflow-x: scroll;
    padding: 0 10px;
}
.info-text {
    font-size: 11pt;
    color: #888;
    line-height: 14pt;
    background: #fafafa;
    border-radius: 4px;
    padding: 8px;
    border: 1px solid #ededed;
}
.info-text .divider {
    display: block;
    height: 8px;
}
.section h2 {
    font-weight: 500;
    font-size: 12pt;
    color: #777;
}
.section input#search {
    margin: 0;
    padding: 0;
    border-radius: 2px;
}
label {
    padding-bottom: 4px;
    margin-bottom: 8px;
}
label span {
    font-size: 10pt;
    text-transform: uppercase;
    color: #777;
}
label.checkbox-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
label.checkbox-container input {
    margin-right: 0;
    margin-left: 8px;
}
label.checkbox-container span {
    margin-left: 2px;
}
select {
    height: 30px;
}
.checkbox-row {
    display: flex;
}
.checkbox-row label {
    display: flex;
    flex-direction: rows;
    align-items: center;
    border: 1px solid #ddd;
    border-right: none;
    padding: 8px 12px;
}
.checkbox-row label:last-child {
    border-right: 1px solid #ddd;
}
.checkbox-row label span {
    margin: 0;
    padding: 0;
    font-size: 12pt;
    font-weight: 400;
}
input[type="checkbox"] {
    margin: 0;
}
.component-list {
    display: flex;
    flex-direction: column;
}
.component-row {
    width: 100%;
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
}
.component-row:hover {
    cursor: pointer;
    background: "#fff";
}
.component-row .component-name {
    height: 100%;
    font-size: 14pt;
    display: flex;
    align-items: center;
}
.component-row .component-icon {
    width: 100px;
    height: 40px;
    border: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.component-row .component-icon img {
    width: auto;
    height: auto;
    max-width: 90%;
    max-height: 90%;
}
/*                  */
/*  END BASE STYLES */
/*                  */
</style>
<form method="dialog">
    <h1 class="header">
        ${back === true ? `<img id="back-arrow" class="back-arrow" src="../../img/icons/back-arrow.png">` : ''}
        ${icon === true ? `<img src="../../img/plugin-icon.png">` : ''}
        <span>${title}</span>
    </h1>
    <div class="container">

    </div>
    <footer>
        ${buttons.map(({label, type, variant} = {}, idx) => 
           `<button id="btn${idx}" type="${type}" uxp-variant="${variant}">${label}</button>`).join('')}
    </footer>
</form>
`; 
    
    return modalContent;
}

module.exports = baseDialog;
