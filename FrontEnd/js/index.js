/****************HOME PAGE*********************/

// Retrieve data from the "works" API
fetchWorks()
.then(dataWork => {

  // Display of filters
  displayFilters(dataWork);
  
  // Display projects in the gallery
  fetchWorksDisplayGallery(".gallery");
      
  // Retrieve all filters 
  const buttonFilters = document.querySelectorAll(".filter"); 
  const filterAll = buttonFilters[0];

  // When clicking on the "All" filter, all the projects are displayed
  filterAll.addEventListener("click",showAllWorks);

  /*Browse through all filters, except for the "All" filter,
  and for each filter, add an event */
  buttonFilters.forEach(buttonFilter => {
          if (buttonFilter !== filterAll) {
              buttonFilter.addEventListener("click", (event) => {
                  filterWorks(event);
              });
          }
     });
     
});

/******** Functions for the display of filters and the home page gallery **********/

// Function to display filters 
function displayFilters() {
  const filters = document.getElementById("filters");

  fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
      filters.innerHTML += `<li class="filter" id="0">Tous</li>`;

      data.forEach(category => {
        filters.innerHTML += `<li class="filter" id="${category.id}">${category.name}</li>`;
      });

      const buttonFilters = document.querySelectorAll(".filter");
      const filterAll = buttonFilters[0];

      filterAll.addEventListener("click", showAllWorks);

      buttonFilters.forEach(buttonFilter => {
        if (buttonFilter !== filterAll) {
          buttonFilter.addEventListener("click", event => {
            filterWorks(event);
          });
        }
      });
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des catégories :', error);
    });
}

// Function to display the gallery of the homepage or the modal
function fetchWorksDisplayGallery(targetElement) {

return fetchWorks()
.then(dataWork => {    
  // Select the target gallery item from the specified selector
  const galleryElement = document.querySelector(targetElement);

  dataWork.forEach(jsonWork => {
    // Create the figure element to represent the project
    const figure = document.createElement('figure');
    figure.classList.add('work');
    figure.dataset.category = jsonWork.categoryId;

    // Create the img element to display the project image
    const img = document.createElement('img');
    img.src = jsonWork.imageUrl;
    img.alt = 'image du projet';

    figure.appendChild(img);
    // If the targeted element is the gallery, create the figcaption element with its associated title
    if (targetElement === '.gallery') {
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = jsonWork.title;
      figure.appendChild(figcaption);
    }
    // For the gallery of the modal same thing but instead of the title add the word 'edit'
    if (targetElement === '#modal-gallery') {
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = 'éditer';
      figure.appendChild(figcaption);

      // Retrieve the project identifier
      const workId = jsonWork.id;
      // Call functions to show delete button and handle mouse hover
      displayDeleteButton(figure, workId);
      displayMoveButtonHover(figure); 
    }

    galleryElement.appendChild(figure);
  });
});
}


// Remove the "filter_active" class from all filters
function deleteActiveClass(){
const buttonFilters = document.querySelectorAll(".filter");
buttonFilters.forEach(buttonFilter => buttonFilter.classList.remove("filter_active"));
};

// Function to display all jobs when clicking on the 'All' filter
function showAllWorks(){
//Retrieve all filters and jobs
const buttonFilters = document.querySelectorAll(".filter");
const filterAll = buttonFilters[0];
const works = document.querySelectorAll(".work");
// Display all projects
works.forEach(work => work.style.display = "block");
deleteActiveClass();
// Add the "filter_active" class to the "All" filter
filterAll.classList.add("filter_active");   
};

// Function to filter by category and display projects
function filterWorks(event){
const buttonFilterIdValue = event.target.getAttribute("id");   
   deleteActiveClass();
   // Add the "filter_active" class to the current filter
   event.target.classList.add("filter_active");
   // Retrieve all jobs
   const works = document.querySelectorAll(".work");
   works.forEach(work => {
       // If the work corresponds to the selected category display of it
       work.style.display = work.dataset.category === buttonFilterIdValue ? "block" : "none";
   }); 
     
};














       

        