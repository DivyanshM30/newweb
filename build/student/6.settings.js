// 6.settings.js - JavaScript for the Settings page

document.addEventListener('DOMContentLoaded', function() {
    // Handle search functionality
    const searchInput = document.querySelector('.search-bar input');
    const settingsCards = document.querySelectorAll('.settings-card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        settingsCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Mobile menu toggle functionality
    const createMobileMenuToggle = () => {
        const sidebar = document.querySelector('.sidebar');
        const toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-toggle';
        toggleButton.innerHTML = '☰';
        toggleButton.style.position = 'fixed';
        toggleButton.style.top = '1rem';
        toggleButton.style.left = '1rem';
        toggleButton.style.zIndex = '1000';
        toggleButton.style.display = 'none';
        toggleButton.style.background = '#4a6cf7';
        toggleButton.style.color = 'white';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '5px';
        toggleButton.style.padding = '0.5rem 0.75rem';
        
        document.body.appendChild(toggleButton);
        
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
        
        // Show/hide toggle button based on screen size
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                toggleButton.style.display = 'block';
                sidebar.classList.remove('active');
            } else {
                toggleButton.style.display = 'none';
                sidebar.classList.remove('active');
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize(); // Initial check
    };
    
    createMobileMenuToggle();
    
    // Handle notification click
    const notificationBell = document.querySelector('.notifications');
    notificationBell.addEventListener('click', function() {
        alert('No new notifications');
    });
    
    // Handle settings card clicks
    const settingsButtons = document.querySelectorAll('.settings-card .btn-primary');
    
    settingsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const settingType = this.parentNode.querySelector('h3').textContent;
            
            // Show different modal or action based on setting type
            switch(settingType) {
                case 'Profile Settings':
                    showSettingsModal('profile');
                    break;
                case 'Account Settings':
                    showSettingsModal('account');
                    break;
                case 'Notification Settings':
                    showSettingsModal('notifications');
                    break;
                case 'Privacy Settings':
                    showSettingsModal('privacy');
                    break;
            }
        });
    });
    
    // Function to display various settings modals
    function showSettingsModal(type) {
        // Create modal container
        const modal = document.createElement('div');
        modal.className = 'settings-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1001';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.padding = '2rem';
        modalContent.style.borderRadius = '5px';
        modalContent.style.width = '80%';
        modalContent.style.maxWidth = '600px';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.overflowY = 'auto';
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.marginTop = '1.5rem';
        closeButton.style.padding = '0.5rem 1rem';
        closeButton.style.backgroundColor = '#4a6cf7';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Populate modal based on type
        let title = document.createElement('h2');
        let form = document.createElement('form');
        
        switch(type) {
            case 'profile':
                title.textContent = 'Edit Profile';
                form.innerHTML = `
                    <div style="margin-bottom: 1rem;">
                        <label for="name" style="display: block; margin-bottom: 0.5rem;">Full Name</label>
                        <input type="text" id="name" value="Divyansh Mishra" style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ddd;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label for="bio" style="display: block; margin-bottom: 0.5rem;">Bio</label>
                        <textarea id="bio" rows="4" style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ddd;">Student at Learning Platform</textarea>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label for="avatar" style="display: block; margin-bottom: 0.5rem;">Profile Picture</label>
                        <input type="file" id="avatar" accept="image/*">
                    </div>
                    <button type="button" style="padding: 0.5rem 1rem; background-color: #4a6cf7; color: white; border: none; border-radius: 5px; cursor: pointer;">Save Changes</button>
                `;
                break;
                
            case 'account':
                title.textContent = 'Manage Account';
                form.innerHTML = `
                    <div style="margin-bottom: 1rem;">
                        <label for="email" style="display: block; margin-bottom: 0.5rem;">Email Address</label>
                        <input type="email" id="email" value="divyansh@example.com" style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ddd;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label for="current-password" style="display: block; margin-bottom: 0.5rem;">Current Password</label>
                        <input type="password" id="current-password" style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ddd;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label for="new-password" style="display: block; margin-bottom: 0.5rem;">New Password</label>
                        <input type="password" id="new-password" style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ddd;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label for="confirm-password" style="display: block; margin-bottom: 0.5rem;">Confirm New Password</label>
                        <input type="password" id="confirm-password" style="width: 100%; padding: 0.5rem; border-radius: 5px; border: 1px solid #ddd;">
                    </div>
                    <button type="button" style="padding: 0.5rem 1rem; background-color: #4a6cf7; color: white; border: none; border-radius: 5px; cursor: pointer;">Update Account</button>
                `;
                break;
                
            case 'notifications':
                title.textContent = 'Edit Notifications';
                form.innerHTML = `
                    <div style="margin-bottom: 1rem;">
                        <label style="display: flex; align-items: center;">
                            <input type="checkbox" checked style="margin-right: 0.5rem;">
                            Email notifications for new assignments
                        </label>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: flex; align-items: center;">
                            <input type="checkbox" checked style="margin-right: 0.5rem;">
                            Email notifications for upcoming exams
                        </label>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: flex; align-items: center;">
                            <input type="checkbox" checked style="margin-right: 0.5rem;">
                            Browser notifications for new messages
                        </label>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: flex; align-items: center;">
                            <input type="checkbox" style="margin-right: 0.5rem;">
                            SMS notifications for important announcements
                        </label>
                    </div>
                    <button type="button" style="padding: 0.5rem 1rem; background-color: #4a6cf7; color: white; border: none; border-radius: 5px; cursor: pointer;">Save Preferences</button>
                `;
                break;
                
            case 'privacy':
                title.textContent = 'Manage Privacy';
                form.innerHTML = `
                    <div style="margin-bottom: 1rem;">
                        <label style="display: flex; align-items: center;">
                            <input type="checkbox" checked style="margin-right: 0.5rem;">
                            Show my profile to other students
                        </label>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: flex; align-items: center;">
                            <input type="checkbox" checked style="margin-right: 0.5rem;">
                            Allow instructors to see my learning progress
                        </label>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: flex; align-items: center;">
                            <input type="checkbox" style="margin-right: 0.5rem;">
                            Share my certificates on the platform
                        </label>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label for="data-export" style="display: block; margin-bottom: 0.5rem;">Export Your Data</label>
                        <button id="data-export" type="button" style="padding: 0.5rem 1rem; background-color: #2c3e50; color: white; border: none; border-radius: 5px; cursor: pointer;">Download My Data</button>
                    </div>
                    <button type="button" style="padding: 0.5rem 1rem; background-color: #4a6cf7; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 1rem;">Save Privacy Settings</button>
                `;
                break;
        }
        
        // Add form elements to modal
        modalContent.appendChild(title);
        modalContent.appendChild(form);
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
        
        // Add modal to document
        document.body.appendChild(modal);
        
        // Close modal when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
});