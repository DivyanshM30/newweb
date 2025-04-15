// assessment-script.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components and event listeners
    initializeFilters();
    initializeCreateAssessmentModal();
    initializeActionButtons();
    initializeNotifications();
    
    // For demonstration purposes - shows an assessment count in the notification icon
    document.querySelector('.notifications').setAttribute('data-count', '3');
});

/**
 * Initialize filter functionality
 */
function initializeFilters() {
    const filterSelects = document.querySelectorAll('.filter-section select');
    const assessmentCards = document.querySelectorAll('.assessment-card');
    const assessmentRows = document.querySelectorAll('.assessment-table tbody tr');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', () => {
            // Get all filter values
            const courseFilter = document.querySelector('.filter-section select:nth-child(1)').value;
            const typeFilter = document.querySelector('.filter-section select:nth-child(2)').value;
            const statusFilter = document.querySelector('.filter-section select:nth-child(3)').value;
            
            // Filter the grid cards
            filterAssessments(assessmentCards, courseFilter, typeFilter, statusFilter);
            
            // Filter the table rows
            filterTableRows(assessmentRows, courseFilter, typeFilter, statusFilter);
            
            // Update the counts
            updateFilteredCounts(assessmentCards, assessmentRows);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        // Filter cards by search term
        assessmentCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardCourse = card.querySelector('p').textContent.toLowerCase();
            const isVisible = cardTitle.includes(searchTerm) || cardCourse.includes(searchTerm);
            card.style.display = isVisible ? 'block' : 'none';
        });
        
        // Filter table rows by search term
        assessmentRows.forEach(row => {
            const rowTitle = row.querySelector('td:first-child').textContent.toLowerCase();
            const rowCourse = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const isVisible = rowTitle.includes(searchTerm) || rowCourse.includes(searchTerm);
            row.style.display = isVisible ? 'table-row' : 'none';
        });
        
        // Update the counts
        updateFilteredCounts(assessmentCards, assessmentRows);
    });
}

/**
 * Filter assessment cards based on selected criteria
 */
function filterAssessments(cards, courseFilter, typeFilter, statusFilter) {
    cards.forEach(card => {
        const cardCourse = card.querySelector('p').textContent;
        const cardType = card.querySelector('.assessment-type').textContent;
        let cardStatus = '';
        
        // Determine status based on text content
        if (card.textContent.includes('Upcoming')) {
            cardStatus = 'scheduled';
        } else if (card.textContent.includes('Submissions:')) {
            cardStatus = 'active';
        }
        
        const matchesCourse = !courseFilter || cardCourse.includes(courseFilter.replace('-', ' '));
        const matchesType = !typeFilter || cardType.toLowerCase().includes(typeFilter);
        const matchesStatus = !statusFilter || cardStatus === statusFilter;
        
        card.style.display = (matchesCourse && matchesType && matchesStatus) ? 'block' : 'none';
    });
}

/**
 * Filter table rows based on selected criteria
 */
function filterTableRows(rows, courseFilter, typeFilter, statusFilter) {
    rows.forEach(row => {
        const rowCourse = row.querySelector('td:nth-child(2)').textContent;
        const rowType = row.querySelector('.assessment-type').textContent;
        const rowStatus = row.querySelector('.badge').textContent.toLowerCase();
        
        const matchesCourse = !courseFilter || rowCourse.includes(courseFilter.replace('-', ' '));
        const matchesType = !typeFilter || rowType.toLowerCase().includes(typeFilter);
        const matchesStatus = !statusFilter || rowStatus.includes(statusFilter);
        
        row.style.display = (matchesCourse && matchesType && matchesStatus) ? 'table-row' : 'none';
    });
}

/**
 * Update counts after filtering
 */
