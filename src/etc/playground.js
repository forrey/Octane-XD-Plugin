

//Checkboxes for Dialogs
`
<style>
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
</style>
<div class="section">
    <h2>Type</h2>
    <div id="buttonType" class="checkbox-row">
        <label> 
            <input type="checkbox" value="primary" checked />
            <span>Primary</span>
        </label>
        <label> 
            <input type="checkbox" />
            <span>Secondary</span>
        </label>
        <label> 
            <input type="checkbox" />
            <span>Negative</span>
        </label>
        <label> 
            <input type="checkbox" />
            <span>Accent</span>
        </label>
    </div>
</div>
`