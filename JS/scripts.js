// Function to redirect to the create page
function redirectToCreatePage() {
    window.location.href = 'create.html';
}

// Function to load works from local storage and display them
function loadWorks() {
    const workList = document.getElementById('work-list');
    const works = JSON.parse(localStorage.getItem('works')) || [];
    works.forEach((work, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = work.title;
        listItem.onclick = function() {
            redirectToEditPage(index);
        };
        workList.appendChild(listItem);
    });
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

// Function to submit the story and save it in local storage
function submitStory() {
    const title = document.getElementById('title-input').value;
    const content = document.getElementById('story-content').value;
    const works = JSON.parse(localStorage.getItem('works')) || [];
    const storyIndex = new URLSearchParams(window.location.search).get('index');

    if (storyIndex !== null) {
        works[storyIndex] = { title, content };
    } else {
        works.push({ title, content });
    }

    localStorage.setItem('works', JSON.stringify(works));
    alert('Story submitted successfully!');
    window.location.href = 'mywork.html';
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
            }
        }
    };
}
