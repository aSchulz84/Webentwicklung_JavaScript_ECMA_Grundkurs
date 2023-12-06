
// selektiert ein HTML Element
const el =(css) =>document.querySelector(css);

// selektiert eine HTML Grouppe - NodeList
const group =(css) =>document.querySelectorAll(css);

// Erzeugt ein virtuelles HTML Element
const create = (html) => document.createElement(html);

// tafel kopie verschachtelen Arrays - Objects
const deepCopy = (array) => JSON.parse(JSON.stringify(array));
 


