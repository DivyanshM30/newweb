// students.js - JavaScript functionality for the Students page

document.addEventListener('DOMContentLoaded', function() {
    // Sample student data
    const studentsData = [
        {
            id: 'STU-001',
            name: 'John Doe',
            email: 'john.doe@example.com',
            courses: ['Web Development', 'Data Science'],
            progress: 75,
            status: 'active',
            initials: 'JD'
        },
        {
            id: 'STU-002',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            courses: ['Data Science'],
            progress: 60,
            status: 'active',
            initials: 'JS'
        },
        {
            id: 'STU-003',
            name: 'Mike Johnson',
            email: 'mike.j@example.com',
            courses: ['Machine Learning'],
            progress: 45,
            status: 'pending',
            initials: 'MJ'
        },
        {
            id: 'STU-004',
            name: 'Sarah Adams',
            email: 'sarah.a@example.com',
            courses: ['Web Development'],
            progress: 90,
            status: 'active',
            initials: 'SA'
        },
        {
            id: 'STU-005',
            name: 'Robert Lewis',
            email: 'robert.l@example.com',
            courses: ['Data Science', 'Machine Learning'],
            progress: 30,
            status: 'inactive',
            initials: 'RL'
        },
        {
            id: 'STU-006',
            name: 'Emily Chen',
            email: 'emily.c@example.com',
            courses: ['Web Development', 'Machine Learning'],
            progress: 85,
            status: 'active',
            initials: 'EC'
        },
        {
            id: 'STU-007',
            name: 'David Wilson',
            email: 'david.w@example.com',
            courses: ['Data Science'],
            progress: 15,
            status: 'pending',
            initials: 'DW'
        },
        {
            id: 'STU-008',
            name: 'Lisa Brown',
            email: 'lisa.b@example.com',
            courses: ['Machine Learning'],
            progress: 50,
            status: 'active',
            initials: 'LB'
        },
        {
            id: 'STU-009',
            name: 'James Taylor',
            email: 'james.t@example.com',
            courses: ['Web Development', 'Data Science'],
            progress: 40,
            status: 'inactive',
            initials: 'JT'
        },
        {
            id: 'STU-010',
            name: 'Maria Garcia',
            email: 'maria.g@example.com',
            courses: ['Web Development'],
            progress: 95,
            status: 'active',
            initials: 'MG'
        }
    ];

    // Elements
    const searchInput = document.querySelector('.search-input');
    const courseFilter = document.querySelector('.filter-bar select:nth-of-type(1)');
    const statusFilter = document.querySelector('.filter-bar select:nth-of-type(2)');
    const filterButton = document.querySelector('.btn-secondary');
    const studentsTable = document.querySelector('.students-table tbody');
    const paginationContainer = document.querySelector('.pagination');
    const addStudentButton = document.querySelector('.btn-add');

    // Pagination configuration
    let currentPage = 1;
    const itemsPerPage = 5;
    let filteredStudents = [...studentsData];

    // Initialize the page
    renderStudents();
    setupPagination();
    updateStats();

    // Event listeners
    filterButton.addEventListener('click', applyFilters);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });

    paginationContainer.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const action = e.target.textContent;
            
            if (action === 'Previous' && currentPage > 1) {
                currentPage--;
            } else if (action === 'Next' && currentPage < Math.ceil(filteredStudents.length / itemsPerPage)) {
                currentPage++;
            } else if (!isNaN(parseInt(action))) {
                currentPage = parseInt(action);
            }
            
            renderStudents();
            updatePaginationButtons();
        }
    });

    // Student table action buttons
    studentsTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-action')) {
            const row = e.target.closest('tr');
            const studentId = row.querySelector('.student-profile div:nth-child(2) div:nth-child(2)').textContent.split(': ')[1];
            
            if (e.target.textContent === '✏️') {
                editStudent(studentId);
            } else if (e.target.textContent === '📊') {
                viewStudentProgress(studentId);
            } else if (e.target.textContent === '❌') {
                confirmDeleteStudent(studentId, row);
            }
        }
    });

    // Functions
    function renderStudents() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const currentPageData = filteredStudents.slice(start, end);
        
        studentsTable.innerHTML = '';
        
        if (currentPageData.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="6" style="text-align: center; padding: 2rem;">
                    No students match your search criteria.
                </td>
            `;
            studentsTable.appendChild(emptyRow);
            return;
        }
        
        currentPageData.forEach(student => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>
                    <div class="student-profile">
                        <div class="profile-avatar">${student.initials}</div>
                        <div>
                            <div>${student.name}</div>
                            <div style="color: #7f8c8d; font-size: 0.875rem;">ID: ${student.id}</div>
                        </div>
                    </div>
                </td>
                <td>${student.email}</td>
                <td>${student.courses.join(', ')}</td>
                <td>${student.progress}%</td>
                <td><span class="badge badge-${student.status}">${capitalizeFirstLetter(student.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action">✏️</button>
                        <button class="btn-action">📊</button>
                        <button class="btn-action">❌</button>
                    </div>
                </td>
            `;
            
            studentsTable.appendChild(row);
        });
    }

    function setupPagination() {
        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
        let paginationHTML = '';
        
        paginationHTML += `<button>Previous</button>`;
        
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                paginationHTML += `<button class="active">${i}</button>`;
            } else {
                paginationHTML += `<button>${i}</button>`;
            }
        }
        
        paginationHTML += `<button>Next</button>`;
        
        paginationContainer.innerHTML = paginationHTML;
    }

    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const courseValue = courseFilter.value;
        const statusValue = statusFilter.value;
        
        filteredStudents = studentsData.filter(student => {
            // Search filter
            const matchesSearch = 
                student.name.toLowerCase().includes(searchTerm) || 
                student.email.toLowerCase().includes(searchTerm) ||
                student.id.toLowerCase().includes(searchTerm);
            
            // Course filter
            let matchesCourse = true;
            if (courseValue) {
                const course = courseValue === 'web-dev' ? 'Web Development' : 
                              courseValue === 'data-science' ? 'Data Science' : 
                              'Machine Learning';
                matchesCourse = student.courses.includes(course);
            }
            
            // Status filter
            let matchesStatus = true;
            if (statusValue) {
                matchesStatus = student.status === statusValue;
            }
            
            return matchesSearch && matchesCourse && matchesStatus;
        });
        
        currentPage = 1;
        renderStudents();
        updatePaginationButtons();
    }

    function updateStats() {
        const totalStudents = studentsData.length;
        const activeStudents = studentsData.filter(s => s.status === 'active').length;
        const completionRates = studentsData.map(s => s.progress);
        const avgCompletionRate = Math.round(completionRates.reduce((a, b) => a + b, 0) / totalStudents);
        
        // This would normally be calculated based on enrollment dates
        const newEnrollments = 24;
        
        document.querySelector('.student-stats .stat-card:nth-child(1) p:nth-child(2)').textContent = totalStudents;
        document.querySelector('.student-stats .stat-card:nth-child(2) p:nth-child(2)').textContent = activeStudents;
        document.querySelector('.student-stats .stat-card:nth-child(3) p:nth-child(2)').textContent = avgCompletionRate + '%';
        document.querySelector('.student-stats .stat-card:nth-child(4) p:nth-child(2)').textContent = newEnrollments;
    }

    // Helper functions
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Student CRUD operations (original simplified versions)
    function editStudent(studentId) {
        // In a real application, this would show a modal for editing the student
        alert(`Edit Student modal for ${studentId} would appear here`);
    }

    function viewStudentProgress(studentId) {
        // In a real application, this would show detailed progress information
        alert(`Student progress details for ${studentId} would appear here`);
    }

    function confirmDeleteStudent(studentId, row) {
        // In a real application, this would show a confirmation dialog
        const confirmDelete = confirm(`Are you sure you want to delete student ${studentId}?`);
        
        if (confirmDelete) {
            // Remove from data array
            const index = studentsData.findIndex(s => s.id === studentId);
            if (index !== -1) {
                studentsData.splice(index, 1);
                filteredStudents = filteredStudents.filter(s => s.id !== studentId);
                
                // Re-render
                renderStudents();
                updatePaginationButtons();
                updateStats();
            }
        }
    }

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.cssText = `
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 1000;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        padding: 0.5rem;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
    `;
    
    document.body.appendChild(mobileMenuToggle);
    
    // Media query for mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMobileView(e) {
        if (e.matches) {
            mobileMenuToggle.style.display = 'block';
        } else {
            mobileMenuToggle.style.display = 'none';
            document.querySelector('.sidebar').style.transform = 'translateX(0)';
        }
    }
    
    mediaQuery.addListener(handleMobileView);
    handleMobileView(mediaQuery);
    
    mobileMenuToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar.style.transform === 'translateX(0px)') {
            sidebar.style.transform = 'translateX(-100%)';
        } else {
            sidebar.style.transform = 'translateX(0)';
        }
    });

    // Modal functionality
    const modal = document.getElementById('addStudentModal');
    const closeButton = document.querySelector('.close-modal');
    const cancelButton = document.querySelector('.cancel-button');
    const form = document.getElementById('addStudentForm');

    if (modal && closeButton && cancelButton && form && addStudentButton) {
        // Show modal when "Add Student" button is clicked
        addStudentButton.addEventListener('click', showAddStudentModal);

        // Close modal functions
        function closeModal() {
            modal.style.display = 'none';
            form.reset();
            clearValidationErrors();
        }

        // Close when clicking X button
        closeButton.addEventListener('click', closeModal);

        // Close when clicking Cancel button
        cancelButton.addEventListener('click', closeModal);

        // Close when clicking outside the modal
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Handle form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm()) {
                addNewStudent();
                closeModal();
            }
        });
    }

    // Proper implementation of showAddStudentModal
    function showAddStudentModal() {
        if (modal) {
            modal.style.display = 'flex';
            const nameInput = document.getElementById('studentName');
            if (nameInput) nameInput.focus();
        } else {
            // Fallback for when modal doesn't exist
            alert('Add Student modal would appear here');
        }
    }

    // Form validation
    function validateForm() {
        clearValidationErrors();
        let isValid = true;
        
        // Required fields validation
        const requiredFields = ['studentName', 'studentEmail', 'studentStatus'];
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (input && !input.value.trim()) {
                showError(input, 'This field is required');
                isValid = false;
            }
        });
        
        // Email validation
        const emailInput = document.getElementById('studentEmail');
        if (emailInput && emailInput.value.trim() && !isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Course selection validation
        const courseCheckboxes = document.querySelectorAll('input[name="studentCourses"]');
        let courseSelected = false;
        courseCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                courseSelected = true;
            }
        });
        
        if (!courseSelected && courseCheckboxes.length > 0) {
            const checkboxGroup = document.querySelector('.checkbox-group');
            if (checkboxGroup) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Please select at least one course';
                checkboxGroup.after(errorMessage);
                isValid = false;
            }
        }
        
        return isValid;
    }

    function showError(input, message) {
        input.classList.add('error');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        input.parentNode.appendChild(errorMessage);
    }

    function clearValidationErrors() {
        const errorFields = document.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
        
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => {
            message.remove();
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add new student to the data and table
    function addNewStudent() {
        // Get values from form
        const nameInput = document.getElementById('studentName');
        const emailInput = document.getElementById('studentEmail');
        const statusInput = document.getElementById('studentStatus');
        
        if (!nameInput || !emailInput || !statusInput) return;
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const status = statusInput.value;
        
        // Get selected courses
        const selectedCourses = [];
        const courseCheckboxes = document.querySelectorAll('input[name="studentCourses"]:checked');
        courseCheckboxes.forEach(checkbox => {
            selectedCourses.push(checkbox.value);
        });
        
        // Get initials for avatar
        const nameParts = name.split(' ');
        let initials = '';
        if (nameParts.length >= 2) {
            initials = nameParts[0][0] + nameParts[1][0];
        } else if (nameParts.length === 1) {
            initials = nameParts[0].substring(0, 2);
        }
        initials = initials.toUpperCase();
        
        // Generate new ID
        const lastId = studentsData.length > 0 
            ? parseInt(studentsData[studentsData.length - 1].id.split('-')[1]) 
            : 0;
        const newId = `STU-${String(lastId + 1).padStart(3, '0')}`;
        
        // Create new student object
        const newStudent = {
            id: newId,
            name: name,
            email: email,
            courses: selectedCourses,
            progress: 0, // New students start at 0% progress
            status: status,
            initials: initials,
            notes: document.getElementById('studentNotes')?.value.trim() || '',
            phone: document.getElementById('studentPhone')?.value.trim() || ''
        };
        
        // Add to data array
        studentsData.push(newStudent);
        filteredStudents.push(newStudent);
        
        // Show success notification
        showNotification(`Student ${name} added successfully`);
        
        // Update table and stats
        currentPage = Math.ceil(filteredStudents.length / itemsPerPage);
        renderStudents();
        updatePaginationButtons();
        updateStats();
        
        // Highlight the new row
        setTimeout(() => {
            const newRow = document.querySelector(`tr:last-child`);
            if (newRow) {
                newRow.classList.add('highlight-row');
            }
        }, 100);
    }

    // Notification system
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.2);
            z-index: 2000;
            animation: slideIn 0.3s forwards;
        `;
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Add to document
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});