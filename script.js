/* ============ GEONOMETICS - JAVASCRIPT FUNCTIONALITY ============ */
/* This file handles all interactive features of the website */

/* ============ MODAL FUNCTIONS - FOR ASKING QUESTIONS ============ */
/* These functions control the popup window for asking questions */

// Open the "Ask Question" modal when user clicks the button
function openAskModal() {
    // Get the modal element by its ID from the HTML
    const modal = document.getElementById("askModal");
    
    // Display the modal by changing its CSS display property
    modal.style.display = "block";
    
    // Prevent page scrolling while modal is open
    document.body.style.overflow = "hidden";
}

// Close the "Ask Question" modal
function closeAskModal() {
    // Get the modal element
    const modal = document.getElementById("askModal");
    
    // Hide the modal
    modal.style.display = "none";
    
    // Allow page scrolling again
    document.body.style.overflow = "auto";
}

// Close modal when user clicks outside of it
window.onclick = function(event) {
    // Get the modal element
    const modal = document.getElementById("askModal");
    
    // Check if the user clicked outside the modal content
    if (event.target == modal) {
        // Close the modal
        modal.style.display = "none";
        
        // Allow page scrolling
        document.body.style.overflow = "auto";
    }
}

// ============ FORM SUBMISSION ============
/* Handle when user submits the question form */

function submitQuestion(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Get all form input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const category = document.getElementById("category").value;
    const question = document.getElementById("question").value;
    
    // Create a data object with the form information
    const questionData = {
        name: name,
        email: email,
        category: category,
        question: question,
        timestamp: new Date().toISOString() // Add current date/time
    };
    
    // Log the question data to console (for testing)
    console.log("Question submitted:", questionData);
    
    // Show success message to user
    alert(`Thank you, ${name}! Your question has been submitted successfully. We'll get back to you soon!`);
    
    // Clear all form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("category").value = "";
    document.getElementById("question").value = "";
    
    // Close the modal
    closeAskModal();
    
    // NOTE: In a real application, you would send this data to a server/backend
    // using fetch() or XMLHttpRequest to store it in a database
}

/* ============ SEARCH FUNCTIONALITY ============ */
/* Handle searching for topics */

function searchTopics() {
    // Get the search input value
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    
    // Log the search term (for testing)
    console.log("Searching for:", searchTerm);
    
    // If search term is empty, show all videos
    if (searchTerm === "") {
        alert("Please enter a search term");
        return;
    }
    
    // Show loading message
    alert(`Searching for: "${searchTerm}"...`);
    
    // NOTE: In a real application, you would:
    // 1. Filter videos based on the search term
    // 2. Update the grid to show only matching videos
    // 3. Display a message if no results found
}

/* ============ CONTENT FILTERING ============ */
/* Filter videos by category when user clicks a category in sidebar */

