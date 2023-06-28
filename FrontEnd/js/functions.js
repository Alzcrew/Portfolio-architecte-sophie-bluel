// Function to retrieve projects by calling the API
function fetchWorks() {
    return fetch("http://localhost:5678/api/works")
      .then(data => data.json() );           
  }
  
  // function to modify the display value 
  function setDisplayStyle(element, displayValue) {
      element.style.display = displayValue;
  }
  
  // Function to create a button, apply one or more class to it, and insert a text 
  function createButtonElement(classNames = [], textContent = "") {
    const button = document.createElement("div");
    button.setAttribute("role", "button");
    
    if (Array.isArray(classNames)) {
      classNames.forEach(className => {
        button.classList.add(className);
      });
    } else {
      button.classList.add(classNames);
    }
    
    if (textContent) {
      button.textContent = textContent;
    }
    
    return button;
  }
    
  // function to create an icon
  function createIconElement(...classNames){
      const icon = document.createElement("i");
      classNames.forEach(className => {
          icon.classList.add(className);
      });
      return icon;
  }
  
  // Function to create an element with attributes and a CSS class
  function createAndAppendElement(tagName, parent, className, attributes = {}) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    for (const attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute]);
    }
    parent.appendChild(element);
    return element;
  }
  
  // Utility function to create an input element with attributes
  function createAndAppendInputElement(parent, type, name, attributes = {}) {
    const input = createAndAppendElement('input', parent, null, { type, name, ...attributes });
    return input;
  }
  
  // Function to refresh the gallery
  function refreshGallery(selector) {
    const gallery = document.querySelector(selector);
    if (gallery) {
      gallery.innerHTML = '';
      fetchWorksDisplayGallery(selector);
    }
  };
  
  // Function to create and display an error message 
  function displayErrorMessage(message, selector) {
    const errorContainer = document.querySelector(selector);
    const errorMessageElement = errorContainer.querySelector('.error-message');
    if(errorMessageElement){
      errorMessageElement.remove();
    }
    const errorMessage = document.createElement('p');
  
    errorMessage.classList.add('error-message');
    errorMessage.innerHTML = message;
  
    errorContainer.appendChild(errorMessage);
  }
  
  // Function to retrieve the title of the image
  function formatFileName(fileName) {
    // Extract the name without the extension
    const fileNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
  
    // Remove digits at the end of the filename
    const formattedFileName = fileNameWithoutExtension.replace(/\d+$/, '');
  
    // Delete the dashes at the beginning and end of the name
    const trimmedFileName = formattedFileName.replace(/^-+|-+$/g, '');
  
    // Replace the remaining dashes with spaces
    const finalFileName = trimmedFileName.replace(/-/g, ' ');
  
    return finalFileName;
  }
  