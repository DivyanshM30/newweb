// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const examCards = document.querySelectorAll('.exam-card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        examCards.forEach(card => {
            const examTitle = card.querySelector('h3').textContent.toLowerCase();
            const examDate = card.querySelectorAll('p')[0].textContent.toLowerCase();
            const examStatus = card.querySelectorAll('p')[1].textContent.toLowerCase();
            
            // Check if any of the card content matches the search term
            if (examTitle.includes(searchTerm) || examDate.includes(searchTerm) || examStatus.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Notification bell functionality
    const notificationBell = document.querySelector('.notifications');
    notificationBell.addEventListener('click', function() {
        alert('You have no new notifications.');
    });
    
    // Exam card interaction
    examCards.forEach(card => {
        // Hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
        
        // Button click handlers
        const button = card.querySelector('.btn-primary');
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const btnText = this.textContent;
            const examName = card.querySelector('h3').textContent;
            
            if (btnText.includes('View Details')) {
                alert(`Showing details for ${examName}`);
            } else if (btnText.includes('View Results')) {
                alert(`Showing results for ${examName}`);
            } else if (btnText.includes('Register')) {
                if (confirm(`Would you like to register for ${examName}?`)) {
                    this.textContent = 'Registered';
                    this.style.backgroundColor = '#27ae60';
                    card.querySelectorAll('p')[1].textContent = 'Status: Registered';
                }
            }
        });
    });
    
    
    
    // Add sorting functionality
    const sortingControl = document.createElement('div');
    sortingControl.className = 'sorting-control';
    sortingControl.innerHTML = `
        <label for="sort-exams">Sort by: </label>
        <select id="sort-exams">
            <option value="date-asc">Date (Ascending)</option>
            <option value="date-desc">Date (Descending)</option>
            <option value="status">Status</option>
        </select>
    `;
    
    document.querySelector('h2').insertAdjacentElement('afterend', sortingControl);
    
    document.getElementById('sort-exams').addEventListener('change', function() {
        const examList = document.querySelector('.exam-list');
        const cardsArray = Array.from(examCards);
        
        cardsArray.sort((a, b) => {
            const dateA = new Date(a.querySelectorAll('p')[0].textContent.replace('Date: ', ''));
            const dateB = new Date(b.querySelectorAll('p')[0].textContent.replace('Date: ', ''));
            const statusA = a.querySelectorAll('p')[1].textContent;
            const statusB = b.querySelectorAll('p')[1].textContent;
            
            switch(this.value) {
                case 'date-asc':
                    return dateA - dateB;
                case 'date-desc':
                    return dateB - dateA;
                case 'status':
                    return statusA.localeCompare(statusB);
                default:
                    return 0;
            }
        });
        
        // Remove all cards
        examCards.forEach(card => card.remove());
        
        // Append sorted cards
        cardsArray.forEach(card => examList.appendChild(card));
    });
});