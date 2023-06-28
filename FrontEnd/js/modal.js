/******* MODAL *******/

// Hide the second page of the modal
secondPageModalDisplay('none');

/*a modal-trigger class is added to the close "X" button,
 on the "edit" button and on the overlay (dark background)*/
 createCloseButton();
const elements = document.querySelectorAll("#directionEdit .positionEdit, .modal-overlay");
elements.forEach(element => {
  element.classList.add('modal-trigger');
});

// We retrieve all the class '.modal-trigger'
const modalTriggers= document.querySelectorAll(".modal-trigger");

// Loop to browse the different classes and when clicking on one of them executes the toolModal function
modalTriggers.forEach(trigger => trigger.addEventListener("click", toogleModal))
  
// Function that moves the active class to the modal
function toogleModal(){
  const modal = document.getElementById("modal");
  modal.classList.toggle("active");

  const modalElement = document.querySelector(".modal-wrapper");
  // Allows to scroll automatically at the beginning of the modal
  modalElement.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Display the gallery of the modal
fetchWorksDisplayGallery("#modal-gallery");

// When clicking on the button add a display the second page
const buttonAddPhoto = document.querySelector('.modal-btn'); 
buttonAddPhoto.addEventListener('click', modalePageSecond);


/**************************** Function for the modal *********************************/

// Function to create the close button of the modal
function createCloseButton(){
  const buttonClose = createButtonElement(["modal-close", "modal-trigger"]); 

  const iconClose = createIconElement("fa-solid", "fa-xmark");
      
  document.querySelector(".modal-wrapper").appendChild(buttonClose); 
  buttonClose.appendChild(iconClose);
  return buttonClose
};

// Function to create the previous button of the modal
function createPrevButton(){
  const buttonPrev = createButtonElement(['modal-prev']);

  const iconPrev = createIconElement("fa-solid","fa-arrow-left-long");
  buttonPrev.appendChild(iconPrev);

  document.getElementById("modal-page-two").appendChild(buttonPrev);  
  
  buttonPrev.addEventListener('click', modalePagefirst);
  return buttonPrev;
}; 

// Function to display the first page or not
function FirstPageModalDisplay(displayValue){
  const modalPageOne = document.getElementById('modal-page-one');
  setDisplayStyle(modalPageOne, displayValue);
};

// Function to display the second page or not
function secondPageModalDisplay(displayValue){
  const modalPageTwo = document.getElementById('modal-page-two');
  setDisplayStyle(modalPageTwo, displayValue);
  if(displayValue !== "none"){
    createPrevButton();
  }
}; 

// Display the first page
function modalePageSecond () {
  FirstPageModalDisplay('none');
  secondPageModalDisplay('flex');
};

// Display the second page
function modalePagefirst () {
  FirstPageModalDisplay('flex');
  secondPageModalDisplay('none');
};

/**************** Delete a project ****************/

//Function to delete a project
function deleteWork(workId) {
  // Get the token from local storage
  const token = window.localStorage.getItem('token');

  // Make a DELETE request to the API including the token in the header
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => {
      if (response.ok) {
        // Refresh gallery display after deletion
        refreshGallery("#modal-gallery");
        refreshGallery(".gallery");
      } else if(response.status === 401) {
        // Handle deletion errors
        displayErrorMessage("Utilisateur non autorisé!!! Vous allez etre redirigé vers la page connexion.", ".modal-title");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 4000);
      }
    })
    .catch(error => {
      displayErrorMessage("Une erreur s'est produite lors de la suppression de l'élément.", ".modal-title",error);
    });  
}

// Function to display a delete icon
function displayDeleteButton(figure, workId){
  const deleteButton = createButtonElement(['modal-delete-button']);
  const deleteIcon = createIconElement("fa-solid","fa-trash-can");
  deleteButton.style.cursor = 'pointer';
  deleteButton.appendChild(deleteIcon);
  figure.appendChild(deleteButton);

  // When you click on it, a confirmation button appears before deletion
  deleteButton.addEventListener('click', () => {
    const confirmDeleteButton = createButtonElement(['confirm-delete'],"Confirmer suppression");
    confirmDeleteButton.addEventListener("click", function() {
      deleteWork(workId); 
      figure.removeChild(confirmDeleteButton);  
    });
    
    figure.appendChild(confirmDeleteButton);
  });

  return deleteButton
}

// Function to display the move button 
function displayMoveButton(figure){
  const moveButton = createButtonElement(['modal-move-button']);
  moveButton.style.cursor = 'pointer';
  const moveIcon = createIconElement("fa-solid","fa-up-down-left-right");
  moveButton.appendChild(moveIcon);
  figure.appendChild(moveButton);
  return moveButton
}

// Function to add the move button to appear when hovering over a project
function displayMoveButtonHover(figure) {
  const moveButton = displayMoveButton(figure);

  setDisplayStyle(moveButton, 'none');

  figure.addEventListener('mouseenter', () => {
    setDisplayStyle(moveButton, 'flex');
  });

  figure.addEventListener('mouseleave', () => {
    setDisplayStyle(moveButton, 'none');
  });
}

/*************** Formulaire ***************/

// Selection of the form tag
const form = document.getElementById('modal-form');

// Creation of the photo location part
const addPhotoDiv = createAndAppendElement('div', form, 'modal-add-photo');

const svg = document.querySelector("#modal-form svg");
addPhotoDiv.appendChild(svg);

const containerImg = createAndAppendElement('img', addPhotoDiv, 'container-img',{ id:'container-image'});
containerImg.style.display = 'none';

const photoInput = createAndAppendInputElement(addPhotoDiv, 'file', 'photo', {
  accept: 'image/jpeg, image/png','max-size': '4194304',style: 'display: none'  
});

