if (localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'index.html';
}

const allProjects = [
  { name: 'Assignment 1', created: '1m ago', creator: 'Cole Gawin', category: 'Your Projects' },
  { name: 'Lab 3', created: '40m ago', creator: 'Shruti Natala', category: 'Shared with You' },
  { name: 'Workbook Ch. 3', created: '2hrs ago', creator: 'Cole Gawin', category: 'Archived' },
  { name: 'Worksheet 2', created: 'April 25, 2024', creator: 'Cole Gawin', category: 'Trash' },
  { name: 'Resume', created: 'March 27, 2023', creator: 'Cole Gawin', category: 'Your Projects' },
  { name: 'Assignment 3', created: 'Feb 20, 2023', creator: 'Cole Gawin', category: 'All Projects' },
  { name: 'Assignment 4', created: 'Feb 20, 2023', creator: 'Cole Gawin', category: 'All Projects' },
  { name: 'Assignment 5', created: 'Feb 20, 2023', creator: 'Patrick Bateman', category: 'All Projects' },
  { name: 'Assignment 6', created: 'Feb 20, 2023', creator: 'Shruti Natala', category: 'All Projects' }
];

let projects = [...allProjects]; // Default project list
let currentViewMode = 'card'; // Default view mode

function loadProjects(viewType) {
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = ''; // Clear current projects

  // Set the view class (card or list)
  projectList.className = viewType === 'card' ? 'projects-view card-view' : 'projects-view list-view';

  projects.forEach(project => {
    if (viewType === 'card') {
      const projectCard = document.createElement('div');
      projectCard.classList.add('project-card');
      projectCard.innerHTML = `
        <div class="image-container">
          <img src="doc.png" alt="Document Image">
        </div>
        <div class="text-container">
          <strong class="title">${project.name}</strong>
          <p class="timestamp">${project.created}</p>
        </div>`;
      projectList.appendChild(projectCard);
    } else if (viewType === 'list') {
      // Create list view lines with structured information
      const projectItem = document.createElement('div');
      projectItem.classList.add('project-list-item');
      projectItem.innerHTML = `
        <span class="project-title">${project.name}</span>
        <span class="project-timestamp">${project.created}</span>
        <span class="project-creator">${project.creator}</span>`;
      projectList.appendChild(projectItem);
    }
  });
}

// Function to filter projects and update the title
function filterProjects(category) {
  switch (category) {
    case 'All Projects':
      projects = allProjects.filter(project => project.category !== 'Trash');
      break;
    case 'Your Projects':
      projects = allProjects.filter(project => project.creator === 'Cole Gawin');
      break;
    case 'Shared with You':
      projects = allProjects.filter(project => project.creator !== 'Cole Gawin');
      break;
    case 'Archived':
      projects = allProjects.filter(project => project.category === 'Archived');
      break;
    case 'Trash':
      projects = allProjects.filter(project => project.category === 'Trash');
      break;
  }
  
  loadProjects(currentViewMode); // Reload projects in the current view mode
  document.getElementById('project-title').innerText = category; // Update the title
}

// Event listeners for each button
document.getElementById('all-projects-btn').addEventListener('click', () => filterProjects('All Projects'));
document.getElementById('your-projects-btn').addEventListener('click', () => filterProjects('Your Projects'));
document.getElementById('shared-with-you-btn').addEventListener('click', () => filterProjects('Shared with You'));
document.getElementById('archived-btn').addEventListener('click', () => filterProjects('Archived'));
document.getElementById('trash-btn').addEventListener('click', () => filterProjects('Trash'));

// Initial load as cards
loadProjects('card');

// Handle view mode switching
document.getElementById('view-cards').addEventListener('click', () => {
  currentViewMode = 'card';
  loadProjects(currentViewMode);
  setActiveViewButton('view-cards');
});

document.getElementById('view-list').addEventListener('click', () => {
  currentViewMode = 'list';
  loadProjects(currentViewMode);
  setActiveViewButton('view-list');
});

function setActiveViewButton(activeId) {
  document.getElementById('view-cards').classList.remove('active');
  document.getElementById('view-list').classList.remove('active');

  document.getElementById(activeId).classList.add('active');
}

function setActiveButton(buttonId) {
  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.nav-button');
  buttons.forEach(button => button.classList.remove('active'));

  // Add active class to the clicked button
  const activeButton = document.getElementById(buttonId);
  if (activeButton) {
      activeButton.classList.add('active');
  }
}