function filterContent(category) {
    // Log which category was selected
    console.log("Filtering by category:", category);
    
    // Get all video cards
    const videoCards = document.querySelectorAll(".vlog-card");
    
    // Loop through each video card
    videoCards.forEach(card => {
        // Get the category badge from the card
        const categoryBadge = card.querySelector(".category-badge");
        
        // Get the category text from the badge
        const cardCategory = categoryBadge.textContent.toLowerCase().trim();
        
        // If category matches, show the card; otherwise hide it
        if (cardCategory.includes(category)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
    
    // Update the page title to show what's being displayed
    const sectionTitle = document.querySelector(".section-title");
    sectionTitle.textContent = `Latest ${category.charAt(0).toUpperCase() + category.slice(1)} Content`;
}

/* ============ VIDEO INTERACTION FUNCTIONS ============ */
/* Handle user interactions with videos */

// Like/Unlike a video
function likeVideo(button) {
    // Check if the heart is already filled (liked)
    if (button.classList.contains("liked")) {
        // Unlike the video
        button.classList.remove("liked");
        button.style.color = "inherit";
        button.innerHTML = '<i class="far fa-heart"></i> Like';
    } else {
        // Like the video
        button.classList.add("liked");
        button.style.color = "#e74c3c";
        button.innerHTML = '<i class="fas fa-heart"></i> Liked';
    }
}

// Share a video
function shareVideo() {
    // Create a share text
    const shareText = "Check out this amazing video on Geonometics!";
    
    // Check if the browser supports Web Share API
    if (navigator.share) {
        // Use native share dialog (works on mobile)
        navigator.share({
            title: "Geonometics",
            text: shareText,
            url: window.location.href
        }).catch(err => console.log("Error sharing:", err));
    } else {
        // Fallback: Show alert with share options
        alert("Share this video!\n\nGeonometics - Learn about Geopolitics, Finance & Tech\n\n" + window.location.href);
    }
}

/* ============ LOAD MORE FUNCTIONALITY ============ */
/* Load additional videos when user clicks "Load More" */

function loadMoreVideos() {
    // Show loading message
    console.log("Loading more videos...");
    
    // Create 3 new sample video cards
    const newVideos = [
        {
            category: "finance",
            title: "Real Estate Investment Guide",
            description: "Learn how to invest in real estate and build wealth.",
            views: "890",
            date: "3 days ago"
        },
        {
            category: "technology",
            title: "Blockchain Technology Explained",
            description: "Understanding the technology behind cryptocurrencies.",
            views: "1.2K",
            date: "4 days ago"
        },
        {
            category: "geopolitics",
            title: "Middle East Conflicts Explained",
            description: "Analysis of ongoing geopolitical tensions in the Middle East.",
            views: "2.3K",
            date: "1 week ago"
        }
    ];
    
    // Get the grid container
    const grid = document.getElementById("vlogsGrid");
    
    // Add each new video to the grid
    newVideos.forEach(video => {
        // Create a new video card element
        const card = document.createElement("article");
        card.className = "vlog-card";
        
        // Set the HTML content of the card
        card.innerHTML = `
            <div class="vlog-thumbnail">
                <img src="https://via.placeholder.com/300x200?text=${video.title}" alt="${video.title}">
                <div class="play-btn">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="vlog-info">
                <span class="category-badge ${video.category}">${video.category.charAt(0).toUpperCase() + video.category.slice(1)}</span>
                <h3 class="vlog-title">${video.title}</h3>
                <p class="vlog-description">${video.description}</p>
                <div class="vlog-meta">
                    <span class="views"><i class="fas fa-eye"></i> ${video.views} views</span>
                    <span class="date">${video.date}</span>
                </div>
                <div class="vlog-actions">
                    <button class="action-btn" onclick="likeVideo(this)">
                        <i class="far fa-heart"></i> Like
                    </button>
                    <button class="action-btn" onclick="shareVideo()">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>
            </div>
        `;
        
        // Add the new card to the grid
        grid.appendChild(card);
    });
    
    // Show success message
    alert("More videos loaded! Scroll down to see them.");
    
    // NOTE: In a real application, you would:
    // 1. Make an API request to get more videos from your server
    // 2. Handle pagination properly
    // 3. Show a loading spinner while fetching
    // 4. Disable the button temporarily to prevent multiple clicks
}

/* ============ SCROLL TO CONTENT ============ */
/* Smooth scroll to videos when user clicks "Explore Content" button */

function scrollToContent() {
    // Get the vlogs section element
    const vlogsSection = document.querySelector(".vlogs-section");
    
    // Smooth scroll to the section
    vlogsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/* ============ INITIALIZATION - RUNS WHEN PAGE LOADS ============ */
/* Code that runs automatically when the page first loads */

// Run when the entire page has loaded
document.addEventListener("DOMContentLoaded", function() {
    // Log that the page has loaded successfully
    console.log("Geonometics website loaded successfully!");
    
    // Initialize any additional features here
    // For example: load saved preferences, check user login, etc.
    
    // Add click event listeners to all video cards to track which videos users click
    const videoCards = document.querySelectorAll(".vlog-card");
    videoCards.forEach(card => {
        card.addEventListener("click", function() {
            const videoTitle = this.querySelector(".vlog-title").textContent;
            console.log("User clicked on video:", videoTitle);
            // NOTE: You could send this analytics data to your server
        });
    });
});

/* ============ UTILITY FUNCTIONS ============ */
/* Helper functions for common tasks */

// Format numbers with thousands separator (e.g., 1000 -> 1K)
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num;
}

// Get the current date in a readable format
function getCurrentDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
}

// Log user activity for analytics (optional)
function logActivity(action, details) {
    const activity = {
        action: action,
        details: details,
        timestamp: new Date().toISOString()
    };
    console.log("User activity:", activity);
    // NOTE: Send this data to your analytics server
}