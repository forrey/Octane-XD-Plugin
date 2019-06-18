/*              */
/*  BASE STYLES */
/*              */

form {
    display: flex;
}
h1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18pt;
}
hi img {
    max-width: 35px;
    max-height: 35px;
    padding: 0;
    margin: 0 8px 0 0;
}
h1 img.back-arrow {
    width: auto;
    max-height: 16px;
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

/*                  */
/*  END BASE STYLES */
/*                  */