function updateFilteredCounts(cards, rows) {
    const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none').length;
    const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none').length;
    
    // Update count display elements if they exist
    const cardCountElement = document.querySelector('.assessment-header small');
    if (cardCountElement) {
        cardCountElement.textContent = `Showing ${visibleCards} assessments`;
    } else {
        const header = document.querySelector('.assessment-header h1');
        const countElement = document.createElement('small');
        countElement.textContent = `Showing ${visibleCards} assessments`;
        countElement.style.marginLeft = '1rem';
        countElement.style.fontSize = '1rem';
        countElement.style.color = '#7f8c8d';
        header.appendChild(countElement);
    }
}

/**
 * Initialize the create assessment modal
 */
function initializeCreateAssessmentModal() {
    const createButton = document.querySelector('.btn-create');
    
    createButton.addEventListener('click', () => {
        // Create modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';
        modalOverlay.style.zIndex = '1000';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.backgroundColor = 'white';
        modalContent.style.borderRadius = '10px';
        modalContent.style.padding = '2rem';
        modalContent.style.width = '500px';
        modalContent.style.maxWidth = '90%';
        
        // Modal header
        const modalHeader = document.createElement('div');
        modalHeader.style.display = 'flex';
        modalHeader.style.justifyContent = 'space-between';
        modalHeader.style.alignItems = 'center';
        modalHeader.style.marginBottom = '1.5rem';
        
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = 'Create New Assessment';
        
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '1.5rem';
        closeButton.style.cursor = 'pointer';
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        
        // Modal form
        const form = document.createElement('form');
        
        // Title field
        const titleGroup = document.createElement('div');
        titleGroup.style.marginBottom = '1rem';
        
        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Assessment Title';
        titleLabel.style.display = 'block';
        titleLabel.style.marginBottom = '0.5rem';
        
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.required = true;
        titleInput.style.width = '100%';
        titleInput.style.padding = '0.75rem';
        titleInput.style.borderRadius = '5px';
        titleInput.style.border = '1px solid #ddd';
        
        titleGroup.appendChild(titleLabel);
        titleGroup.appendChild(titleInput);
        
        // Course selection
        const courseGroup = document.createElement('div');
        courseGroup.style.marginBottom = '1rem';
        
        const courseLabel = document.createElement('label');
        courseLabel.textContent = 'Course';
        courseLabel.style.display = 'block';
        courseLabel.style.marginBottom = '0.5rem';
        
        const courseSelect = document.createElement('select');
        courseSelect.style.width = '100%';
        courseSelect.style.padding = '0.75rem';
        courseSelect.style.borderRadius = '5px';
        courseSelect.style.border = '1px solid #ddd';
        
        const courses = ['Web Development', 'Data Science', 'Machine Learning'];
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.toLowerCase().replace(' ', '-');
            option.textContent = course;
            courseSelect.appendChild(option);
        });
        
        courseGroup.appendChild(courseLabel);
        courseGroup.appendChild(courseSelect);
        
        // Type selection
        const typeGroup = document.createElement('div');
        typeGroup.style.marginBottom = '1rem';
        
        const typeLabel = document.createElement('label');
        typeLabel.textContent = 'Assessment Type';
        typeLabel.style.display = 'block';
        typeLabel.style.marginBottom = '0.5rem';
        
        const typeSelect = document.createElement('select');
        typeSelect.style.width = '100%';
        typeSelect.style.padding = '0.75rem';
        typeSelect.style.borderRadius = '5px';
        typeSelect.style.border = '1px solid #ddd';
        
        const types = ['Quiz', 'Assignment', 'Exam'];
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type.toLowerCase();
            option.textContent = type;
            typeSelect.appendChild(option);
        });
        
        typeGroup.appendChild(typeLabel);
        typeGroup.appendChild(typeSelect);
        
        // Due date
        const dateGroup = document.createElement('div');
        dateGroup.style.marginBottom = '1rem';
        
        const dateLabel = document.createElement('label');
        dateLabel.textContent = 'Due Date';
        dateLabel.style.display = 'block';
        dateLabel.style.marginBottom = '0.5rem';
        
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.required = true;
        dateInput.style.width = '100%';
        dateInput.style.padding = '0.75rem';
        dateInput.style.borderRadius = '5px';
        dateInput.style.border = '1px solid #ddd';
        
        dateGroup.appendChild(dateLabel);
        dateGroup.appendChild(dateInput);
        
        // Form actions
        const formActions = document.createElement('div');
        formActions.style.display = 'flex';
        formActions.style.justifyContent = 'flex-end';
        formActions.style.gap = '1rem';
        formActions.style.marginTop = '1.5rem';
        
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Cancel';
        cancelButton.className = 'btn-action btn-edit';
        cancelButton.style.padding = '0.75rem 1.5rem';
        
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Create Assessment';
        submitButton.className = 'btn-create';
        
        formActions.appendChild(cancelButton);
        formActions.appendChild(submitButton);
        
        // Assemble the form
        form.appendChild(titleGroup);
        form.appendChild(courseGroup);
        form.appendChild(typeGroup);
        form.appendChild(dateGroup);
        form.appendChild(formActions);
        
        // Add form to modal
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(form);
        
        // Add modal to overlay
        modalOverlay.appendChild(modalContent);
        
        // Add overlay to body
        document.body.appendChild(modalOverlay);
        
        // Set focus on title input
        titleInput.focus();
        
        // Add event listeners
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
        });
        
        cancelButton.addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
        });
        
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
        
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Show success message
            alert('Assessment created successfully!');
            
            // Add the new assessment to the list (would normally save to database)
            addNewAssessment({
                title: titleInput.value,
                course: courseSelect.options[courseSelect.selectedIndex].textContent,
                type: typeSelect.options[typeSelect.selectedIndex].textContent,
                dueDate: formatDate(new Date(dateInput.value)),
                status: 'Scheduled'
            });
            
            // Close the modal
            document.body.removeChild(modalOverlay);
        });
    });
}