// Example of handling button clicks
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('all-projects-btn').addEventListener('click', () => setActiveButton('all-projects-btn'));
  document.getElementById('your-projects-btn').addEventListener('click', () => setActiveButton('your-projects-btn'));
  document.getElementById('shared-with-you-btn').addEventListener('click', () => setActiveButton('shared-with-you-btn'));
  document.getElementById('archived-btn').addEventListener('click', () => setActiveButton('archived-btn'));
  document.getElementById('trash-btn').addEventListener('click', () => setActiveButton('trash-btn'));
});

// Function to handle view mode switching
function handleViewMode(viewType) {
  const cardButton = document.getElementById('view-cards');
  const listButton = document.getElementById('view-list');
  
  // Update view mode
  currentViewMode = viewType;
  loadProjects(currentViewMode);
  
  // Toggle active class
  if (viewType === 'card') {
      cardButton.classList.add('active');
      listButton.classList.remove('active');
  } else if (viewType === 'list') {
      listButton.classList.add('active');
      cardButton.classList.remove('active');
  }
}

// Set the initial view mode as card
document.addEventListener('DOMContentLoaded', () => {
  handleViewMode('card');
});

document.addEventListener('DOMContentLoaded', () => {
  // Define button IDs
  const buttons = {
      'all-projects': document.getElementById('all-projects-btn'),
      'your-projects': document.getElementById('your-projects-btn'),
      'shared-with-you': document.getElementById('shared-with-you-btn'),
      'archived': document.getElementById('archived-btn'),
      'trash': document.getElementById('trash-btn')
  };

  // Get current page from URL
  const currentPage = getCurrentPage(); // Implement this function based on your logic

  // Remove active class from all buttons
  Object.values(buttons).forEach(button => button.classList.remove('active'));

  // Add active class to the current page button
  if (buttons[currentPage]) {
      buttons[currentPage].classList.add('active');
  }
});

function getCurrentPage() {
    // Logic to determine the current page from URL or another method
    // For example, this could be extracted from URL query
    const url = window.location.href;
    if (url.includes('all-projects')) return 'all-projects';
    if (url.includes('your-projects')) return 'your-projects';
    if (url.includes('shared-with-you')) return 'shared-with-you';
    if (url.includes('archived')) return 'archived';
    if (url.includes('trash')) return 'trash';
    return 'all-projects'; // Default page
}

// Event listeners for view mode buttons
document.getElementById('view-cards').addEventListener('click', () => handleViewMode('card'));
document.getElementById('view-list').addEventListener('click', () => handleViewMode('list'));

document.getElementById('new-project').addEventListener('click', () => {
  document.getElementById('upload-pdf').click();
});

document.getElementById('upload-pdf').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    const newProject = { name: file.name, created: 'Just now', creator: 'Cole Gawin', category: 'Your Projects' };
    allProjects.unshift(newProject); // Add new project to the top of the array
    filterProjects(document.getElementById('project-title').innerText); // Keep the current filter active
  }
});

// Handle search bar filtering
document.getElementById('search-bar').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  projects = allProjects.filter(project => project.name.toLowerCase().includes(query));
  loadProjects(currentViewMode);
});

// Event listener for the logo and ARO text
document.querySelector('.logo-and-title img').addEventListener('click', () => {
    filterProjects('All Projects');
  });
  
  document.querySelector('.logo-and-title h2').addEventListener('click', () => {
    filterProjects('All Projects');
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logout-btn').addEventListener('click', () => {
        // Redirect to login page
        window.location.href = 'index.html';
    });
});

// Get the logo-and-title element
const logoAndTitle = document.querySelector('.logo-and-title');
// Get the All Projects button
const allProjectsBtn = document.getElementById('all-projects-btn');
// Get the project title element
const projectTitle = document.getElementById('project-title');
// Get all nav buttons
const navButtons = document.querySelectorAll('.nav-button');

// Function to set active state on All Projects button
function setActiveAllProjects() {
  navButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // Active class to All Projects button
  allProjectsBtn.classList.add('active');
  
  // Update the project title to 'All Projects'
  projectTitle.textContent = 'All Projects';
}

// Event listener to the logo-and-title
logoAndTitle.addEventListener('click', setActiveAllProjects);
