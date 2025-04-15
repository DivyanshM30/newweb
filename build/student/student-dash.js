document.addEventListener("DOMContentLoaded", () => {
    // Search bar functionality
    const searchBar = document.querySelector(".search-bar input");
    const courseCards = document.querySelectorAll(".course-card");

    searchBar.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        courseCards.forEach((card) => {
            const courseTitle = card.querySelector(".course-title").textContent.toLowerCase();
            if (courseTitle.includes(searchTerm)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // Notification click event
    const notifications = document.querySelector(".notifications");
    notifications.addEventListener("click", () => {
        alert("You have new notifications!");
    });
});
