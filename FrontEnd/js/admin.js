/*POSTING AND THE ADMINISTRATOR SIDE*/

const displayLogout = document.getElementById("logout");

// when clicking on logout the user disconnects
displayLogout.addEventListener("click",() =>{
  window.localStorage.removeItem("token");

  // redirect to offline homepage
  window.location.href = "./index.html";
});

// Recovery of the token in the local storage
const token = window.localStorage.getItem("token");

// if the user closes the tab or quits the browser, he logs out 
window.addEventListener('unload', () => {
  window.localStorage.removeItem("token");
});

// Display of elements on the administrator side if token present
if (token) {
    displayLogout.textContent = "logout";
  
    const filters = document.getElementById("filters");
    setDisplayStyle(filters, 'none');

   
  
    const directionEdit = document.getElementById("directionEdit");
          directionEdit.appendChild(createEditElement()); 
    displayHeadbandEditMod();
}

/************************************* Functions *****************************************/

// function to create the "modify" button and icon
function createEditElement() {
  const displayEdit = createButtonElement(['positionEdit'],"modifier");
 
  const iconEdit = createIconElement("fa-regular", "fa-pen-to-square");
  
  displayEdit.insertBefore(iconEdit, displayEdit.firstChild);
  return displayEdit;
};

// Function to display the "edit mode" black band
function displayHeadbandEditMod(){
  const header = document.querySelector("header");
  header.style.marginTop = "100px";

  const headerH1 = document.querySelector("header h1");
  const divBlackHeadband = document.createElement("div");
  divBlackHeadband.id = "blackHeadband";
  header.insertBefore(divBlackHeadband, headerH1);
 
  const divEditMod =createButtonElement(['positionEdit'],"Mode édition");
  divEditMod.style.paddingTop = "0";
  divEditMod.insertBefore(createEditElement().firstChild, divEditMod.firstChild);

  const publishChangesButton = createButtonElement (['publish-changes-button'],"publier les changements");

  divBlackHeadband.appendChild(divEditMod);
  divBlackHeadband.appendChild(publishChangesButton);
};

/**********************************************************************************************/






  
   