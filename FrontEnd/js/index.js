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
function displayFilters(dataWork){
const filters = document.getElementById("filters");

// Add the "All" filter as the first item in the list of filters
filters.innerHTML += `<li class="filter" id="0">Tous</li>`;

// Create a list of categories by sorting the categories of the different jobs retrieved
const categoryList = Array.from(new Set(dataWork.map(jsonWork => jsonWork.categoryId )));

/* find() finds the first element in the dataWork array
 which has the same categoryId as the current categoryId.*/
categoryList.forEach(categoryId => {      
    const categoryName = dataWork.find(work => work.categoryId === categoryId).category.name;                 
    filters. innerHTML += `<li class="filter" id="${categoryId}">${categoryName}</li>`;
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














       

        