function stringToArray(text, splitter) {
   return text.split(splitter || ',');
}

function getSiblings(element) {
   let siblings = [];
   let sibling = element.parentNode.firstChild;

   while (sibling) {
      if (sibling.nodeType ===1 && sibling !== element) {
         siblings.push(sibling);
      } 

      sibling = sibling.nextSibling;
   }

   return siblings;
}

function filterRows(searchFieldId, filterContainerId) {
   var searchString = document.querySelector(searchFieldId).value;
   var searchContainer = document.querySelector(filterContainerId);

   Array.from(searchContainer.childNodes).forEach(function (row) {
       var textToSearch = row.textContent.trim();

       if (textToSearch.search(new RegExp(searchString, "i")) < 0) {
           row.style.display = 'none';
       } else {
           row.style.display = 'flex';
       };
   });
}

module.exports = {
   stringToArray,
   getSiblings,
   filterRows
}