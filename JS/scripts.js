let deleteIndex = null;

// Function to redirect to the create page
function redirectToCreatePage() {
    window.location.href = 'create.html';
}

// Function to load works from local storage and display them
function loadWorks() {
    const workList = document.getElementById('work-list');
    const works = JSON.parse(localStorage.getItem('works')) || [];
    workList.innerHTML = ''; // Clear the list before adding
    works.forEach((work, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'work-item';

        const button = document.createElement('button');
        button.textContent = work.title;
        button.className = 'work-btn';
        button.onclick = function() {
            redirectToEditPage(index);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function() {
            showDeleteConfirmation(index);
        };

        listItem.appendChild(button);
        listItem.appendChild(deleteButton);
        workList.appendChild(listItem);
    });
}

// Function to show the delete confirmation dialog
function showDeleteConfirmation(index) {
    deleteIndex = index;
    const modal = document.getElementById('delete-confirmation');
    modal.style.display = 'block';
}

// Function to hide the delete confirmation dialog
function hideDeleteConfirmation() {
    const modal = document.getElementById('delete-confirmation');
    modal.style.display = 'none';
}

// Function to confirm deletion of the story
function confirmDelete() {
    deleteStory(deleteIndex);
    hideDeleteConfirmation();
}

// Function to cancel deletion of the story
function cancelDelete() {
    hideDeleteConfirmation();
}

// Function to update the story title dynamically
function updateTitle() {
    const titleInput = document.getElementById('title-input');
    const storyTitle = document.getElementById('story-title');
    storyTitle.textContent = titleInput.value || 'Write Your Story';
}

// Function to save the story title in local storage
function saveTitle() {
    const titleInput = document.getElementById('title-input').value;
    localStorage.setItem('storyTitle', titleInput);
    alert('Title saved successfully!');
}

// Function to show the description and tags popup
function showDescriptionPopup() {
    const modal = document.getElementById('description-popup');
    modal.style.display = 'block';
}

// Function to hide the description and tags popup
function hideDescriptionPopup() {
    const modal = document.getElementById('description-popup');
    modal.style.display = 'none';
}

// Function to submit the story and save it in local storage
function submitStory() {
    const title = document.getElementById('title-input').value;
    const content = document.getElementById('story-content').value;
    const description = document.getElementById('description-input').value;
    const tags = document.getElementById('tags-input').value.split(',').map(tag => tag.trim());
    const works = JSON.parse(localStorage.getItem('works')) || [];
    const storyIndex = new URLSearchParams(window.location.search).get('index');

    const storyData = { title, content, description, tags };

    if (storyIndex !== null) {
        works[storyIndex] = storyData;
    } else {
        works.push(storyData);
    }

    localStorage.setItem('works', JSON.stringify(works));
    alert('Story submitted successfully!');
    window.location.href = 'mywork.html';
}

// Function to delete a story from the list
function deleteStory(index) {
    const works = JSON.parse(localStorage.getItem('works')) || [];
    works.splice(index, 1);
    localStorage.setItem('works', JSON.stringify(works));
    loadWorks(); // Reload the list after deletion
}

// Function to redirect to the edit page with the story index
function redirectToEditPage(index) {
    window.location.href = `create.html?index=${index}`;
}

// Load works when the mywork.html page loads
if (window.location.pathname.endsWith('mywork.html')) {
    window.onload = function() {
        loadWorks();
    };
}

// Load the saved title and update the title dynamically when the create.html page loads
if (window.location.pathname.endsWith('create.html')) {
    window.onload = function() {
        const savedTitle = localStorage.getItem('storyTitle');
        if (savedTitle) {
            document.getElementById('title-input').value = savedTitle;
            document.getElementById('story-title').textContent = savedTitle;
        }

        const storyIndex = new URLSearchParams(window.location.search).get('index');
        if (storyIndex !== null) {
            const works = JSON.parse(localStorage.getItem('works')) || [];
            const story = works[storyIndex];
            if (story) {
                document.getElementById('title-input').value = story.title;
                document.getElementById('story-title').textContent = story.title;
                document.getElementById('story-content').value = story.content;
                document.getElementById('description-input').value = story.description;
                document.getElementById('tags-input').value = story.tags.join(', ');
            }
        }
    };
}
