
      // Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const searchInput = document.querySelector('.search-bar input');
    const filterSelects = document.querySelectorAll('.filter-select');
    const filterButton = document.querySelector('.btn-secondary');
    const tableRows = document.querySelectorAll('.course-table tbody tr');
    const paginationLinks = document.querySelectorAll('.pagination .page-link');
    const createCourseBtn = document.querySelector('.btn-create');
    const actionButtons = document.querySelectorAll('.action-btn');
    const courseTable = document.querySelector('.course-table tbody');

    


    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        tableRows.forEach(row => {
            const courseName = row.querySelector('td:first-child').textContent.toLowerCase();
            const category = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            
            if (courseName.includes(searchTerm) || category.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    const userAvatar = document.querySelector('.user-avatar');
    userAvatar.addEventListener('click', function() {
        const dropdown = document.createElement('div');
        dropdown.className = 'user-dropdown';
        dropdown.innerHTML = `
            <ul>
                <li><a href="profile.html">My Profile</a></li>
                <li><a href="account.html">Account Settings</a></li>
                <li><a href="../index.html">Logout</a></li>
            </ul>
        `;
        
        // Check if dropdown already exists
        const existingDropdown = document.querySelector('.user-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        } else {
            document.body.appendChild(dropdown);
            
            // Position the dropdown
            const rect = userAvatar.getBoundingClientRect();
            dropdown.style.position = 'absolute';
            dropdown.style.top = rect.bottom + 'px';
            dropdown.style.right = (window.innerWidth - rect.right) + 'px';
            dropdown.style.backgroundColor = 'white';
            dropdown.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            dropdown.style.borderRadius = '5px';
            dropdown.style.zIndex = '1000';
            
            // Add styles to dropdown list
            const dropdownList = dropdown.querySelector('ul');
            dropdownList.style.listStyle = 'none';
            dropdownList.style.padding = '0';
            dropdownList.style.margin = '0';
            
            // Add styles to dropdown items
            const dropdownItems = dropdown.querySelectorAll('li');
            dropdownItems.forEach(item => {
                item.style.padding = '10px 15px';
                item.style.borderBottom = '1px solid #eee';
            });
            
            // Add styles to dropdown links
            const dropdownLinks = dropdown.querySelectorAll('a');
            dropdownLinks.forEach(link => {
                link.style.textDecoration = 'none';
                link.style.color = '#333';
                link.style.display = 'block';
            });
            
            // Close dropdown when clicking elsewhere
            document.addEventListener('click', function closeDropdown(e) {
                if (!dropdown.contains(e.target) && e.target !== userAvatar) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }
    });


    // Filter functionality
    filterButton.addEventListener('click', function() {
        const statusFilter = filterSelects[0].value;
        const categoryFilter = filterSelects[1].value;
        const sortBy = filterSelects[2].value;
        
        // Filter rows
        tableRows.forEach(row => {
            const category = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const statusBadge = row.querySelector('.badge').textContent.toLowerCase();
            
            let showRow = true;
            
            // Status filter
            if (statusFilter !== 'all' && !statusBadge.includes(statusFilter.toLowerCase())) {
                showRow = false;
            }
            
            // Category filter
            if (categoryFilter !== 'all' && !category.toLowerCase().includes(categoryFilter.replace('-', ' '))) {
                showRow = false;
            }
            
            row.style.display = showRow ? '' : 'none';
        });
        
        // Sort functionality
        const rowsArray = Array.from(tableRows);
        const tbody = document.querySelector('.course-table tbody');
        
        rowsArray.sort((a, b) => {
            switch(sortBy) {
                case 'recent':
                    const dateA = new Date(a.querySelector('td:nth-child(4)').textContent);
                    const dateB = new Date(b.querySelector('td:nth-child(4)').textContent);
                    return dateB - dateA;
                case 'oldest':
                    const oldDateA = new Date(a.querySelector('td:nth-child(4)').textContent);
                    const oldDateB = new Date(b.querySelector('td:nth-child(4)').textContent);
                    return oldDateA - oldDateB;
                case 'popular':
                    const studentsA = parseInt(a.querySelector('td:nth-child(3)').textContent);
                    const studentsB = parseInt(b.querySelector('td:nth-child(3)').textContent);
                    return studentsB - studentsA;
                default:
                    return 0;
            }
        });
        
        // Clear and re-append sorted rows
        rowsArray.forEach(row => {
            tbody.appendChild(row);
        });
    });

    // Pagination functionality
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all pagination links
            paginationLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked link if it's a number
            if (!this.textContent.includes('«') && !this.textContent.includes('»')) {
                this.classList.add('active');
            }
            
            // In a real application, you would load the corresponding page data here
            console.log(`Page ${this.textContent} clicked`);
        });
    });

    // Create Course button functionality - show modal form instead of redirecting
    createCourseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showCreateCourseModal();
    });

    // Function to show the course creation modal
    function showCreateCourseModal() {
        // Create modal backdrop
        const modalBackdrop = document.createElement('div');
        modalBackdrop.style.position = 'fixed';
        modalBackdrop.style.top = '0';
        modalBackdrop.style.left = '0';
        modalBackdrop.style.width = '100%';
        modalBackdrop.style.height = '100%';
        modalBackdrop.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modalBackdrop.style.zIndex = '1000';
        modalBackdrop.style.display = 'flex';
        modalBackdrop.style.justifyContent = 'center';
        modalBackdrop.style.alignItems = 'center';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.borderRadius = '10px';
        modalContent.style.padding = '2rem';
        modalContent.style.width = '90%';
        modalContent.style.maxWidth = '600px';
        modalContent.style.maxHeight = '90vh';
        modalContent.style.overflow = 'auto';
        
        // Create modal header
        const modalHeader = document.createElement('div');
        modalHeader.style.display = 'flex';
        modalHeader.style.justifyContent = 'space-between';
        modalHeader.style.alignItems = 'center';
        modalHeader.style.marginBottom = '1.5rem';
        
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = 'Create New Course';
        
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '1.5rem';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modalBackdrop);
        });
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        
        // Create form
        const form = document.createElement('form');
        form.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <label for="course-name" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Course Name:</label>
                <input type="text" id="course-name" style="width: 100%; padding: 0.75rem; border-radius: 5px; border: 1px solid #ddd;" required>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label for="course-category" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Category:</label>
                <select id="course-category" style="width: 100%; padding: 0.75rem; border-radius: 5px; border: 1px solid #ddd;" required>
                    <option value="">Select Category</option>
                    <option value="Programming">Programming</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Design">Design</option>
                </select>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label for="course-description" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Description:</label>
                <textarea id="course-description" style="width: 100%; padding: 0.75rem; border-radius: 5px; border: 1px solid #ddd; height: 100px;"></textarea>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label for="course-status" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Status:</label>
                <select id="course-status" style="width: 100%; padding: 0.75rem; border-radius: 5px; border: 1px solid #ddd;" required>
                    <option value="draft">Draft</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="active">Active</option>
                </select>
            </div>
            
            <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem;">
                <button type="button" id="cancel-course" style="padding: 0.75rem 1.5rem; border-radius: 5px; background: #e9ecef; color: #2c3e50; border: none; cursor: pointer;">Cancel</button>
                <button type="submit" style="padding: 0.75rem 1.5rem; border-radius: 5px; background: var(--primary-color, #2ecc71); color: white; border: none; cursor: pointer;">Create Course</button>
            </div>
        `;
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const courseName = document.getElementById('course-name').value;
            const courseCategory = document.getElementById('course-category').value;
            const courseStatus = document.getElementById('course-status').value;
            
            // Create new course row
            addNewCourse(courseName, courseCategory, courseStatus);
            
            // Close modal
            document.body.removeChild(modalBackdrop);
        });
        
        // Handle cancel button
        form.querySelector('#cancel-course').addEventListener('click', function() {
            document.body.removeChild(modalBackdrop);
        });
        
        // Assemble and show modal
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(form);
        modalBackdrop.appendChild(modalContent);
        document.body.appendChild(modalBackdrop);
    }

    // Function to add a new course to the table
    function addNewCourse(name, category, status) {
        // Create new row
        const newRow = document.createElement('tr');
        
        // Get formatted current date
        const today = new Date();
        const formattedDate = `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
        
        // Set badge class based on status
        let badgeClass = 'badge-draft';
        if (status === 'active') badgeClass = 'badge-active';
        if (status === 'upcoming') badgeClass = 'badge-upcoming';
        
        // Define actions based on status
        let actions = `
            <button class="action-btn">Edit</button>
            <button class="action-btn">${status === 'draft' ? 'Preview' : 'View'}</button>
            <button class="action-btn">Duplicate</button>
        `;
        
        if (status === 'draft') {
            actions = `
                <button class="action-btn">Edit</button>
                <button class="action-btn">Preview</button>
                <button class="action-btn">Publish</button>
            `;
        }
        
        // Set row content
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${category}</td>
            <td>0</td>
            <td>${formattedDate}</td>
            <td><span class="badge ${badgeClass}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
            <td class="action-buttons">
                ${actions}
            </td>
        `;
        
        // Add hover effect to new row
        newRow.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        
        newRow.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
        
        // Add to table at the top
        courseTable.insertBefore(newRow, courseTable.firstChild);
        
        // Add action button functionality to new row
        const newActionButtons = newRow.querySelectorAll('.action-btn');
        newActionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.textContent.trim();
                const courseName = this.closest('tr').querySelector('td:first-child').textContent;
                
                // Handle actions
                handleAction(action, courseName, this);
            });
        });
        
        // Update stats
        updateCourseStats();
        
        // Show confirmation
        alert(`Course "${name}" has been created successfully!`);
    }

    // Action buttons functionality
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const courseName = this.closest('tr').querySelector('td:first-child').textContent;
            
            // Handle different actions
            handleAction(action, courseName, this);
        });
    });

    // Helper function to handle actions
    function handleAction(action, courseName, buttonElement) {
        switch(action) {
            case 'Edit':
                showEditCourseModal(courseName, buttonElement);
                break;
            case 'View':
            case 'Preview':
                console.log(`Viewing course: ${courseName}`);
                alert(`Viewing course: ${courseName}`);
                break;
            case 'Duplicate':
                duplicateCourse(courseName, buttonElement);
                break;
            case 'Publish':
                confirmPublish(courseName, buttonElement);
                break;
            case 'Restore':
                confirmRestore(courseName, buttonElement);
                break;
        }
    }

    // Function to show edit course modal (simplified for demo)
    function showEditCourseModal(courseName, buttonElement) {
        const row = buttonElement.closest('tr');
        const category = row.querySelector('td:nth-child(2)').textContent;
        const status = row.querySelector('.badge').textContent;
        
        // Create modal backdrop and content (similar to create course modal)
        const modalBackdrop = document.createElement('div');
        modalBackdrop.style.position = 'fixed';
        modalBackdrop.style.top = '0';
        modalBackdrop.style.left = '0';
        modalBackdrop.style.width = '100%';
        modalBackdrop.style.height = '100%';
        modalBackdrop.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modalBackdrop.style.zIndex = '1000';
        modalBackdrop.style.display = 'flex';
        modalBackdrop.style.justifyContent = 'center';
        modalBackdrop.style.alignItems = 'center';
        
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.borderRadius = '10px';
        modalContent.style.padding = '2rem';
        modalContent.style.width = '90%';
        modalContent.style.maxWidth = '600px';
        modalContent.style.maxHeight = '90vh';
        modalContent.style.overflow = 'auto';
        
        const modalHeader = document.createElement('div');
        modalHeader.style.display = 'flex';
        modalHeader.style.justifyContent = 'space-between';
        modalHeader.style.alignItems = 'center';
        modalHeader.style.marginBottom = '1.5rem';
        
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = `Edit Course: ${courseName}`;
        
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '1.5rem';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modalBackdrop);
        });
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        
        // Create form with pre-filled values
        const form = document.createElement('form');
        form.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <label for="course-name-edit" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Course Name:</label>
                <input type="text" id="course-name-edit" value="${courseName}" style="width: 100%; padding: 0.75rem; border-radius: 5px; border: 1px solid #ddd;" required>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label for="course-category-edit" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Category:</label>
                <select id="course-category-edit" style="width: 100%; padding: 0.75rem; border-radius: 5px; border: 1px solid #ddd;" required>
                    <option value="Programming" ${category === 'Programming' ? 'selected' : ''}>Programming</option>
                    <option value="Data Science" ${category === 'Data Science' ? 'selected' : ''}>Data Science</option>
                    <option value="Machine Learning" ${category === 'Machine Learning' ? 'selected' : ''}>Machine Learning</option>
                    <option value="Design" ${category === 'Design' ? 'selected' : ''}>Design</option>
                </select>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label for="course-description-edit" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Description:</label>
                <textarea id="course-description-edit" style="width: 100%; padding: 0.75rem; border-radius: 5px; border: 1px solid #ddd; height: 100px;">Course description goes here...</textarea>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label for="course-status-edit" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Status:</label>
                <select id="course-status-edit" style="width: 100%; padding: 0.75rem; border-radius: 5px; border: 1px solid #ddd;" required>
                    <option value="draft" ${status.toLowerCase() === 'draft' ? 'selected' : ''}>Draft</option>
                    <option value="upcoming" ${status.toLowerCase() === 'upcoming' ? 'selected' : ''}>Upcoming</option>
                    <option value="active" ${status.toLowerCase() === 'active' ? 'selected' : ''}>Active</option>
                    <option value="archived" ${status.toLowerCase() === 'archived' ? 'selected' : ''}>Archived</option>
                </select>
            </div>
            
            <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem;">
                <button type="button" id="cancel-edit" style="padding: 0.75rem 1.5rem; border-radius: 5px; background: #e9ecef; color: #2c3e50; border: none; cursor: pointer;">Cancel</button>
                <button type="submit" style="padding: 0.75rem 1.5rem; border-radius: 5px; background: var(--primary-color, #2ecc71); color: white; border: none; cursor: pointer;">Save Changes</button>
            </div>
        `;
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newCourseName = document.getElementById('course-name-edit').value;
            const newCategory = document.getElementById('course-category-edit').value;
            const newStatus = document.getElementById('course-status-edit').value;
            
            // Update row
            updateCourseRow(row, newCourseName, newCategory, newStatus);
            
            // Close modal
            document.body.removeChild(modalBackdrop);
        });
        
        // Handle cancel button
        form.querySelector('#cancel-edit').addEventListener('click', function() {
            document.body.removeChild(modalBackdrop);
        });
        
        // Assemble and show modal
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(form);
        modalBackdrop.appendChild(modalContent);
        document.body.appendChild(modalBackdrop);
    }

    // Function to update a course row
    function updateCourseRow(row, newName, newCategory, newStatus) {
        const nameCell = row.querySelector('td:first-child');
        const categoryCell = row.querySelector('td:nth-child(2)');
        const statusCell = row.querySelector('td:nth-child(5)');
        const actionCell = row.querySelector('td:last-child');
        
        // Update cells
        nameCell.textContent = newName;
        categoryCell.textContent = newCategory;
        
        // Update badge
        let badgeClass = 'badge-draft';
        if (newStatus === 'active') badgeClass = 'badge-active';
        if (newStatus === 'upcoming') badgeClass = 'badge-upcoming';
        if (newStatus === 'archived') badgeClass = 'badge-archived';
        
        statusCell.innerHTML = `<span class="badge ${badgeClass}">${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}</span>`;
        
        // Update action buttons based on status
        let actions = `
            <button class="action-btn">Edit</button>
            <button class="action-btn">${newStatus === 'draft' ? 'Preview' : 'View'}</button>
            <button class="action-btn">Duplicate</button>
        `;
        
        if (newStatus === 'draft') {
            actions = `
                <button class="action-btn">Edit</button>
                <button class="action-btn">Preview</button>
                <button class="action-btn">Publish</button>
            `;
        } else if (newStatus === 'archived') {
            actions = `
                <button class="action-btn">View</button>
                <button class="action-btn">Duplicate</button>
                <button class="action-btn">Restore</button>
            `;
        }
        
        actionCell.innerHTML = actions;
        
        // Re-add action button functionality
        const newActionButtons = actionCell.querySelectorAll('.action-btn');
        newActionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.textContent.trim();
                const courseName = this.closest('tr').querySelector('td:first-child').textContent;
                
                // Handle actions
                handleAction(action, courseName, this);
            });
        });
        
        // Update stats
        updateCourseStats();
        
        // Show confirmation
        alert(`Course "${newName}" has been updated successfully!`);
    }

    // Function to duplicate a course
    function duplicateCourse(courseName, buttonElement) {
        const row = buttonElement.closest('tr');
        const category = row.querySelector('td:nth-child(2)').textContent;
        
        // Create a duplicate with "Copy of" prefix
        const newName = `Copy of ${courseName}`;
        
        // Add as a new course in draft status
        addNewCourse(newName, category, 'draft');
    }

    // Confirm publish function
    function confirmPublish(courseName, button) {
        if (confirm(`Are you sure you want to publish "${courseName}"?`)) {
            const row = button.closest('tr');
            const statusCell = row.querySelector('td:nth-child(5)');
            
            // Update status badge
            statusCell.innerHTML = '<span class="badge badge-upcoming">Upcoming</span>';
            
            // Update action buttons
            const actionCell = row.querySelector('td:last-child');
            actionCell.innerHTML = `
                <button class="action-btn">Edit</button>
                <button class="action-btn">View</button>
                <button class="action-btn">Duplicate</button>
            `;
            
            // Reinitialize action buttons
            actionCell.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.textContent.trim();
                    const name = this.closest('tr').querySelector('td:first-child').textContent;
                    handleAction(action, name, this);
                });
            });
            
            // Update stats
            updateCourseStats();
            
            alert(`Course "${courseName}" has been published successfully!`);
        }
    }

    // Confirm restore function
    function confirmRestore(courseName, button) {
        if (confirm(`Are you sure you want to restore "${courseName}"?`)) {
            const row = button.closest('tr');
            const statusCell = row.querySelector('td:nth-child(5)');
            
            // Update status badge
            statusCell.innerHTML = '<span class="badge badge-active">Active</span>';
            
            // Update action buttons
            const actionCell = row.querySelector('td:last-child');
            actionCell.innerHTML = `
                <button class="action-btn">Edit</button>
                <button class="action-btn">View</button>
                <button class="action-btn">Duplicate</button>
            `;
            
            // Reinitialize action buttons
            actionCell.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.textContent.trim();
                    const name = this.closest('tr').querySelector('td:first-child').textContent;
                    handleAction(action, name, this);
                });
            });
            
            // Update stats
            updateCourseStats();
            
            alert(`Course "${courseName}" has been restored successfully!`);
        }
    }

    // Function to update course statistics
    function updateCourseStats() {
        const allRows = document.querySelectorAll('.course-table tbody tr');
        let totalCourses = allRows.length;
        let activeCourses = 0;
        let draftCourses = 0;
        let archivedCourses = 0;
        
        allRows.forEach(row => {
            const status = row.querySelector('.badge').textContent.toLowerCase();
            if (status === 'active') activeCourses++;
            if (status === 'draft') draftCourses++;
            if (status === 'archived') archivedCourses++;
        });
        
        // Update stats cards
        const statsCards = document.querySelectorAll('.stats-card .stats-number');
        statsCards[0].textContent = totalCourses;
        statsCards[1].textContent = activeCourses;
        statsCards[2].textContent = draftCourses;
        statsCards[3].textContent = archivedCourses;
    }

    // Mobile sidebar toggle functionality
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '☰';
    toggleButton.classList.add('sidebar-toggle');
    toggleButton.style.position = 'fixed';
    toggleButton.style.left = '10px';
    toggleButton.style.top = '10px';
    toggleButton.style.zIndex = '200';
    toggleButton.style.padding = '5px 10px';
    toggleButton.style.background = 'white';
    toggleButton.style.border = '1px solid #ddd';
    toggleButton.style.borderRadius = '5px';
    toggleButton.style.display = 'none';
    
    document.body.appendChild(toggleButton);
    
    // Show toggle button on mobile
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            toggleButton.style.display = 'block';
        } else {
            toggleButton.style.display = 'none';
            document.querySelector('.sidebar').style.transform = '';
        }
    });
    
    // Initial check for mobile view
    if (window.innerWidth <= 768) {
        toggleButton.style.display = 'block';
    }
    
    // Toggle sidebar on mobile
    toggleButton.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar.style.transform === 'translateX(0px)') {
            sidebar.style.transform = 'translateX(-100%)';
        } else {
            sidebar.style.transform = 'translateX(0px)';
        }
    });

    // Initial stats update
    updateCourseStats();

    // Row hover effect
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Notifications functionality
    const notificationElement = document.querySelector('.notifications');
    notificationElement.addEventListener('click', function() {
        alert('Notifications panel would open here');
    });

    
});
    