/**
 * Format date for display
 */
function formatDate(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Add a new assessment to both the card grid and table
 */
function addNewAssessment(assessment) {
    // Create a new assessment card
    const card = document.createElement('div');
    card.className = 'assessment-card';
    
    const cardHeader = document.createElement('div');
    cardHeader.className = 'assessment-card-header';
    
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = assessment.title;
    
    const cardType = document.createElement('span');
    cardType.className = `assessment-type type-${assessment.type.toLowerCase()}`;
    cardType.textContent = assessment.type;
    
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cardType);
    
    const cardCourse = document.createElement('p');
    cardCourse.textContent = assessment.course;
    
    const cardDate = document.createElement('p');
    cardDate.textContent = `Due: ${assessment.dueDate}`;
    
    const cardStatus = document.createElement('p');
    cardStatus.textContent = 'Status: Scheduled';
    
    const cardActions = document.createElement('div');
    cardActions.className = 'assessment-actions';
    
    const editButton = document.createElement('button');
    editButton.className = 'btn-action btn-edit';
    editButton.textContent = 'Edit';
    
    const viewButton = document.createElement('button');
    viewButton.className = 'btn-action btn-view';
    viewButton.textContent = 'Preview';
    
    cardActions.appendChild(editButton);
    cardActions.appendChild(viewButton);
    
    card.appendChild(cardHeader);
    card.appendChild(cardCourse);
    card.appendChild(cardDate);
    card.appendChild(cardStatus);
    card.appendChild(cardActions);
    
    // Add card to the grid
    document.querySelector('.assessment-grid').prepend(card);
    
    // Create a new table row
    const row = document.createElement('tr');
    
    const titleCell = document.createElement('td');
    titleCell.textContent = assessment.title;
    
    const courseCell = document.createElement('td');
    courseCell.textContent = assessment.course;
    
    const typeCell = document.createElement('td');
    const typeSpan = document.createElement('span');
    typeSpan.className = `assessment-type type-${assessment.type.toLowerCase()}`;
    typeSpan.textContent = assessment.type;
    typeCell.appendChild(typeSpan);
    
    const dateCell = document.createElement('td');
    dateCell.textContent = assessment.dueDate;
    
    const progressCell = document.createElement('td');
    const progressCircle = document.createElement('div');
    progressCircle.className = 'progress-circle';
    progressCircle.style.setProperty('--progress', '0%');
    const progressText = document.createElement('span');
    progressText.className = 'progress-text';
    progressText.textContent = '0%';
    progressCircle.appendChild(progressText);
    progressCell.appendChild(progressCircle);
    
    const statusCell = document.createElement('td');
    const statusBadge = document.createElement('span');
    statusBadge.className = 'badge badge-scheduled';
    statusBadge.textContent = 'Scheduled';
    statusCell.appendChild(statusBadge);
    
    const actionsCell = document.createElement('td');
    const actionButton = document.createElement('button');
    actionButton.className = 'btn-action btn-view';
    actionButton.textContent = 'View';
    actionsCell.appendChild(actionButton);
    
    row.appendChild(titleCell);
    row.appendChild(courseCell);
    row.appendChild(typeCell);
    row.appendChild(dateCell);
    row.appendChild(progressCell);
    row.appendChild(statusCell);
    row.appendChild(actionsCell);
    
    // Add row to the table
    document.querySelector('.assessment-table tbody').prepend(row);
    
    // Highlight the new elements temporarily
    card.style.boxShadow = '0 0 10px var(--primary-color)';
    row.style.backgroundColor = '#e8f8e5';
    
    // Remove highlight after 2 seconds
    setTimeout(() => {
        card.style.boxShadow = null;
        row.style.backgroundColor = null;
        
        // Apply transition
        card.style.transition = 'box-shadow 1s ease';
        row.style.transition = 'background-color 1s ease';
    }, 2000);
}