const addButton = createAndAppendElement('div', addPhotoDiv, 'modal-btn');
addButton.textContent = '+ Ajouter photo';

const infoParagraph = createAndAppendElement('p', addPhotoDiv);
infoParagraph.textContent = 'jpg, png : 4 mo max';

// Create the title field
const formFieldDiv = createAndAppendElement('div', form, 'modal-form-field');

const titleInputLabel = createAndAppendElement('label', formFieldDiv, null, { for: 'title' });
titleInputLabel.textContent = 'Titre';
const titleInput = createAndAppendInputElement(formFieldDiv, 'text', 'title',{id: 'title'});

// Create the category control 
const categoryLabel = createAndAppendElement('label', formFieldDiv, null, { for: 'categorie' });
categoryLabel.textContent = 'Catégorie';
const categorySelect = createAndAppendElement('select', formFieldDiv, null, { name: 'categorie', id: 'categorie' });

// Create the button to submit the form
const submitInput = createAndAppendInputElement(form, 'submit', null, { value: 'Valider', id: 'modal-btn-submit' });

// Recovery of data from the api to fill in the selection fields of the different categories
fetchWorks()
  .then(dataWork => {
fetchCategories(dataWork);
  });

function fetchCategories(dataWork) {
  const categorySelect = document.getElementById('categorie');
  categorySelect.innerHTML = ''; // Clear previous options

 // Creation of the "Choose a category" option
  const chooseOption = createAndAppendElement('option', categorySelect, null, {value: '', disabled: true, selected: true});
  chooseOption.textContent = 'Choisissez une catégorie';

 // Create category options
 // The list of unique category identifiers is extracted from the dataWork data
  const categoryList = Array.from(new Set(dataWork.map(jsonWork => jsonWork.categoryId)));

  categoryList.forEach(categoryId => {
    // Retrieve the name of the corresponding category from the dataWork data
    const categoryName = dataWork.find(work => work.categoryId === categoryId).category.name;
    // Create a new option and add it to the selection element
    const option = createAndAppendElement('option', categorySelect, null, {value: categoryId});
    option.textContent = categoryName;
  });
}

// When clicking on the add photo button or on the image container, it triggers the file selection   
addButton.addEventListener('click', function() {
  photoInput.click(); 
});
containerImg.addEventListener('click', function() {
  photoInput.click(); 
});

photoInput.addEventListener('change', function(event) {
  const selectedFile = event.target.files[0];
 
  if (selectedFile) {
    // The FileReader object allows the contents of a file to be read as raw data from a File object.
    const reader = new FileReader();

    reader.addEventListener('load', function() {
      // Access the file content url
      const imageUrl = reader.result;
      
      containerImg.style.display = 'block';
      containerImg.src = imageUrl;
      addButton.style.visibility = 'hidden';

     // Get the filename (image title)
      const fileName = selectedFile.name;

     // Format the file name
      const formattedFileName = formatFileName(fileName);

      // Pre-fill the "title" field with the formatted file name
      titleInput.value = formattedFileName;
    });
    // to read file contents as data URL
    reader.readAsDataURL(selectedFile);
  } else {
    // Reset the image if no file selected
    containerImg.style.display = 'none';
    containerImg.src = '';
    addButton.style.visibility = 'visible';
    // Reset the "title" field
    titleInput.value = '';
  }
});


// Function to check if all the fields are filled in and change the color of the submit button accordingly
function checkFormFields() {
  const titleValue = titleInput.value;
  const categoryValue = categorySelect.value;
  const imageFile = photoInput.files[0];

  // Check if all fields are filled
  const allFieldsFilled = titleValue.trim() !== '' && categoryValue.trim() !== '' && imageFile !== undefined;

  const submitButton = document.getElementById('modal-btn-submit');
  // Update the color of the validation button
  submitButton.style.backgroundColor = allFieldsFilled ? '#1D6154' : '#A7A7A7';
}

// Add event listeners for each form field
titleInput.addEventListener('input', checkFormFields);
categorySelect.addEventListener('change', checkFormFields);
photoInput.addEventListener('change', checkFormFields);



form.addEventListener('submit', function(event) {
  event.preventDefault();

  const token = window.localStorage.getItem('token');

  // Retrieve the form field values
  const title = titleInput.value;
  const categoryId = categorySelect.value;
  const imageFile = photoInput.files[0];
 
  // Create a new FormData object
  const formData = new FormData();
 
  formData.append('title', title);
  formData.append('image', imageFile);
  formData.append('category', categoryId);
  
 // Send the form data to the API
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'multipart/form-data',
    },
    body: formData,
  })
    .then(response => {
      // If the query is correct
      if (response.status === 201) {
        console.log("ok");
        /*Refresh the gallery display, reset the form to its original 
        state and display the first page of the modal*/ 
        refreshGallery("#modal-gallery");
        refreshGallery(".gallery");
        form.reset();
        containerImg.style.display = 'none';
        containerImg.src = '';
        addButton.style.visibility = 'visible';
        const submitButton = document.getElementById('modal-btn-submit');
        submitButton.style.backgroundColor ='#A7A7A7';
        window.scrollTo(600,600);
        modalePagefirst ();

  
      } else if (response.status === 400) {
        displayErrorMessage("Veuillez remplir tous les champs du formulaire.", "#modal-form");

      } else if(response.status === 401) {
        displayErrorMessage("Utilisateur non autorisé!!! Vous allez etre redirigé vers la page connexion.", "#modal-form");
        setTimeout(() => {window.location.href = "login.html";}, 4000);
      }
    })
    .catch(error => {
      console.log(error);
      displayErrorMessage("Une erreur est survenue.", "#modal-form" ,error);
    });
});







  
  