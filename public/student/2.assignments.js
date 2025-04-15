
        // Sample assignment data
        const assignments = [
            {
                id: 1,
                title: "HTML Basics: Create a Personal Portfolio",
                course: "Web Development Fundamentals",
                dueDate: "2025-04-05",
                status: "pending",
                weight: "15%",
                instructor: "Prof. Sarah Johnson",
                description: "Create a personal portfolio website using HTML5. Your portfolio should include a home page, about section, projects section, and contact information. Use semantic HTML tags appropriately and ensure the structure is clear and organized.",
                requirements: [
                    "Include at least 3 pages with proper navigation",
                    "Use appropriate semantic HTML5 tags",
                    "Include a contact form",
                    "Add a responsive image gallery for your projects",
                    "Must be valid HTML5 (W3C validated)"
                ]
            },
            {
                id: 2,
                title: "CSS Styling: Responsive Design Principles",
                course: "Advanced CSS Techniques",
                dueDate: "2025-04-10",
                status: "submitted",
                submittedDate: "2025-03-28",
                weight: "20%",
                instructor: "Dr. Michael Chen",
                description: "Apply responsive design principles to transform a static website into a fully responsive one. Implement media queries, flexible grid layouts, and responsive images to ensure the site works well on all device sizes.",
                feedback: "Great work on implementing the mobile-first approach. Your use of CSS Grid and Flexbox shows a good understanding of modern layout techniques. Consider adding more breakpoints for better tablet support."
            },
            {
                id: 3,
                title: "JavaScript Basics: Interactive Form Validation",
                course: "JavaScript Fundamentals",
                dueDate: "2025-04-15",
                status: "pending",
                weight: "25%",
                instructor: "Prof. James Wilson",
                description: "Create a registration form with client-side validation using JavaScript. The form should validate email format, password strength, and matching password confirmation field in real-time as the user types.",
                requirements: [
                    "Email validation with proper format checking",
                    "Password strength indicator (weak, medium, strong)",
                    "Real-time validation feedback",
                    "Form submission prevention for invalid data",
                    "Success message on valid submission"
                ]
            },
            {
                id: 4,
                title: "React Components: Build a Todo Application",
                course: "Modern Frontend Frameworks",
                dueDate: "2025-04-03",
                status: "late",
                weight: "30%",
                instructor: "Dr. Emily Rodriguez",
                description: "Develop a Todo application using React that allows users to add, edit, delete, and mark tasks as complete. Implement state management and persist todos in localStorage.",
                requirements: [
                    "Create reusable components for Todo items",
                    "Implement CRUD operations",
                    "Use React hooks for state management",
                    "Add filtering (All, Active, Completed)",
                    "Persist todos in localStorage"
                ]
            }
        ];

        // DOM Elements
        const assignmentList = document.getElementById('assignmentList');
        const searchInput = document.getElementById('searchInput');
        const statusFilter = document.getElementById('statusFilter');
        const sortFilter = document.getElementById('sortFilter');
        const assignmentModal = document.getElementById('assignmentModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const closeModal = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBtn');
        const submitBtn = document.getElementById('submitBtn');
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.getElementById('menuToggle');
        const toggleSidebar = document.getElementById('toggleSidebar');
        const darkModeToggle = document.getElementById('darkModeToggle');
        const toastContainer = document.getElementById('toastContainer');
        const createAssignmentBtn = document.getElementById('createAssignmentBtn');

        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            renderAssignments();
            setupEventListeners();
            checkDarkModePreference();
        });

        // Render assignment cards
        function renderAssignments(filteredAssignments = null) {
            const assignmentsToRender = filteredAssignments || assignments;
            assignmentList.innerHTML = '';

            if (assignmentsToRender.length === 0) {
                assignmentList.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                        <i class="fas fa-search fa-3x" style="color: #ccc; margin-bottom: 1rem;"></i>
                        <h3>No assignments found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                `;
                return;
            }

            assignmentsToRender.forEach(assignment => {
                // Format the date
                const dueDate = new Date(assignment.dueDate);
                const formattedDate = dueDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });

                // Determine if assignment is due soon (within 3 days)
                const today = new Date();
                const timeDiff = dueDate.getTime() - today.getTime();
                const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                const dueSoon = daysDiff > 0 && daysDiff <= 3;

                // Create assignment card
                const card = document.createElement('div');
                card.className = 'assignment-card';
                card.style.borderTopColor = getStatusColor(assignment.status);
                
                card.innerHTML = `
                    <div class="assignment-header">
                        <h3 class="assignment-title">${assignment.title}</h3>
                        <div class="detail-item">
                            <i class="fas fa-book"></i> ${assignment.course}
                        </div>
                    </div>
                    <div class="assignment-content">
                        <div class="assignment-details">
                            <div class="detail-item">
                                <i class="fas fa-calendar-alt"></i> Due: ${formattedDate}
                                ${dueSoon && assignment.status === 'pending' ? '<span style="color: var(--danger-color); margin-left: 5px;"><i class="fas fa-exclamation-circle"></i> Due soon</span>' : ''}
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-user"></i> ${assignment.instructor}
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-weight-hanging"></i> Weight: ${assignment.weight}
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-info-circle"></i> Status: 
                                <span class="status-badge status-${assignment.status}">${capitalize(assignment.status)}</span>
                            </div>
                        </div>
                        <div class="assignment-actions">
                            <button class="btn btn-primary view-assignment" data-id="${assignment.id}">
                                <i class="fas fa-eye"></i> View
                            </button>
                            ${assignment.status === 'pending' ? `
                                <button class="btn btn-success submit-assignment" data-id="${assignment.id}">
                                    <i class="fas fa-paper-plane"></i> Submit
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `;
                
                assignmentList.appendChild(card);
            });

            // Add event listeners to buttons
            document.querySelectorAll('.view-assignment').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    showAssignmentDetails(id);
                });
            });

            document.querySelectorAll('.submit-assignment').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    showSubmitAssignment(id);
                });
            });
        }

        // Setup event listeners
        function setupEventListeners() {
            // Search functionality
            searchInput.addEventListener('input', filterAssignments);
            
            // Filter by status
            statusFilter.addEventListener('change', filterAssignments);
            
            // Sort assignments
            sortFilter.addEventListener('change', filterAssignments);
            
            // Close modal
            closeModal.addEventListener('click', () => {
                assignmentModal.style.display = 'none';
            });
            
            // Cancel button
            cancelBtn.addEventListener('click', () => {
                assignmentModal.style.display = 'none';
            });
            
            // Toggle sidebar
            toggleSidebar.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                document.querySelector('.content').classList.toggle('expanded');
            });
            
            
            
            // Create assignment button
            createAssignmentBtn.addEventListener('click', showCreateAssignment);
            
            // Submit button
            submitBtn.addEventListener('click', handleSubmit);

            // Close modal when clicking outside
            window.addEventListener('click', (event) => {
                if (event.target === assignmentModal) {
                    assignmentModal.style.display = 'none';
                }
            });
        }

        // Filter assignments based on search input and status filter
        function filterAssignments() {
            const searchTerm = searchInput.value.toLowerCase();
            const statusValue = statusFilter.value;
            const sortValue = sortFilter.value;
            
            let filtered = assignments.filter(assignment => {
                const matchesSearch = assignment.title.toLowerCase().includes(searchTerm) || 
                                      assignment.course.toLowerCase().includes(searchTerm) ||
                                      assignment.instructor.toLowerCase().includes(searchTerm);
                
                const matchesStatus = statusValue === 'all' || assignment.status === statusValue;
                
                return matchesSearch && matchesStatus;
            });
            
            // Sort filtered assignments
            filtered = sortAssignments(filtered, sortValue);
            
            renderAssignments(filtered);
        }

        // Sort assignments
        function sortAssignments(assignments, sortBy) {
            const sortedAssignments = [...assignments];
            
            switch(sortBy) {
                case 'dueDate':
                    return sortedAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                case 'title':
                    return sortedAssignments.sort((a, b) => a.title.localeCompare(b.title));
                case 'weight':
                    return sortedAssignments.sort((a, b) => {
                        const weightA = parseInt(a.weight);
                        const weightB = parseInt(b.weight);
                        return weightB - weightA;
                    });
                case 'course':
                    return sortedAssignments.sort((a, b) => a.course.localeCompare(b.course));
                default:
                    return sortedAssignments;
            }
        }

        // Show assignment details in modal
            function showAssignmentDetails(id) {
                const assignment = assignments.find(a => a.id === id);
                
                if (!assignment) return;
                
                modalTitle.textContent = assignment.title;
                
                // Format date
                const dueDate = new Date(assignment.dueDate);
                const formattedDate = dueDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                // Build modal content
                modalBody.innerHTML = `
                    <div class="assignment-modal-content">
                        <div class="detail-row">
                            <span class="detail-label">Course:</span>
                            <span class="detail-value">${assignment.course}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Due Date:</span>
                            <span class="detail-value">${formattedDate}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Instructor:</span>
                            <span class="detail-value">${assignment.instructor}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Weight:</span>
                            <span class="detail-value">${assignment.weight}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Status:</span>
                            <span class="status-badge status-${assignment.status}">${capitalize(assignment.status)}</span>
                        </div>
                    ${assignment.submittedDate ? `
                        <div class="detail-row">
                            <span class="detail-label">Submitted Date:</span>
                            <span class="detail-value">${new Date(assignment.submittedDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                    ` : ''}
                    <div class="description-section">
                        <h4>Description</h4>
                        <p>${assignment.description}</p>
                    </div>
                    ${assignment.requirements ? `
                        <div class="requirements-section">
                            <h4>Requirements</h4>
                            <ul>
                                ${assignment.requirements.map(req => `<li>${req}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${assignment.feedback ? `
                        <div class="feedback-section">
                            <h4>Instructor Feedback</h4>
                            <p>${assignment.feedback}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
            `;
            
            // Show or hide submit button based on status
            if (assignment.status === 'pending') {
                submitBtn.style.display = 'inline-block';
                submitBtn.dataset.id = assignment.id;
                submitBtn.textContent = 'Submit Assignment';
            } else {
                submitBtn.style.display = 'none';
            }
            
            assignmentModal.style.display = 'block';
        }

        // Show submit assignment form
        function showSubmitAssignment(id) {
            const assignment = assignments.find(a => a.id === id);
            
            if (!assignment) return;
            
            modalTitle.textContent = `Submit Assignment: ${assignment.title}`;
            
            modalBody.innerHTML = `
                <div class="submit-form">
                    <div class="form-group">
                        <label for="submissionFile">Upload File:</label>
                        <input type="file" id="submissionFile" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="submissionComment">Comments:</label>
                        <textarea id="submissionComment" class="form-control" rows="4" placeholder="Add any comments about your submission..."></textarea>
                    </div>
                </div>
            `;
            
            submitBtn.style.display = 'inline-block';
            submitBtn.dataset.id = assignment.id;
            submitBtn.textContent = 'Submit';
            
            assignmentModal.style.display = 'block';
        }

        // Show create assignment form
        function showCreateAssignment() {
            modalTitle.textContent = 'Create New Assignment';
            
            modalBody.innerHTML = `
                <div class="create-form">
                    <div class="form-group">
                        <label for="newTitle">Title:</label>
                        <input type="text" id="newTitle" class="form-control" placeholder="Assignment title">
                    </div>
                    <div class="form-group">
                        <label for="newCourse">Course:</label>
                        <input type="text" id="newCourse" class="form-control" placeholder="Course name">
                    </div>
                    <div class="form-group">
                        <label for="newDueDate">Due Date:</label>
                        <input type="date" id="newDueDate" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="newWeight">Weight (%):</label>
                        <input type="text" id="newWeight" class="form-control" placeholder="15%">
                    </div>
                    <div class="form-group">
                        <label for="newInstructor">Instructor:</label>
                        <input type="text" id="newInstructor" class="form-control" placeholder="Instructor name">
                    </div>
                    <div class="form-group">
                        <label for="newDescription">Description:</label>
                        <textarea id="newDescription" class="form-control" rows="4" placeholder="Assignment description..."></textarea>
                    </div>
                </div>
            `;
            
            submitBtn.style.display = 'inline-block';
            submitBtn.dataset.id = 'new';
            submitBtn.textContent = 'Create Assignment';
            
            assignmentModal.style.display = 'block';
        }

        // Handle submit button click
        function handleSubmit() {
            const id = submitBtn.dataset.id;
            
            if (id === 'new') {
                createNewAssignment();
            } else {
                submitAssignment(parseInt(id));
            }
        }

        // Create new assignment
        function createNewAssignment() {
            const title = document.getElementById('newTitle').value;
            const course = document.getElementById('newCourse').value;
            const dueDate = document.getElementById('newDueDate').value;
            const weight = document.getElementById('newWeight').value;
            const instructor = document.getElementById('newInstructor').value;
            const description = document.getElementById('newDescription').value;
            
            // Validate
            if (!title || !course || !dueDate) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            // Create new assignment object
            const newAssignment = {
                id: assignments.length + 1,
                title,
                course,
                dueDate,
                weight: weight.includes('%') ? weight : `${weight}%`,
                instructor,
                description,
                status: 'pending',
                requirements: []
            };
            
            // Add to assignments array
            assignments.push(newAssignment);
            
            // Close modal and refresh list
            assignmentModal.style.display = 'none';
            renderAssignments();
            
            // Show success toast
            showToast('Assignment created successfully', 'success');
        }

        // Submit assignment
        function submitAssignment(id) {
            const assignment = assignments.find(a => a.id === id);
            
            if (!assignment) return;
            
            // Update assignment status
            assignment.status = 'submitted';
            assignment.submittedDate = new Date().toISOString().split('T')[0];
            
            // Close modal and refresh list
            assignmentModal.style.display = 'none';
            renderAssignments();
            
            // Show success toast
            showToast('Assignment submitted successfully', 'success');
        }

        // Show toast message
        function showToast(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <div class="toast-content">
                    <i class="fas ${getToastIcon(type)}"></i>
                    <span>${message}</span>
                </div>
                <button class="toast-close">×</button>
            `;
            
            toastContainer.appendChild(toast);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                toast.classList.add('toast-hide');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
            
            // Close button
            toast.querySelector('.toast-close').addEventListener('click', () => {
                toast.classList.add('toast-hide');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            });
        }

        // Get toast icon based on type
        function getToastIcon(type) {
            switch(type) {
                case 'success': return 'fa-check-circle';
                case 'error': return 'fa-exclamation-circle';
                case 'warning': return 'fa-exclamation-triangle';
                default: return 'fa-info-circle';
            }
        }

        // Get status color
        function getStatusColor(status) {
            switch(status) {
                case 'pending': return 'var(--primary-color)';
                case 'submitted': return 'var(--success-color)';
                case 'late': return 'var(--warning-color)';
                default: return 'var(--primary-color)';
            }
        }

        

        // Capitalize first letter
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