/**
 * Initialize action buttons throughout the page
 */
function initializeActionButtons() {
    // Edit buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the assessment card or table row
            const container = this.closest('.assessment-card') || this.closest('tr');
            const assessmentTitle = container.querySelector('h3')?.textContent || container.querySelector('td:first-child').textContent;
            
            alert(`Edit functionality for "${assessmentTitle}" would be implemented here`);
        });
    });
    
    // View buttons
    const viewButtons = document.querySelectorAll('.btn-view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the assessment card or table row
            const container = this.closest('.assessment-card') || this.closest('tr');
            const assessmentTitle = container.querySelector('h3')?.textContent || container.querySelector('td:first-child').textContent;
            
            const isPreview = this.textContent === 'Preview';
            const isSubmissions = this.textContent === 'View Submissions';
            
            if (isPreview) {
                alert(`Preview for "${assessmentTitle}" would open here`);
            } else if (isSubmissions) {
                alert(`Submissions for "${assessmentTitle}" would be displayed here`);
            } else {
                alert(`Details for "${assessmentTitle}" would be displayed here`);
            }
        });
    });
}

/**
 * Initialize notifications system
 */
function initializeNotifications() {
    const notificationsIcon = document.querySelector('.notifications');
    
    // Add notification count indicator
    notificationsIcon.style.position = 'relative';
    
    // Only add the count if it doesn't exist
    if (!notificationsIcon.getAttribute('data-count')) {
        notificationsIcon.setAttribute('data-count', '3');
    }
    
    // Add notification indicator style
    const style = document.createElement('style');
    style.textContent = `
        .notifications[data-count]:after {
            content: attr(data-count);
            position: absolute;
            top: -10px;
            right: -10px;
            width: 20px;
            height: 20px;
            background: #e74c3c;
            color: white;
            font-size: 12px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notifications {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
    
    // Add click event for notifications
    notificationsIcon.addEventListener('click', () => {
        alert('Notifications panel would open here');
    });
}